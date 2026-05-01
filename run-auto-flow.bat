@echo off
set GH_TOKEN=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"

echo ===============================================
echo Running Automated CI/CD Flow for PR #44
echo ===============================================

powershell -ExecutionPolicy Bypass -File auto-flow-pr44.ps1

echo.
echo Flow completed! Check GitHub for results.
