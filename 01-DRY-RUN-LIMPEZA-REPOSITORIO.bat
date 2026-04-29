@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  Gal Atelier OS - DRY-RUN limpeza segura
echo ============================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\cleanup\gal-repo-cleanup-safe.ps1" -ProjectRoot "%PROJECT%"
pause
