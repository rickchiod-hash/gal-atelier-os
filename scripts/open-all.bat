@echo off
setlocal
set "PROJECT=K:\dev\repos\gal-atelier-os"

start "" explorer "%PROJECT%"
if exist "K:\Apps\JetBrains\IntelliJ IDEA Community\bin\idea64.exe" start "" "K:\Apps\JetBrains\IntelliJ IDEA Community\bin\idea64.exe" "%PROJECT%"
where code >nul 2>nul && code --reuse-window "%PROJECT%"
start "" http://localhost:3000
start "" http://localhost:8080/api/health
if exist "%PROJECT%\backend\target\site\jacoco\index.html" start "" "%PROJECT%\backend\target\site\jacoco\index.html"
where opencode >nul 2>nul && start "OpenCode Big Pickle - Gal Atelier" cmd /k "cd /d %PROJECT% && echo Selecione Big Pickle se estiver disponivel. && opencode"
pause
