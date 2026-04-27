@echo off
setlocal EnableExtensions
chcp 65001 >nul

set "SCRIPT=K:\dev\repos\gal-atelier-os\tools\preclean-v5-12.ps1"
if exist "%SCRIPT%" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%" -TargetDrive "K:" -Aggressive
) else (
  echo Use o preclean do pacote extraido: tools\preclean-v5-12.ps1
)
pause
