# QA Review - Melhorias V5 Fase 1

## Data: 2026-04-27

## Críticas Encontradas

### 🔴 Crítico

#### 1. QuoteResponse não inclui status
- **_localização**: `backend/src/main/kotlin/com/galatelier/adapter/input/web/QuoteController.kt:120-133`
- **problema**: `QuoteResponse` não tem campo `status`, mas `Quote` domain tem
- **impacto**: Frontend não pode filtrar/navegar por status no CRM
- **regra violada**: "CRM visual com cards por status" (melhoria V5)
- **correção**: Adicionar `status: OrderStatus` ao `QuoteResponse`

#### 2. Validação WhatsApp inconsistente
- **localização**: `backend/src/main/kotlin/com/galatelier/application/service/QuoteApplicationService.kt:113-119`
- **problema**: Aceita telefone sem DDD (10 dígitos), mas mensagem de erro diz "Use DDD + número"
- **impacto**: Dados inconsistentes no banco
- **correção**: Exigir DDD (11 dígitos) ou padronizar mensagem

### 🟡 Médio

#### 3. Frontend - Acessibilidade melhorada
- **localização**: `frontend/app/page.tsx:178-200`
- **problema**: Labels sem `htmlFor`/`id` adequados
- **correção aplicada**: Adicionados `htmlFor` e `id` em todos os inputs (linhas 178-200)
- **status**: ✅ Corrigido na sessão anterior (pendente commit)

### 🟢 Observações

#### 4. Pipeline sem status visual
- Frontend mostra lista de orçamentos mas sem indicação de status
- Recomendado: adicionar badge ou cor por status

#### 5. Métricas resumidas
- Dashboard atual só tem 3 métricas (quotes, revenue, deposits)
- Melhoria V5 propõe: leads hoje, conversão, Pix pendente

---

## Plano de Correções

### ✅ Concluído (commit 7f50792)

| # | Crítica | Prioridade | Status |
|---|--------|------------|-------|
| 1 | QuoteResponse sem status | alta | ✅ corrigido |
| 2 | Validação WhatsApp | média | ✅ corrigido |
| 3 | Labels acessibilidade | média | ✅ corrigido |
| 4 | Pipeline visual | baixa | ✅ corrigido |

### ⏳ Pendente (Fase 1 continua)

| # | Melhoria | Prioridade |
|---|---------|------------|
| 5 | Endpoint `/api/services` (catálogo) | ✅ concluído |
| 6 | Métricas expandidas (leads, conversão) | baixa |
| 7 | Dashboard KPIs visuais | baixa |
| 8 | Wizard orçamento etapas | baixa |

---

## Avaliação Final - Sessão opencode

### ✅ Concluído (opencode)

| # | Melhoria | Commit | Arquivos |
|---|---------|--------|--------|
| 1 | Status no QuoteResponse | 7f50792 | QuoteController.kt |
| 2 | Validação WhatsApp | 7f50792 | QuoteApplicationService.kt |
| 3 | Acessibilidade labels | 7f50792 | page.tsx |
| 4 | Pipeline visual | 7f50792 | globals.css |
| 5 | Endpoint /api/services | d92dad4 | ServiceController.kt, ServiceCatalog.kt |
| 6 | Teste ServiceController | d92dad4 | ServiceControllerTest.kt |

### ⏳ Pendente (outra IDE)

- Wizard.tsx
- CRMBoard.tsx
- ServiceCatalog.tsx
- DashboardKPIs.tsx
- page.tsx integração

---

## Validação

```bash
# Backend - 8 testes passando
cd backend && mvn -B clean verify
# Tests run: 8, Failures: 0, Errors: 0

# Frontend
cd frontend && npm run build
```