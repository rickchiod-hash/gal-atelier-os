$env:GH_TOKEN = "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"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "AUTOMATED CI/CD FLUXO - PR #44" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# 1. Check PR status
Write-Host "`n[1/6] Checking PR #44 status..." -ForegroundColor Yellow
$pr = gh pr view 44 --json state,mergeable,headRefName,baseRefName | ConvertFrom-Json
Write-Host "PR State: $($pr.state)" -ForegroundColor Green
Write-Host "PR Mergeable: $($pr.mergeable)" -ForegroundColor Green

# 2. Wait for checks to pass
Write-Host "`n[2/6] Waiting for CI checks to pass..." -ForegroundColor Yellow
$attempts = 0
do {
    $attempts++
    $checks = gh pr view 44 --json statusCheckRollup | ConvertFrom-Json
    $allPassed = $true
    foreach ($check in $checks.statusCheckRollup) {
        if ($check.conclusion -ne "SUCCESS") {
            $allPassed = $false
            Write-Host "  - $($check.name): $($check.conclusion)" -ForegroundColor Yellow
        }
    }
    
    if (-not $allPassed) {
        Write-Host "  Checks still running... (attempt $attempts/30)" -ForegroundColor Yellow
        Start-Sleep -Seconds 30
    }
} while (-not $allPassed -and $attempts -lt 30)

if (-not $allPassed) {
    Write-Host "❌ Checks did not pass in time. Please check manually." -ForegroundColor Red
    exit 1
}

Write-Host "✅ All checks passed!" -ForegroundColor Green

# 3. Merge PR #44 to develop
Write-Host "`n[3/6] Merging PR #44 to develop..." -ForegroundColor Yellow
gh pr merge 44 --squash --delete-branch
Write-Host "✅ PR #44 merged to develop!" -ForegroundColor Green

# 4. Create PR develop -> release
Write-Host "`n[4/6] Creating PR: develop -> release..." -ForegroundColor Yellow
gh pr create --base release --head develop --title "Promote to Release" --body "Automated PR from develop to release (homologacao)."
Write-Host "✅ PR develop -> release created!" -ForegroundColor Green

# 5. Wait for release checks and merge
Write-Host "`n[5/6] Waiting for release PR checks..." -ForegroundColor Yellow
Start-Sleep -Seconds 60
$releasePR = gh pr list --base release --head develop --json number --jq '.[0].number'
gh pr merge $releasePR --squash
Write-Host "✅ Merged to release!" -ForegroundColor Green

# 6. Create PR release -> main
Write-Host "`n[6/6] Creating PR: release -> main..." -ForegroundColor Yellow
gh pr create --base main --head release --title "Promote to Main (Production)" --body "Automated PR from release to main (producao)."
Write-Host "✅ PR release -> main created!" -ForegroundColor Green

Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "✅ FLUXO COMPLETO!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Branch feature -> develop -> release -> main: DONE!" -ForegroundColor Green
