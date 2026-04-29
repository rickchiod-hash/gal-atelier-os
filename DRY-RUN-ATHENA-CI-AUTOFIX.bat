@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  ATHENA - DRY RUN CI Autofix V3
echo ============================================================

if not exist "%PROJECT%\.git" (
  echo [ERRO] Projeto nao encontrado: %PROJECT%
  pause
  exit /b 1
)

cd /d "%PROJECT%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\athena\athena-ci-autofix.ps1" -ProjectRoot "%PROJECT%"
pause
