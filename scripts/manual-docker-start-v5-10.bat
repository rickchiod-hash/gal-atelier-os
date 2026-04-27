@echo off
setlocal EnableExtensions
chcp 65001 >nul

set "PROJECT=K:\dev\repos\gal-atelier-os"
cd /d "%PROJECT%"

echo [1/5] Limpando stack antiga...
docker compose -p gal-atelier-os down --remove-orphans --rmi all -v

echo [2/5] Build sem cache...
docker compose -p gal-atelier-os build --no-cache
if errorlevel 1 goto erro

echo [3/5] Subindo containers...
docker compose -p gal-atelier-os up -d --force-recreate --remove-orphans
if errorlevel 1 goto erro

echo [4/5] Status...
docker compose -p gal-atelier-os ps

echo [5/5] Abrindo navegador...
start "" http://localhost:3000
start "" http://localhost:8080/api/health

echo [OK] Veja o Docker Desktop. Devem aparecer gal-atelier-backend e gal-atelier-frontend.
pause
exit /b 0

:erro
echo [ERRO] Falhou. Rode:
echo docker compose -p gal-atelier-os logs --tail=200
pause
exit /b 1
