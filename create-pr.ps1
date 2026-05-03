$env:GH_TOKEN = "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"

# Check authentication
gh auth status

# Create PR to develop
gh pr create --base develop --head feature/venus-beauty-premium-palette --title "feat(ci): unified CI/CD pipeline" --body "## Summary
- Group all checks into single unified workflow
- Add PostgreSQL wait steps (30 attempts)
- Add detailed logging for debugging
- Fix lint issues
- Remove duplicate workflows
- Add coverage reporting
- Add Slack notifications (optional)

Closes #43"

Write-Host "PR created! Now waiting for checks to pass..." -ForegroundColor Green
