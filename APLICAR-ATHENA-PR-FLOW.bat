@echo off
setlocal EnableExtensions
chcp 65001 >nul
set "PROJECT=K:\dev\repos\gal-atelier-os"
if not exist "%PROJECT%\.git" (echo [ERRO] Projeto nao encontrado: %PROJECT% & pause & exit /b 1)
cd /d "%PROJECT%"
powershell -NoProfile -ExecutionPolicy Bypass -File "%PROJECT%\tools\athena\athena-pr-flow-autofix.ps1" -ProjectRoot "%PROJECT%" -Apply -Validate
echo.
echo Proximo passo:
echo   git diff --stat
echo   git status --short
echo   git add .github docs/athena tools/athena frontend/.eslintrc.json frontend/components/CatalogSection.tsx backend/pom.xml _archive
echo   git commit -m "ci: add mature pr promotion flow with copilot review"
echo   git push origin feature/tests-docs-ci
pause
