@echo off
cd /d K:\dev\repos\gal-atelier-os
docker compose -p gal-atelier-os down --remove-orphans --rmi all -v
docker rm -f gal-atelier-backend gal-atelier-frontend
docker rmi -f gal-atelier-os-backend gal-atelier-os-frontend gal-atelier-backend gal-atelier-frontend
pause
