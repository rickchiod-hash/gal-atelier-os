---
description: ATHENA P0 — remover Slack, PR flow com GitHub Copilot reviewer e Actions modernas
agent: ATHENA
model: opencode/minimax-m2.5-free
---
MELHORIAS — ATHENA P0 PR FLOW V4

Tarefa direta para ATHENA: remover Slack quebrado, criar fluxo de PRs, solicitar GitHub Copilot como reviewer e modernizar Actions.

Erro atual:
`slackapi/slack-github-action@v2` falha com `Missing input! Either a method or webhook is required`.

Execute:
```powershell
.\tools\athena\athena-pr-flow-autofix.ps1 -Apply -Validate
```

Depois:
```bash
git diff --stat
git status --short
git add .github docs/athena tools/athena frontend/.eslintrc.json frontend/components/CatalogSection.tsx backend/pom.xml _archive
git commit -m "ci: add mature pr promotion flow with copilot review"
git push origin feature/tests-docs-ci
```

Critérios:
- zero Slack ativo;
- PR `feature/**` → `develop`;
- PR `develop` → `homolog`;
- PR `homolog` → `master`;
- reviewer `@copilot` solicitado via GitHub CLI;
- CI, Docker, Security e Dependabot configurados;
- não depender de Slack, deploy, e-mail ou secrets externos.
