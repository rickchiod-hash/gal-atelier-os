@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

if not exist "%PROJECT%" (
  echo [ERRO] Projeto nao encontrado: %PROJECT%
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\local-opencode-3s\scripts\ABRIR-3-SESSOES-OPENCODE-AUTO.ps1" -ProjectRoot "%PROJECT%"
