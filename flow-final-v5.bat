@echo off
set GH_TOKEN=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

echo =============================================
echo FLUXO AUTOMÁTICO FINAL
echo =============================================

echo.
echo [1/4] Atualizando develop e release...
git checkout develop
git pull origin develop
git checkout release
git pull origin release

echo.
echo [2/4] Sincronizando release com develop...
git merge develop --no-edit
git push origin release
git checkout develop

echo.
echo [3/4] Criando PR develop -^> release...
gh pr create --base release --head develop --title "Promote: develop para release" --body "Automated PR"

echo.
echo [4/4] Criando PR release -^> main...
gh pr create --base main --head release --title "Promote: release para main" --body "Automated PR"

echo.
echo =============================================
echo PRs CRIADOS! Verifique no GitHub.
echo =============================================
echo.
echo Comandos para merge (quando checks passarem):
echo gh pr list --base release --head develop --json number --jq ".[0].number"
echo gh pr merge [NUMERO_PR_RELEASE] --squash
echo.
echo gh pr list --base main --head release --json number --jq ".[0].number"
echo gh pr merge [NUMERO_PR_MAIN] --squash
