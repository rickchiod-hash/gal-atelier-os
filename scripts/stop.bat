@echo off
cd /d K:\dev\repos\gal-atelier-os
docker compose down --remove-orphans
for %%P in (3000 8080) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do taskkill /PID %%A /F
)
pause
