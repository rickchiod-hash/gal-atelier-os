@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"

echo ============================================================
echo  ATHENA - Aplicar CI Autofix V3
echo ============================================================

if not exist "%PROJECT%\.git" (
  echo [ERRO] Projeto nao encontrado: %PROJECT%
  pause
  exit /b 1
)

cd /d "%PROJECT%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\athena\athena-ci-autofix.ps1" -ProjectRoot "%PROJECT%" -Apply -Validate

echo.
echo Proximo passo sugerido:
echo   git diff --stat
echo   git status --short
echo   git add frontend/.eslintrc.json frontend/components/CatalogSection.tsx backend/pom.xml .github/workflows docs/athena _archive
echo   git commit -m "fix(ci): stabilize github actions eslint and frontend types"
echo   git push origin feature/tests-docs-ci
echo.
pause
