param(
  [string]$TargetDrive = "K:",
  [switch]$SkipPreclean,
  [switch]$SkipAgents
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$TargetDrive = $TargetDrive.Trim().Trim('"').TrimEnd('\')
$BaseDev = Join-Path $TargetDrive "dev"
$ProjectRoot = Join-Path $BaseDev "repos\gal-atelier-os"
$LogRoot = Join-Path $BaseDev "logs"
$RunAllLogRoot = Join-Path $LogRoot "run-all"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"

function Ensure-Dir([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

if (-not (Test-Path -LiteralPath "$TargetDrive\")) {
  Write-Host "[ERRO] Disco $TargetDrive nao encontrado." -ForegroundColor Red
  exit 10
}

Ensure-Dir $BaseDev
Ensure-Dir $LogRoot
Ensure-Dir $RunAllLogRoot

$LogFile = Join-Path $RunAllLogRoot "run-all-v5-$Stamp.log"
$ReportFile = Join-Path $RunAllLogRoot "run-all-v5-$Stamp.json"

Start-Transcript -Path $LogFile -Append | Out-Null

$Report = [ordered]@{
  timestamp = (Get-Date).ToString("o")
  targetDrive = $TargetDrive
  projectRoot = $ProjectRoot
  skipPreclean = [bool]$SkipPreclean
  skipAgents = [bool]$SkipAgents
  phases = @{}
  status = "started"
  errors = @()
  warnings = @()
}

function Step([string]$Text) {
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor DarkGray
  Write-Host "==> $Text" -ForegroundColor Cyan
  Write-Host "============================================================" -ForegroundColor DarkGray
}

function Ok([string]$Text) { Write-Host "[OK] $Text" -ForegroundColor Green }
function Warn([string]$Text) {
  Write-Host "[AVISO] $Text" -ForegroundColor Yellow
  $Report.warnings += $Text
}
function Fail([string]$Text) {
  Write-Host "[ERRO] $Text" -ForegroundColor Red
  $Report.errors += $Text
}

function Save-Report([string]$Status) {
  $Report.status = $Status
  $Report.finishedAt = (Get-Date).ToString("o")
  $Report | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 -Path $ReportFile
}

function Invoke-CmdLogged {
  param(
    [Parameter(Mandatory=$true)][string]$Command,
    [string]$Name = "cmd",
    [string]$WorkingDirectory = "",
    [switch]$NonBlocking
  )

  $cmdLog = Join-Path $RunAllLogRoot "$Name-$Stamp.log"
  $work = if ($WorkingDirectory) { $WorkingDirectory } else { $PWD.Path }
  $wrapped = if ($WorkingDirectory) { "cd /d `"$WorkingDirectory`" && $Command" } else { $Command }

  Write-Host "CMD: $wrapped"

  $tempOut = Join-Path $RunAllLogRoot "$Name-$Stamp.tmp"
  & cmd.exe /d /s /c "$wrapped > `"$tempOut`" 2>&1"
  $exitCode = $LASTEXITCODE
  $output = if (Test-Path -LiteralPath $tempOut) { Get-Content -LiteralPath $tempOut -Raw -ErrorAction SilentlyContinue } else { "" }

  @(
    "COMMAND: $wrapped",
    "WORKDIR: $work",
    "EXIT: $exitCode",
    "",
    "OUTPUT:",
    $output
  ) | Set-Content -Encoding UTF8 -Path $cmdLog

  if ($output) { Write-Host $output }

  try { Remove-Item -LiteralPath $tempOut -Force -ErrorAction SilentlyContinue } catch {}

  if ($exitCode -ne 0 -and -not $NonBlocking) {
    Fail "$Name retornou exit code $exitCode. Log: $cmdLog"
    throw "Command failed: $Name"
  }

  return [ordered]@{
    name = $Name
    command = $wrapped
    exitCode = $exitCode
    log = $cmdLog
  }
}

function Invoke-DockerCompose {
  param(
    [Parameter(Mandatory=$true)][string]$Command,
    [string]$Name = "docker-compose"
  )

  Step $Name
  $result = Invoke-CmdLogged -Name $Name -WorkingDirectory $ProjectRoot -Command "docker compose $Command"
  $Report.phases.$Name = $result
  return $result
}

function Wait-For-Healthy {
  param(
    [string]$Service,
    [int]$Port,
    [int]$Retries = 30,
    [int]$Interval = 5
  )

  Step "Aguardando $Service (porta $Port) ficar saudavel"

  for ($i = 1; $i -le $Retries; $i++) {
    Write-Host "[$i/$Retries] Verificando $Service..."
    $conn = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($conn.TcpTestSucceeded) {
      Ok "$Service respondendo na porta $Port"
      return $true
    }
    Start-Sleep -Seconds $Interval
  }

  Fail "$Service nao ficou saudavel apos $Retries retries"
  return $false
}

function Validate-Backend {
  Step "Validando backend"

  try {
    $res = Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method GET -TimeoutSec 10
    Ok "Backend saudavel: $($res | ConvertTo-Json -Compress)"
    $Report.phases.ValidateBackend = @{ status = "ok"; response = $res }
    return $true
  } catch {
    Fail "Backend health falhou: $($_.Exception.Message)"
    $Report.phases.ValidateBackend = @{ status = "failed"; error = $_.Exception.Message }
    return $false
  }
}

function Validate-Frontend {
  Step "Validando frontend"

  try {
    $res = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 10 -UseBasicParsing
    if ($res.StatusCode -eq 200) {
      Ok "Frontend respondendo com status $($res.StatusCode)"
      $Report.phases.ValidateFrontend = @{ status = "ok"; statusCode = $res.StatusCode }
      return $true
    }
    Fail "Frontend status: $($res.StatusCode)"
    $Report.phases.ValidateFrontend = @{ status = "failed"; statusCode = $res.StatusCode }
    return $false
  } catch {
    Fail "Frontend health falhou: $($_.Exception.Message)"
    $Report.phases.ValidateFrontend = @{ status = "failed"; error = $_.Exception.Message }
    return $false
  }
}

function Run-Agents {
  Step "Executando agents de analise"
  $agentsResult = @()

  try {
    Write-Host "Executando analise de arquitetura..."
    $archResult = Invoke-CmdLogged -Name "agent-arquitetura" -WorkingDirectory $ProjectRoot -Command "opencode analyze arquitetura"
    $agentsResult += $archResult
  } catch {
    Warn "Agent arquitetura falhou ou nao disponivel"
  }

  try {
    Write-Host "Executando analise de codigo..."
    $codeResult = Invoke-CmdLogged -Name "agent-codigo" -WorkingDirectory $ProjectRoot -Command "opencode analyze code"
    $agentsResult += $codeResult
  } catch {
    Warn "Agent codigo falhou ou nao disponivel"
  }

  $Report.phases.Agents = $agentsResult
}

try {
  Step "Run All V5 - Gal Atelier OS"
  Write-Host "ProjectRoot: $ProjectRoot"
  Write-Host "LogFile:     $LogFile"
  Write-Host "ReportFile:  $ReportFile"
  Write-Host ""

  # ============================================================
  # FASE 1: Preclean (opcional)
  # ============================================================
  if (-not $SkipPreclean) {
    Step "FASE 1: Preclean"
    $precleanScript = Join-Path $ProjectRoot "tools\preclean-v5-12.ps1"
    if (Test-Path -LiteralPath $precleanScript) {
      & $precleanScript -TargetDrive $TargetDrive
      $Report.phases.Preclean = @{ status = "done" }
    } else {
      Warn "Preclean script nao encontrado: $precleanScript"
      $Report.phases.Preclean = @{ status = "skipped" }
    }
  } else {
    Step "FASE 1: Preclean (pulado)"
    $Report.phases.Preclean = @{ status = "skipped" }
  }

  # ============================================================
  # FASE 2: Install
  # ============================================================
  Step "FASE 2: Install - Dependencias"

  Step "Install backend (Maven)"
  Invoke-CmdLogged -Name "backend-maven-build" -WorkingDirectory (Join-Path $ProjectRoot "backend") -Command "mvn clean install -DskipTests"
  $Report.phases.InstallBackend = @{ status = "done" }

  Step "Install frontend (npm)"
  Invoke-CmdLogged -Name "frontend-npm-install" -WorkingDirectory (Join-Path $ProjectRoot "frontend") -Command "npm install"
  $Report.phases.InstallFrontend = @{ status = "done" }

  # ============================================================
  # FASE 3: Build Docker
  # ============================================================
  Step "FASE 3: Build Docker Images"
  Invoke-DockerCompose -Command "build"
  $Report.phases.BuildDocker = @{ status = "done" }

  # ============================================================
  # FASE 4: Run
  # ============================================================
  Step "FASE 4: Run Docker Compose"
  Invoke-DockerCompose -Command "up -d"
  $Report.phases.RunDocker = @{ status = "done" }

  # ============================================================
  # FASE 5: Validate
  # ============================================================
  Step "FASE 5: Validacao"

  $backendHealthy = Wait-For-Healthy -Service "Backend" -Port 8080 -Retries 36 -Interval 5
  if (-not $backendHealthy) {
    Fail "Backend nao ficou saudavel"
    Save-Report "failed-backend"
    exit 30
  }

  Validate-Backend

  $frontendHealthy = Wait-For-Healthy -Service "Frontend" -Port 3000 -Retries 20 -Interval 3
  if (-not $frontendHealthy) {
    Fail "Frontend nao ficou saudavel"
    Save-Report "failed-frontend"
    exit 31
  }

  Validate-Frontend

  # ============================================================
  # FASE 6: Agents (opcional)
  # ============================================================
  if (-not $SkipAgents) {
    Step "FASE 6: Agents"
    Run-Agents
  } else {
    Step "FASE 6: Agents (pulado)"
  }

  # ============================================================
  # SUCESSO
  # ============================================================
  Save-Report "success"
  Ok "Run All concluído com sucesso!"
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor Green
  Write-Host "  Backend:  http://localhost:8080" -ForegroundColor White
  Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
  Write-Host "  Logs:     $RunAllLogRoot" -ForegroundColor White
  Write-Host "  Report:   $ReportFile" -ForegroundColor White
  Write-Host "============================================================" -ForegroundColor Green
  exit 0

} catch {
  $Report.errors += $_.Exception.Message
  Fail $_.Exception.Message
  Save-Report "failed"
  exit 1
} finally {
  Stop-Transcript | Out-Null
}