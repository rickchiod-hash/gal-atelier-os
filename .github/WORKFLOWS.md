# GitHub Actions Workflows

Este documento descreve os workflows de CI/CD do Gal Atelier OS.

## 🔄 Workflows Disponíveis

### 1. **ci-dev.yml** — Desenvolvimento
- **Trigger**: Push para `develop` ou `feature/**`
- **Étapas**:
  - Lint Backend (FindBugs)
  - Testes Unitários Backend
  - Cobertura JaCoCo
  - Lint Frontend (ESLint)
  - Build Frontend
  - Build Docker Images (backend + frontend)
  - Notificação Slack

### 2. **ci-release.yml** — Staging/Release Candidate
- **Trigger**: Push para `release/v1.0.0`
- **Étapas**:
  - Todas as verificações de DEV
  - Enforced Code Coverage (50% mínimo)
  - Security Scanning
  - Deploy para Staging (se configurado)
  - Notificação Slack

### 3. **ci-prod.yml** — Produção
- **Trigger**: Push para `main`
- **Étapas**:
  - Secret Scanning (gitleaks)
  - Lint + Full Test Suite (Backend)
  - Enforced Code Coverage (70% mínimo)
  - Code Quality (PMD, SpotBugs)
  - Security Scanning (OWASP)
  - Docker Build & Push
  - Create GitHub Release
  - Deploy para Produção
  - Notificações (Slack + Email)

### 4. **tests-quality.yml** — Testes & Qualidade
- **Trigger**: Push/Pull Request em qualquer branch principal
- **Étapas**:
  - Unit Tests (Backend + Frontend)
  - Integration Tests (Backend)
  - SonarQube Analysis
  - Code Style Checks (Prettier, Spotless)
  - Vulnerability Scan (Trivy)
  - Dependency Audit
  - Full Build Verification

### 5. **docker.yml** — Docker Build & Push
- **Trigger**: Push em qualquer branch ou tags
- **Étapas**:
  - Build Backend Image
  - Build Frontend Image
  - Validate docker-compose
  - Push to Registry (GHCR)

### 6. **validation.yml** — Health Checks
- **Trigger**: Push ou Schedule (6 em 6 horas)
- **Étapas**:
  - Health Check DEV
  - Health Check Homolog
  - Smoke Tests API
  - Dependency Security Audit
  - Workflow Linting

## 🔐 Secrets Necessários

Configure estes secrets no repositório (`Settings > Secrets > Actions`):

### Essenciais

```
GITHUB_TOKEN              # Automático (GitHub)
```

### Recomendados

```
# Notificações
SLACK_WEBHOOK_URL        # Slack webhook para notificações

# Homolog
HOMOLOG_DEPLOY_KEY       # SSH private key para deploy
HOMOLOG_DEPLOY_HOST      # Host/IP do servidor homolog
HOMOLOG_DEPLOY_USER      # Usuário SSH
HOMOLOG_ENDPOINT         # URL para health checks

# Produção
PROD_DEPLOY_KEY          # SSH private key para deploy prod
PROD_DEPLOY_HOST         # Host/IP do servidor prod
PROD_DEPLOY_USER         # Usuário SSH
PROD_API_URL             # URL da API em produção

# Email (Opcional)
MAIL_SERVER              # SMTP server
MAIL_PORT                # SMTP port
MAIL_USERNAME            # SMTP username
MAIL_PASSWORD            # SMTP password
NOTIFY_EMAIL             # Email para notificações

# Code Quality (Opcional)
SONAR_TOKEN              # SonarQube token
```

## 📊 Estatus Badge

```markdown
[![CI - DEVELOP](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-dev.yml/badge.svg?branch=develop)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-dev.yml)
[![CI - RELEASE](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-release.yml/badge.svg?branch=release/v1.0.0)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-release.yml)
[![CI - PROD](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-prod.yml/badge.svg?branch=main)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-prod.yml)
```

## 🎯 Quality Gates

### DEV
- ✅ Build deve passar
- ✅ Testes básicos
- ⚠️ Cobertura: Sem limite

### HOMOLOG
- ✅ Build deve passar
- ✅ Testes + Integration
- ✅ Cobertura: Mínimo **50%**
- ✅ Security Scan

### PRODUCTION
- ✅ Build deve passar
- ✅ Testes completos
- ✅ Cobertura: Mínimo **70%**
- ✅ Security Scan (crítico)
- ✅ Manual approval antes de deploy

## 🚀 Como Usar

### Commits & Branches

```bash
# Development
git checkout dev
git commit -m "feat/fix/..."
git push origin dev
# → Automaticamente roda ci-dev.yml

# Homolog Release
git checkout homolog
git merge dev
git push origin homolog
# → Automaticamente roda ci-homolog.yml + deploy

# Production Release
git checkout main
git merge homolog
git push origin main
# → Automaticamente roda ci-prod.yml + deploy
```

### Manual Dispatch

Você pode disparar workflows manualmente via:
1. GitHub Actions UI
2. GitHub CLI:

```bash
gh workflow run ci-dev.yml --ref dev
gh workflow run ci-homolog.yml --ref homolog
gh workflow run ci-prod.yml --ref main
```

## 🔔 Notificações

### Slack
Slack notifications são enviadas ao final de cada pipeline (se `SLACK_WEBHOOK_URL` configurado).

### Email
Notificações de production are enviadas por email (se `MAIL_SERVER` configurado).

### GitHub
Você receberá notificações automáticas no GitHub para fails.

## 🐛 Troubleshooting

### Build falha: "unable to find image"
**Solução**: Verifique se o Docker está rodando e se as imagens estão no registro.

### Coverage threshold não atingido
**Homolog**: Precisa mínimo 50% | **Prod**: Precisa mínimo 70%
```bash
mvn jacoco:report  # Gera relatório local
open target/site/jacoco/index.html
```

### Deploy não continua
Verifique secrets:
```bash
gh secret list
```

### Jobs timeout
Aumentar timeout no workflow (padrão 360 min = 6h por job).

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Hub Actions](https://github.com/marketplace/actions?type=docker)
- [codecov/codecov-action](https://github.com/codecov/codecov-action)
- [SonarSource/sonarcloud-github-action](https://github.com/SonarSource/sonarcloud-github-action)

---

**Última atualização**: 2026-04-28
**Responsável**: DevOps Team

