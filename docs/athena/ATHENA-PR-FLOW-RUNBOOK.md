# ATHENA PR-FLOW RUNBOOK

## Visão Geral

Fluxo automatizado de promotion de branches:

```
feature/** → dev → homolog → master
```

## Regras

### Feature → Dev
- PR automático criado via `pr-flow.yml`
- Auto-merge habilitado SE:
  - CI passou
  - Sem conflitos
  - Checks passaram
- NÃO requer revisão humana

### Dev → Homolog
- PR criado automaticamente
- Revisão humana recomendada
- NÃO auto-merge

### Homolog → Master
- PR criado automaticamente
- Revisão humana obrigatória
- NÃO auto-merge

## Workflows

| Workflow | Trigger | Ação |
|----------|---------|------|
| `ci.yml` | push/pull_request em feature/**, dev, homolog, master | Build + Test |
| `docker-build.yml` | push em backend/**, frontend/**, docker-compose.yml | Docker Build |
| `security.yml` | pull_request | Dependency Review + CodeQL |
| `pr-flow.yml` | push em feature/**, dev, homolog | Auto PR creation |
| `manual-promote.yml` | workflow_dispatch | Manual PR creation |

## Auto-Merge

### Habilitar manualmente

Settings → General → Pull Requests → Allow auto-merge

### Verificar status

```bash
gh pr view PR_NUMBER
gh pr checks PR_NUMBER
```

### Troubleshooting

| Problema | Solução |
|---------|--------|
| Auto-merge não habilitado | Habilitar manualmente no GitHub |
| Conflicts | Resolver localmente e fazer push |
| Checks falhando | Corrigir erros antes do merge |
| PR não criado | Verificar se branch existe |

## Branches Obrigatórias

Para o fluxo funcionar, as seguintes branches DEVEM existir:

- `master` (produção)
- `dev` (desenvolvimento)
- `homolog` (homologação)

### Criar branches

```bash
# Criar dev
git checkout master
git checkout -b dev
git push origin dev

# Criar homolog
git checkout master
git checkout -b homolog
git push origin homolog
```

## Remoções

### Slack
Removido dos workflows. Motivação: estava quebrando.

### GitHub Copilot
Removido do fluxo. Motivação: não requerido nesta versão.

---

**ATHENA V5.2**
**Atualizado: 2026-04-29**