@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  Gal Atelier OS - RESTAURAR ultima limpeza
echo ============================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\cleanup\restore-last-cleanup.ps1" -ProjectRoot "%PROJECT%"
pause
