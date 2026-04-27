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

| # | Crítica | Prioridade |Status |
|---|--------|------------|-------|
| 1 | QuoteResponse sem status | alta | ⏳ |
| 2 | Validação WhatsApp | média | ⏳ |
| 3 | Labels acessibilidade | média | ✅ pendente |
| 4 | Pipeline visual | baixa | ⏳ |
| 5 | Métricas expandidas | baixa | ⏳ |

---

## Validação

```bash
# Backend
cd backend && mvn -B clean verify

# Frontend
cd frontend && npm run build
```