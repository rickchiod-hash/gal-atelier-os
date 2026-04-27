@echo off
setlocal
set "LOGDIR=K:\dev\logs"
set "ARCHIVE=%LOGDIR%\archive\manual-%date:~-4%%date:~3,2%%date:~0,2%-%time:~0,2%%time:~3,2%%time:~6,2%"
set "ARCHIVE=%ARCHIVE: =0%"
mkdir "%ARCHIVE%" 2>nul
move "%LOGDIR%\gal-atelier*.log" "%ARCHIVE%" 2>nul
move "%LOGDIR%\docker-wsl*.log" "%ARCHIVE%" 2>nul
echo Logs movidos para %ARCHIVE%
pause
