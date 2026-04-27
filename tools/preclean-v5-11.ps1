param(
  [string]$TargetDrive = "K:",
  [switch]$Aggressive
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$TargetDrive = $TargetDrive.Trim().Trim('"').TrimEnd('\')
$BaseDev = Join-Path $TargetDrive "dev"
$ProjectRoot = Join-Path $BaseDev "repos\gal-atelier-os"
$LogRoot = Join-Path $BaseDev "logs"
$PrecleanLogRoot = Join-Path $LogRoot "preclean"
$BackupRoot = Join-Path $BaseDev "backups"
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
Ensure-Dir $PrecleanLogRoot
Ensure-Dir $BackupRoot

$LogFile = Join-Path $PrecleanLogRoot "preclean-v5-11-$Stamp.log"
$ReportFile = Join-Path $PrecleanLogRoot "preclean-v5-11-$Stamp.json"

Start-Transcript -Path $LogFile -Append | Out-Null

$Report = [ordered]@{
  timestamp = (Get-Date).ToString("o")
  targetDrive = $TargetDrive
  projectRoot = $ProjectRoot
  aggressive = [bool]$Aggressive
  killed = @()
  closedExplorerWindows = @()
  docker = @()
  ports = @()
  projectMove = $null
  status = "started"
  errors = @()
}

function Step([string]$Text) {
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor DarkGray
  Write-Host "==> $Text" -ForegroundColor Cyan
  Write-Host "============================================================" -ForegroundColor DarkGray
}

function Ok([string]$Text) { Write-Host "[OK] $Text" -ForegroundColor Green }
function Warn([string]$Text) { Write-Host "[AVISO] $Text" -ForegroundColor Yellow }
function Fail([string]$Text) { Write-Host "[ERRO] $Text" -ForegroundColor Red }

function Save-Report([string]$Status) {
  $Report.status = $Status
  $Report.finishedAt = (Get-Date).ToString("o")
  $Report | ConvertTo-Json -Depth 8 | Set-Content -Encoding UTF8 -Path $ReportFile
}

function Invoke-CmdLogged {
  param(
    [Parameter(Mandatory=$true)][string]$Command,
    [string]$Name = "cmd",
    [string]$WorkingDirectory = ""
  )

  $cmdLog = Join-Path $PrecleanLogRoot "$Name-$Stamp.log"
  $work = if ($WorkingDirectory) { $WorkingDirectory } else { $PWD.Path }
  $wrapped = if ($WorkingDirectory) {
    "cd /d `"$WorkingDirectory`" && $Command"
  } else {
    $Command
  }

  Write-Host "CMD: $wrapped"
  $output = & cmd.exe /d /s /c "$wrapped" 2>&1
  $exitCode = $LASTEXITCODE

  @(
    "COMMAND: $wrapped",
    "WORKDIR: $work",
    "EXIT: $exitCode",
    "",
    "OUTPUT:",
    ($output | Out-String)
  ) | Set-Content -Encoding UTF8 -Path $cmdLog

  if ($output) { $output | ForEach-Object { Write-Host $_ } }

  return [ordered]@{
    name = $Name
    command = $wrapped
    exitCode = $exitCode
    log = $cmdLog
  }
}

function Kill-Port([int]$Port) {
  Step "Liberando porta $Port"
  $lines = netstat -ano | Select-String ":$Port\s+.*LISTENING"
  foreach ($line in $lines) {
    $parts = ($line.ToString() -split "\s+") | Where-Object { $_ }
    $pid = $parts[-1]
    if ($pid -match "^\d+$" -and [int]$pid -ne $PID) {
      try {
        $proc = Get-Process -Id ([int]$pid) -ErrorAction SilentlyContinue
        if ($proc) {
          Stop-Process -Id ([int]$pid) -Force -ErrorAction SilentlyContinue
          $Report.ports += [ordered]@{ port = $Port; pid = [int]$pid; process = $proc.ProcessName; action = "killed" }
          Ok "Porta $Port liberada matando PID=$pid ($($proc.ProcessName))"
        }
      } catch {
        $Report.ports += [ordered]@{ port = $Port; pid = [int]$pid; action = "failed"; error = $_.Exception.Message }
        Warn "Falha ao liberar porta $Port PID=${pid}: $($_.Exception.Message)"
      }
    }
  }
}

function Close-ExplorerWindowsForProject {
  Step "Fechando janelas Explorer do projeto"
  try {
    $shell = New-Object -ComObject Shell.Application
    foreach ($window in $shell.Windows()) {
      try {
        $path = $window.Document.Folder.Self.Path
        if ($path -and $path.ToLower().StartsWith($ProjectRoot.ToLower())) {
          $Report.closedExplorerWindows += $path
          $window.Quit()
          Ok "Explorer fechado: $path"
        }
      } catch {}
    }
  } catch {
    Warn "Não consegui inspecionar Explorer: $($_.Exception.Message)"
  }
}

function Get-ProcessCommandLine {
  param([int]$ProcessId)
  try {
    $p = Get-CimInstance Win32_Process -Filter "ProcessId=$ProcessId" -ErrorAction SilentlyContinue
    if ($p) { return [string]$p.CommandLine }
  } catch {}
  return ""
}

function Stop-ProcessSafe {
  param(
    [Parameter(Mandatory=$true)]$Process,
    [string]$Reason = "cleanup"
  )

  if (-not $Process) { return }
  if ($Process.ProcessId -eq $PID -or $Process.ProcessId -eq $PID.ToString()) { return }

  try {
    $pid = [int]$Process.ProcessId
    $name = [string]$Process.Name
    $cmd = [string]$Process.CommandLine

    # Do not kill Docker Desktop itself; only containers/CLI are handled separately.
    if ($name -in @("Docker Desktop.exe", "Docker Desktop", "com.docker.backend.exe", "com.docker.backend")) {
      return
    }

    Write-Host "Matando PID=$pid NAME=$name MOTIVO=$Reason"
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    $Report.killed += [ordered]@{ pid = $pid; name = $name; reason = $Reason; commandLine = $cmd }
  } catch {
    $Report.errors += "Falha ao matar processo $($Process.ProcessId): $($_.Exception.Message)"
    Warn "Falha ao matar processo $($Process.ProcessId): $($_.Exception.Message)"
  }
}

function Kill-ProjectRelatedProcesses {
  Step "Kill first: processos ligados ao projeto"
  $patterns = @(
    "gal-atelier-os",
    "K:\dev\repos\gal-atelier-os",
    "localhost:3000",
    "localhost:8080",
    "spring-boot:run",
    "next dev"
  )

  $currentPid = $PID
  $processes = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue
  foreach ($p in $processes) {
    if ([int]$p.ProcessId -eq $currentPid) { continue }
    $cmd = [string]$p.CommandLine
    $name = [string]$p.Name
    $hit = $false

    foreach ($pattern in $patterns) {
      if ($cmd -and $cmd.ToLower().Contains($pattern.ToLower())) { $hit = $true }
    }

    if ($hit) {
      Stop-ProcessSafe -Process $p -Reason "command-line-match"
    }
  }
}

function Kill-AggressiveDevTools {
  if (-not $Aggressive) { return }

  Step "Kill first agressivo: IDEs e runtimes que costumam travar a pasta"
  $names = @(
    "idea64.exe",
    "idea.exe",
    "Code.exe",
    "opencode.exe",
    "node.exe",
    "java.exe",
    "bash.exe",
    "mintty.exe"
  )

  $processes = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue
  foreach ($p in $processes) {
    $name = [string]$p.Name
    if ($names -contains $name) {
      Stop-ProcessSafe -Process $p -Reason "aggressive-clean"
    }
  }
}

function Stop-DockerProject {
  Step "Limpando Docker Compose antigo"
  if (-not (Get-Command docker.exe -ErrorAction SilentlyContinue)) {
    Warn "docker.exe não encontrado no PATH; pulando Docker cleanup."
    return
  }

  if (Test-Path -LiteralPath (Join-Path $ProjectRoot "docker-compose.yml")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-compose-down" -WorkingDirectory $ProjectRoot -Command 'docker compose -p gal-atelier-os down --remove-orphans --rmi all -v'
  } else {
    Warn "docker-compose.yml antigo não existe no ProjectRoot; tentando limpeza por nome."
  }

  foreach ($container in @("gal-atelier-backend", "gal-atelier-frontend")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-rm-$container" -Command "docker rm -f $container"
  }

  foreach ($image in @("gal-atelier-os-backend", "gal-atelier-os-frontend", "gal-atelier-backend", "gal-atelier-frontend")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-rmi-$image" -Command "docker rmi -f $image"
  }
}

function Move-ProjectToBackup {
  Step "Movendo projeto antigo para backup"
  if (-not (Test-Path -LiteralPath $ProjectRoot)) {
    $Report.projectMove = [ordered]@{ existed = $false; action = "none" }
    Ok "ProjectRoot não existe. Nada para mover."
    return $true
  }

  $backupPath = Join-Path $BackupRoot "gal-atelier-os-preclean-v5-11-$Stamp"
  try {
    Move-Item -LiteralPath $ProjectRoot -Destination $backupPath -Force
    $Report.projectMove = [ordered]@{ existed = $true; action = "moved"; backupPath = $backupPath }
    Ok "Projeto antigo movido para: $backupPath"
    return $true
  } catch {
    Warn "Primeira tentativa de mover falhou: $($_.Exception.Message)"
    $Report.projectMove = [ordered]@{ existed = $true; action = "move-failed-first"; backupPath = $backupPath; error = $_.Exception.Message }
  }

  Kill-ProjectRelatedProcesses
  Kill-AggressiveDevTools
  Close-ExplorerWindowsForProject
  Start-Sleep -Seconds 3

  try {
    Move-Item -LiteralPath $ProjectRoot -Destination $backupPath -Force
    $Report.projectMove = [ordered]@{ existed = $true; action = "moved-after-kill"; backupPath = $backupPath }
    Ok "Projeto antigo movido após kill: $backupPath"
    return $true
  } catch {
    $Report.projectMove = [ordered]@{ existed = $true; action = "move-failed-final"; backupPath = $backupPath; error = $_.Exception.Message }
    $Report.errors += "ProjectRoot locked: $($_.Exception.Message)"
    Fail "Ainda não consegui liberar ${ProjectRoot}: $($_.Exception.Message)"
    return $false
  }
}

try {
  Step "Preclean V5.11"
  Write-Host "ProjectRoot: $ProjectRoot"
  Write-Host "LogFile:     $LogFile"
  Write-Host "ReportFile:  $ReportFile"

  Close-ExplorerWindowsForProject
  Kill-Port 3000
  Kill-Port 8080
  Kill-ProjectRelatedProcesses
  Kill-AggressiveDevTools
  Stop-DockerProject

  if (-not (Move-ProjectToBackup)) {
    Save-Report "failed-project-locked"
    exit 20
  }

  Save-Report "success"
  Ok "Preclean concluído. Relatório: $ReportFile"
  exit 0
} catch {
  $Report.errors += $_.Exception.Message
  Fail $_.Exception.Message
  Save-Report "failed"
  exit 1
} finally {
  Stop-Transcript | Out-Null
}
