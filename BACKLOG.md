# BACKLOG — Gal Atelier OS

**Data da Revisão**: 2026-04-28  
**Revisor**: AI Code Reviewer (Sessão 3 - Tests/Docs/CI)  
**Status Atual**: Fase 2 em progresso, V6 Visual Overhaul ✅ (frontend parcial)

---

## STATUS ATUAL — O QUE JÁ FOI IMPLEMENTADO (NÃO REFAZER)

### ✅ BACKEND CONCLUÍDO
| ID | Item | Status | Commit/Arquivo |
|----|------|--------|-----------------|
| BE-00 | TraceId Filter | ✅ DONE | WebConfiguration.kt (commit aee7f05) |
| BE-00 | Quote Hexagonal | ✅ DONE | QuoteController → QuoteApplicationService → Quote domain |
| BE-00 | Money Value Object | ✅ DONE | Money.kt |
| BE-00 | QuotePricingPolicy | ✅ DONE | QuotePricingPolicy.kt |
| BE-00 | Flyway Migrations V1-V5 | ✅ DONE | backend/src/main/resources/db/migration/ |
| BE-00 | PostgreSQL Config | ✅ DONE | application.yml, pom.xml (commit cd75bd2) |
| BE-00 | H2 Test Profile | ✅ DONE | application-test.yml (commit c28aec9) |
| BE-00 | StaticPixPaymentAdapter | ✅ DONE | StaticPixPaymentAdapter.kt |
| BE-00 | WhatsAppWebAdapter | ✅ DONE | WhatsAppWebAdapter.kt |
| BE-00 | MockEmailAdapter | ✅ DONE | MockEmailAdapter.kt |
| BE-00 | InMemoryQuoteRepository | ✅ DONE | InMemoryQuoteRepository.kt |
| BE-00 | 16 API Endpoints | ✅ DONE | Controllers: Quote, Customer, Order, Inventory, etc. |
| BE-00 | OrderStatus Enum | ✅ DONE | OrderStatus.kt (domain), OrderStatus.kt (entity - DUPLICADO) |
| BE-00 | BriefingType Enum | ✅ DONE | BriefingType.kt |
| BE-00 | ServiceCatalog | ✅ DONE | ServiceCatalog.kt (10 tipos) |
| BE-00 | WigBriefing Domain | ✅ DONE | WigBriefing.kt |
| BE-00 | Client Domain | ✅ DONE | Client.kt |
| BE-00 | Quote Domain | ✅ DONE | Quote.kt |
| BE-00 | JWT Iniciado | 🔄 EM PROGRESSO | AuthController.kt, JwtService.kt (uncommitted changes) |
| BE-00 | CustomerUseCase | 🔄 EM PROGRESSO | CustomerUseCase.kt, CustomerApplicationService.kt (uncommitted) |

### ✅ FRONTEND CONCLUÍDO
| ID | Item | Status | Commit/Arquivo |
|----|------|--------|-----------------|
| FE-00 | Design Tokens V6 | ✅ DONE | globals.css (spacing fluido clamp()) |
| FE-00 | Nubank Palette | ✅ DONE | globals.css (#1A1A2E + #820AD1) - commit 3cb4259 |
| FE-00 | Quote Form Single-Column | ✅ DONE | page.tsx - commit c2c1dc4 |
| FE-00 | Remove Gradients | ✅ DONE | globals.css - commit 1977646 |
| FE-00 | Border-radius 2px | ✅ DONE | globals.css - commit e01fc3d |
| FE-00 | Hero Section | ✅ DONE | page.tsx |
| FE-00 | Dashboard Section | ✅ DONE | page.tsx |
| FE-00 | CRM Section | ✅ DONE | page.tsx (Kanban - NÃO é Concierge List) |
| FE-00 | Catalog Section | ✅ DONE | page.tsx |
| FE-00 | Toast Notifications | ✅ DONE | Toast.tsx |
| FE-00 | Header Minimalist | ✅ DONE | Header.tsx |
| FE-00 | Theme Provider | ✅ DONE | ThemeProvider.tsx |
| FE-00 | Login Page | ✅ DONE | app/login/page.tsx |
| FE-00 | Portal Page | ✅ DONE | app/portal/page.tsx |
| FE-01 | Playfair Display | ❌ PENDENTE | NÃO importado (crítico!) |
| FE-02 | --font-display | ❌ PENDENTE | Está 'Inter', deveria ser 'Playfair Display' |

### ✅ TESTES JÁ EXISTENTES (NÃO REFAZER)
| Arquivo | Status |
|----------|--------|
| QuotePricingPolicyTest.kt | ✅ EXISTS |
| QuoteApplicationServiceTest.kt | ✅ EXISTS |
| QuoteControllerIntegrationTest.kt | ✅ EXISTS |
| ServiceControllerTest.kt | ✅ EXISTS |
| StaticPixPaymentAdapterTest.kt | ✅ EXISTS |
| WhatsAppWebAdapterTest.kt | ✅ EXISTS |
| MoneyTest.kt | ✅ CRIADO (Sessão 3) |
| ClientTest.kt | ✅ CRIADO (Sessão 3) |
| WigBriefingTest.kt | ✅ CRIADO (Sessão 3) |

### ✅ INFRA/CI/CD CONCLUÍDO
| ID | Item | Status |
|----|------|--------|
| CI-00 | Docker Compose | ✅ DONE |
| CI-00 | GitHub Actions Basic | ✅ DONE (backend-test, frontend-build) |
| CI-00 | Scripts .bat | ✅ DONE (12 scripts) |
| CI-00 | run-all-v5.ps1 | ✅ DONE (mas tem bug gradlew) |
| DO-00 | docs/* | ✅ DONE (16+ arquivos) |
| DO-00 | README.md | ✅ EXISTS |
| DO-00 | AGENTS.md | ✅ EXISTS |

---

## 1. ARQUITETURA HEXAGONAL (PARA SESSÃO 1 - BACKEND)

### 1.1 REFATORAÇÃO HEXAGONAL (PRIORIDADE ALTA)
**Nota**: Customer já está em progresso (uncommitted files)

| ID | Item | Descrição | Arquivos Afetados | Estimativa |
|----|------|-----------|-------------------|------------|
| BE-01 | Customer Hexagonal | ✅ EM PROGRESSO (uncommitted) - completar | CustomerController.kt, CustomerUseCase.kt, CustomerApplicationService.kt | 2h restantes |
| BE-02 | Order Hexagonal | Criar OrderUseCase + OrderApplicationService | OrderController.kt, OrderUseCase.kt, OrderApplicationService.kt, OrderRepositoryPort.kt, OrderRepositoryAdapter.kt | 4h |
| BE-03 | Appointment Hexagonal | Criar AppointmentUseCase | AppointmentsController.kt, AppointmentUseCase.kt | 4h |
| BE-04 | Inventory Hexagonal | Criar InventoryUseCase | InventoryController.kt, InventoryUseCase.kt | 3h |
| BE-05 | Campaign Hexagonal | Criar CampaignUseCase | CampaignController.kt, CampaignUseCase.kt | 3h |
| BE-06 | Review Hexagonal | Criar ReviewUseCase | ReviewController.kt, ReviewUseCase.kt | 3h |
| BE-07 | DiscountCoupon Hexagonal | Criar DiscountCouponUseCase | DiscountCouponController.kt, DiscountCouponUseCase.kt | 3h |
| BE-08 | SalesCommission Hexagonal | Criar SalesCommissionUseCase | SalesCommissionController.kt, SalesCommissionUseCase.kt | 3h |

### 1.2 DOMAIN MODELS (PRIORIDADE MÉDIA)
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| BE-09 | Extrair Domain Models | Criar Order, Customer, Appointment domain models | 6h |
| BE-10 | Remover Duplicação | OrderStatus enum duplicado (domain e entity) | 1h |
| BE-11 | Value Objects | Criar Email, Phone, WhatsAppNumber | 3h |

### 1.3 SEGURANÇA E JWT
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| BE-12 | JWT Auth | ✅ EM PROGRESSO (uncommitted) - completar | 2h restantes |
| BE-13 | User Entity | Finalizar UserEntity e UserRepository | 2h |
| BE-14 | Customer Portal Auth | Proteger endpoints | 2h |

### 1.4 INTEGRAÇÕES EXTERNAS
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| BE-18 | Pix Real | Implementar API real (Mercado Pago/Asaas) | 8h |
| BE-19 | WhatsApp Real | Implementar WhatsApp Business API | 8h |
| BE-20 | Email Real | Implementar envio real | 4h |

---

## 2. FRONTEND V6 (PARA SESSÃO 2 - FRONTEND)

### 2.1 CRÍTICO — TIPOGRAFIA
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| FE-01 | Importar Playfair Display | ❌ CRÍTICO NÃO FEITO - next/font/google | 1h |
| FE-02 | Corrigir --font-display | ❌ CRÍTICO - globals.css:76 tem 'Inter' | 0.5h |
| FE-03 | Aplicar Playfair | Garantir H1, H2, H3 usem Playfair | 2h |

### 2.2 REFATORAÇÃO page.tsx
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| FE-04 | Quebrar page.tsx | 2201 linhas → componentes | 6h |
| FE-05 | Extrair CSS inline | 1064 linhas style jsx global → CSS modules | 4h |
| FE-06 | Criar componentes | HeroSection.tsx, DashboardSection.tsx, etc. | 4h |

### 2.3 V6 COMPLIANCE
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| FE-07 | Unificar paleta | Resolver conflito Nubank vs Whisper Luxury | 2h |
| FE-08 | Reduzir accents | Máximo 2% da página | 3h |
| FE-09 | Remover gradientes | ✅ JÁ FEITO (commit 1977646) | 0h |
| FE-10 | Corrigir border-radius | ✅ JÁ FEITO (commit e01fc3d) | 0h |
| FE-11 | Inputs border-bottom | Validar todos inputs | 1h |

### 2.4 V6 LAYOUTS
| ID | Item | Descrição | Estimativa |
|----|------|-----------|------------|
| FE-12 | Hero Split Editorial | Texto ESQ, imagem DIR | 3h |
| FE-13 | Dashboard Horizontal | Barra horizontal (não grid) | 3h |
| FE-14 | CRM Concierge List | Lista elegante (não Kanban) | 4h |
| FE-15 | Catalog Lookbook | 1 full-width + 2-col grid | 3h |
| FE-16 | Quote Single-Column | ✅ JÁ FEITO (commit c2c1dc4) | 0h |

---

## 3. TESTES (PARA SESSÃO 3 - TESTS/DOCS/CI) - MINHA MISSÃO

### 3.1 BACKEND TESTS - EM PROGRESSO
| ID | Item | Status | Estimativa Restante |
|----|------|--------|---------------------|
| TE-01 | Domain Tests | 🔄 EM PROGRESSO (Money, Client, WigBriefing feitos) | 2h (faltam ServiceCatalog, Quote) |
| TE-02 | Application Service Tests | ✅ QuoteApplicationServiceTest JÁ EXISTE | 6h (faltam outros Use Cases) |
| TE-03 | Controller Integration Tests | ✅ Quote e Service JÁ EXISTEM | 6h (faltam outros controllers) |
| TE-04 | Adapter Tests | ✅ Pix e WhatsApp JÁ EXISTEM | 4h (faltam Email, Repositories) |
| TE-05 | TestContainers | ❌ PENDENTE | 3h |
| TE-06 | JaCoCo 80% | ❌ PENDENTE | 1h |

### 3.2 FRONTEND TESTS
| ID | Item | Status | Estimativa |
|----|------|--------|------------|
| TE-07 | Jest/React Testing Library | ❌ PENDENTE | 4h |
| TE-08 | Component Tests | ❌ PENDENTE | 6h |
| TE-09 | E2E Tests Playwright | ❌ PENDENTE | 8h |

---

## 4. CI/CD E SCRIPTS (PARA SESSÃO 3)

| ID | Item | Status | Estimativa |
|----|------|--------|------------|
| CI-01 | Fix run-all-v5.ps1 | ❌ PENDENTE (referencia gradlew) | 1h |
| CI-02 | Makefile | ❌ PENDENTE | 2h |
| CI-03 | GitHub Actions Expand | ❌ PENDENTE | 4h |
| CI-04 | Prettier | ❌ PENDENTE | 1h |
| CI-05 | ktlint/detekt | ❌ PENDENTE | 2h |
| CI-07 | Docker Compose Improvements | ❌ PENDENTE | 2h |

---

## 5. DOCUMENTAÇÃO (PARA SESSÃO 3)

| ID | Item | Status | Estimativa |
|----|------|--------|------------|
| DO-01 | Swagger/OpenAPI | ❌ PENDENTE | 3h |
| DO-02 | README Update | ❌ PENDENTE | 1h |
| DO-03 | ARCHITECTURE.md Sync | ❌ PENDENTE | 2h |
| DO-04 | DESIGN-SYSTEM.md Sync | ❌ PENDENTE | 2h |
| DO-05 | CONTRIBUTING.md | ❌ PENDENTE | 1h |
| DO-06 | Fix .env.local | ❌ CRÍTICO (commitado) | 0.5h |

---

## 6. ESTIMATIVA DE CONCLUSÃO (3 SESSÕES PARALELAS)

### O Que Cada Sessão Deve Fazer:

**SESSÃO 1 (Backend - feature/backend-hexagonal)**:
- BE-01 a BE-08: Hexagonal refatoring (20h restantes)
- BE-09 a BE-11: Domain models (10h)
- BE-12 a BE-14: JWT/Security (6h restantes)
- BE-18 a BE-20: Integrações (20h)
- **Total S1**: ~36h (~5 dias úteis)

**SESSÃO 2 (Frontend - feature/frontend-v6)**:
- FE-01 a FE-03: Playfair Display (3.5h) - **CRÍTICO**
- FE-04 a FE-06: page.tsx refactoring (14h)
- FE-07, FE-08, FE-11: V6 compliance (6h)
- FE-12 a FE-15: V6 layouts (13h)
- FE-17 a FE-23: Architecture + Accessibility (16h)
- **Total S2**: ~52.5h (~7 dias úteis)

**SESSÃO 3 (Tests/Docs - feature/tests-docs-ci)** - **ESTOU AQUI**:
- TE-01 a TE-06: Backend tests (16h restantes)
- TE-07 a TE-09: Frontend tests (18h)
- CI-01 a CI-07: CI/CD (12h)
- DO-01 a DO-06: Docs (9.5h)
- **Total S3**: ~55.5h (~7 dias úteis)

### Tempo Total com 3 Sessões Paralelas: **~7 dias úteis** (a sessão mais lenta define)

---

## 7. OBSERVAÇÕES PARA EVITAR RETRABALHO

### ⚠️ ATENÇÃO SESSÃO 1 (Backend):
- CustomerUseCase.kt e CustomerApplicationService.kt **JÁ EXISTEM** (uncommitted)
- AuthController.kt e JwtService.kt **JÁ ESTÃO SENDO ALTERADOS** (uncommitted)
- Não recrie o que já está em progresso, apenas complete e commit

### ⚠️ ATENÇÃO SESSÃO 2 (Frontend):
- Playfair Display **NÃO está importado** - deve ser a primeira tarefa
- globals.css **JÁ TEM** design tokens, clamp(), cores Nubank
- page.tsx **JÁ TEM** seções mas precisa de refactoring

### ⚠️ ATENÇÃO SESSÃO 3 (Tests/Docs - EU):
- MoneyTest.kt, ClientTest.kt, WigBriefingTest.kt **ACABEI DE CRIAR**
- QuotePricingPolicyTest.kt, QuoteApplicationServiceTest.kt **JÁ EXISTEM**
- Não recriar testes existentes

---

**Última Atualização**: 2026-04-28 17:00 UTC  
**Próxima Atualização**: Após conclusão de cada tarefa
