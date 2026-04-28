# GitHub Actions Secrets Setup

Guia para configurar todos os secrets necessários para os workflows.

## Via GitHub Web UI

1. Vá para: `Settings > Secrets and variables > Actions`
2. Click em `New repository secret`
3. Preencha `Name` e `Secret`
4. Click `Add secret`

## Via GitHub CLI

```bash
# Install GitHub CLI: https://cli.github.com

# Login
gh auth login

# Add secret
gh secret set SECRET_NAME --body "secret_value"

# List all secrets
gh secret list

# Delete secret
gh secret delete SECRET_NAME
```

## Essenciais

### GITHUB_TOKEN (Automático)
Não precisa configurar. O GitHub fornece automaticamente.

---

## Notificações & Alertas

### SLACK_WEBHOOK_URL
**Propósito**: Enviar notificações para Slack quando pipelines terminam

**Como obter**:
1. Vá para https://api.slack.com/messaging/webhooks
2. Click em "Create your Slack app"
3. Escolha "From scratch"
4. Preencha details (name, workspace)
5. Em Features > Incoming Webhooks, click "Create New Webhook"
6. Selecione channel (ex: #deployments)
7. Copy a URL

**Exemplo**:
```bash
gh secret set SLACK_WEBHOOK_URL --body "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX"
```

---

## Homolog Environment

### HOMOLOG_DEPLOY_KEY
**Propósito**: SSH key para deploy no servidor de homolog

**Como criar**:
```bash
# Generate SSH key (sem passphrase para CI)
ssh-keygen -t ed25519 -f ~/.ssh/id_gal_homolog -N ""

# Output:
# Public: ~/.ssh/id_gal_homolog.pub
# Private: ~/.ssh/id_gal_homolog

# Copy private key
cat ~/.ssh/id_gal_homolog | xclip

# Add to GitHub
gh secret set HOMOLOG_DEPLOY_KEY --body "$(cat ~/.ssh/id_gal_homolog)"

# Add public key to server
ssh-copy-id -i ~/.ssh/id_gal_homolog.pub deploy@homolog.servidor.com
```

### HOMOLOG_DEPLOY_HOST
**Propósito**: Host/IP do servidor de homolog

**Valor exemplo**: `homolog.gal-atelier.com` ou `192.168.1.10`

```bash
gh secret set HOMOLOG_DEPLOY_HOST --body "homolog.gal-atelier.com"
```

### HOMOLOG_DEPLOY_USER
**Propósito**: Usuário SSH para login no servidor

**Valor exemplo**: `deploy`

```bash
gh secret set HOMOLOG_DEPLOY_USER --body "deploy"
```

### HOMOLOG_ENDPOINT
**Propósito**: URL para health checks em homolog

**Valor exemplo**: `http://homolog.gal-atelier.com`

```bash
gh secret set HOMOLOG_ENDPOINT --body "http://homolog.gal-atelier.com"
```

---

## Production Environment

### PROD_DEPLOY_KEY
**Propósito**: SSH key para deploy em produção

**Como criar** (mesmo processo que homolog):
```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_gal_prod -N ""
gh secret set PROD_DEPLOY_KEY --body "$(cat ~/.ssh/id_gal_prod)"
ssh-copy-id -i ~/.ssh/id_gal_prod.pub deploy@prod.servidor.com
```

### PROD_DEPLOY_HOST
**Propósito**: Host/IP do servidor de produção

**Valor exemplo**: `api.gal-atelier.com` ou `10.0.1.5`

```bash
gh secret set PROD_DEPLOY_HOST --body "api.gal-atelier.com"
```

### PROD_DEPLOY_USER
**Propósito**: Usuário SSH para login em produção

**Valor exemplo**: `deploy` ou `gal`

```bash
gh secret set PROD_DEPLOY_USER --body "deploy"
```

### PROD_API_URL
**Propósito**: URL base da API em produção (usado em build)

**Valor exemplo**: `https://api.gal-atelier.com`

```bash
gh secret set PROD_API_URL --body "https://api.gal-atelier.com"
```

---

## Email Notifications (Opcional)

### MAIL_SERVER
**Propósito**: Servidor SMTP para enviar notificações

**Valor exemplo**: `smtp.gmail.com` ou `mail.seu-dominio.com`

```bash
gh secret set MAIL_SERVER --body "smtp.gmail.com"
```

### MAIL_PORT
**Propósito**: Porta SMTP

**Valor exemplo**: `587` (TLS) ou `465` (SSL)

```bash
gh secret set MAIL_PORT --body "587"
```

### MAIL_USERNAME
**Propósito**: Usuário SMTP

**Valor exemplo**: `ci@gal-atelier.com`

```bash
gh secret set MAIL_USERNAME --body "ci@gal-atelier.com"
```

### MAIL_PASSWORD
**Propósito**: Senha do email

```bash
# Use app-specific password (recomendado para Gmail)
gh secret set MAIL_PASSWORD --body "sua_senha_ou_app_password"
```

### NOTIFY_EMAIL
**Propósito**: Email para receber notificações

**Valor exemplo**: `devops@company.com`

```bash
gh secret set NOTIFY_EMAIL --body "devops@company.com"
```

**Para Gmail**:
1. Enable [2-Factor Authentication](https://myaccount.google.com/security)
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Use app password no MAIL_PASSWORD

---

## Code Quality (Opcional)

### SONAR_TOKEN
**Propósito**: Token para SonarQube Analysis

**Como obter**:
1. Vá para seu projeto SonarQube
2. Settings > Security > Tokens
3. Generate token
4. Copy token

```bash
gh secret set SONAR_TOKEN --body "squ_1234567890abcdef"
```

---

## Validar Secrets

```bash
# List all secrets (values não são mostrados por segurança)
gh secret list

# Expected output:
# SLACK_WEBHOOK_URL
# HOMOLOG_DEPLOY_KEY
# HOMOLOG_DEPLOY_HOST
# HOMOLOG_DEPLOY_USER
# PROD_DEPLOY_KEY
# PROD_DEPLOY_HOST
# PROD_DEPLOY_USER
# ... etc
```

---

## Security Best Practices

✅ **DO**:
- Use SSH keys sem passphrase para CI/CD
- Rotate credentials regularmente
- Use secrets-specific para cada ambiente
- Audit GitHub Actions logs regularmente

❌ **DON'T**:
- Commitar secrets no código
- Usar credenciais pessoais em CI/CD
- Compartilhar secrets entre teams
- Deixar secrets com acesso permanente

---

## Troubleshooting

### "secret not defined in GitHub Actions"
```bash
# Verificar se secret existe
gh secret list | grep NOME_DO_SECRET

# Se não existir, adicionar
gh secret set NOME_DO_SECRET --body "valor"
```

### Deploy falha com "authentication failed"
1. Verificar se SSH key está correta
2. Testar SSH manualmente: `ssh -i key.pem user@host`
3. Regenerate key se necessário

### Email não enviado
1. Verificar MAIL_SERVER, MAIL_USERNAME, MAIL_PASSWORD
2. Para Gmail: usar [App Password](https://myaccount.google.com/apppasswords)
3. Verificar firewall (porta 587/465)

---

## Scripts de Automação

### Batch Add Secrets (via CLI)

```bash
#!/bin/bash

# Set required secrets
gh secret set SLACK_WEBHOOK_URL --body "$SLACK_WEBHOOK"
gh secret set HOMOLOG_DEPLOY_HOST --body "homolog.example.com"
gh secret set HOMOLOG_DEPLOY_USER --body "deploy"
gh secret set HOMOLOG_DEPLOY_KEY --body "$(cat ~/.ssh/id_homolog)"
gh secret set PROD_DEPLOY_HOST --body "prod.example.com"
gh secret set PROD_DEPLOY_USER --body "deploy"
gh secret set PROD_DEPLOY_KEY --body "$(cat ~/.ssh/id_prod)"

echo "✅ All secrets added successfully"
gh secret list
```

---

## Monitoramento

### View Workflow Runs
```bash
# List recent runs
gh run list

# View specific workflow
gh workflow view ci-prod.yml

# View logs
gh run view RUN_ID --log
```

### Enable Debug Logging
```bash
# Para workflows
gh secret set ACTIONS_STEP_DEBUG --body "true"
```

---

**Última atualização**: 2026-04-28
**Responsável**: DevOps Team

