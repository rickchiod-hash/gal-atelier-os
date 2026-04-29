@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"
if not exist "%PROJECT%\.git" (echo [ERRO] Projeto nao encontrado: %PROJECT% & pause & exit /b 1)
cd /d "%PROJECT%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\athena\athena-pr-flow-autofix.ps1" -ProjectRoot "%PROJECT%"
pause
