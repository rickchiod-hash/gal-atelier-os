@echo off
cd /d K:\dev\repos\gal-atelier-os\backend
mvn clean verify
start "" "K:\dev\repos\gal-atelier-os\backend\target\site\jacoco\index.html"
pause
