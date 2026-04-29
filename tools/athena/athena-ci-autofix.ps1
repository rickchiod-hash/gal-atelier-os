param(
  [string]$ProjectRoot = "K:\dev\repos\gal-atelier-os",
  [switch]$Apply,
  [switch]$Validate,
  [switch]$AllowDirty,
  [switch]$NoArchive
)

$ErrorActionPreference = "Stop"

function Info($m) { Write-Host "[INFO] $m" -ForegroundColor Cyan }
function Ok($m) { Write-Host "[OK] $m" -ForegroundColor Green }
function Warn($m) { Write-Host "[WARN] $m" -ForegroundColor Yellow }
function Err($m) { Write-Host "[ERRO] $m" -ForegroundColor Red }

if (-not (Test-Path $ProjectRoot)) { Err "ProjectRoot não encontrado: $ProjectRoot"; exit 1 }
Set-Location $ProjectRoot
if (-not (Test-Path ".git")) { Err "Não é repositório Git: $ProjectRoot"; exit 1 }

$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$reportDir = Join-Path $ProjectRoot "docs\athena"
$archiveDir = Join-Path $ProjectRoot "_archive\athena-ci-autofix-$ts"
$workflowDir = Join-Path $ProjectRoot ".github\workflows"
$backupDir = Join-Path $archiveDir "workflows-originals"
$logDir = "K:\dev\logs\gal-atelier-athena"
New-Item -ItemType Directory -Force -Path $reportDir, $archiveDir, $backupDir, $logDir | Out-Null
$report = Join-Path $reportDir "ATHENA-CI-AUTOFIX-REPORT.md"
$log = Join-Path $logDir "athena-ci-autofix-$ts.log"

function AddReport([string]$m = "") { $m | Out-File -FilePath $report -Encoding UTF8 -Append }

function RunStep([string]$Name, [string]$Dir, [string]$Cmd, [switch]$IgnoreError) {
  AddReport ""
  AddReport "### $Name"
  AddReport "```bash"
  AddReport $Cmd
  AddReport "```"
  Info $Name
  Push-Location $Dir
  cmd.exe /d /s /c "$Cmd" 2>&1 | Tee-Object -FilePath $log -Append
  $code = $LASTEXITCODE
  Pop-Location
  AddReport "ExitCode: `$code`"
  if ($code -ne 0 -and -not $IgnoreError) { throw "Falha em $Name com exit code $code" }
  return $code
}

"# ATHENA — CI Autofix Report V3" | Out-File -FilePath $report -Encoding UTF8
AddReport ""
AddReport "- Data: $(Get-Date)"
AddReport "- ProjectRoot: `$ProjectRoot`"
AddReport "- Apply: `$Apply`"
AddReport "- Validate: `$Validate`"
AddReport "- Archive: `$archiveDir`"
AddReport ""

$dirty = git status --porcelain
if ($dirty -and -not $AllowDirty -and $Apply) {
  Warn "Há alterações não commitadas. Para segurança, parei antes de aplicar."
  git status --short
  AddReport "## Bloqueado"
  AddReport "Havia alterações não commitadas. Rode com `-AllowDirty` se souber o risco."
  exit 2
}

$workflowFiles = @("ci-cd.yml","ci-dev.yml","ci-homolog.yml","ci-prod.yml","docker.yml","tests-quality.yml","validation.yml")

AddReport "## Diagnóstico inicial"
AddReport "| Item | Status | Observação |"
AddReport "|---|---|---|"

foreach ($wf in $workflowFiles) {
  $path = Join-Path $workflowDir $wf
  if (Test-Path $path) {
    $lines = (Get-Content $path -ErrorAction SilentlyContinue).Count
    $obs = if ($lines -le 2) { "minificado/uma linha; risco de YAML inválido/manutenção ruim" } else { "legível" }
    AddReport "| `.github/workflows/$wf` | existe | $obs |"
  } else {
    AddReport "| `.github/workflows/$wf` | ausente | - |"
  }
}

$eslintPath = Join-Path $ProjectRoot "frontend\.eslintrc.json"
if (Test-Path $eslintPath) {
  AddReport "| `frontend/.eslintrc.json` | existe | evita prompt interativo do next lint |"
} else {
  AddReport "| `frontend/.eslintrc.json` | ausente | causa prompt interativo no CI |"
}

$catalogSection = Join-Path $ProjectRoot "frontend\components\CatalogSection.tsx"
if (Test-Path $catalogSection) {
  $catalogText = Get-Content $catalogSection -Raw
  if ($catalogText -match "setCatalogFilter:\s*\(filter:\s*string\)\s*=>\s*void") {
    AddReport "| `CatalogSection.tsx` | precisa correção | setter tipado como string causa erro no next build |"
  } else {
    AddReport "| `CatalogSection.tsx` | revisar | setter talvez já corrigido |"
  }
}

$pom = Join-Path $ProjectRoot "backend\pom.xml"
if (Test-Path $pom) {
  $pomText = Get-Content $pom -Raw
  if ($pomText -match "spotbugs-maven-plugin[\s\S]*?<version>4\.8\.2\.1</version>") {
    AddReport "| `backend/pom.xml` | precisa correção | SpotBugs 4.8.2.1 problemático |"
  }
}

if (-not $Apply) {
  Warn "DRY-RUN: nada foi alterado. Rode com -Apply para corrigir."
  Ok "Relatório: $report"
  exit 0
}

# ESLint config fix
$frontendDir = Join-Path $ProjectRoot "frontend"
if (Test-Path $frontendDir) {
  $eslintContent = @'
{
  "extends": "next/core-web-vitals"
}
'@
  Set-Content -Path $eslintPath -Value $eslintContent -Encoding UTF8
  AddReport ""
  AddReport "## ESLint corrigido"
  AddReport "- Criado/atualizado `frontend/.eslintrc.json` com `next/core-web-vitals`."
}

# CatalogSection TypeScript fix
if (Test-Path $catalogSection) {
  $text = Get-Content $catalogSection -Raw

  if ($text -notmatch "type\s+CatalogFilter\s*=") {
    $text = $text -replace 'import \{ CatalogItem \} from "@/data/galAtelierCatalog";', 'import { CatalogItem } from "@/data/galAtelierCatalog";' + "`r`n" + 'type CatalogFilter = "all" | CatalogItem["category"];'
  }

  $text = $text -replace 'catalogFilter:\s*string;', 'catalogFilter: CatalogFilter;'
  $text = $text -replace 'setCatalogFilter:\s*\(filter:\s*string\)\s*=>\s*void;', 'setCatalogFilter: (filter: CatalogFilter) => void;'
  $text = $text -replace 'setCatalogFilter\(cat\.id\)', 'setCatalogFilter(cat.id as CatalogFilter)'

  Set-Content -Path $catalogSection -Value $text -Encoding UTF8
  AddReport ""
  AddReport "## TypeScript frontend corrigido"
  AddReport "- Ajustado `frontend/components/CatalogSection.tsx`."
  AddReport "- `catalogFilter` agora usa `CatalogFilter = ""all"" | CatalogItem[""category""]`."
  AddReport "- `setCatalogFilter` não aceita mais `string` genérico."
  AddReport "- `cat.id` é convertido para `CatalogFilter` no clique."
}

# Archive old workflows
New-Item -ItemType Directory -Force -Path $workflowDir | Out-Null
foreach ($wf in $workflowFiles) {
  $src = Join-Path $workflowDir $wf
  if (Test-Path $src) {
    Copy-Item -Force $src (Join-Path $backupDir $wf)
    if (-not $NoArchive) {
      $dest = Join-Path $backupDir $wf
      Info "Arquivando workflow antigo: $wf"
      git mv -- "$src" "$dest" 2>&1 | Tee-Object -FilePath $log -Append
      if ($LASTEXITCODE -ne 0) { Move-Item -Force $src $dest }
    }
  }
}

# SpotBugs fix
if (Test-Path $pom) {
  $pomText = Get-Content $pom -Raw
  $newPom = $pomText -replace "(<artifactId>spotbugs-maven-plugin</artifactId>\s*<version>)([^<]+)(</version>)", '${1}4.9.8.3${3}'
  if ($newPom -ne $pomText) {
    Set-Content -Path $pom -Value $newPom -Encoding UTF8
    AddReport "## SpotBugs corrigido"
    AddReport "- `backend/pom.xml` atualizado para `spotbugs-maven-plugin:4.9.8.3`."
  }
}

# Workflows
$ciYml = @'
name: CI

on:
  push:
    branches:
      - main
      - homolog
      - dev
      - 'feature/**'
  pull_request:
    branches:
      - main
      - homolog
      - dev
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
        env:
          POSTGRES_USER: galatelier
          POSTGRES_PASSWORD: galatelier123
          POSTGRES_DB: galatelier
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    env:
      DATABASE_URL: jdbc:postgresql://localhost:5432/galatelier
      DATABASE_USERNAME: galatelier
      DATABASE_PASSWORD: galatelier123
      SPRING_PROFILES_ACTIVE: test
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: ${{ env.JAVA_VERSION }}
          distribution: corretto
          cache: maven
      - name: Maven verify
        working-directory: backend
        run: mvn -B -U clean verify

  frontend:
    name: Frontend • Install, Lint, Test, Build
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_API_URL: ${{ env.NEXT_PUBLIC_API_URL }}
      NEXT_PUBLIC_WHATSAPP_RECEIVER: ${{ env.NEXT_PUBLIC_WHATSAPP_RECEIVER }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Install dependencies
        working-directory: frontend
        run: |
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install --no-audit --no-fund
          fi
      - name: Lint
        working-directory: frontend
        run: npm run lint --if-present
      - name: Test
        working-directory: frontend
        run: npm run test:ci --if-present
      - name: Build
        working-directory: frontend
        run: npm run build

  docker-compose:
    name: Docker • Compose Config
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Validate docker compose
        run: docker compose config

  summary:
    name: CI • Summary
    runs-on: ubuntu-latest
    needs: [backend, frontend, docker-compose]
    if: always()
    steps:
      - name: Summary
        run: |
          echo "## Gal Atelier OS CI" >> "$GITHUB_STEP_SUMMARY"
          echo "| Job | Result |" >> "$GITHUB_STEP_SUMMARY"
          echo "|---|---|" >> "$GITHUB_STEP_SUMMARY"
          echo "| Backend | ${{ needs.backend.result }} |" >> "$GITHUB_STEP_SUMMARY"
          echo "| Frontend | ${{ needs.frontend.result }} |" >> "$GITHUB_STEP_SUMMARY"
          echo "| Docker Compose | ${{ needs.docker-compose.result }} |" >> "$GITHUB_STEP_SUMMARY"
          test "${{ needs.backend.result }}" = "success"
          test "${{ needs.frontend.result }}" = "success"
          test "${{ needs.docker-compose.result }}" = "success"
'@

$dockerYml = @'
name: Docker Build

on:
  push:
    branches:
      - main
      - homolog
      - dev
      - 'feature/**'
    paths:
      - 'backend/**'
      - 'frontend/**'
      - 'docker-compose.yml'
      - '.github/workflows/docker-build.yml'
  pull_request:
    branches:
      - main
      - homolog
      - dev
    paths:
      - 'backend/**'
      - 'frontend/**'
      - 'docker-compose.yml'
      - '.github/workflows/docker-build.yml'
  workflow_dispatch:

concurrency:
  group: docker-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  docker-build:
    name: Docker • Build Images
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Validate compose
        run: docker compose config
      - name: Build backend image
        run: docker build ./backend --tag gal-atelier-backend:ci
      - name: Build frontend image
        run: |
          docker build ./frontend \
            --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 \
            --build-arg NEXT_PUBLIC_WHATSAPP_RECEIVER=5511914136961 \
            --tag gal-atelier-frontend:ci
'@

$validationYml = @'
name: Validation

on:
  workflow_dispatch:
  schedule:
    - cron: '0 11 * * 1'

concurrency:
  group: validation-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

env:
  JAVA_VERSION: '21'
  NODE_VERSION: '20'

jobs:
  smoke:
    name: Validation • Build and Smoke
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: ${{ env.JAVA_VERSION }}
          distribution: corretto
          cache: maven
      - name: Backend package
        working-directory: backend
        run: mvn -B -U clean package
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Frontend build
        working-directory: frontend
        run: |
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install --no-audit --no-fund
          fi
          npm run lint --if-present
          npm run build
      - name: Docker compose config
        run: docker compose config
'@

Set-Content -Path (Join-Path $workflowDir "ci.yml") -Value $ciYml -Encoding UTF8
Set-Content -Path (Join-Path $workflowDir "docker-build.yml") -Value $dockerYml -Encoding UTF8
Set-Content -Path (Join-Path $workflowDir "validation.yml") -Value $validationYml -Encoding UTF8

AddReport ""
AddReport "## Workflows novos criados"
AddReport "- `.github/workflows/ci.yml`"
AddReport "- `.github/workflows/docker-build.yml`"
AddReport "- `.github/workflows/validation.yml`"

AddReport ""
AddReport "## Workflows antigos arquivados"
foreach ($wf in $workflowFiles) {
  if (Test-Path (Join-Path $backupDir $wf)) {
    AddReport "- `_archive/athena-ci-autofix-$ts/workflows-originals/$wf`"
  }
}

if ($Validate) {
  AddReport ""
  AddReport "## Validação local"

  RunStep "Git status" $ProjectRoot "git status --short" -IgnoreError | Out-Null

  if (Get-Command actionlint -ErrorAction SilentlyContinue) {
    RunStep "actionlint" $ProjectRoot "actionlint .github/workflows/*.yml" -IgnoreError | Out-Null
  } else {
    AddReport "- `actionlint` não instalado; validação YAML completa fica para GitHub Actions."
  }

  if (Test-Path "backend\pom.xml") {
    RunStep "Backend Maven verify" (Join-Path $ProjectRoot "backend") "mvn -B -U clean verify" -IgnoreError | Out-Null
  }

  if (Test-Path "frontend\package.json") {
    $installCmd = "if exist package-lock.json (npm ci) else (npm install --no-audit --no-fund)"
    RunStep "Frontend install" (Join-Path $ProjectRoot "frontend") $installCmd -IgnoreError | Out-Null
    RunStep "Frontend lint" (Join-Path $ProjectRoot "frontend") "npm run lint" -IgnoreError | Out-Null
    RunStep "Frontend build" (Join-Path $ProjectRoot "frontend") "npm run build" -IgnoreError | Out-Null
  }

  if (Test-Path "docker-compose.yml") {
    RunStep "Docker compose config" $ProjectRoot "docker compose config" -IgnoreError | Out-Null
  }
}

Copy-Item -Force $report (Join-Path $reportDir "ATHENA-CI-AUTOFIX-LATEST.md")
Ok "Autofix concluído."
Info "Relatório: $report"
Info "Log: $log"
Info "Revise com: git diff --stat"
Warn "Depois valide no GitHub Actions após push."
