# PLANNING POKER — Sprint 1 Priorization

**Date**: 2026-04-28  
**Scrum Master**: Hermes QA PM  
**Sprint**: Sprint 1 (2026-04-28 a 2026-05-12)  
**Velocit estimada**: 55 points

---

## METHODLOGY: Planning Poker with Fibonacci

Cada sessão vota com cartas Fibonacci: 1, 2, 3, 5, 8, 13, 21

---

## BACKLOG PRIORIZATION (Sprint 1)

### ÉPICO 1: ARQUITETURA HEXAGONAL

| US | User Story | Atena Vote | Hermes Vote | Final Points | Priority |
|----|-----------|-------------|-------------|--------------|----------|
| US-01 | Customer Hexagonal | 5 | 5 | **5** | 🔴 HIGH (In Progress) |
| US-02 | Order Hexagonal | 8 | 8 | **8** | 🔴 HIGH (CRITICAL - Build broken) |
| US-03 | Appointment Hexagonal | 5 | 5 | **5** | 🟡 MEDIUM |
| US-04 | Inventory Hexagonal | 3 | 3 | **3** | 🟢 LOW |
| US-05 | Campaign Hexagonal | 3 | 3 | **3** | 🟢 LOW |

**Total Épico 1**: 24 points

---

### ÉPICO 2: FRONTEND V6 EDITORIAL ATELIER

| US | User Story | Vênus Vote | Hermes Vote | Final Points | Priority |
|----|-----------|-------------|-------------|--------------|----------|
| US-09 | Playfair Display | 3 | 3 | **3** | ✅ DONE |
| US-10 | page.tsx refactor | 8 | 8 | **8** | 🔴 HIGH (In Progress) |
| US-11 | Hero split editorial | 3 | 5 | **5** | 🔴 HIGH (In Progress) |
| US-12 | Dashboard horizontal bar | 3 | 3 | **3** | 🟡 MEDIUM |
| US-13 | CRM Concierge list | 5 | 5 | **5** | 🟡 MEDIUM |
| US-14 | Catalog lookbook layout | 3 | 3 | **3** | 🟢 LOW |
| US-15 | Quote single-column form | 2 | 2 | **2** | ✅ DONE |

**Total Épico 2**: 21 points (10 done, 11 remaining)

---

### ÉPICO 3: TESTES E QUALIDADE (My session)

| US | User Story | Hermes Vote | Final Points | Priority |
|----|-----------|-------------|--------------|----------|
| US-16 | Domain Tests | 5 | **5** | ✅ DONE |
| US-17 | Application Service Tests | 8 | **8** | 🔴 HIGH (In Progress) |
| US-18 | Controller Integration Tests | 8 | **8** | 🟡 MEDIUM |
| US-19 | Adapter Tests | 6 | **6** | 🟡 MEDIUM |
| US-20 | TestContainers PostgreSQL | 3 | **3** | 🟢 LOW |
| US-21 | JaCoCo 80% coverage | 1 | **1** | 🟢 LOW |
| US-22 | Jest + React Testing Library | 4 | **4** | 🟡 MEDIUM |
| US-23 | Component Tests frontend | 6 | **6** | 🟢 LOW |
| US-24 | E2E Tests Playwright | 8 | **8** | 🟢 LOW |

**Total Épico 3**: 49 points (5 done, 44 remaining)

---

### ÉPICO 5: DOCUMENTAÇÃO (My session)

| US | User Story | Hermes Vote | Final Points | Priority |
|----|-----------|-------------|--------------|----------|
| US-31 | README updated | 1 | **1** | ✅ DONE |
| US-32 | Architecture.md sync | 2 | **2** | ✅ DONE |
| US-33 | Design-System.md sync | 2 | **2** | ✅ DONE |
| US-34 | CONTRIBUTING.md | 1 | **1** | 🟢 LOW |
| US-35 | Fix .env.local commitado | 1 | **1** | 🔴 CRITICAL |

**Total Épico 5**: 7 points (5 done, 2 remaining)

---

## SPRINT 1 COMMITMENT (What we WILL deliver)

### ATENA (Backend): 24 points
- ✅ US-01: Customer Hexagonal (5) - In Progress
- 🔴 US-02: Order Hexagonal (8) - **CRITICAL - Build broken**
- 🟡 US-03: Appointment Hexagonal (5)
- 🟢 US-04: Inventory Hexagonal (3)
- 🟢 US-05: Campaign Hexagonal (3)

### VÊNUS (Frontend): 11 points remaining
- 🔴 US-10: page.tsx refactor (8) - In Progress
- 🔴 US-11: Hero split editorial (5) - In Progress

### HERMES (QA/PM): 10 points remaining
- 🔴 US-17: Application Service Tests (8) - In Progress
- 🟡 US-18: Controller Integration Tests (8) - Next
- 🟡 US-19: Adapter Tests (6)
- 🟡 US-22: Jest + React Testing Library (4)
- 🔴 US-35: Fix .env.local (1) - **CRITICAL**

**Total Sprint 1**: 45 points remaining (55 total - 10 done)

---

## PLANNING POKER RULES (Standardization)

### Commit Standards (ALL sessions MUST follow):
```
feat(scope): description
fix(scope): description
test(scope): description
docs(scope): description
refactor(scope): description
chore(scope): description
```

**Examples**:
- Atena: `feat(backend): implement Customer hexagonal (US-01)`
- Vênus: `feat(frontend): add Hero split layout (US-11)`
- Hermes: `test(backend): add CustomerApplicationServiceTest (US-17)`

### Branch Standards:
- Atena: `feature/backend-hexagonal`
- Vênus: `feature/frontend-v6`
- Hermes: `feature/tests-docs-ci`

### File Protection Rules:
| Session | CAN edit | CANNOT edit |
|---------|----------|--------------|
| Atena | `backend/src/main/**`, `backend/src/test/**` | `frontend/**`, `docs/sessoes/SESSION-2*.md` |
| Vênus | `frontend/**` | `backend/src/main/**`, `docs/sessoes/SESSION-1*.md` |
| Hermes | `backend/src/test/**`, `docs/**`, `SCRUM-BOARD.md` | `backend/src/main/**`, `frontend/app/**` |

---

## TEST SCENARIOS (Created by Hermes)

### US-17: Application Service Tests
**Test scenarios to create**:
1. ✅ `CustomerApplicationServiceTest.kt` (DONE)
2. 📋 `QuoteApplicationServiceTest.kt` (exists - validate)
3. 📋 `OrderApplicationServiceTest.kt` (needs creation)
4. 📋 `AppointmentApplicationServiceTest.kt`
5. 📋 `InventoryApplicationServiceTest.kt`
6. 📋 `CampaignApplicationServiceTest.kt`

### US-18: Controller Integration Tests
**Test scenarios to create**:
1. 📋 `CustomerControllerIntegrationTest.kt`
2. 📋 `QuoteControllerIntegrationTest.kt` (exists - validate)
3. 📋 `OrderControllerIntegrationTest.kt`
4. 📋 `AppointmentControllerIntegrationTest.kt`

### US-22: Jest + React Testing Library
**Test scenarios to create**:
1. 📋 `Header.test.tsx`
2. 📋 `HeroSection.test.tsx`
3. 📋 `GallerySection.test.tsx`
4. 📋 `ReviewsSection.test.tsx`
5. 📋 `QuoteForm.test.tsx`

---

## AUDIT RESULTS (Hermes as Tech Lead)

### ✅ What's DONE right:
1. Session identity files created (SESSION-1, SESSION-2, SESSION-3)
2. Handoffs documented (6 total, 2 CRITICAL)
3. US-16 Domain Tests complete
4. US-31, US-32, US-33 Documentation synced
5. Branch isolation (mostly) working

### ❌ What's WRONG (needs fix):
1. **Builds broken**: Atena (US-02) and Vênus (US-10) have broken builds
2. **Wrong branch commits**: Hermes committed to `feature/frontend-v6` by mistake
3. **Commit messages inconsistent**: Some commits use Portuguese, some English
4. **Missing test files**: `OrderResponse.kt`, `Header.module.css`
5. **.env.local issue**: US-35 still CRITICAL

### 🔴 CRITICAL NEXT STEPS (Priority order):

#### ATENA (Backend):
1. **FIX BUILD** (HERMES-004): Create `OrderResponse.kt` immediately
2. Complete US-01: Refactor CustomerController to use UseCase
3. Commit: `fix(backend): resolve OrderResponse build error (US-02)`

#### VÊNUS (Frontend):
1. **FIX BUILD** (HERMES-006): Create `Header.module.css` immediately
2. Complete US-10: Finish page.tsx refactor
3. Commit: `fix(frontend): add missing Header.module.css (US-10)`

#### HERMES (QA/PM):
1. **CRITICAL**: Fix US-35 (.env.local) - Audit git history
2. Complete US-17: Create remaining Application Service Tests
3. US-18: Controller Integration Tests
4. US-22: Setup Jest + React Testing Library
5. Validate other sessions' fixes

---

## PRODUCTIVITY PROMPTS (For each session)

### PROMPT FOR ATENA:
```
You are Atena Backend.
Branch: feature/backend-hexagonal
Tasks: US-01 (In Progress), US-02 (CRITICAL - fix build)
Steps:
1. Create OrderResponse.kt in adapter/input/web
2. Create extension: OrderEntity.toResponse(): OrderResponse
3. Run: cd backend && mvn -B clean test
4. Must pass before commit
5. Commit: fix(backend): resolve OrderResponse build error (US-02)
```

### PROMPT FOR VÊNUS:
```
You are Vênus UX Front.
Branch: feature/frontend-v6
Tasks: US-10 (In Progress), US-11 (In Progress)
Steps:
1. Create frontend/components/Header.module.css with styles
2. Run: cd frontend && npm run build
3. Must pass before commit
4. Finish US-10 before starting US-11
5. Commit: fix(frontend): add missing Header.module.css (US-10)
```

### PROMPT FOR HERMES (ME):
```
You are Hermes QA PM.
Branch: feature/tests-docs-ci ✅
Tasks: US-17 (In Progress), US-35 (CRITICAL), US-18, US-22
Steps:
1. US-35: Audit .env.local in git history, remove if needed
2. US-17: Create OrderApplicationServiceTest.kt
3. US-18: Setup TestContainers for integration tests
4. US-22: Setup Jest + RTL in frontend
5. Commit: test(backend): add OrderApplicationServiceTest (US-17)
```

---

**Planning Poker completed**: 2026-04-28 22:00 UTC  
**Next Sprint Planning**: 2026-05-12  
**Scrum Master**: Hermes QA PM
