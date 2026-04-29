param(
  [string]$ProjectRoot = "K:\dev\repos\gal-atelier-os",
  [string]$ProdBranch = "master",
  [switch]$Apply,
  [switch]$Validate,
  [switch]$AllowDirty
)
$ErrorActionPreference = "Stop"
function Info($m){Write-Host "[INFO] $m" -ForegroundColor Cyan}
function Warn($m){Write-Host "[WARN] $m" -ForegroundColor Yellow}
function Ok($m){Write-Host "[OK] $m" -ForegroundColor Green}
if(!(Test-Path $ProjectRoot)){throw "ProjectRoot não encontrado: $ProjectRoot"}
Set-Location $ProjectRoot
if(!(Test-Path ".git")){throw "Não é repositório Git: $ProjectRoot"}
$ts=Get-Date -Format "yyyyMMdd-HHmmss"
$wfDir=Join-Path $ProjectRoot ".github\workflows"
$ghDir=Join-Path $ProjectRoot ".github"
$docsDir=Join-Path $ProjectRoot "docs\athena"
$archiveDir=Join-Path $ProjectRoot "_archive\athena-pr-flow-$ts\workflows-originals"
$logDir="K:\dev\logs\gal-atelier-athena"
New-Item -ItemType Directory -Force -Path $wfDir,$ghDir,$docsDir,$archiveDir,$logDir | Out-Null
$report=Join-Path $docsDir "ATHENA-PR-FLOW-AUTOFIX-REPORT.md"
$log=Join-Path $logDir "athena-pr-flow-$ts.log"
function R($m=""){$m|Out-File -FilePath $report -Encoding UTF8 -Append}
function Step($name,$dir,$cmd){R "`n### $name`n```bash`n$cmd`n```"; Info $name; Push-Location $dir; cmd.exe /d /s /c "$cmd" 2>&1 | Tee-Object -FilePath $log -Append; $c=$LASTEXITCODE; Pop-Location; R "ExitCode: `$c"; return $c}
"# ATHENA PR Flow Autofix V4"|Out-File -FilePath $report -Encoding UTF8
R "Data: $(Get-Date)"; R "ProjectRoot: `$ProjectRoot"; R "Apply: `$Apply"; R ""
$dirty=git status --porcelain
if($dirty -and -not $AllowDirty -and $Apply){Warn "Há alterações não commitadas. Use -AllowDirty se souber o risco."; git status --short; exit 2}
$existing=Get-ChildItem $wfDir -File -Include *.yml,*.yaml -ErrorAction SilentlyContinue
R "## Workflows atuais"; R "|Workflow|Slack?|"; R "|---|---:|"
foreach($f in $existing){$c=Get-Content $f.FullName -Raw; $s=$c -match "slackapi|SLACK_WEBHOOK|slack"; R "|$($f.Name)|$s|"}
if(!$Apply){Warn "DRY-RUN: nada alterado."; Ok "Relatório: $report"; exit 0}
foreach($f in $existing){$dest=Join-Path $archiveDir $f.Name; Copy-Item -Force $f.FullName $dest; git mv -- "$($f.FullName)" "$dest" 2>&1 | Tee-Object -FilePath $log -Append; if($LASTEXITCODE -ne 0){Move-Item -Force $f.FullName $dest}}
# Fix ESLint
if(Test-Path "frontend"){Set-Content -Path "frontend\.eslintrc.json" -Encoding UTF8 -Value "{`n  `"extends`": `"next/core-web-vitals`"`n}"; R "- Criado frontend/.eslintrc.json"}
# Fix CatalogSection type
$catalog="frontend\components\CatalogSection.tsx"
if(Test-Path $catalog){$t=Get-Content $catalog -Raw; if($t -notmatch "type\s+CatalogFilter\s*="){$t=$t -replace 'import \{ CatalogItem \} from "@/data/galAtelierCatalog";', 'import { CatalogItem } from "@/data/galAtelierCatalog";' + "`r`n" + 'type CatalogFilter = "all" | CatalogItem["category"];'}; $t=$t -replace 'catalogFilter:\s*string;', 'catalogFilter: CatalogFilter;'; $t=$t -replace 'setCatalogFilter:\s*\(filter:\s*string\)\s*=>\s*void;', 'setCatalogFilter: (filter: CatalogFilter) => void;'; $t=$t -replace 'setCatalogFilter\(cat\.id\)', 'setCatalogFilter(cat.id as CatalogFilter)'; Set-Content -Path $catalog -Encoding UTF8 -Value $t; R "- Ajustado CatalogSection.tsx"}
# Fix SpotBugs
$pom="backend\pom.xml"
if(Test-Path $pom){$p=Get-Content $pom -Raw; $n=$p -replace '(<artifactId>spotbugs-maven-plugin</artifactId>\s*<version>)([^<]+)(</version>)','${1}4.9.8.3${3}'; if($n -ne $p){Set-Content -Path $pom -Encoding UTF8 -Value $n; R "- SpotBugs atualizado para 4.9.8.3"}}
@'
name: CI
on:
  push:
    branches: ['feature/**', develop, homolog, master, main]
  pull_request:
    branches: [develop, homolog, master, main]
  workflow_dispatch:
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
env:
  JAVA_VERSION: '21'
  NODE_VERSION: '20'
  NEXT_PUBLIC_API_URL: 'http://localhost:8080'
  NEXT_PUBLIC_WHATSAPP_RECEIVER: '5511914136961'
jobs:
  backend:
    name: Backend • Maven Verify
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env: { POSTGRES_USER: galatelier, POSTGRES_PASSWORD: galatelier123, POSTGRES_DB: galatelier }
        options: >-
          --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
        ports: ['5432:5432']
    env:
      DATABASE_URL: jdbc:postgresql://localhost:5432/galatelier
      DATABASE_USERNAME: galatelier
      DATABASE_PASSWORD: galatelier123
      SPRING_PROFILES_ACTIVE: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '${{ env.JAVA_VERSION }}', distribution: corretto, cache: maven }
      - working-directory: backend
        run: mvn -B -U clean verify
  frontend:
    name: Frontend • Lint and Build
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_API_URL: ${{ env.NEXT_PUBLIC_API_URL }}
      NEXT_PUBLIC_WHATSAPP_RECEIVER: ${{ env.NEXT_PUBLIC_WHATSAPP_RECEIVER }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '${{ env.NODE_VERSION }}' }
      - working-directory: frontend
        run: if [ -f package-lock.json ]; then npm ci; else npm install --no-audit --no-fund; fi
      - working-directory: frontend
        run: npm run lint --if-present
      - working-directory: frontend
        run: npm run build
  compose:
    name: Docker • Compose Config
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker compose config
'@ | Set-Content -Path "$wfDir\ci.yml" -Encoding UTF8
@'
name: Docker Build
on:
  push:
    branches: ['feature/**', develop, homolog, master, main]
    paths: ['backend/**','frontend/**','docker-compose.yml','.github/workflows/docker-build.yml']
  pull_request:
    branches: [develop, homolog, master, main]
  workflow_dispatch:
concurrency:
  group: docker-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions: { contents: read }
jobs:
  docker-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker compose config
      - run: docker build ./backend --tag gal-atelier-backend:ci
      - run: docker build ./frontend --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 --build-arg NEXT_PUBLIC_WHATSAPP_RECEIVER=5511914136961 --tag gal-atelier-frontend:ci
'@ | Set-Content -Path "$wfDir\docker-build.yml" -Encoding UTF8
@'
name: Security
on:
  pull_request:
    branches: [develop, homolog, master, main]
  push:
    branches: [develop, homolog, master, main]
  workflow_dispatch:
  schedule:
    - cron: '30 8 * * 1'
concurrency:
  group: security-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions: { contents: read, security-events: write, pull-requests: read }
jobs:
  dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
        with: { fail-on-severity: high }
  codeql:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v4
        with: { languages: javascript-typescript }
      - uses: github/codeql-action/autobuild@v4
      - uses: github/codeql-action/analyze@v4
'@ | Set-Content -Path "$wfDir\security.yml" -Encoding UTF8
@'
name: PR Flow
on:
  push:
    branches: ['feature/**', develop, homolog]
  workflow_dispatch:
concurrency:
  group: pr-flow-${{ github.ref }}
  cancel-in-progress: true
permissions: { contents: read, pull-requests: write }
env: { PROD_BRANCH: master }
jobs:
  create-promotion-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: flow
        shell: bash
        run: |
          SOURCE="${GITHUB_REF_NAME}"
          if [[ "$SOURCE" == feature/* ]]; then TARGET="develop"; elif [[ "$SOURCE" == "develop" ]]; then TARGET="homolog"; elif [[ "$SOURCE" == "homolog" ]]; then TARGET="${PROD_BRANCH}"; else echo "skip=true" >> "$GITHUB_OUTPUT"; exit 0; fi
          echo "source=$SOURCE" >> "$GITHUB_OUTPUT"; echo "target=$TARGET" >> "$GITHUB_OUTPUT"; echo "skip=false" >> "$GITHUB_OUTPUT"
      - if: steps.flow.outputs.skip != 'true'
        env: { GH_TOKEN: '${{ secrets.GH_PR_TOKEN || github.token }}', TARGET: '${{ steps.flow.outputs.target }}' }
        run: gh api "repos/${GITHUB_REPOSITORY}/branches/${TARGET}" >/dev/null
      - if: steps.flow.outputs.skip != 'true'
        env:
          GH_TOKEN: ${{ secrets.GH_PR_TOKEN || github.token }}
          SOURCE: ${{ steps.flow.outputs.source }}
          TARGET: ${{ steps.flow.outputs.target }}
        shell: bash
        run: |
          EXISTING="$(gh pr list --head "$SOURCE" --base "$TARGET" --state open --json number --jq '.[0].number // empty')"
          if [ -n "$EXISTING" ]; then gh pr edit "$EXISTING" --add-reviewer @copilot || true; exit 0; fi
          gh pr create --base "$TARGET" --head "$SOURCE" --title "chore: promote $SOURCE to $TARGET" --body "Automated promotion PR. Copilot reviewer requested. Copilot does not replace human approval." --reviewer @copilot || gh pr create --base "$TARGET" --head "$SOURCE" --title "chore: promote $SOURCE to $TARGET" --body "Automated promotion PR."
'@ | Set-Content -Path "$wfDir\pr-flow.yml" -Encoding UTF8
@'
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: weekly }
    target-branch: develop
  - package-ecosystem: maven
    directory: /backend
    schedule: { interval: weekly }
    target-branch: develop
  - package-ecosystem: npm
    directory: /frontend
    schedule: { interval: weekly }
    target-branch: develop
  - package-ecosystem: docker
    directory: /backend
    schedule: { interval: weekly }
    target-branch: develop
  - package-ecosystem: docker
    directory: /frontend
    schedule: { interval: weekly }
    target-branch: develop
'@ | Set-Content -Path "$ghDir\dependabot.yml" -Encoding UTF8
@'
## Objetivo
Descreva o que este PR muda.

## Checklist
- [ ] CI executou.
- [ ] Backend Maven passou, quando aplicável.
- [ ] Frontend lint/build passou, quando aplicável.
- [ ] Docker compose config passou, quando aplicável.
- [ ] Não há secrets, tokens ou dados sensíveis.
- [ ] Copilot review foi solicitado/lido.
- [ ] Riscos conhecidos foram documentados.
'@ | Set-Content -Path "$ghDir\pull_request_template.md" -Encoding UTF8
@'
You are reviewing Gal Atelier OS. Preserve Kotlin/Spring Boot hexagonal architecture. Controllers must not contain business logic. Domain must not depend on Spring. Frontend must not duplicate critical backend pricing rules. Check GitHub Actions for secrets misuse, broken paths and Slack misconfiguration. Copilot comments do not replace human review or CI.
'@ | Set-Content -Path "$ghDir\copilot-instructions.md" -Encoding UTF8
@"
# ATHENA — PR Flow Runbook

## Branch flow
- feature/** → develop
- develop → homolog
- homolog → $ProdBranch

## Copilot reviewer
Usa `gh pr create --reviewer @copilot` e `gh pr edit --add-reviewer @copilot`.

Copilot comenta; não substitui aprovação humana.

## Configuração manual necessária
Settings → Actions → General → Workflow permissions:
- Read and write permissions
- Allow GitHub Actions to create and approve pull requests

Opcional: secret `GH_PR_TOKEN` para automação mais forte.

## Slack
Slack foi removido dos workflows ativos.
"@ | Set-Content -Path "$docsDir\ATHENA-PR-FLOW-RUNBOOK.md" -Encoding UTF8
@'
# ATHENA — Actions Maturity

Actions úteis adicionadas: checkout, setup-java, setup-node, CodeQL, Dependency Review e Dependabot.

Futuro: branch rulesets, required checks, CODEOWNERS, Trivy, Actionlint e SBOM.
'@ | Set-Content -Path "$docsDir\ATHENA-ACTIONS-MATURITY.md" -Encoding UTF8
R "- Slack removido dos workflows ativos"; R "- PR Flow + Copilot criado"; R "- CI/Docker/Security/Dependabot criados"
if($Validate){Step "Git status" $ProjectRoot "git status --short"|Out-Null; if(Test-Path "backend\pom.xml"){Step "Backend Maven verify" (Join-Path $ProjectRoot "backend") "mvn -B -U clean verify"|Out-Null}; if(Test-Path "frontend\package.json"){$install="if exist package-lock.json (npm ci) else (npm install --no-audit --no-fund)"; Step "Frontend install" (Join-Path $ProjectRoot "frontend") $install|Out-Null; Step "Frontend lint" (Join-Path $ProjectRoot "frontend") "npm run lint"|Out-Null; Step "Frontend build" (Join-Path $ProjectRoot "frontend") "npm run build"|Out-Null}; if(Test-Path "docker-compose.yml"){Step "Docker compose config" $ProjectRoot "docker compose config"|Out-Null}}
Copy-Item -Force $report (Join-Path $docsDir "ATHENA-PR-FLOW-AUTOFIX-LATEST.md")
Ok "PR Flow Autofix concluído."; Info "Relatório: $report"; Info "Log: $log"
