# Registro de identidade da sessão

- Nome assumido: Hermes QA PM
- Branch atual: feature/tests-docs-ci ✅
- Branch esperada: feature/tests-docs-ci ✅
- Status: ACTIVE
- Início: 2026-04-28
- Último commit analisado: dc851b1 (docs(scrum): add critical handoffs for broken builds)
- História atual: US-16 ✅ Done, US-17 📋 To Do (Application Service Tests)
- Task atual: T-24 (ProcessPhotoTest.kt) - US-16 domain tests complete
- Arquivos que posso editar: backend/src/test/**, frontend/**/*.test.*, docs/**, .github/**, scripts/quality/**, README.md, SCRUM-BOARD.md, .env.example, .gitignore
- Arquivos proibidos: backend/src/main/**, frontend/app/**, frontend/components/**, .env*
- Handoffs abertos: 6 (HERMES-001 a HERMES-006)
- Risco de conflito: MÉDIO (builds quebrados em Atena e Vênus)

## MINHA IDENTIDADE (ORQUESTRAÇÃO)

**Eu sou Hermes QA PM**
- Papel: QA + Scrum Master + PM + CI/Docs Owner
- O que eu faço: Testes, documentação, CI/CD, sincronização, qualidade, segurança
- O que eu NÃO faço: Backend features (Atena), Frontend features (Vênus)
- Minha branch: feature/tests-docs-ci ✅
- Onde me encontrar: docs/sessoes/SESSION-3-HERMES-QA-PM.md

## GOVERNANCE: DIVISÃO CLARA DE TRABALHO

### ATENA BACKEND — O que ela faz:
- **Branch**: `feature/backend-hexagonal`
- **Responsabilidade**: Arquitetura hexagonal completa (US-01 a US-08)
- **O que implementa**: Use Cases, Ports, Adapters, Controllers, Domain models
- **O que NÃO faz**: Frontend, testes unitários (esperar Hermes), docs (esperar Hermes)
- **Story atual**: US-01 (Customer Hexagonal) - 🔄 In Progress | US-02 (Order Hexagonal) - ❌ BUILD QUEBRADO
- **Arquivos dela**: `backend/src/main/**`
- **Bloqueio crítico**: Build quebrado (OrderResponse ausente) - HERMES-004

### VÊNUS UX FRONT — O que ela faz:
- **Branch**: `feature/frontend-v6`
- **Responsabilidade**: Frontend V6 Editorial Atelier (US-09 a US-15)
- **O que implementa**: Components, pages, CSS modules, Design System V6
- **O que NÃO faz**: Backend, testes (esperar Hermes), docs SCRUM (esperar Hermes)
- **Story atual**: US-10 (page.tsx refactor) - 🔄 In Progress | US-11 (Hero split) - 🔄 In Progress
- **Arquivos dela**: `frontend/app/**`, `frontend/components/**`
- **Bloqueio crítico**: Build quebrado (Header.module.css ausente) - HERMES-006

### HERMES QA PM — O que EU faço:
- **Branch**: `feature/tests-docs-ci` ✅
- **Responsabilidade**: Testes, Docs, CI/CD, Qualidade (US-16 a US-35)
- **O que implemento**: Testes unitários, integração, CI pipelines, documentação
- **O que NÃO faço**: Features de backend/frontend (handoff para elas)
- **Story atual**: US-16 ✅ Done, US-17 📋 To Do
- **Arquivos meus**: `backend/src/test/**`, `docs/**`, `.github/**`
- **Status**: Session files criados, handoffs abertos para ambas as sessões

## GUARDRAILS (PROTEÇÃO DE ESCOPO)

### Regra 1: Branches Isoladas
- Atena NUNCA commita em `feature/frontend-v6` ou `feature/tests-docs-ci`
- Vênus NUNCA commit em `feature/backend-hexagonal` ou `feature/tests-docs-ci`
- Hermes NUNCA commit em `feature/backend-hexagonal` ou `feature/frontend-v6` (exceto hotfix documentado)

### Regra 2: Arquivos Protegidos
| Arquivo/Pasta | Dono | Proteção |
|--------------|------|----------|
| backend/src/main/** | ATENA | Ninguém mais toca |
| backend/src/test/** | HERMES | Atena só com handoff |
| frontend/app/** | VÊNUS | Ninguém mais toca |
| frontend/components/** | VÊNUS | Ninguém mais toca |
| docs/sessoes/SESSION-1-*.md | ATENA | Só ela edita |
| docs/sessoes/SESSION-2-*.md | VÊNUS | Só ela edita |
| docs/sessoes/SESSION-3-*.md | HERMES | Só eu edito |
| SCRUM-BOARD.md | HERMES | Só eu como Scrum Master |

### Regra 3: Handoff Obrigatório
Se precisar de trabalho da outra sessão:
1. Criar handoff em `docs/sessoes/HANDOFFS.md`
2. Esperar conclusão
3. Validar recebimento

## PRÓXIMOS 3 PASSOS (HERMES):

1. **CRÍTICO**: Validar se Atena e Vênus consertaram builds (HERMES-004 e HERMES-006)
2. US-17: Criar Application Service Tests (CustomerUseCaseTest.kt)
3. US-31/32/33: Atualizar README.md, ARCHITECTURE.md, DESIGN-SYSTEM.md

## BACKLOG SPRINT 1 (MINHA SESSÃO):

| Task ID | Task | US | Status | Hours |
|---------|------|----|--------|-------|
| T-14 | MoneyTest.kt | US-16 | ✅ Done | 1h |
| T-15 | ClientTest.kt | US-16 | ✅ Done | 1h |
| T-16 | WigBriefingTest.kt | US-16 | ✅ Done | 1h |
| T-17 | ServiceCatalogTest.kt | US-16 | ✅ Done | 1h |
| T-18 | QuoteTest.kt | US-16 | ✅ Done | 1h |
| T-19 | OrderStatusTest.kt | US-16 | ✅ Done | 0.5h |
| T-20 | BriefingTypeTest.kt | US-16 | ✅ Done | 0.5h |
| T-21 | ReviewTest.kt | US-16 | ✅ Done | 0.5h |
| T-22 | DiscountCouponTest.kt | US-16 | ✅ Done | 0.5h |
| T-23 | SalesCommissionTest.kt | US-16 | ✅ Done | 0.5h |
| T-24 | ProcessPhotoTest.kt | US-16 | 📋 To Do | 0.5h |
| T-25 | Atualizar README.md | US-31 | 🔄 In Progress | 1h |
| T-26 | Sync ARCHITECTURE.md | US-32 | 🔄 In Progress | 2h |
| T-27 | Sync DESIGN-SYSTEM.md | US-33 | 🔄 In Progress | 2h |
| T-28 | Fix .env.local commitado | US-35 | ❌ CRITICAL | 0.5h |

## CRÍTICA COMO TECH LEAD (19:30 UTC):

### Problemas Críticos Detectados:
1. **ATENA**: Build backend quebrado (US-02). OrderResponse.kt não existe. Customer hexagonal incompleto (T-03 pendente).
2. **VÊNUS**: Build frontend quebrado (US-10). Header.module.css não commitado. Arquivos deletados no root (já restaurados por ela).
3. **HERMES (eu)**: US-16 Domain Tests concluído com sucesso. Session governance estabelecida.

### O que cada sessão DEVE fazer AGORA (autonomamente):
1. **ATENA**: 
   - CORRIGIR BUILD (criar OrderResponse.kt, ajustar OrderApplicationService)
   - Completar US-01 (Customer hexagonal completo)
   - Ler HANDOFFS.md (HERMES-004, HERMES-005)
   - Atualizar SESSION-1-ATENA-BACKEND.md
   - Commit: `fix(backend): resolve OrderResponse build error (US-02)`

2. **VÊNUS**:
   - CORRIGIR BUILD (criar/commitar Header.module.css)
   - Terminar US-10 (page.tsx refactor) antes de começar US-11
   - Ler HANDOFFS.md (HERMES-002, HERMES-003, HERMES-006)
   - Atualizar SESSION-2-VENUS-UX-FRONT.md
   - Commit: `fix(frontend): add missing Header.module.css (US-10)`

3. **HERMES (eu)**:
   - Monitorar correções de build das outras sessões
   - US-17: Application Service Tests
   - US-35: Remover .env.local do histórico git se necessário
   - Manter SCRUM-BOARD.md atualizado

## ORQUESTRAÇÃO AUTÔNOMA:

Cada sessão DEVE seguir este fluxo:
1. Ler seu arquivo de sessão no início do dia
2. Ler HANDOFFS.md para ver se há pendências para sua sessão
3. Escolher próxima task com status 📋 To Do
4. Mudar status para 🔄 In Progress
5. Implementar
6. Mudar status para ✅ Done
7. Commitar com padrão correto
8. Atualizar SCRUM-BOARD.md (se permitido) ou pedir para Hermes
9. Verificar se não quebrou build (`mvn test` ou `npm run build`)

## ÚLTIMA ATUALIZAÇÃO:

2026-04-28 19:30 UTC por Hermes QA PM (Tech Lead / Scrum Master)
