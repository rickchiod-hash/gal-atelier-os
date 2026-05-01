@echo off
set GH_TOKEN=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

echo ================================================
echo Creating PR to develop...
echo ================================================
gh pr create --base develop --head feature/venus-beauty-premium-palette --title "feat(ci): unified CI/CD pipeline" --body "## Summary
- Group all checks into single unified workflow
- Add PostgreSQL wait steps (30 attempts)
- Add detailed logging for debugging
- Fix lint issues
- Remove duplicate workflows
- Add coverage reporting
- Add Slack notifications (optional)

Closes #43"

echo.
echo ================================================
echo PR created! Now waiting for checks to pass...
echo ================================================
echo When checks pass, run: gh pr merge --auto --squash

echo.
echo Then to promote to release:
echo gh pr create --base release --head develop --title "Promote to Release"
echo.
echo Then to promote to main:
echo gh pr create --base main --head release --title "Promote to Main"
