@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-Process cmd,powershell,pwsh,bash,mintty,WindowsTerminal -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like '*Gal Atelier*' -or $_.MainWindowTitle -like '*OpenCode Big Pickle*' -or $_.MainWindowTitle -like '*gal-atelier-os*' } | ForEach-Object { try { $_.CloseMainWindow() | Out-Null; Start-Sleep -Milliseconds 800; if (-not $_.HasExited) { Stop-Process -Id $_.Id -Force } } catch {} }"
pause
