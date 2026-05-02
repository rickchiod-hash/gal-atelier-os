# Branch & Environment Strategy

Guia completo para entender a estrutura de branches e ambientes do Gal Atelier OS.

## 🌳 Branch Strategy (Git Flow Simplified)

```
main (production) ← release/v1.0.0 (staging) ← develop ← feature/xxx (developers)
```
main (production) ← release/v1.0.0 ← develop ← feature/xxx (developers)
```

## Branches

### `main` — Production
- **Status**: Protected
- **Description**: Versão de produção
- **Merge from**: `homolog` (via Pull Request)
- **Triggers**: ci-prod.yml
- **Deploy**: Automático para produção
- **Rules**:
  - ✅ Todos os tests devem passar
  - ✅ Code coverage mínimo 70%
  - ✅ Todos os commits assinados (recommended)
  - ❌ Sem força push
  - ❌ Sem exclusão

### `release/v1.0.0` — Staging/QA
- **Status**: Protected
- **Description**: Ambiente de staging/pré-produção (release candidate)
- **Merge from**: `develop` (via Pull Request)
- **Triggers**: ci-release.yml
- **Deploy**: Automático para staging
- **Rules**:
  - ✅ Code coverage mínimo 50%
  - ✅ Security scan obrigatório
  - ⚠️ Sem force push
  - ✅ Requer 1 approval
  - 📌 **OBSOLETO**: O branch `homolog` está marcado como legado. Use `release/v1.0.0` para novos fluxos.

### `develop` — Development
- **Status**: Semi-protected
- **Description**: Desenvolvimento ativo
- **Merge from**: `feature/**` (via Pull Request)
- **Triggers**: ci-dev.yml
- **Deploy**: NÃO faz deploy automático
- **Rules**:
  - ✅ Build deve passar
  - ✅ Testes devem passar
  - ⚠️ Sem force push

### `feature/**` — Feature Branches
- **Naming**: `feature/US-XXX-descricao-curta`
- **Created from**: `dev`
- **Merge back to**: `dev`
- **Trigger**: Opcional (PR)
- **Rules**:
  - ✅ Código limpo
  - ✅ Commits descritivos
- **Exemplo**: `feature/US-15-catalog-redesign`

### `hotfix/**` — Critical Fixes
- **Naming**: `hotfix/ISSUE-critica`
- **Created from**: `main`
- **Merge to**: `main` E `dev`
- **Rules**:
  - ✅ Testes obrigatórios
  - ✅ Code review obrigatório

---

## 🎯 Workflow Típico

### 1️⃣ Iniciar feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/US-10-header-redesign

# Code...
git add .
git commit -m "feat(frontend): update header styles (US-10)"
git push origin feature/US-10-header-redesign
```

### 2️⃣ Criar Pull Request

```bash
# Via GitHub UI
# 1. Vá para branch
# 2. Clique "Compare & pull request"
# 3. Title: "feat(frontend): update header styles (US-10)"
# 4. Description: Descreva o que foi feito
# 5. Assign reviewers
# 6. Click "Create pull request"
```

### 3️⃣ Merge em develop

```bash
# Após aprovação do PR
# Click "Merge pull request" no GitHub UI

# Ou via CLI
gh pr merge 123 --merge
```

### 4️⃣ Release para staging (release/v1.0.0)

```bash
git checkout release/v1.0.0
git pull origin release/v1.0.0
git merge develop
git push origin release/v1.0.0
# → Automaticamente roda ci-release.yml + deploy
```

### 5️⃣ Release para produção

```bash
git checkout main
git pull origin main
git merge homolog
git tag -a v1.2.3 -m "Release 1.2.3"
git push origin main --tags
# → Automaticamente roda ci-prod.yml + deploy + create release
```

---

## 🔀 Merges & Rebase

### Merge vs Rebase

**Merge (Recomendado para releases)**:
```bash
git merge dev --no-ff
```
- Cria merge commit
- Preserva histórico de features
- Mais fácil de auditar

**Rebase (Para manter histórico limpo)**:
```bash
git rebase dev
```
- Reaplica commits
- Histórico linear
- Mais limpo visualmente

---

## 🏷️ Tagging (Versionamento)

### Semver (Semantic Versioning)

```
MAJOR.MINOR.PATCH
v1.2.3
```

- **MAJOR**: Breaking changes (`v2.0.0`)
- **MINOR**: New features (`v1.2.0`)
- **PATCH**: Bug fixes (`v1.2.3`)

### Criar tag

```bash
# Lightweight tag
git tag v1.2.3
git push origin v1.2.3

# Annotated tag (recomendado para releases)
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3

# List tags
git tag -l

# Delete tag
git tag -d v1.2.3
git push origin :refs/tags/v1.2.3
```

---

## 🔐 Protected Branches

### Configurar no GitHub

1. Vá para `Settings > Branches > Branch protection rules`
2. Para cada branch (`main`, `homolog`, `dev`):
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Dismiss stale reviews
   - ✅ Require code reviews: **1** (ou mais)
   - ✅ Require status checks to pass:
     - ci-dev / ci-homolog / ci-prod
     - backend-tests, frontend-tests, security-scan

---

## 📊 CI/CD Triggers

| Branch | Trigger | Workflows |
|--------|---------|-----------|
| `feature/**` | Push | Básico (build + test) |
| `dev` | Push | ci-dev (completo) |
| `homolog` | Push | ci-homolog (+ deploy) |
| `main` | Push | ci-prod (+ deploy + release) |
| `*` | PR | PR checks |
| `*` | Schedule | Validation.yml (6h) |

---

## 🔄 Pull Requests

### PR Title Format

```
<type>(<scope>): <subject> (<ref>)

type: feat, fix, refactor, test, docs, style, chore
scope: frontend, backend, infra, cicd
ref: US-XXX, ISSUE-XXX
```

### Exemplos

```
feat(frontend): implement hero redesign (US-11)
fix(backend): correct payment calculation (HOTFIX-1)
refactor(backend): extract QuoteService (TECHNICAL-5)
```

### PR Template

Criar `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description
Brief description of changes

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Breaking change

## Related Issues
Fixes #123
Relates to US-10

## Test Plan
How to test the changes

## Checklist
- [ ] Tests added/updated
- [ ] Docs updated
- [ ] No breaking changes
- [ ] Lint passes
```

---

## 🚨 Emergency Hotfixes

### Hotfix para Produção

```bash
# Criar hotfix do main
git checkout main
git checkout -b hotfix/critical-bug

# Fix...
git add .
git commit -m "fix(backend): critical security bug (HOTF-001)"

# Merge para main
git checkout main
git pull origin main
git merge hotfix/critical-bug
git tag v1.2.1
git push origin main --tags

# Sincronizar com dev
git checkout dev
git pull origin dev
git merge hotfix/critical-bug
git push origin dev

# Deletar branch
git branch -d hotfix/critical-bug
git push origin --delete hotfix/critical-bug
```

---

## 📈 Release Checklist

### Antes de Release

- [ ] Todos os PRs mergeados
- [ ] Testes passando
- [ ] Code coverage OK
- [ ] Changelog atualizado
- [ ] Versão incrementada (pom.xml, package.json)
- [ ] Documentação atualizada

### Release

- [ ] Tag criada corretamente
- [ ] GitHub Release criado
- [ ] Deploy automático verificado
- [ ] Health checks passando
- [ ] Notificações enviadas

### Depois de Release

- [ ] Monitorar logs de produção
- [ ] Verificar métricas
- [ ] Pronto para rollback se necessário

---

## 🔍 Monitorar Branches

```bash
# List all branches (local e remote)
git branch -a

# List branches merged into current branch
git branch --merged

# List branches not merged
git branch --no-merged

# Delete local branch
git branch -d feature/xxx

# Delete remote branch
git push origin --delete feature/xxx
```

---

## 🐛 Troubleshooting

### "branch is out of date"
```bash
git checkout feature/xxx
git pull origin dev
git push origin feature/xxx
```

### "cannot merge - conflicts"
```bash
git checkout main
git pull origin main
git merge dev
# Resolver conflitos manualmente
git add .
git commit -m "Merge dev into main"
git push origin main
```

### "Push rejected"
```bash
# Sua branch está atrás
git pull origin branchname
git push origin branchname

# Ou force (com cuidado!)
git push origin branchname --force-with-lease
```

---

## 📚 Referências

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Última atualização**: 2026-04-28
**Responsável**: DevOps Team

