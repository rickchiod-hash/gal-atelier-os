@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"
if not exist "%PROJECT%\.git" (echo [ERRO] Projeto nao encontrado: %PROJECT% & pause & exit /b 1)
cd /d "%PROJECT%"
start "ATHENA PR FLOW V4" cmd /k "cd /d %PROJECT% && opencode --agent ATHENA --model opencode/minimax-m2.5-free --prompt /ATHENA-PR-FLOW"
echo Aberto. Se nao executar automatico, cole: /ATHENA-PR-FLOW
pause
