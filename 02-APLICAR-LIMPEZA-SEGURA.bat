@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  Gal Atelier OS - APLICAR limpeza segura + validacao
echo ============================================================
echo.
echo ATENCAO:
echo - O script NAO deleta permanente.
echo - Ele move candidatos para _archive\repo-cleanup-YYYYMMDD-HHMMSS.
echo - Arquivos referenciados ficam para revisao manual.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\cleanup\gal-repo-cleanup-safe.ps1" -ProjectRoot "%PROJECT%" -Apply -Validate
pause
