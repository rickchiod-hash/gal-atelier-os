# Unified PR Playbook (PRs #44, #45, #46)

## Objetivo
Consolidar as mudanças de `#44`, `#45` e `#46` em um **PR único** para reduzir conflitos e garantir uma esteira previsível.

## Branch alvo sugerida
`feature/codex/unified-integration`

## Ordem recomendada de integração
1. **PR #44** (frontend/palette) — base visual.
2. **PR #45** (tests/ci v2) — estabilização de testes e quality gates.
3. **PR #46** (branch-flow/workflows/docs) — governança e fluxo.

## Passo a passo (GitHub CLI)
```bash
git checkout develop
git pull origin develop

git checkout -b feature/codex/unified-integration

# Merge dos heads das PRs na ordem
# (troque pelos nomes reais das branches)
git merge origin/feature/venus-beauty-premium-palette
git merge origin/feature/tests-ci-v2
git merge origin/feature/codex/clean-up-and-unify-project-documents
```

## Resolução de conflitos (prioridade)

### 1) Workflows (`.github/workflows/*`)
- Manter triggers de branch compatíveis com o repo atual (`develop`, `release/**`, `main`).
- Evitar duplicidade de pipelines automáticos no push.
- Priorizar 1 pipeline principal de CI por push + segurança em PR.

### 2) Frontend (V6 Editorial Atelier)
- Preservar tipografia e whitespace do Design System V6.
- Evitar regressão visual para padrão SaaS dashboard.

### 3) Documentação
- `README`, `ARCHITECTURE`, runbooks Athena devem apontar para o mesmo fluxo de branch.
- Arquivos legados devem ser marcados como históricos (sem apagar).

## Check final antes do PR único
```bash
# Workflow syntax (local)
rg --files .github/workflows

# Backend
cd backend && mvn -q test && cd ..

# Frontend
cd frontend && npm ci && npm run lint && npm run build && cd ..
```

## Template de PR único
Título:
`chore(integration): unify PRs #44 #45 #46 with conflict resolution`

Descrição:
- consolida visual + testes/ci + governança
- padroniza fluxo de branch
- reduz ruído de actions
- lista conflitos resolvidos por arquivo
