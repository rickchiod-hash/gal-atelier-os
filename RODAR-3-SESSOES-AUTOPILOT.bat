@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ATENCAO: modo autopilot usa opencode run.
echo Se o OpenCode pedir permissao de edit/bash, a execucao pode parar.
echo Para uso normal, prefira ABRIR-3-SESSOES-OPENCODE-AUTO.bat
echo.
pause

powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\local-opencode-3s\scripts\RODAR-3-SESSOES-AUTOPILOT.ps1" -ProjectRoot "%PROJECT%"
