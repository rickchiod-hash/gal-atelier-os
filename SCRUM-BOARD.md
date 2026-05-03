# SCRUM BOARD — Gal Atelier OS

**Framework**: Scrum
**Sprint Length**: 2 weeks
**Sprints**: 4 Sprints (8 weeks total)
**Data Atual**: 2026-04-28
**Sprint Atual**: Sprint 1 (2026-04-28 a 2026-05-12)

---

## RESPONSÁVEIS POR SESSÃO (NÃO PEGUEM TAREFAS DE OUTRAS SESSÕES!)

| Sessão | Branch | Responsabilidade | O que NÃO fazer |
|--------|--------|-------------------|-------------------|
| **Sessão 1** | `feature/backend-hexagonal` | Backend hexagonal, Kotlin, Spring | ❌ NÃO mexer em `frontend/`, `docs/`, `scripts/` |
| **Sessão 2** | `feature/frontend-v6` | Frontend V6, Next.js, Design System | ❌ NÃO mexer em `backend/src/main/`, `backend/src/test/` |
| **Sessão 3** | `feature/tests-docs-ci` | Tests, Docs, CI/CD | ❌ NÃO mexer em `frontend/app/`, `backend/src/main/` |

---

## PRODUCT BACKLOG (Priorizado)

### ÉPICO 1: ARQUITETURA HEXAGONAL (Sprint 1-2) — 🔴 SESSÃO 1 ONLY
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-01 | Como dev, quero Customer hexagonal | 5 | Sprint 1 | 🔄 In Progress | S1 |
| US-02 | Como dev, quero Order hexagonal | 5 | Sprint 1 | 📋 To Do | S1 |
| US-03 | Como dev, quero Appointment hexagonal | 5 | Sprint 1 | 📋 To Do | S1 |
| US-04 | Como dev, quero Inventory hexagonal | 3 | Sprint 1 | 📋 To Do | S1 |
| US-05 | Como dev, quero Campaign hexagonal | 3 | Sprint 1 | 📋 To Do | S1 |
| US-06 | Como dev, quero Review hexagonal | 3 | Sprint 2 | 📋 To Do | S1 |
| US-07 | Como dev, quero DiscountCoupon hexagonal | 3 | Sprint 2 | 📋 To Do | S1 |
| US-08 | Como dev, quero SalesCommission hexagonal | 3 | Sprint 2 | 📋 To Do | S1 |

### ÉPICO 2: FRONTEND V6 EDITORIAL ATELIER (Sprint 1-2) — 🔴 SESSÃO 2 ONLY
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-09 | Como user, quero Playfair Display em títulos | 3 | Sprint 1 | ❌ To Do (CRITICAL) | S2 |
| US-10 | Como dev, quero page.tsx refatorado | 8 | Sprint 1 | 📋 To Do | S2 |
| US-11 | Como user, quero Hero split editorial | 3 | Sprint 1 | 📋 To Do | S2 |
| US-12 | Como user, quero Dashboard horizontal bar | 3 | Sprint 2 | 📋 To Do | S2 |
| US-13 | Como user, quero CRM Concierge list | 5 | Sprint 2 | 📋 To Do | S2 |
| US-14 | Como user, quero Catalog lookbook layout | 3 | Sprint 2 | 📋 To Do | S2 |
| US-15 | Como user, quero Quote single-column | 2 | Sprint 1 | ✅ Done | S2 |

### ÉPICO 3: TESTES E QUALIDADE (Sprint 1-3) — 🔴 SESSÃO 3 ONLY
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-16 | Como dev, quero Domain Tests completos | 5 | Sprint 1 | ✅ Done | S3 |
| US-17 | Como dev, quero Application Service Tests | 8 | Sprint 1 | 📋 To Do | S3 |
| US-18 | Como dev, quero Controller Integration Tests | 8 | Sprint 2 | 📋 To Do | S3 |
| US-19 | Como dev, quero Adapter Tests | 6 | Sprint 2 | 📋 To Do | S3 |
| US-20 | Como dev, quero TestContainers PostgreSQL | 3 | Sprint 2 | 📋 To Do | S3 |
| US-21 | Como dev, quero JaCoCo 80% coverage | 1 | Sprint 3 | 📋 To Do | S3 |
| US-22 | Como dev, quero Jest + React Testing Library | 4 | Sprint 2 | 📋 To Do | S3 |
| US-23 | Como dev, quero Component Tests frontend | 6 | Sprint 3 | 📋 To Do | S3 |
| US-24 | Como dev, quero E2E Tests Playwright | 8 | Sprint 3 | 📋 To Do | S3 |

### ÉPICO 4: CI/CD E INFRA (Sprint 2-3) — 🔴 SESSÃO 3 ONLY
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-25 | Como dev, quero GitHub Actions expandido | 4 | Sprint 2 | 📋 To Do | S3 |
| US-26 | Como dev, quero Makefile | 2 | Sprint 2 | 📋 To Do | S3 |
| US-27 | Como dev, quero Prettier + ktlint | 3 | Sprint 2 | 📋 To Do | S3 |
| US-28 | Como dev, quero Docker Compose melhorado | 2 | Sprint 3 | 📋 To Do | S3 |
| US-29 | Como dev, quero Kubernetes manifests | 6 | Sprint 3 | 📋 To Do | S3 |

### ÉPICO 5: DOCUMENTAÇÃO (Sprint 1-3) — 🔴 SESSÃO 3 ONLY
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-30 | Como dev, quero Swagger/OpenAPI docs | 3 | Sprint 2 | 📋 To Do | S3 |
| US-31 | Como dev, quero README atualizado | 1 | Sprint 1 | ✅ Done | S3 |
| US-32 | Como dev, quero Architecture.md sync | 2 | Sprint 1 | ✅ Done | S3 |
| US-33 | Como dev, quero Design-System.md sync | 2 | Sprint 1 | ✅ Done | S3 |
| US-34 | Como dev, quero CONTRIBUTING.md | 1 | Sprint 3 | 📋 To Do | S3 |
| US-35 | Como dev, quero Fix .env.local commitado | 1 | Sprint 1 | ❌ To Do (CRITICAL) | S3 |

### ÉPICO 6: SEGURANÇA E INTEGRAÇÕES (Sprint 3-4)
| ID | User Story | Points | Sprint | Status | Sessão |
|----|------------|--------|--------|--------|--------|
| US-36 | Como user, quero JWT auth completo | 5 | Sprint 2 | 🔄 In Progress | S1 |
| US-37 | Como dev, quero Pix API real | 8 | Sprint 3 | 📋 To Do | S1 |
| US-38 | Como dev, quero WhatsApp Business API real | 8 | Sprint 3 | 📋 To Do | S1 |
| US-39 | Como dev, quero Email real | 4 | Sprint 3 | 📋 To Do | S1 |

---

## SPRINT 1 BACKLOG (2026-04-28 a 2026-05-12)

### SESSÃO 1 (Backend) — ⚠️ ONLY S1
| Task ID | Task | US | Status | Hours Spent |
|---------|------|----|--------|-------------|
| T-01 | Criar CustomerUseCase | US-01 | ✅ Done | 2h |
| T-02 | Criar CustomerApplicationService | US-01 | ✅ Done | 2h |
| T-03 | Refatorar CustomerController | US-01 | 🔄 In Progress | 2h |
| T-04 | Criar OrderUseCase + Service | US-02 | 📋 To Do | 4h |
| T-05 | Refatorar OrderController | US-02 | 📋 To Do | 2h |
| T-06 | Criar AppointmentUseCase + Service | US-03 | 📋 To Do | 4h |
| T-07 | Criar InventoryUseCase + Service | US-04 | 📋 To Do | 3h |
| T-08 | Criar CampaignUseCase + Service | US-05 | 📋 To Do | 3h |

### SESSÃO 2 (Frontend) — ⚠️ ONLY S2
| Task ID | Task | US | Status | Hours Spent |
|---------|------|----|--------|-------------|
| T-09 | Importar Playfair Display | US-09 | ✅ Done | 1h |
| T-10 | Corrigir --font-display | US-09 | ✅ Done | 0.5h |
| T-11 | Quebrar page.tsx em componentes | US-10 | ✅ Done | 6h |
| T-12 | Extrair CSS inline | US-10 | ✅ Done | 4h |
| T-13 | Implementar Hero split editorial | US-11 | ✅ Done | 3h |
| T-14 | Unificar paleta de cores (Nubank → Atelier Blue) | FE-07 | ✅ Done | 2h |
| T-15 | Dashboard horizontal bar (anti-card) | FE-13 | ✅ Done | 3h |
| T-16 | CRM Concierge List (anti-Kanban) | FE-14 | ✅ Done | 4h |
| T-17 | Catalog Lookbook layout (anti-grid) | FE-15 | ✅ Done | 3h |
| T-18 | Extrair AboutSection.tsx | FE-04 | ✅ Done | 1h |
| T-19 | Extrair HistorySection.tsx | FE-04 | ✅ Done | 1h |
| T-20 | Validar inputs border-bottom only | FE-11 | ✅ Done | 1h |
| T-21 | Reduzir cores de acento para 2% | FE-08 | ✅ Done | 1h |

### SESSÃO 3 (Tests/Docs/CI) — ⚠️ ONLY S3
| Task ID | Task | US | Status | Hours Spent |
|---------|------|----|--------|-------------|
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
| T-24 | ProcessPhotoTest.kt | US-16 | ✅ Done | 0.5h |
| T-25 | Commit domain tests | US-16 | ✅ Done | 0.5h |
| T-26 | README Update | US-31 | ✅ Done | 1h |
| T-27 | Architecture.md Sync | US-32 | ✅ Done | 2h |
| T-28 | Design-System.md Sync | US-33 | ✅ Done | 2h |
| T-50 | Fix .env.local | US-35 | ❌ To Do (CRITICAL) | 1h |

---

## DEFINITION OF DONE (DoD)

Para cada User Story ser considerada **Done**:
1. ✅ Código implementado
2. ✅ Testes unitários criados e passando
3. ✅ Testes de integração criados e passando (se aplicável)
4. ✅ Code review feito (outra sessão não mexeu)
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

## 🚨 REGRAS DE SINCRONIZAÇÃO (NÃO TENHAM CONFLITOS!)

### Para Sessão 1 (Backend):
```bash
git checkout feature/backend-hexagonal
git pull origin feature/backend-hexagonal

# Antes de começar: LEIA
notepad SESSION-1-BACKLOG.md
notepad SCRUM-BOARD.md  # Ver US-01 a US-08

# Quando completar tarefa:
git add .
git commit -m "feat(backend): implement X hexagonal (US-XX)"
git push origin feature/backend-hexagonal

# Atualize SCRUM-BOARD.md:
# Mude status: 📋 To Do → 🔄 In Progress → ✅ Done
```

### Para Sessão 2 (Frontend):
```bash
git checkout feature/frontend-v6
git pull origin feature/frontend-v6

# Antes de começar: LEIA
notepad SESSION-2-BACKLOG.md
notepad SCRUM-BOARD.md  # Ver US-09 a US-15

# ⚠️ CRÍTICO: Comece por US-09 (Playfair Display)!

# Quando completar tarefa:
git add .
git commit -m "feat(frontend): add Playfair Display (US-09)"
git push origin feature/frontend-v6
```

### Para Sessão 3 (Tests/Docs/CI) — **EU**:
```bash
git checkout feature/tests-docs-ci
git pull origin feature/tests-docs-ci

# Antes de começar: LEIA
notepad SESSION-3-BACKLOG.md
notepad SCRUM-BOARD.md  # Ver US-16 a US-35

# Quando completar tarefa:
git add .
git commit -m "test(backend): add X tests (US-XX)"
git push origin feature/tests-docs-ci
```

---

## ÚLTIMOS COMMITS (Para Sincronização)

### Sessão 1 (Backend):
```
f8525a7 fix(backend): correct DB config, entity annotations and environment variables
1abfa10 feat: add customer segmentation, discount coupons, login/portal pages
```

### Sessão 2 (Frontend):
```
3cb4259 feat(frontend): apply Nubank purple theme
c2c1dc4 feat(frontend): single-column quote form and minimalist header (V6-5)
```

### Sessão 3 (Tests/Docs/CI) — **EU**:
```
29c3e3e docs: update README and sync Architecture.md + Design-System.md (US-31, US-32, US-33)
233dd50 test(backend): add domain tests for all model classes (US-16)
aab7323 docs: update backlogs with Scrum structure and Session 3 progress
```

---

**Última Atualização**: 2026-04-28 01:15 UTC
**Atualizado por**: Sessão 3 (Tests/Docs/CI)
**Próxima Atualização**: Após cada tarefa completada
