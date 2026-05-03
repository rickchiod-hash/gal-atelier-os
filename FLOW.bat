@echo off%
set GH_TOKEN=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%

echo =============================================%
echo FLUXO AUTOMÁTICO FINAL%
echo =============================================%

echo.%
echo [1/5] Atualizando develop e release...%
git checkout develop%
git pull origin develop%
git checkout release%
git pull origin release%

echo.%
echo [2/5] Sincronizando release com develop...%
git merge develop --no-edit%
git push origin release%
git checkout develop%

echo.%
echo [3/5] Criando PR develop -^> release...%
gh pr create --base release --head develop --title "Promote: develop para release" --body "Automated PR"%

echo.%
echo [4/5] Criando PR release -^> main...%
gh pr create --base main --head release --title "Promote: release para main" --body "Automated PR"%

echo.%
echo =============================================%
echo PRs CRIADOS! Verifique no GitHub.%
echo =============================================%
echo.%
echo Comandos para merge (quando checks passarem):%
echo gh pr merge [NUMERO] --squash%
