# Backlog - Próximas Tarefas

## 🔧 Correções Técnicas

### 1. **Fix TypeScript Errors in Frontend**
- **Arquivo**: `frontend/components/CatalogSection.tsx` (line 48)
- **Erro**: Property 'technicalTags' does not exist on type 'CatalogItem'
- **Solução**: 
  - Adicionar `technicalTags?: string[]` na interface `CatalogItem`
  - Ou usar optional chaining: `filteredCatalog[0].technicalTags?.map()`
- **Status**: ⏳ Pendente

### 2. **Fix Workflow Syntax Errors**
- **Arquivos**: `ci-dev.yml`, `validation.yml`
- **Erro**: `Unrecognized named-value: 'secrets'`
- **Solução**: Corrigir sintaxe `${{ secrets.SLACK_WEBHOOK_URL }}` 
- **Status**: ✅ Parcialmente feito (ci-unified.yml corrigido)

### 3. **Unificar Workflows Restantes**
- **Tarefa**: Remover `ci-cd.yml` se ainda existir
- **Status**: ⏳ Pendente

---

## 🚀 Fluxo CI/CD (Automatizado via PR #44)

### ✅ Concluído:
- [x] Criar workflow unificado (`ci-unified.yml`)
- [x] Adicionar wait steps para PostgreSQL
- [x] Adicionar logs detalhados
- [x] Remover workflows duplicados
- [x] Corrigir sintaxe de secrets

### ⏳ Pendente (Automatizado via `auto-flow-pr44.ps1`):
- [ ] PR #44 merge para develop
- [ ] PR develop → release (homologação)
- [ ] PR release → main (produção)

---

## 📋 Outras Tarefas

### 4. **Melhorar Cobertura de Testes**
- **Backend**: Atingir 70% de cobertura (JaCoCo)
- **Frontend**: Adicionar testes para componentes faltantes

### 5. **Configurar Deploy Real**
- **Homologação**: Configurar `secrets.HOMOLOG_DEPLOY_HOST`
- **Produção**: Configurar `secrets.PROD_DEPLOY_HOST`

### 6. **Monitoramento e Alertas**
- Configurar Slack Webhook real
- Adicionar alertas de falha de deploy

---

## 📊 Resumo
- **Concluído**: 60%
- **Pendente**: 40%
- **Prioridade Alta**: Fix TypeScript errors (#1), Completar fluxo PR #44
