# GitHub Actions & CI/CD - Quick Start Guide

Guia rápido para começar com GitHub Actions no Gal Atelier OS.

## 📋 Checklist Inicial

- [ ] Repository criado no GitHub
- [ ] Branches main, homolog, dev criadas
- [ ] Protected branches configurados
- [ ] Secrets adicionados ao repositorio
- [ ] Docker configurado localmente
- [ ] Tudo pronto para CI/CD

---

## 🚀 Começar em 5 Minutos

### 1. Configure os Secrets Essenciais

```bash
# Slack (Opcional mas recomendado)
gh secret set SLACK_WEBHOOK_URL --body "https://hooks.slack.com/services/..."

# Deploy (Para deploy automático)
gh secret set HOMOLOG_DEPLOY_HOST --body "homolog.example.com"
gh secret set HOMOLOG_DEPLOY_USER --body "deploy"
gh secret set PROD_DEPLOY_HOST --body "prod.example.com"
gh secret set PROD_DEPLOY_USER --body "deploy"

# Verificar
gh secret list
```

### 2. Configure os Workflows

Os workflows já estão criados em `.github/workflows/`:

```bash
# Listar workflows
ls -la .github/workflows/

# Expected:
# - ci-dev.yml          (Development)
# - ci-homolog.yml      (Staging)
# - ci-prod.yml         (Production)
# - tests-quality.yml   (Tests & Code Quality)
# - docker.yml          (Docker Build & Push)
# - validation.yml      (Health Checks)
```

### 3. Push para Testar

```bash
# Faça seu primeiro push para ativar os workflows
git push origin dev

# Monitore no GitHub Actions
# Settings > Actions > Workflows
```

### 4. Verificar Resultados

```bash
# Via CLI
gh run list
gh run view RUN_NUMBER --log

# Ou no GitHub UI
# Actions tab > Workflow > Latest run
```

---

## 📊 Estrutura de Workflows

```
.github/workflows/
├── ci-dev.yml               # Dev: Build + Test + Docker
├── ci-homolog.yml          # Homolog: + Coverage + Security + Deploy
├── ci-prod.yml             # Prod: + Quality Gates + Release + Deploy
├── tests-quality.yml       # All: Tests + SonarQube + Dependency Check
├── docker.yml              # Docker Build & Push all branches
└── validation.yml          # Periodic health checks

.github/
├── WORKFLOWS.md            # Documentação dos workflows
├── SECRETS.md              # Como configurar secrets
└── PULL_REQUEST_TEMPLATE.md # Template para PRs
```

---

## 🔑 Secrets Necessários

### Mínimo (Essencial)

Nenhum secret é absolutamente necessário para build/test.

### Recomendado para Deploy

```bash
# Homolog
HOMOLOG_DEPLOY_HOST       # Host/IP
HOMOLOG_DEPLOY_USER       # SSH user
HOMOLOG_DEPLOY_KEY        # SSH private key

# Production
PROD_DEPLOY_HOST          # Host/IP
PROD_DEPLOY_USER          # SSH user
PROD_DEPLOY_KEY           # SSH private key
```

### Opcional para Notificações

```bash
SLACK_WEBHOOK_URL         # Slack webhook
MAIL_SERVER               # SMTP server
MAIL_USERNAME             # SMTP user
MAIL_PASSWORD             # SMTP password
NOTIFY_EMAIL              # Email para notificações
```

**Docs completo**: Veja `.github/SECRETS.md`

---

## 🎯 Branch Protection Rules

Configure em `Settings > Branches > Branch protection rules`:

### Para `main` (Production)
```
✅ Require a pull request before merging
✅ Require status checks to pass before merging
   - ci-prod
✅ Require branches to be up to date
✅ Require code reviews (minimum 1)
✅ Dismiss stale pull request approvals
```

### Para `homolog` (Staging)
```
✅ Require a pull request before merging
✅ Require status checks to pass before merging
   - ci-homolog
✅ Require branches to be up to date
✅ Require code reviews (minimum 1)
```

### Para `dev` (Development)
```
✅ Require a pull request before merging
✅ Require status checks to pass before merging
   - ci-dev
```

---

## 📈 Fluxo Típico (Git Flow)

```
feature/US-10 --┐
                └→ dev → ci-dev ✅
                   └→ homolog → ci-homolog ✅ + deploy
                      └→ main → ci-prod ✅ + deploy + release
```

### Passos

```bash
# 1. Create feature
git checkout dev
git checkout -b feature/US-10-name

# 2. Code...
git add .
git commit -m "feat(frontend): description (US-10)"
git push origin feature/US-10-name

# 3. Create PR (via GitHub UI)
# Reviewers → Approve → Merge

# 4. Create release branch
git checkout homolog
git merge dev
git push origin homolog
# → Automático: ci-homolog ✅ + deploy

# 5. Create production release
git checkout main
git merge homolog
git tag v1.0.0
git push origin main --tags
# → Automático: ci-prod ✅ + deploy + release
```

---

## 🔍 Monitorar Workflows

### Via GitHub UI
1. Vá para `github.com/seu-repo`
2. Clique em `Actions`
3. Selecione workflow ou run
4. Veja logs em tempo real

### Via GitHub CLI
```bash
# List runs
gh run list

# Watch specific run
gh run watch RUN_NUMBER

# View logs
gh run view RUN_NUMBER --log

# Re-run failed job
gh run rerun RUN_NUMBER
```

---

## 🐛 Troubleshooting

### Build não inicia
- [ ] Verificar se workflows estão no `.github/workflows/`
- [ ] Verificar syntax YAML: `yamllint .github/workflows/`

```bash
# Validar YAML
python -m pip install yamllint
yamllint .github/workflows/
```

### Tests falham
- [ ] Rode testes localmente: `mvn test` / `npm test`
- [ ] Verificar database: Postgres rodando?
- [ ] Check logs: `gh run view RUN_NUMBER --log`

### Deploy não funciona
- [ ] Verificar SSH keys: `gh secret list`
- [ ] Testar conexão manualmente: `ssh user@host`
- [ ] Verificar firewall/security groups

### Coverage threshold não atingido
- [ ] Gerar relatório local: `mvn jacoco:report`
- [ ] Adicionar testes para código não coberto

---

## ✨ Best Practices

✅ **DO**:
- Usar nomes descritivos para branches
- Escrever commits claros e pequenos
- Rodar testes antes de fazer push
- Usar PRs para código review
- Manter secrets seguros

❌ **DON'T**:
- Fazer push direto em main/homolog
- Commitar secrets
- Ignorar test failures
- Usar force push em branches protegidas
- Compartilhar secrets

---

## 📚 Documentação Completa

- **Workflows**: `.github/WORKFLOWS.md`
- **Secrets**: `.github/SECRETS.md`
- **Git Strategy**: `BRANCH-STRATEGY.md`
- **GitHub Docs**: https://docs.github.com/actions

---

## 🎓 Exemplos de Commits

```bash
# Feature nova
git commit -m "feat(frontend): implement catalog redesign (US-14)"

# Bug fix
git commit -m "fix(backend): correct payment calculation (HOTF-001)"

# Refactoring
git commit -m "refactor(backend): extract QuoteService"

# Documentation
git commit -m "docs(readme): update installation guide"

# Tests
git commit -m "test(frontend): add Header component tests"

# Chore
git commit -m "chore: bump dependencies"
```

---

## 🎯 Key Metrics

```
DEV           → Rápido, sem coverage requirement
HOMOLOG       → Coverage mínimo 50%, security scan
PRODUCTION    → Coverage mínimo 70%, full security, manual approval
```

---

## 🚨 Emergency Procedures

### Se CI está quebrado

```bash
# 1. Identificar o problema
gh run view FAILING_RUN_NUMBER --log

# 2. Criar hotfix
git checkout main
git checkout -b hotfix/fix-ci

# 3. Corrigir (e.g., workflow YAML)
# ... editar arquivo ...

# 4. Push & merge
git push origin hotfix/fix-ci
# → Criar PR e merge
```

### Se precisa de rollback

```bash
# 1. Identificar last good tag
git tag -l

# 2. Deploy rollback (manual ou via:)
git checkout main
git reset --hard v1.0.0
git push origin main --force-with-lease
# ⚠️ Só use com aprovação!
```

---

## 📞 Suporte

Dúvidas?

1. Verificar: `.github/WORKFLOWS.md`
2. Verificar: `.github/SECRETS.md`
3. Check: GitHub Actions logs
4. Read: https://docs.github.com/actions

---

**Última atualização**: 2026-04-28
**Status**: ✅ Pronto para usar

