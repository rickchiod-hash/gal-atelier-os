@echo off
setlocal
cd /d K:\dev\repos\gal-atelier-os
docker compose -p gal-atelier-os down --remove-orphans
docker compose -p gal-atelier-os build --no-cache
docker compose -p gal-atelier-os up -d --force-recreate --remove-orphans
start "" http://localhost:3000
start "" http://localhost:8080/api/health
pause
