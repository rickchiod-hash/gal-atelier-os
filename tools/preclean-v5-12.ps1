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

$LogFile = Join-Path $PrecleanLogRoot "preclean-v5-12-$Stamp.log"
$ReportFile = Join-Path $PrecleanLogRoot "preclean-v5-12-$Stamp.json"

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

  $cmdLog = Join-Path $PrecleanLogRoot "$Name-$Stamp.log"
  $work = if ($WorkingDirectory) { $WorkingDirectory } else { $PWD.Path }
  $wrapped = if ($WorkingDirectory) { "cd /d `"$WorkingDirectory`" && $Command" } else { $Command }

  Write-Host "CMD: $wrapped"

  # Native stderr can be promoted to ErrorRecord in some hosts. Force capture through cmd redirection.
  $tempOut = Join-Path $PrecleanLogRoot "$Name-$Stamp.tmp"
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

  $entry = [ordered]@{
    name = $Name
    command = $wrapped
    exitCode = $exitCode
    log = $cmdLog
  }

  if ($exitCode -ne 0 -and -not $NonBlocking) {
    Warn "$Name retornou exit code $exitCode. Continuando porque preclean não deve bloquear por cleanup externo. Log: $cmdLog"
  }

  return $entry
}

function Kill-Port([int]$Port) {
  Step "Liberando porta $Port"
  $lines = netstat -ano | Select-String ":$Port\s+.*LISTENING"
  foreach ($line in $lines) {
    $parts = ($line.ToString() -split "\s+") | Where-Object { $_ }
    $targetPidText = $parts[-1]
    if ($targetPidText -match "^\d+$" -and [int]$targetPidText -ne $PID) {
      try {
        $targetProcess = Get-Process -Id ([int]$targetPidText) -ErrorAction SilentlyContinue
        if ($targetProcess) {
          Stop-Process -Id ([int]$targetPidText) -Force -ErrorAction SilentlyContinue
          $Report.ports += [ordered]@{ port = $Port; pid = [int]$targetPidText; process = $targetProcess.ProcessName; action = "killed" }
          Ok "Porta $Port liberada matando PID=$targetPidText ($($targetProcess.ProcessName))"
        }
      } catch {
        $Report.ports += [ordered]@{ port = $Port; pid = [int]$targetPidText; action = "failed"; error = $_.Exception.Message }
        Warn "Falha ao liberar porta $Port PID=${targetPidText}: $($_.Exception.Message)"
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

function Stop-ProcessSafe {
  param(
    [Parameter(Mandatory=$true)]$ProcessInfo,
    [string]$Reason = "cleanup"
  )

  if (-not $ProcessInfo) { return }
  $targetProcessId = [int]$ProcessInfo.ProcessId
  if ($targetProcessId -eq $PID) { return }

  try {
    $processName = [string]$ProcessInfo.Name
    $commandLine = [string]$ProcessInfo.CommandLine

    if ($processName -in @("Docker Desktop.exe", "Docker Desktop", "com.docker.backend.exe", "com.docker.backend")) {
      return
    }

    Write-Host "Matando PID=$targetProcessId NAME=$processName MOTIVO=$Reason"
    Stop-Process -Id $targetProcessId -Force -ErrorAction SilentlyContinue
    $Report.killed += [ordered]@{ pid = $targetProcessId; name = $processName; reason = $Reason; commandLine = $commandLine }
  } catch {
    $msg = "Falha ao matar processo $($ProcessInfo.ProcessId): $($_.Exception.Message)"
    $Report.errors += $msg
    Warn $msg
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

  $currentProcessId = $PID
  $processes = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue
  foreach ($processInfo in $processes) {
    if ([int]$processInfo.ProcessId -eq $currentProcessId) { continue }
    $commandLine = [string]$processInfo.CommandLine
    $hit = $false

    foreach ($pattern in $patterns) {
      if ($commandLine -and $commandLine.ToLower().Contains($pattern.ToLower())) { $hit = $true }
    }

    if ($hit) {
      Stop-ProcessSafe -ProcessInfo $processInfo -Reason "command-line-match"
    }
  }
}

function Kill-AggressiveDevTools {
  if (-not $Aggressive) { return }

  Step "Kill first agressivo: IDEs e runtimes que costumam travar a pasta"
  $names = @("idea64.exe", "idea.exe", "Code.exe", "opencode.exe", "node.exe", "java.exe", "bash.exe", "mintty.exe")
  $processes = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue
  foreach ($processInfo in $processes) {
    $processName = [string]$processInfo.Name
    if ($names -contains $processName) {
      Stop-ProcessSafe -ProcessInfo $processInfo -Reason "aggressive-clean"
    }
  }
}

function Start-DockerDesktopIfNeeded {
  Step "Validando Docker Engine para cleanup"
  if (-not (Get-Command docker.exe -ErrorAction SilentlyContinue)) {
    Warn "docker.exe não encontrado no PATH; pulando Docker cleanup."
    return $false
  }

  $info = Invoke-CmdLogged -Name "docker-info-preclean" -Command "docker info" -NonBlocking
  $Report.docker += $info
  if ($info.exitCode -eq 0) {
    Ok "Docker Engine respondeu."
    return $true
  }

  Warn "Docker Engine não respondeu. Tentando abrir Docker Desktop e aguardar brevemente."
  foreach ($candidate in @("K:\Docker\DockerDesktop\Docker Desktop.exe", "C:\Program Files\Docker\Docker\Docker Desktop.exe", "$env:LocalAppData\Docker\Docker Desktop.exe")) {
    if (Test-Path -LiteralPath $candidate) {
      try {
        Start-Process -FilePath $candidate -ErrorAction SilentlyContinue
        Ok "Docker Desktop acionado: $candidate"
        Start-Sleep -Seconds 15
        $info2 = Invoke-CmdLogged -Name "docker-info-after-start-preclean" -Command "docker info" -NonBlocking
        $Report.docker += $info2
        if ($info2.exitCode -eq 0) { return $true }
      } catch {
        Warn "Falha ao acionar Docker Desktop: $($_.Exception.Message)"
      }
      break
    }
  }

  Warn "Docker Engine indisponível. Preclean continuará sem bloquear. O orquestrador principal tentará validar/subir Docker depois."
  return $false
}

function Stop-DockerProject {
  Step "Limpando Docker Compose antigo"
  $dockerReady = Start-DockerDesktopIfNeeded
  if (-not $dockerReady) { return }

  if (Test-Path -LiteralPath (Join-Path $ProjectRoot "docker-compose.yml")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-compose-down" -WorkingDirectory $ProjectRoot -Command 'docker compose -p gal-atelier-os down --remove-orphans --rmi all -v' -NonBlocking
  } else {
    Warn "docker-compose.yml antigo não existe no ProjectRoot; tentando limpeza por nome."
  }

  foreach ($container in @("gal-atelier-backend", "gal-atelier-frontend")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-rm-$container" -Command "docker rm -f $container" -NonBlocking
  }

  foreach ($image in @("gal-atelier-os-backend", "gal-atelier-os-frontend", "gal-atelier-backend", "gal-atelier-frontend")) {
    $Report.docker += Invoke-CmdLogged -Name "docker-rmi-$image" -Command "docker rmi -f $image" -NonBlocking
  }
}

function Move-ProjectToBackup {
  Step "Movendo projeto antigo para backup"
  if (-not (Test-Path -LiteralPath $ProjectRoot)) {
    $Report.projectMove = [ordered]@{ existed = $false; action = "none" }
    Ok "ProjectRoot não existe. Nada para mover."
    return $true
  }

  $backupPath = Join-Path $BackupRoot "gal-atelier-os-preclean-v5-12-$Stamp"
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
  Step "Preclean V5.12"
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
