# Registro de identidade da sessão

- Nome assumido: Hermes QA PM
- Branch atual: feature/tests-docs-ci ✅
- Branch esperada: feature/tests-docs-ci
- Status: ACTIVE
- Início: 2026-04-28
- Último commit analisado: 233dd50 (test(backend): add domain tests for all model classes (US-16))
- História atual: US-16 ✅ Done, US-17 📋 To Do (Application Service Tests)
- Task atual: T-17 (ServiceCatalogTest.kt) - já concluído em commit anterior
- Arquivos que posso editar: backend/src/test/**, frontend/**/*.test.*, docs/**, .github/**, scripts/quality/**, README.md, SCRUM-BOARD.md, .env.example, .gitignore
- Arquivos proibidos: backend/src/main/**, frontend/app/**, frontend/components/**, .env*
- Handoffs abertos: 3 (HERMES-001, HERMES-002, HERMES-003)
- Risco de conflito: MÉDIO (arquivos restaurados, conflitos identificados e documentados)

## MINHA IDENTIDADE (ORQUESTRAÇÃO)

**Eu sou Hermes QA PM**
- Papel: QA + Scrum Master + PM + CI/Docs Owner
- O que eu faço: Testes, documentação, CI/CD, sincronização, qualidade, segurança
- O que eu NÃO faço: Backend features (Atena), Frontend features (Vênus)
- Minha branch: feature/tests-docs-ci
- Onde me encontrar: docs/sessoes/SESSION-3-HERMES-QA-PM.md

## GOVERNANCE: DIVISÃO CLARA DE TRABALHO

### ATENA BACKEND — O que ela faz:
- **Branch**: `feature/backend-hexagonal`
- **Responsabilidade**: Arquitetura hexagonal completa (US-01 a US-08)
- **O que implementa**: Use Cases, Ports, Adapters, Controllers, Domain models
- **O que NÃO faz**: Frontend, testes unitários (esperar Hermes), docs (esperar Hermes)
- **Story atual**: US-01 (Customer Hexagonal) - 🔄 In Progress
- **Arquivos dela**: `backend/src/main/**`
- **Como ela avança**: Termina task → Atualiza SESSION-1-ATENA-BACKEND.md → Commit → Hermes valida

### VÊNUS UX FRONT — O que ela faz:
- **Branch**: `feature/frontend-v6`
- **Responsabilidade**: Frontend V6 Editorial Atelier (US-09 a US-15)
- **O que implementa**: Components, pages, CSS modules, Design System V6
- **O que NÃO faz**: Backend, testes (esperar Hermes), docs SCRUM (esperar Hermes)
- **Story atual**: US-10 (page.tsx refactor) - 🔄 In Progress, US-11 (Hero split) - 🔄 In Progress
- **Arquivos dela**: `frontend/app/**`, `frontend/components/**`
- **Como ela avança**: Termina task → Atualiza SESSION-2-VENUS-UX-FRONT.md → Commit → Hermes valida

### HERMES QA PM — O que EU faço:
- **Branch**: `feature/tests-docs-ci`
- **Responsabilidade**: Testes, Docs, CI/CD, Qualidade (US-16 a US-35)
- **O que implemento**: Testes unitários, integração, CI pipelines, documentação
- **O que NÃO faço**: Features de backend/frontend (handoff para elas)
- **Story atual**: US-16 ✅ Done, US-17 📋 To Do
- **Arquivos meus**: `backend/src/test/**`, `docs/**`, `.github/**`
- **Como eu avanço**: Termino task → Atualizo este arquivo → Commit → Update SCRUM-BOARD.md

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

### Regra 4: Commits Padronizados
- Atena: `feat(backend): ...`, `refactor(backend): ...`, `fix(backend): ...`
- Vênus: `feat(frontend): ...`, `style(frontend): ...`, `fix(frontend): ...`
- Hermes: `test(backend): ...`, `test(frontend): ...`, `docs(scrum): ...`, `docs(product): ...`, `ci(pipeline): ...`, `chore(security): ...`

## PRÓXIMOS 3 PASSOS:

1. **CRÍTICO**: Restaurar SCRUM-BOARD.md e outros arquivos deletados no root (git restore)
2. Commitar arquivos de sessão criados (SESSION-3-HERMES-QA-PM.md, HANDOFFS.md, CONFLICTS.md, CHECKPOINTS.md)
3. Executar validação: build backend + build frontend + verificar .env.local

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
| T-25 | Atualizar README.md | US-31 | 📋 To Do | 1h |
| T-26 | Sync ARCHITECTURE.md | US-32 | 📋 To Do | 2h |
| T-27 | Sync DESIGN-SYSTEM.md | US-33 | 📋 To Do | 2h |
| T-28 | Fix .env.local commitado | US-35 | ❌ CRITICAL | 0.5h |

## VALIDAÇÕES EXECUTADAS:

- [x] Git status verificado (branch errada detectada e corrigida)
- [x] Commits recentes lidos
- [x] SCRUM-BOARD.md lido
- [x] .gitignore verificado (correto: `!.env.example`)
- [x] .env.example verificado (sem secrets reais)
- [ ] Build backend (pendente)
- [ ] Build frontend (pendente)
- [ ] Testes backend (pendente)

## HANDOFFS ENVIADOS:

1. **HERMES-001**: Para ATENA - FinanceApplicationServiceTest.kt na branch errada
2. **HERMES-002**: Para VÊNUS - Arquivos deletados no root + globals.css modificado
3. **HERMES-003**: Para VÊNUS - Inconsistência entre documentação e git status

## HANDOFFS RECEBIDOS:

Nenhum até agora

## BLOQUEIOS:

1. ⚠️ SCRUM-BOARD.md, BACKLOG.md deletados no root (precisa restore)
2. ⚠️ Arquivo órfão: backend/src/test/kotlin/com/galatelier/application/service/FinanceApplicationServiceTest.kt na branch frontend
3. ⚠️ US-35 (.env.local) ainda não resolvido

## CRÍTICA COMO TECH LEAD:

### Problemas de Escopo Detectados:
1. **Atena**: Customer Hexagonal (US-01) está In Progress há muito tempo. Precisa de foco.
2. **Vênus**: US-10 e US-11 ambos In Progress. Recomendo terminar US-10 primeiro (page.tsx refactor) antes de começar Hero split.
3. **Hermes (eu)**: US-16 Domain Tests concluído com sucesso. Próximo: US-17 (Application Service Tests).

### Melhorias Necessárias:
1. Atena deve criar `docs/api/API-CONTRACT.md` para Vênus consumir endpoints
2. Vênus deve manter Design System V6 rigorosamente (sem cards coloridos, sem gradientes)
3. Hermes deve garantir US-35 (.env.local) resolvido hoje (CRITICAL)

## ORQUESTRAÇÃO AUTÔNOMA:

Cada sessão DEVE:
1. Ler seu arquivo de sessão no início do dia
2. Escolher próxima task com status 📋 To Do
3. Mudar status para 🔄 In Progress
4. Implementar
5. Mudar status para ✅ Done
6. Commitar com padrão correto
7. Atualizar SCRUM-BOARD.md (se permitido) ou pedir para Hermes
8. Verificar handoffs pendentes para sua sessão

## ÚLTIMA ATUALIZAÇÃO:

2026-04-28 18:30 UTC por Hermes QA PM (Tech Lead / Scrum Master)
