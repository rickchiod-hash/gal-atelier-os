@echo off
setlocal EnableExtensions
chcp 65001 >nul

echo Validando OpenCode...
where opencode
opencode --version
if errorlevel 1 (
  echo [ERRO] OpenCode nao respondeu.
  exit /b 1
)
echo [OK] OpenCode funcional.
pause
