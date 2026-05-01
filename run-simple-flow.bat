@echo off
set GH_TOKEN=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

echo ==============================================
echo FLUXO AUTOMÁTICO SIMPLES
echo ==============================================

echo.
echo [1/4] Atualizando develop...
git checkout develop
git pull origin develop

echo.
echo [2/4] Criando commit de sincronizacao se necessario...
git checkout release
git merge develop --no-edit
git push origin release
git checkout develop

echo.
echo [3/4] Criando PR develop - release...
gh pr create --base release --head develop --title "Promote to Release" --body "Automated PR from develop to release."

echo.
echo [4/4] Criando PR release - main...
gh pr create --base main --head release --title "Promote to Main" --body "Automated PR from release to main."

echo.
echo ==============================================
echo FLUXO CONCLUÍDO!
echo ==============================================
echo.
echo Verifique os PRs no GitHub e faca merge quando os checks passarem.
