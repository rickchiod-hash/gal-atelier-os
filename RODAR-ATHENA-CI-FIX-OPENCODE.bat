@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  ATHENA - Abrir OpenCode para CI Fix V3
echo ============================================================

if not exist "%PROJECT%\.git" (
  echo [ERRO] Projeto nao encontrado: %PROJECT%
  pause
  exit /b 1
)

cd /d "%PROJECT%"
start "ATHENA CI FIX V3" cmd /k "cd /d %PROJECT% && opencode --agent ATHENA --model opencode/minimax-m2.5-free --prompt /ATHENA-CI-FIX"

echo Aberto. Se o prompt nao executar automaticamente, cole:
echo   /ATHENA-CI-FIX
pause
