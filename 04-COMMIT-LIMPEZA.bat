@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

cd /d "%PROJECT%"

echo ============================================================
echo  Gal Atelier OS - COMMIT limpeza segura
echo ============================================================
git status --short
echo.
echo Revise o status acima.
echo.
set /p MSG="Mensagem de commit [chore(cleanup): archive obsolete repository files]: "
if "%MSG%"=="" set "MSG=chore(cleanup): archive obsolete repository files"

set /p CONFIRM="Digite COMMIT para continuar: "
if /I not "%CONFIRM%"=="COMMIT" (
  echo Cancelado.
  pause
  exit /b 0
)

git add .
git commit -m "%MSG%"
git status --short
pause
