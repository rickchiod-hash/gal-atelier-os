@echo off
set GH_TOKEN=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

echo ==============================================
echo FLUXO AUTOMÁTICO - VERSÃO SIMPLES
echo ==============================================

echo.
echo [1/3] Atualizando develop e release...
git checkout develop
git pull origin develop
git checkout release
git pull origin release
git merge develop --no-edit
git push origin release
git checkout develop

echo.
echo [2/3] Criando PR develop - release...
gh pr create --base release --head develop --title "Promote: develop para release" --body "Automated PR"

echo.
echo [3/3] Criando PR release - main...
gh pr create --base main --head release --title "Promote: release para main" --body "Automated PR"

echo.
echo ==============================================
echo PRs CRIADOS!
echo ==============================================
echo.
echo Faca merge quando os checks passarem:
echo gh pr merge [NUMERO_PR] --squash
