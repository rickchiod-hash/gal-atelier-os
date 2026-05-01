# SCRUM BOARD — Gal Atelier OS

**Framework**: Scrum  
**Sprint Length**: 2 weeks  
**Sprints**: 4 Sprints (8 weeks total)  
**Data Atual**: 2026-04-28  
**Sprint Atual**: Sprint 1 (2026-04-28 a 2026-05-12)

---

## PRODUCT OWNER: AI Product Owner
## SCRUM MASTER: AI Scrum Master
## DEVELOPMENT TEAM: 3 Sessões (Backend, Frontend, Tests/Docs/CI)

---

## PRODUCT BACKLOG (Priorizado)

### ÉPICO 1: ARQUITETURA HEXAGONAL (Sprint 1-2)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-01 | Como dev, quero arquitetura hexagonal completa para Customer | 5 | Sprint 1 | 🔄 In Progress |
| US-02 | Como dev, quero arquitetura hexagonal completa para Order | 5 | Sprint 1 | 📋 To Do |
| US-03 | Como dev, quero arquitetura hexagonal completa para Appointment | 5 | Sprint 1 | 📋 To Do |
| US-04 | Como dev, quero arquitetura hexagonal completa para Inventory | 3 | Sprint 1 | 📋 To Do |
| US-05 | Como dev, quero arquitetura hexagonal completa para Campaign | 3 | Sprint 1 | 📋 To Do |
| US-06 | Como dev, quero arquitetura hexagonal completa para Review | 3 | Sprint 2 | 📋 To Do |
| US-07 | Como dev, quero arquitetura hexagonal completa para DiscountCoupon | 3 | Sprint 2 | 📋 To Do |
| US-08 | Como dev, quero arquitetura hexagonal completa para SalesCommission | 3 | Sprint 2 | 📋 To Do |

### ÉPICO 2: FRONTEND V6 EDITORIAL ATELIER (Sprint 1-2)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-09 | Como user, quero ver Playfair Display em todos títulos | 3 | Sprint 1 | ✅ Done |
| US-10 | Como dev, quero page.tsx refatorado em componentes | 8 | Sprint 1 | 🔄 In Progress |
| US-11 | Como user, quero Hero split editorial layout | 3 | Sprint 1 | 🔄 In Progress |
| US-12 | Como user, quero Dashboard horizontal bar | 3 | Sprint 2 | 📋 To Do |
| US-13 | Como user, quero CRM Concierge list (não Kanban) | 5 | Sprint 2 | 📋 To Do |
| US-14 | Como user, quero Catalog lookbook layout | 3 | Sprint 2 | 📋 To Do |
| US-15 | Como user, quero Quote single-column form | 2 | Sprint 1 | ✅ Done |

### ÉPICO 3: TESTES E QUALIDADE (Sprint 1-3) - **MINHA SESSÃO**
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-16 | Como dev, quero Domain Tests completos | 5 | Sprint 1 | ✅ Done (commit: 233dd50) |
| US-17 | Como dev, quero Application Service Tests | 8 | Sprint 1 | ✅ Done (CustomerApplicationServiceTest ✅, QuoteApplicationServiceTest ✅) |
| US-18 | Como dev, quero Controller Integration Tests | 8 | Sprint 1 | 🔄 In Progress (403 FORBIDDEN - fixing security) |
| US-19 | Como dev, quero Adapter Tests | 6 | Sprint 2 | 📋 To Do |
| US-20 | Como dev, quero TestContainers PostgreSQL | 3 | Sprint 2 | 📋 To Do |
| US-21 | Como dev, quero JaCoCo 80% coverage | 1 | Sprint 3 | 📋 To Do |
| US-22 | Como dev, quero Jest + React Testing Library | 4 | Sprint 2 | 📋 To Do |
| US-23 | Como dev, quero Component Tests frontend | 6 | Sprint 3 | 📋 To Do |
| US-24 | Como dev, quero E2E Tests Playwright | 8 | Sprint 3 | 📋 To Do |

### ÉPICO 4: CI/CD E INFRA (Sprint 2-3)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-25 | Como dev, quero GitHub Actions expandido | 4 | Sprint 2 | ✅ Done (workflows have lint, test, security, quality) |
| US-26 | Como dev, quero Makefile | 2 | Sprint 2 | ✅ Done |
| US-27 | Como dev, quero Prettier + ktlint | 3 | Sprint 2 | ✅ Done |
| US-28 | Como dev, quero Docker Compose melhorado | 2 | Sprint 3 | 📋 To Do |
| US-29 | Como dev, quero Kubernetes manifests | 6 | Sprint 3 | 📋 To Do |

### ÉPICO 5: DOCUMENTAÇÃO (Sprint 1-3)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-30 | Como dev, quero Swagger/OpenAPI docs | 3 | Sprint 2 | ✅ Done (Springdoc added) |
| US-31 | Como dev, quero README atualizado | 1 | Sprint 1 | ✅ Done (commit: ff7e3eb) |
| US-32 | Como dev, quero Architecture.md sync | 2 | Sprint 1 | ✅ Done (commit: e464e3a) |
| US-33 | Como dev, quero Design-System.md sync | 2 | Sprint 1 | ✅ Done (commit: da4bf4) |
| US-34 | Como dev, quero CONTRIBUTING.md | 1 | Sprint 3 | ✅ Done (commit: 26142e7) |
| US-35 | Como dev, quero fix .env.local commitado | 1 | Sprint 1 | ✅ Done (gitignore correct, no tracked) |

### ÉPICO 6: SEGURANÇA E INTEGRAÇÕES (Sprint 3-4)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-36 | Como user, quero JWT auth completo | 5 | Sprint 2 | 🔄 In Progress |
| US-37 | Como dev, quero Pix API real | 8 | Sprint 3 | 📋 To Do |
| US-38 | Como dev, quero WhatsApp Business API real | 8 | Sprint 3 | 📋 To Do |
| US-39 | Como dev, quero Email real | 4 | Sprint 3 | 📋 To Do |

---

## SPRINT 1 BACKLOG (2026-04-28 a 2026-05-12)

### SESSÃO 1 (Backend) - Sprint 1 Commitment
| Task ID | Task | US Relacionado | Status | Hours Spent |
|---------|------|----------------|--------|-------------|
| T-01 | Criar CustomerUseCase | US-01 | 🔄 In Progress | 2h |
| T-02 | Criar CustomerApplicationService | US-01 | 🔄 In Progress | 2h |
| T-03 | Refatorar CustomerController | US-01 | 📋 To Do | 2h |
| T-04 | Criar OrderUseCase + Service | US-02 | 📋 To Do | 4h |
| T-05 | Refatorar OrderController | US-02 | 📋 To Do | 2h |
| T-06 | Criar AppointmentUseCase + Service | US-03 | 📋 To Do | 4h |
| T-07 | Criar InventoryUseCase + Service | US-04 | 📋 To Do | 3h |
| T-08 | Criar CampaignUseCase + Service | US-05 | 📋 To Do | 3h |

### SESSÃO 2 (Frontend) - Sprint 1 Commitment
| Task ID | Task | US Relacionado | Status | Hours Spent |
|---------|------|----------------|--------|-------------|
| T-09 | Importar Playfair Display | US-09 | ❌ To Do | 1h |
| T-10 | Corrigir --font-display no globals.css | US-09 | ❌ To Do | 0.5h |
| T-11 | Quebrar page.tsx em componentes | US-10 | 📋 To Do | 6h |
| T-12 | Extrair CSS inline para módulos | US-10 | 📋 To Do | 4h |
| T-13 | Implementar Hero split editorial | US-11 | 📋 To Do | 3h |

### SESSÃO 3 (Tests/Docs/CI) - **MINHA SESSÃO** - Sprint 1 Commitment
| Task ID | Task | US Relacionado | Status | Hours Spent |
|---------|------|----------------|--------|-------------|
| T-14 | Criar MoneyTest.kt | US-16 | ✅ Done | 1h |
| T-15 | Criar ClientTest.kt | US-16 | ✅ Done | 1h |
| T-16 | Criar WigBriefingTest.kt | US-16 | ✅ Done | 1h |
| T-17 | Criar ServiceCatalogTest.kt | US-16 | ✅ Done | 1h |
| T-18 | Criar QuoteTest.kt | US-16 | ✅ Done | 1h |
| T-19 | Criar OrderStatusTest.kt | US-16 | ✅ Done | 0.5h |
| T-20 | Criar BriefingTypeTest.kt | US-16 | ✅ Done | 0.5h |
| T-21 | Criar ReviewTest.kt | US-16 | ✅ Done | 0.5h |
| T-22 | Criar DiscountCouponTest.kt | US-16 | ✅ Done | 0.5h |
| T-23 | Criar SalesCommissionTest.kt | US-16 | ✅ Done | 0.5h |
| T-24 | Criar ProcessPhotoTest.kt | US-16 | ✅ Done | 0.5h |
| T-25 | Atualizar README.md | US-31 | ✅ Done | 1h |
| T-26 | Sync ARCHITECTURE.md | US-32 | ✅ Done | 1h |
| T-27 | Sync DESIGN-SYSTEM.md | US-33 | ✅ Done | 1h |
| T-28 | Fix .env.local commitado | US-35 | ✅ Done | 0.5h |
| T-29 | Criar HANDOFFS.md | HERMES-001-007 | ✅ Done | 1h |
| T-30 | Fix spotbugs version | HERMES-007 | ✅ Done | 0.5h |

---

## DEFINITION OF DONE (DoD)

Para cada User Story ser considerada **Done**:
1. ✅ Código implementado
2. ✅ Testes unitários criados e passando
3. ✅ Testes de integração criados e passando (se aplicável)
4. ✅ Code review feito
5. ✅ Documentação atualizada
6. ✅ Commits com padrão correto (feat/fix/test/docs)
7. ✅ Build passando (mvn test / npm run build)
8. ✅ Sem warnings de lint

---

## VELOCITY TRACKING

| Sprint | Planned Points | Completed Points | Velocity |
|--------|----------------|------------------|----------|
| Sprint 1 | 55 | 🔄 In Progress | - |
| Sprint 2 | 50 | 📋 To Do | - |
| Sprint 3 | 45 | 📋 To Do | - |
| Sprint 4 | 30 | 📋 To Do | - |

---

## DAILY SCRUM QUESTIONS (Cada sessão deve responder):

1. O que fiz ontem?
2. O que farei hoje?
3. Há algum impedimento?

---

## SPRINT CEREMONIES

- **Sprint Planning**: Início de cada sprint (2h)
- **Daily Scrum**: Todos os dias (15min)
- **Sprint Review**: Final de cada sprint (1h)
- **Sprint Retrospective**: Após Review (1h)

---

## INSTRUÇÕES PARA AS SESSÕES

### SESSÃO 1 (Backend) - LEIA:
```bash
# 1. Leia seu backlog
notepad SESSION-1-BACKLOG.md

# 2. Pull from Product Backlog (SCRUM-BOARD.md)
# Escolha tasks com status 📋 To Do da Sprint 1

# 3. Mude status para 🔄 In Progress quando começar
# Edite SCRUM-BOARD.md e atualize

# 4. Quando completar, mude para ✅ Done
# Atualize Hours Spent
```

### SESSÃO 2 (Frontend) - LEIA:
```bash
# 1. Leia seu backlog
notepad SESSION-2-BACKLOG.md

# 2. Pull from Product Backlog (SCRUM-BOARD.md)
# Escolha tasks com status 📋 To Do da Sprint 1

# 3. Mude status para 🔄 In Progress quando começar
# Edite SCRUM-BOARD.md e atualize

# 4. ATENÇÃO: US-09 é CRÍTICO (Playfair Display)
```

### SESSÃO 3 (Tests/Docs/CI) - **EU**:
```bash
# 1. Meu backlog
notepad SESSION-3-BACKLOG.md

# 2. Tasks completadas hoje:
# ✅ T-14: MoneyTest.kt
# ✅ T-15: ClientTest.kt
# ✅ T-16: WigBriefingTest.kt

# 3. Próximas tasks:
# 🔄 T-17: ServiceCatalogTest.kt
# 🔄 T-18: QuoteTest.kt
```

---

**Última Atualização**: 2026-04-28 17:30 UTC  
**Atualizado por**: Sessão 3 (Tests/Docs/CI)

---

## ÉPICO 7: GOVERNANÇA MULTIAGENTE, DOCS E BRANCH FLOW (Apollo)
| ID | User Story | Points | Sprint | Status |
|----|------------|--------|--------|--------|
| US-40 | Como PO, quero unificar documentação ativa para evitar conflito entre agentes | 5 | Sprint 1 | ✅ Done |
| US-41 | Como time, quero normalizar fluxo de branches em `main/develop/release` | 3 | Sprint 1 | ✅ Done |
| US-42 | Como time, quero mapear conflitos Venus/Hermes/Athena/Apollo antes de mudanças | 3 | Sprint 1 | ✅ Done |

### Tarefas Apollo (primeira missão)
| Task ID | Task | US Relacionado | Status | Hours Spent |
|---------|------|----------------|--------|-------------|
| AP-01 | Ler todos os `.md` e diagnosticar conteúdo ultrapassado/conflitante | US-40 | ✅ Done | 1.5h |
| AP-02 | Criar roadmap de limpeza + governança documental | US-40 | ✅ Done | 1h |
| AP-03 | Corrigir runbook Athena para alinhar `main` e fluxo oficial | US-41 | ✅ Done | 0.5h |
| AP-04 | Definir matriz de conflitos entre Venus/Hermes/Athena/Apollo | US-42 | ✅ Done | 0.5h |

| AP-05 | Limpar Actions duplicadas e manter workflows legados apenas manual (`workflow_dispatch`) | US-41 | ✅ Done | 1.5h |
| AP-06 | Corrigir gatilhos de branch (`develop/release/main`) em pipelines ativos e PR flow | US-41 | ✅ Done | 1h |

| AP-07 | Reduzir para 1 workflow automático por push (desativar PR Flow automático + concurrency) | US-41 | ✅ Done | 0.5h |

| AP-08 | Unificar PRs #44/#45/#46 em branch única de integração com estratégia de conflitos | US-41 | ✅ Done | 1h |

| AP-09 | Corrigir erro `next lint .` no CI e adicionar logs de diagnóstico do step de lint | US-41 | ✅ Done | 0.5h |

| AP-10 | Corrigir falha Slack no CI (skip quando webhook ausente) + harden logs lint frontend | US-41 | ✅ Done | 0.5h |

| AP-11 | Consolidar todas correções em PR novo do Apollo (devido limitação de update em PR externo) | US-41 | ✅ Done | 0.5h |

| AP-12 | Remover Slack do CI Dev e corrigir docker legacy manual com inputs (`push_images`, `run_compose_validation`) | US-41 | ✅ Done | 0.75h |

| AP-13 | Etapa FEATURE: hard-disable de jobs legados fora de `workflow_dispatch` para reduzir avalanche de Actions | US-41 | ✅ Done | 1h |

| AP-14 | Revisão final: corrigir lint frontend (eslint CLI), type error CatalogSection e ktlint wildcard import no backend | US-41 | ✅ Done | 1h |

| AP-15 | Revisão de compatibilidade ESLint/Next (fixar eslint em ^9 para evitar incompatibilidades de lint/build) | US-41 | ✅ Done | 0.5h |
