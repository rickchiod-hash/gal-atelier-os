# ATHENA PR-FLOW DIAGNÓSTICO

## Resumo

Este documento lista o estado atual do repositório, branches, workflows e riscos antes da refatoração de CI/CD.

## Branches

### Locais
```
* feature/tests-docs-ci    (HEAD branch)
  feature/backend-hexagonal
  feature/continuous-review
  feature/frontend-v6
  improvements/v5-fase1-qa
  master
```

### Remotas
```
origin/HEAD -> origin/feature/tests-docs-ci
origin/feature/tests-docs-ci
```

### Análise

| Branch | Existe? | Usar como? | Notas |
|--------|---------|------------|-------|
| `master` | ✅ SIM | Produção | Branch principal, pronto |
| `feature/tests-docs-ci` | ✅ SIM | - | Branch atual (HEAD) |
| `dev` | ❌ **NÃO EXISTE** | Desenvolvimento | **PRECISA CRIAR** |
| `develop` | ❌ NÃO | - | Não existe |
| `homolog` | ❌ **NÃO EXISTE** | Homologação | **PRECISA CRIAR** |
| `homologation` | ❌ NÃO | - | Não existe |
| `main` | ❌ NÃO | - | Alternativa a master, não existe |

## Commits Recentes

### feature/tests-docs-ci (últimos 10)
```
7b53ea5 fix: correct test types and ESLint config
632dbdc fix: accept readonly categories array
c185e3f fix: correct CatalogSection types for build
8f75952 fix: disable no-img-element rule for SVG logos
c395a80 fix(frontend): simplificar tipos em CatalogSection
43ec47e fix(frontend): corrigir tipos CatalogFilter em CatalogSection
0c3c2bb fix(frontend): corrigir tipo CatalogFilter em CatalogSection
c120cc8 chore(docs): remove obsolete files and legacy session docs
0f1978a fix(frontend): adicionar .eslintrc.json para config eslint
e542d94 fix(ci): corrigir if condition com secrets em steps
```

### master
```
f8525a7 (master) fix(backend): correct DB config, entity annotations and environment variables
1abfa10 feat: add customer segmentation, discount coupons, login/portal pages
ce7e51c feat: hardcoded Pix key 11914136961 and Nubank color palette
...
```

## Workflows Atuais

Arquivos em `.github/workflows/`:

1. `ci-cd.yml` — CI/CD básico
2. `ci-dev.yml` — CI DEV ⚠️ COM SLACK
3. `ci-homolog.yml` — CI HOMOLOG ⚠️ COM SLACK
4. `ci-prod.yml` — CI PRODUCTION ⚠️ COM SLACK
5. `docker.yml` — Docker Build & Push
6. `tests-quality.yml` — Testes e Quality Gates
7. `validation.yml` — Health Checks

## Workflows com Slack

Os siguientes workflows contêm notificação Slack que PRECISAM SER REMOVIDOS:

### ci-dev.yml (linha 175-214)
```yaml
notify-slack:
  name: Slack • Notification
  uses: slackapi/slack-github-action@v2
  env: SLACK_WEBHOOK_URL, SLACK_WEBHOOK_TYPE
```

### ci-homolog.yml (linha 223-266)
```yaml
notify:
  name: Slack • Notification
  uses: slackapi/slack-github-action@v2
  env: SLACK_WEBHOOK_URL, SLACK_WEBHOOK_TYPE
```

### ci-prod.yml (linha 335-389)
```yaml
notify-completion:
  name: Notification • Pipeline Complete
  uses: slackapi/slack-github-action@v2
  env: SLACK_WEBHOOK_URL, SLACK_WEBHOOK_TYPE
```

**ERRO ATUAL:**
```
SlackError: Missing input! Either a method or webhook is required to take action.
```

O `slackapi/slack-github-action@v2` está sendo chamado SEM o parâmetro `method:` nem com `webhook-url` corretamente configurado.

## Workflows com Copilot

Nenhum workflow contém referência a Copilot. Não há necessidade de remoção.

## Problemas/críticos identificados

### P0 — CRÍTICO
1. **Branch `dev` NÃO EXISTE** — Workflows ci-dev.yml referenciam `dev` MAS A BRANCH NÃO EXISTE!
2. **Branch `homolog` NÃO EXISTE** — Workflows ci-homolog.yml referenciam `homolog` MAS A BRANCH NÃO EXISTE!
3. **Slack quebrado** — Todos os workflows com Slack estão falhando

### Risco de Pull Request Automation
Se criarmos PR flow automático sem `dev` e `homolog` existirem, os workflows não dispararão corretamente.

## Plano de Correção

### Passo 1 — ✅ IMPLEMENTADO
Workflows modernos criados:
- ci.yml
- docker-build.yml
- security.yml
- pr-flow.yml
- manual-promote.yml

### Passo 2 — ✅ IMPLEMENTADO
Arquivos de configuração criados:
- dependabot.yml
- pull_request_template.md

### Passo 3 — ⚠️ REQUER AÇÃO HUMANA
Criar branches `dev` e `homolog` manualmente no GitHub.

### Passo 4 — ✅ IMPLEMENTADO
Slack removido. Motivação: slackapi/slack-github-action@v2 estava quebrando com "Missing input! Either a method or webhook is required to take action."

### Passo 5 — ✅ IMPLEMENTADO
Testes corrigidos:
- OrderApplicationServiceTest: corrigidos asserts de BigDecimal
- OrderEntity: alterado jsonb para text (compatibilidade H2)

---

**Documento atualizado por ATHENA V5.2**