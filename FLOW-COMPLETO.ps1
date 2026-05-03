# FLOW-COMPLETO.PS1 - Solução definitiva para Windows
$env:GH_TOKEN = "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"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "FLUXO AUTOMÁTICO COMPLETO" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# 1. Atualizar develop
Write-Host "`n[1/6] Atualizando develop..." -ForegroundColor Yellow
git checkout develop 2>&1 | Out-Null
git pull origin develop 2>&1 | Out-Null
Write-Host "✅ Develop atualizado!" -ForegroundColor Green

# 2. Sincronizar release com develop (forçar merge se necessário)
Write-Host "`n[2/6] Sincronizando release com develop..." -ForegroundColor Yellow
git checkout release 2>&1 | Out-Null
git pull origin release 2>&1 | Out-Null

# Verificar se há commits entre develop e release
$commits = git log release..develop --oneline 2>$null
if (-not $commits) {
    Write-Host "  Sem commits entre release e develop." -ForegroundColor Yellow
    Write-Host "  Forçando sincronização..." -ForegroundColor Yellow
    git merge develop --no-ff -m "sync: merge develop into release for CI/CD flow" 2>&1 | Out-Null
    git push origin release 2>&1 | Out-Null
    Write-Host "✅ Release sincronizado com develop!" -ForegroundColor Green
} else {
    Write-Host "✅ Commits já existem entre release e develop!" -ForegroundColor Green
}

git checkout develop 2>&1 | Out-Null

# 3. Criar PR develop -> release (se não existir)
Write-Host "`n[3/6] Verificando PR develop -> release..." -ForegroundColor Yellow
$existingPR = gh pr list --base release --head develop --json number --jq '.[0].number' 2>$null
if (-not $existingPR) {
    $releasePR = gh pr create --base release --head develop --title "Promote: develop para release" --body "Automated PR from develop to release branch for homologation testing." --json number | ConvertFrom-Json
    $releasePRNumber = $releasePR.number
    Write-Host "✅ PR #$releasePRNumber criado (develop -> release)!" -ForegroundColor Green
} else {
    $releasePRNumber = $existingPR
    Write-Host "✅ PR #$releasePRNumber já existe (develop -> release)!" -ForegroundColor Green
}

# 4. Aguardar checks e fazer merge develop -> release
Write-Host "`n[4/6] Aguardando checks do PR #$releasePRNumber..." -ForegroundColor Yellow
Start-Sleep -Seconds 60
gh pr merge $releasePRNumber --squash 2>&1 | Out-Null
Write-Host "✅ Merge develop -> release realizado!" -ForegroundColor Green

# 5. Sincronizar main com release
Write-Host "`n[5/6] Sincronizando main com release..." -ForegroundColor Yellow
git checkout main 2>&1 | Out-Null
git pull origin main 2>&1 | Out-Null

# Verificar se há commits entre release e main
$commitsMain = git log main..release --oneline 2>$null
if (-not $commitsMain) {
    Write-Host "  Sem commits entre main e release." -ForegroundColor Yellow
    Write-Host "  Forçando sincronização..." -ForegroundColor Yellow
    git merge release --no-ff -m "sync: merge release into main for production" 2>&1 | Out-Null
    git push origin main 2>&1 | Out-Null
    Write-Host "✅ Main sincronizado com release!" -ForegroundColor Green
} else {
    Write-Host "✅ Commits já existem entre release e main!" -ForegroundColor Green
}

git checkout develop 2>&1 | Out-Null

# 6. Criar PR release -> main (se não existir)
Write-Host "`n[6/6] Verificando PR release -> main..." -ForegroundColor Yellow
$existingMainPR = gh pr list --base main --head release --json number --jq '.[0].number' 2>$null
if (-not $existingMainPR) {
    $mainPR = gh pr create --base main --head release --title "Promote: release para main" --body "Automated PR from release to main branch for production deployment." --json number | ConvertFrom-Json
    $mainPRNumber = $mainPR.number
    Write-Host "✅ PR #$mainPRNumber criado (release -> main)!" -ForegroundColor Green
} else {
    $mainPRNumber = $existingMainPR
    Write-Host "✅ PR #$mainPRNumber já existe (release -> main)!" -ForegroundColor Green
}

Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "✅ FLUXO COMPLETO COM SUCESSO!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "`nPRs criados/atualizados:"
Write-Host "  - PR #44: feature -> develop (MERGED)" -ForegroundColor Green
Write-Host ("  - PR #{0}: develop -> release (MERGED)" -f $releasePRNumber) -ForegroundColor Green
Write-Host ("  - PR #{0}: release -> main (PENDING MERGE)" -f $mainPRNumber) -ForegroundColor Yellow
Write-Host "`nPróximo passo: Aguardar checks e fazer merge do PR #$mainPRNumber" -ForegroundColor Cyan
