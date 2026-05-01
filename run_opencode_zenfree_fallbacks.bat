@echo off
setlocal EnableDelayedExpansion

if "%~1"=="" (
  echo Uso: run_opencode_zenfree_fallbacks.bat PERFIL "PROMPT"
  echo Perfis: hermes, athena, venus, actions, kotlin, frontend
  exit /b 2
)

set "PROFILE=%~1"
shift
set "PROMPT=%*"
set "AGENT=hermes"
set "MODELS="

if /I "%PROFILE%"=="hermes" (
  set "AGENT=hermes"
  set "MODELS=opencode/big-pickle;opencode/minimax-m2.5-free;opencode/hy3-preview-free;opencode/nemotron-3-super-free;opencode/ling-2.6-flash;opencode/gpt-5-nano"
)
if /I "%PROFILE%"=="athena" (
  set "AGENT=athena"
  set "MODELS=opencode/minimax-m2.5-free;opencode/nemotron-3-super-free;opencode/big-pickle;opencode/hy3-preview-free;opencode/ling-2.6-flash;opencode/gpt-5-nano"
)
if /I "%PROFILE%"=="venus" (
  set "AGENT=venus"
  set "MODELS=opencode/ling-2.6-flash;opencode/hy3-preview-free;opencode/minimax-m2.5-free;opencode/big-pickle;opencode/nemotron-3-super-free;opencode/gpt-5-nano"
)
if /I "%PROFILE%"=="actions" (
  set "AGENT=athena"
  set "MODELS=opencode/minimax-m2.5-free;opencode/nemotron-3-super-free;opencode/big-pickle;opencode/hy3-preview-free;opencode/ling-2.6-flash;opencode/gpt-5-nano"
)
if /I "%PROFILE%"=="kotlin" (
  set "AGENT=kotlin-backend"
  set "MODELS=opencode/big-pickle;opencode/minimax-m2.5-free;opencode/nemotron-3-super-free;opencode/hy3-preview-free;opencode/ling-2.6-flash;opencode/gpt-5-nano"
)
if /I "%PROFILE%"=="frontend" (
  set "AGENT=frontend-next"
  set "MODELS=opencode/ling-2.6-flash;opencode/hy3-preview-free;opencode/minimax-m2.5-free;opencode/big-pickle;opencode/nemotron-3-super-free;opencode/gpt-5-nano"
)

if "%MODELS%"=="" (
  echo Perfil desconhecido: %PROFILE%
  exit /b 2
)

echo Perfil: %PROFILE%
echo Agent: %AGENT%
echo Regra: somente modelos OpenCode Zen/definidos no OpenCode. Ollama removido.

for %%M in ("%MODELS:;=" "%") do (
  set "MODEL=%%~M"
  echo ==========================================================
  echo Tentando modelo: !MODEL!
  echo ==========================================================
  opencode run --model "!MODEL!" --agent "%AGENT%" --dangerously-skip-permissions "%PROMPT%"
  if not errorlevel 1 exit /b 0
)

exit /b 1
