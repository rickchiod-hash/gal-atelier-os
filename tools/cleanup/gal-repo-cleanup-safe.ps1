param(
  [string]$ProjectRoot = "K:\dev\repos\gal-atelier-os",
  [switch]$Apply,
  [switch]$Validate,
  [switch]$AllowDirty,
  [switch]$SkipPrompt,
  [switch]$NoGitMove
)

$ErrorActionPreference = "Stop"

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERRO] $msg" -ForegroundColor Red }

if (-not (Test-Path $ProjectRoot)) {
  Write-Err "Projeto não encontrado: $ProjectRoot"
  exit 1
}

Set-Location $ProjectRoot

if (-not (Test-Path ".git")) {
  Write-Err "A pasta não parece ser um repositório Git: $ProjectRoot"
  exit 1
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archiveRoot = Join-Path $ProjectRoot "_archive\repo-cleanup-$timestamp"
$reportDir = Join-Path $ProjectRoot "docs\hermes"
$logDir = "K:\dev\logs\gal-atelier-cleanup"
New-Item -ItemType Directory -Force -Path $archiveRoot, $reportDir, $logDir | Out-Null

$report = Join-Path $reportDir "HERMES-REPO-CLEANUP-$timestamp.md"
$log = Join-Path $logDir "repo-cleanup-$timestamp.log"

function Add-Report($text = "") {
  $text | Out-File -FilePath $report -Encoding UTF8 -Append
}

function Run-Cmd($name, $cmd, [switch]$IgnoreError) {
  Add-Report ""
  Add-Report "### $name"
  Add-Report ""
  Add-Report "```powershell"
  Add-Report $cmd
  Add-Report "```"
  Add-Report ""
  Write-Info $name
  cmd.exe /d /s /c "$cmd" 2>&1 | Tee-Object -FilePath $log -Append
  $code = $LASTEXITCODE
  Add-Report "ExitCode: `$code`"
  if ($code -ne 0 -and -not $IgnoreError) {
    throw "Falha em $name com exit code $code"
  }
  return $code
}

# ------------------------------------------------------------------
# Fontes da verdade que devem ficar no caminho principal
# ------------------------------------------------------------------
$keepExact = @(
  ".editorconfig",
  ".env.example",
  ".gitattributes",
  ".gitignore",
  "AGENTS.md",
  "BACKLOG.md",
  "BRANCH-STRATEGY.md",
  "CI-CD-QUICKSTART.md",
  "QUALITY-GATES.md",
  "README.md",
  "SCRUM-BOARD.md",
  "TESTES-QUALIDADE-ESTEIRA.md",
  "docker-compose.yml",
  "opencode.jsonc",
  "sonar-project.properties",
  "docs\ARCHITECTURE.md",
  "docs\API-CONTRACT.md",
  "docs\DATA-MODEL-ROADMAP.md",
  "docs\DESIGN-SYSTEM.md",
  "docs\PRODUCT-ROADMAP.md",
  "docs\SECURITY.md",
  "docs\VALIDATION-RUNBOOK.md",
  "docs\DEVELOPER-ONBOARDING.md",
  "docs\README.md",
  "prompts\README-PROMPTS.md",
  ".opencode\commands\README.md"
)

$protectedDirs = @(
  ".git",
  ".github",
  "backend",
  "frontend",
  "scripts",
  "tools",
  "local-opencode-3s",
  "_archive",
  "_local-backups"
)

# ------------------------------------------------------------------
# Candidatos observados no repositório + padrões de ruído
# ------------------------------------------------------------------
$explicitArchiveCandidates = @(
  "-CI-CD-START-HERE.md",
  "CI-CD-FILES-CREATED.md",
  "CI-CD-SETUP-COMPLETE.md",
  "CONCLUSÃO.md",
  "EXECUTIVE-SUMMARY.md",
  "SESSION-1-BACKLOG.md",
  "SESSION-2-BACKLOG.md",
  "SESSION-3-BACKLOG.md",
  "SETUP-COMPLETE.md",
  "run-all-v5.ps1",
  "validate-cicd-setup.ps1",
  "validate-cicd-setup.sh"
)

$docNoisePatterns = @(
  "*V5*",
  "*V6*",
  "*FINAL*",
  "*RELATORIO*",
  "*RELATÓRIO*",
  "*QA-REVIEW*",
  "*SUPER-ROADMAP*",
  "*UX-AJUSTE*",
  "*MELHORIAS*",
  "*SESSAO*",
  "*SESSÃO*",
  "*CONSOLIDADO*",
  "*COMPLETO*",
  "*COMPLETE*",
  "*SETUP*",
  "*CREDITS*",
  "*CRÉDITOS*"
)

$promptNoisePatterns = @(
  "AI-*",
  "MELHORIAS-*",
  "*V5*",
  "*V6*",
  "*IMAGENS*",
  "*CATALOGO*",
  "*CATÁLOGO*",
  "*REDESIGN*",
  "*PROMPT*"
)

$opencodeNoisePatterns = @(
  "melhorias-*",
  "v5-*",
  "flow-*",
  "docker-*",
  "build-*",
  "open-next-task*",
  "plan*",
  "qa*",
  "review*"
)

function Normalize-Rel($path) {
  return ($path.Replace("/", "\")).TrimStart(".\")
}

function Is-Keep($rel) {
  $r = Normalize-Rel $rel
  foreach ($k in $keepExact) {
    if ($r -ieq (Normalize-Rel $k)) { return $true }
  }
  return $false
}

function Is-Protected($rel) {
  $r = Normalize-Rel $rel
  foreach ($d in $protectedDirs) {
    if ($r -ieq $d -or $r.StartsWith("$d\", [StringComparison]::OrdinalIgnoreCase)) { return $true }
  }
  return $false
}

function Is-Referenced($rel) {
  $needle = $rel.Replace("\", "/")
  $needle2 = Split-Path $rel -Leaf
  $searchRoots = @("README.md","AGENTS.md","BACKLOG.md","SCRUM-BOARD.md","docs","prompts",".github","scripts","tools")
  foreach ($root in $searchRoots) {
    if (-not (Test-Path $root)) { continue }
    if ((Get-Item $root).PSIsContainer) {
      $files = Get-ChildItem $root -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "\\(_archive|node_modules|target|\.next|coverage)\\" }
    } else {
      $files = @(Get-Item $root)
    }
    foreach ($f in $files) {
      try {
        $content = Get-Content $f.FullName -Raw -Encoding UTF8 -ErrorAction Stop
        if ($content.Contains($needle) -or $content.Contains($needle2)) {
          return $true
        }
      } catch {}
    }
  }
  return $false
}

function Is-Tracked($rel) {
  git ls-files --error-unmatch -- "$rel" *> $null
  return ($LASTEXITCODE -eq 0)
}

function Add-Candidate($list, $rel, $reason, $category) {
  $r = Normalize-Rel $rel
  if ([string]::IsNullOrWhiteSpace($r)) { return }
  if (-not (Test-Path $r)) { return }
  if (Is-Keep $r) { return }
  if (Is-Protected $r) { return }
  if ($list.ContainsKey($r)) { return }
  $referenced = Is-Referenced $r
  $tracked = Is-Tracked $r
  $decision = if ($referenced) { "REVIEW_REFERENCED" } else { "ARCHIVE" }
  $list[$r] = [PSCustomObject]@{
    Path = $r
    Category = $category
    Reason = $reason
    Decision = $decision
    Referenced = $referenced
    Tracked = $tracked
  }
}

$candidates = @{}

# Candidatos explícitos na raiz
foreach ($c in $explicitArchiveCandidates) {
  Add-Candidate $candidates $c "arquivo raiz de setup/sessão/relatório já substituído por documentação principal" "root-legacy"
}

# Docs ruidosas por padrão
if (Test-Path "docs") {
  foreach ($pattern in $docNoisePatterns) {
    Get-ChildItem "docs" -File -Recurse -Filter $pattern -ErrorAction SilentlyContinue | ForEach-Object {
      $rel = Resolve-Path -Relative $_.FullName
      Add-Candidate $candidates $rel "doc histórica/gerada por IA ou roadmap concorrente ($pattern)" "docs-noise"
    }
  }
}

# Prompts históricos
if (Test-Path "prompts") {
  foreach ($pattern in $promptNoisePatterns) {
    Get-ChildItem "prompts" -File -Recurse -Filter $pattern -ErrorAction SilentlyContinue | ForEach-Object {
      $rel = Resolve-Path -Relative $_.FullName
      Add-Candidate $candidates $rel "prompt antigo ou específico de sessão ($pattern)" "prompts-history"
    }
  }
}

# Comandos OpenCode antigos
if (Test-Path ".opencode\commands") {
  foreach ($pattern in $opencodeNoisePatterns) {
    Get-ChildItem ".opencode\commands" -File -Recurse -Filter $pattern -ErrorAction SilentlyContinue | ForEach-Object {
      $rel = Resolve-Path -Relative $_.FullName
      Add-Candidate $candidates $rel "comando OpenCode antigo ou concorrente ($pattern)" "opencode-command-history"
    }
  }
}

# Arquivos de cache/build soltos, se existirem
$generatedPatterns = @("*.log","*.tmp","*.bak","*.old","*.zip")
foreach ($pattern in $generatedPatterns) {
  Get-ChildItem "." -File -Recurse -Filter $pattern -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "\\(\.git|backend\\target|frontend\\node_modules|frontend\\.next|_archive|_local-backups)\\" } |
    ForEach-Object {
      $rel = Resolve-Path -Relative $_.FullName
      Add-Candidate $candidates $rel "arquivo gerado/cache/backup ($pattern)" "generated"
    }
}

# ------------------------------------------------------------------
# Relatório
# ------------------------------------------------------------------
"# HERMES — Repo Cleanup Report" | Out-File -FilePath $report -Encoding UTF8
Add-Report ""
Add-Report "- Data: $(Get-Date)"
Add-Report "- ProjectRoot: `$ProjectRoot`"
Add-Report "- ArchiveRoot: `$archiveRoot`"
Add-Report "- Mode: $(if ($Apply) { 'APPLY' } else { 'DRY-RUN' })"
Add-Report ""
Add-Report "## Fontes principais mantidas"
Add-Report ""
foreach ($k in $keepExact) {
  if (Test-Path $k) { Add-Report "- KEEP: `$k`" }
}
Add-Report ""
Add-Report "## Candidatos encontrados"
Add-Report ""
Add-Report "| Path | Categoria | Decisão | Referenciado | Tracked | Motivo |"
Add-Report "|---|---|---|---:|---:|---|"
foreach ($c in $candidates.Values | Sort-Object Path) {
  Add-Report "| `$($c.Path)` | $($c.Category) | $($c.Decision) | $($c.Referenced) | $($c.Tracked) | $($c.Reason) |"
}

Write-Info "Candidatos: $($candidates.Count)"
Write-Info "Relatório: $report"

$dirty = git status --porcelain
if ($dirty -and -not $AllowDirty -and $Apply) {
  Write-Err "Há alterações não commitadas. Rode em DRY-RUN primeiro ou use -AllowDirty se souber o que está fazendo."
  git status --short
  exit 2
}

if (-not $Apply) {
  Write-Warn "DRY-RUN: nada foi movido. Leia o relatório e rode 02-APLICAR-LIMPEZA-SEGURA.bat para aplicar."
  exit 0
}

if (-not $SkipPrompt) {
  Write-Host ""
  Write-Warn "Modo APPLY vai mover arquivos candidatos para: $archiveRoot"
  Write-Warn "Arquivos referenciados ficam como REVIEW e NÃO serão movidos automaticamente."
  $answer = Read-Host "Digite LIMPAR para continuar"
  if ($answer -ne "LIMPAR") {
    Write-Warn "Cancelado pelo usuário."
    exit 0
  }
}

# ------------------------------------------------------------------
# Aplicar arquivo por arquivo
# ------------------------------------------------------------------
Add-Report ""
Add-Report "## Movimentações aplicadas"
Add-Report ""
Add-Report "| Origem | Destino | Método |"
Add-Report "|---|---|---|"

$moved = 0
$review = 0

foreach ($c in $candidates.Values | Sort-Object Path) {
  if ($c.Decision -ne "ARCHIVE") {
    $review++
    continue
  }

  $src = $c.Path
  if (-not (Test-Path $src)) { continue }

  $dest = Join-Path $archiveRoot $src
  $destDir = Split-Path $dest -Parent
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null

  if ($c.Tracked -and -not $NoGitMove) {
    Write-Info "git mv $src -> $dest"
    git mv -- "$src" "$dest"
    if ($LASTEXITCODE -ne 0) {
      Write-Warn "git mv falhou; tentando Move-Item: $src"
      Move-Item -Force $src $dest
      Add-Report "| `$src` | `$dest` | Move-Item fallback |"
    } else {
      Add-Report "| `$src` | `$dest` | git mv |"
    }
  } else {
    Write-Info "Move-Item $src -> $dest"
    Move-Item -Force $src $dest
    Add-Report "| `$src` | `$dest` | Move-Item |"
  }
  $moved++
}

Add-Report ""
Add-Report "## Resumo"
Add-Report ""
Add-Report "- Movidos para quarentena: $moved"
Add-Report "- Mantidos para revisão manual por referência/risco: $review"

Write-Ok "Movidos para quarentena: $moved"
Write-Warn "Mantidos para revisão manual: $review"

# ------------------------------------------------------------------
# Atualiza docs índice de limpeza
# ------------------------------------------------------------------
$summary = Join-Path $reportDir "HERMES-REPO-CLEANUP-LATEST.md"
Copy-Item -Force $report $summary

# ------------------------------------------------------------------
# Validação
# ------------------------------------------------------------------
if ($Validate) {
  Add-Report ""
  Add-Report "## Validação pós-limpeza"
  Run-Cmd "Git status" "git status --short" -IgnoreError | Out-Null
  if (Test-Path "backend\pom.xml") {
    Run-Cmd "Backend Maven verify" "cd /d `"$ProjectRoot\backend`" && mvn -U clean verify" -IgnoreError | Out-Null
  }
  if (Test-Path "frontend\package.json") {
    if (Test-Path "frontend\package-lock.json") {
      Run-Cmd "Frontend npm ci" "cd /d `"$ProjectRoot\frontend`" && npm ci" -IgnoreError | Out-Null
    } else {
      Run-Cmd "Frontend npm install" "cd /d `"$ProjectRoot\frontend`" && npm install --no-audit --no-fund" -IgnoreError | Out-Null
    }
    Run-Cmd "Frontend build" "cd /d `"$ProjectRoot\frontend`" && npm run build" -IgnoreError | Out-Null
  }
  if (Test-Path "docker-compose.yml") {
    Run-Cmd "Docker compose config" "cd /d `"$ProjectRoot`" && docker compose config" -IgnoreError | Out-Null
  }
}

Write-Ok "Limpeza segura concluída."
Write-Info "Relatório: $report"
Write-Info "Último relatório: $summary"
Write-Info "Quarentena: $archiveRoot"
Write-Host ""
Write-Warn "Nada foi deletado permanentemente. Os arquivos foram movidos para _archive para revisão."
Write-Warn "Para desfazer, use 03-RESTAURAR-ULTIMA-LIMPEZA.bat ou git restore/checkout antes de commit."
