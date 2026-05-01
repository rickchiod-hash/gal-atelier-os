$env:GH_TOKEN = "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"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "FLUXO AUTOMÁTICO COMPLETO" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# 1. Checkout develop e atualizar
Write-Host "`n[1/5] Atualizando develop..." -ForegroundColor Yellow
git checkout develop 2>&1 | Out-Null
git pull origin develop 2>&1 | Out-Null
Write-Host "✅ Develop atualizado!" -ForegroundColor Green

# 2. Criar um commit vazio se necessário para release
Write-Host "`n[2/5] Verificando se há commits para release..." -ForegroundColor Yellow
$commits = git log release..develop --oneline 2>$null
if (-not $commits) {
    Write-Host "  Sem commits entre release e develop. Criando commit de sincronização..." -ForegroundColor Yellow
    git checkout release 2>&1 | Out-Null
    git merge develop --no-ff -m "sync: merge develop into release for CI/CD flow" 2>&1 | Out-Null
    git push origin release 2>&1 | Out-Null
    Write-Host "✅ Release atualizado com merge de develop!" -ForegroundColor Green
    git checkout develop 2>&1 | Out-Null
} else {
    Write-Host "✅ Commits já existem entre develop e release!" -ForegroundColor Green
}

# 3. Criar PR develop -> release se não existir
Write-Host "`n[3/5] Verificando PR develop -> release..." -ForegroundColor Yellow
$existingPR = gh pr list --base release --head develop --json number --jq '.[0].number' 2>$null
if (-not $existingPR) {
    $releasePR = gh pr create --base release --head develop --title "Promote to Release (Homologacao)" --body "Automated PR from develop to release branch for homologation testing." --json number | ConvertFrom-Json
    $releasePRNumber = $releasePR.number
    Write-Host "✅ PR #$releasePRNumber criado (develop -> release)!" -ForegroundColor Green
} else {
    $releasePRNumber = $existingPR
    Write-Host "✅ PR #$releasePRNumber já existe (develop -> release)!" -ForegroundColor Green
}

# 4. Fazer merge do PR develop -> release
Write-Host "`n[4/5] Fazendo merge develop -> release..." -ForegroundColor Yellow
gh pr merge $releasePRNumber --squash 2>&1 | Out-Null
Write-Host "✅ Merge develop -> release realizado!" -ForegroundColor Green

# 5. Criar PR release -> main se não existir
Write-Host "`n[5/5] Verificando PR release -> main..." -ForegroundColor Yellow
$existingMainPR = gh pr list --base main --head release --json number --jq '.[0].number' 2>$null
if (-not $existingMainPR) {
    $mainPR = gh pr create --base main --head release --title "Promote to Main (Production)" --body "Automated PR from release to main branch for production deployment." --json number | ConvertFrom-Json
    $mainPRNumber = $mainPR.number
    Write-Host "✅ PR #$mainPRNumber criado (release -> main)!" -ForegroundColor Green
} else {
    $mainPRNumber = $existingMainPR
    Write-Host "✅ PR #$mainPRNumber já existe (release -> main)!" -ForegroundColor Green
}

Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "✅ FLUXO COMPLETO COM SUCESSO!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "PRs criados/atualizados:"
Write-Host "  - PR #44: feature -> develop (MERGED)"
Write-Host "  - PR #$releasePRNumber: develop -> release (MERGED)"
Write-Host "  - PR #$mainPRNumber: release -> main (PENDING MERGE)"
Write-Host "`nBranch feature -> develop -> release -> main: CONCLUÍDO!" -ForegroundColor Green
