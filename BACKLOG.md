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
| FE-00 | Atelier Blue Palette | ✅ DONE | globals.css (#07111F Navy Black + #2563EB Royal Blue) - commit 3cb4259 |
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
| FE-01 | Playfair Display | ✅ DONE | globals.css:74 (next/font/google) - commit 3cb4259 |
| FE-02 | --font-display | ✅ DONE | globals.css:74 tem 'Playfair Display' |

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
**Nota**: Customer já está em progresso (uncommitted files). Seguir padrão: Controller → UseCase (input port) → ApplicationService → Domain → RepositoryPort (output port) → RepositoryAdapter.

| ID | Item | Descrição Detalhada (Tech Lead) | Arquivos Afetados | Estimativa |
|----|------|-----------|-------------------|------------|
| BE-01 | Customer Hexagonal | ✅ EM PROGRESSO (uncommitted) - refatorar<br>**Critério de Aceite**: CustomerController → CustomerUseCase (input port) → CustomerApplicationService → Customer domain model (isolado) → CustomerRepositoryPort (output port) → CustomerRepositoryAdapter. Sem imports de adapter em domain/application.<br>**Passos**:<br>1. Criar `domain.model.Customer.kt` (id, name, whatsapp, email, tier, totalSpent, ordersCount)<br>2. Criar `application.port.output.CustomerRepositoryPort.kt` (findById, findAll, save)<br>3. Refatorar `CustomerUseCase.kt` para usar domain model (remover imports de adapter.output)<br>4. Refatorar `CustomerApplicationService.kt` para usar Customer domain + CustomerRepositoryPort<br>5. Criar `CustomerRepositoryAdapter.kt` implementando CustomerRepositoryPort<br>6. Criar DTOs `CreateCustomerRequest`, `UpdateCustomerRequest`, `CustomerResponse` em `application.dto` ou `adapter.input.web`<br>7. Commit: `refactor(backend): complete customer hexagonal architecture`<br>**Prompt para Athena**: "Refatore Customer hexagonal seguindo arquitetura hexagonal estrita. Crie domain model Customer isolado. Use ports (input/output) sem imports de adapters. CustomerApplicationService deve depender apenas de ports e domain. CustomerController deve injetar apenas CustomerUseCase (input port). Veja exemplos em Quote hexagonal (Quote.kt, QuoteUseCase.kt, QuoteApplicationService.kt)." | CustomerController.kt, CustomerUseCase.kt, CustomerApplicationService.kt, Customer.kt (novo), CustomerRepositoryPort.kt (novo), CustomerRepositoryAdapter.kt (novo) | 3h restantes |
| BE-02 | Order Hexagonal | Criar OrderUseCase + OrderApplicationService<br>**Critério de Aceite**: OrderController injeta OrderUseCase; Order domain model isolado; RepositoryPort definido.<br>**Passos**: 1. Criar OrderUseCase.kt (input port), 2. Implementar OrderApplicationService.kt, 3. Extrair Order domain model, 4. Criar OrderRepositoryPort.kt, 5. Implementar OrderRepositoryAdapter.kt | OrderController.kt, OrderUseCase.kt, OrderApplicationService.kt, OrderRepositoryPort.kt, OrderRepositoryAdapter.kt | 4h |
| BE-03 | Appointment Hexagonal | Criar AppointmentUseCase<br>**Critério de Aceite**: AppointmentsController injeta AppointmentUseCase; Appointment domain model isolado.<br>**Passos**: 1. Criar AppointmentUseCase.kt, 2. Implementar AppointmentApplicationService.kt, 3. Extrair Appointment domain model, 4. Criar AppointmentRepositoryPort.kt, 5. Implementar AppointmentRepositoryAdapter.kt | AppointmentsController.kt, AppointmentUseCase.kt, AppointmentApplicationService.kt | 4h |
| BE-04 | Inventory Hexagonal | Criar InventoryUseCase<br>**Critério de Aceite**: InventoryController injeta InventoryUseCase; Inventory domain model isolado.<br>**Passos**: 1. Criar InventoryUseCase.kt, 2. Implementar InventoryApplicationService.kt, 3. Extrair Inventory domain model, 4. Criar InventoryRepositoryPort.kt, 5. Implementar InventoryRepositoryAdapter.kt | InventoryController.kt, InventoryUseCase.kt, InventoryApplicationService.kt | 3h |
| BE-05 | Campaign Hexagonal | Criar CampaignUseCase<br>**Critério de Aceite**: CampaignController injeta CampaignUseCase; Campaign domain model isolado.<br>**Passos**: 1. Criar CampaignUseCase.kt, 2. Implementar CampaignApplicationService.kt, 3. Extrair Campaign domain model, 4. Criar CampaignRepositoryPort.kt, 5. Implementar CampaignRepositoryAdapter.kt | CampaignController.kt, CampaignUseCase.kt, CampaignApplicationService.kt | 3h |
| BE-06 | Review Hexagonal | Criar ReviewUseCase<br>**Critério de Aceite**: ReviewController injeta ReviewUseCase; Review domain model isolado.<br>**Passos**: 1. Criar ReviewUseCase.kt, 2. Implementar ReviewApplicationService.kt, 3. Extrair Review domain model, 4. Criar ReviewRepositoryPort.kt, 5. Implementar ReviewRepositoryAdapter.kt | ReviewController.kt, ReviewUseCase.kt, ReviewApplicationService.kt | 3h |
| BE-07 | DiscountCoupon Hexagonal | Criar DiscountCouponUseCase<br>**Critério de Aceite**: DiscountCouponController injeta DiscountCouponUseCase; DiscountCoupon domain model isolado.<br>**Passos**: 1. Criar DiscountCouponUseCase.kt, 2. Implementar DiscountCouponApplicationService.kt, 3. Extrair DiscountCoupon domain model, 4. Criar DiscountCouponRepositoryPort.kt, 5. Implementar DiscountCouponRepositoryAdapter.kt | DiscountCouponController.kt, DiscountCouponUseCase.kt, DiscountCouponApplicationService.kt | 3h |
| BE-08 | SalesCommission Hexagonal | Criar SalesCommissionUseCase<br>**Critério de Aceite**: SalesCommissionController injeta SalesCommissionUseCase; SalesCommission domain model isolado.<br>**Passos**: 1. Criar SalesCommissionUseCase.kt, 2. Implementar SalesCommissionApplicationService.kt, 3. Extrair SalesCommission domain model, 4. Criar SalesCommissionRepositoryPort.kt, 5. Implementar SalesCommissionRepositoryAdapter.kt | SalesCommissionController.kt, SalesCommissionUseCase.kt, SalesCommissionApplicationService.kt | 3h |

### 1.2 DOMAIN MODELS (PRIORIDADE MÉDIA)
| ID | Item | Descrição Detalhada (Tech Lead) | Estimativa |
|----|------|-----------|------------|
| BE-09 | Extrair Domain Models | Criar Order, Customer, Appointment domain models<br>**Critério de Aceite**: Models em `domain.model` sem imports de Spring; Value objects usados.<br>**Passos**: 1. Refatorar Order.kt, 2. Refatorar Customer.kt, 3. Refatorar Appointment.kt, 4. Garantir encapsulamento | 6h |
| BE-10 | Remover Duplicação | OrderStatus enum duplicado (domain e entity)<br>**Critério de Aceite**: Apenas um OrderStatus em `domain.model`; Entity usa enum do domain.<br>**Passos**: 1. Manter apenas domain/OrderStatus.kt, 2. Atualizar entity/OrderStatus.kt para referenciar domain, 3. Ajustar imports | 1h |
| BE-11 | Value Objects | Criar Email, Phone, WhatsAppNumber<br>**Critério de Aceite**: Value objects imutáveis; validação na criação; usados nos domain models.<br>**Passos**: 1. Criar Email.kt, 2. Criar Phone.kt, 3. Criar WhatsAppNumber.kt, 4. Integrar nos models existentes | 3h |

### 1.3 SEGURANÇA E JWT
| ID | Item | Descrição Detalhada (Tech Lead) | Estimativa |
|----|------|-----------|------------|
| BE-12 | JWT Auth | ✅ EM PROGRESSO (uncommitted) - completar<br>**Critério de Aceite**: AuthController funcional; JwtService gera/valida tokens; endpoints protegidos.<br>**Passos**: 1. Completar AuthController.kt, 2. Finalizar JwtService.kt, 3. Configurar SecurityConfig.kt, 4. Testar fluxo login → token → acesso | 2h restantes |
| BE-13 | User Entity | Finalizar UserEntity e UserRepository<br>**Critério de Aceite**: UserEntity mapeado para tabela users; UserRepositoryPort implementado.<br>**Passos**: 1. Criar UserEntity.kt, 2. Criar UserRepositoryPort.kt, 3. Implementar UserRepositoryAdapter.kt, 4. Flyway migration V6 | 2h |
| BE-14 | Customer Portal Auth | Proteger endpoints<br>**Critério de Aceite**: Endpoints de customer requerem JWT válido; roles configuradas.<br>**Passos**: 1. Configurar SecurityConfig para customer endpoints, 2. Adicionar @PreAuthorize, 3. Testar acesso sem/sem token | 2h |

### 1.4 INTEGRAÇÕES EXTERNAS
| ID | Item | Descrição Detalhada (Tech Lead) | Estimativa |
|----|------|-----------|------------|
| BE-18 | Pix Real | Implementar API real (Mercado Pago/Asaas)<br>**Critério de Aceite**: PixPaymentPort implementado; gera QR Code real; webhook configurado.<br>**Passos**: 1. Escolher provider (Asaas recomendado), 2. Implementar PixPaymentAdapter.kt, 3. Configurar secrets, 4. Testar fluxo pagamento | 8h |
| BE-19 | WhatsApp Real | Implementar WhatsApp Business API<br>**Critério de Aceite**: WhatsAppMessagePort implementado; envia mensagens reais; webhook configurado.<br>**Passos**: 1. Configurar Meta Business API, 2. Implementar WhatsAppAdapter.kt, 3. Configurar templates, 4. Testar envio | 8h |
| BE-20 | Email Real | Implementar envio real<br>**Critério de Aceite**: EmailPort implementado; envia emails transacionais; templates HTML.<br>**Passos**: 1. Escolher provider (SendGrid/AWS SES), 2. Implementar EmailAdapter.kt, 3. Criar templates, 4. Testar envio | 4h |

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
| FE-04 | Quebrar page.tsx | ✅ EM PROGRESSO (já importa componentes HeroSection, ComoFuncionaSection, etc.) - completar refatoração | 2h restantes |
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
| FE-12 | Hero Split Editorial | ✅ DONE | HeroSection.tsx (split editorial implementado) | 0h |
| FE-13 | Dashboard Horizontal | 🔄 EM PROGRESSO - refatorar DashboardOperacionalSection<br>**Critério de Aceite**: Barra horizontal de insights (não grid de cards); usa `--font-display` para títulos; espaçamento fluido `clamp()`.<br>**Prompt para Venus**: "Refatore DashboardOperacionalSection.tsx para ser uma barra horizontal de insights (não grid de cards). Use layout flexível com `display: flex; overflow-x: auto`. Cada insight deve ter: 1. Label sutil (`--font-caption`, uppercase), 2. Valor em `--font-display`, 3. Micro-accento ciano no hover. Remova qualquer parência de card (box-shadow, border-radius > 2px). Siga o padrão de HeroSection.tsx." | 2h restantes |
| FE-14 | CRM Concierge List | 🔄 EM PROGRESSO - refatorar PipelineCRMSection<br>**Critério de Aceite**: Lista elegante (não Kanban colorido); linhas com hover actions; status com ponto sutil (não badges); usa `--font-display` para nomes.<br>**Prompt para Venus**: "Refatore PipelineCRMSection.tsx para ser uma Concierge List (não Kanban). Use lista vertical com linhas separadas por `border-bottom: 1px solid var(--color-border)`. Cada linha deve ter: 1. Nome do lead em `--font-display`, 2. Status com ponto sutil (ex: `●` com cor do status), 3. Ações (Editar, WhatsApp) que aparecem no hover. Remova colunas coloridas, badges de status, e qualquer parência de Jira. Siga o padrão de HeroSection.tsx." | 3h restantes |
| FE-15 | Catalog Lookbook | 🔄 EM PROGRESSO - refatorar CatalogoLookbookSection<br>**Critério de Aceite**: 1 destaque full-width + 2-col grid; sem cards idênticos; usa imagens reais; espaçamento fluido.<br>**Prompt para Venus**: "Refatore CatalogoLookbookSection.tsx para ser um Lookbook layout (não grid de cards idênticos). Use: 1. Primeiro item: full-width com imagem grande e texto sobreposto elegante, 2. Grid 2-col para os demais itens, 3. Cada item: imagem com hover zoom sutil, título em `--font-display`, preço em `--color-accent`. Evite box-shadow pesada, bordas coloridas, ou parência de e-commerce genérico. Siga o padrão de HeroSection.tsx." | 2h restantes |
| FE-16 | Quote Single-Column | ✅ JÁ FEITO (commit c2c1dc4) | 0h |

---

## 3. TESTES (PARA SESSÃO 3 - TESTS/DOCS/CI) - MINHA MISSÃO

### 3.1 BACKEND TESTS - EM PROGRESSO
| ID | Item | Status | Estimativa Restante |
|----|------|--------|---------------------|
| TE-01 | Domain Tests | ✅ DONE (122 testes - Money, Client, WigBriefing, ServiceCatalog, Quote, etc.) | 0h |
| TE-02 | Application Service Tests | ✅ JÁ EXISTEM (Quote, Customer, Order ApplicationService tests) | 6h (faltam outros Use Cases) |
| TE-03 | Controller Integration Tests | ✅ JÁ EXISTEM (Quote e Service) | 6h (faltam outros controllers) |
| TE-04 | Adapter Tests | ✅ JÁ EXISTEM (Pix e WhatsApp) | 4h (faltam Email, Repositories) |
| TE-05 | TestContainers | ⏳ PENDENTE | 3h |
| TE-06 | JaCoCo 80% | ⏳ FUTURO (atualmente 40% configured, build passa) | 1h |

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
| P0-CI-001 | Corrigir falhas dos workflows GitHub Actions | ✅ DONE | 0.5h |
| CI-01 | Fix run-all-v5.ps1 | ✅ DONE (sem bugs encontrados) | 1h |
| CI-02 | Makefile | ✅ DONE (já existe) | 2h |
| CI-03 | GitHub Actions Expand | ✅ DONE (ci.yml, docker-build.yml, security.yml) | 4h |
| CI-04 | Prettier | ✅ DONE (config já existe) | 1h |
| CI-05 | ktlint/detekt | ⏳ FUTURO (muitos wildcard imports para corrigir manualmente) | 2h |
| CI-07 | Docker Compose Improvements | ✅ DONE (docker-compose.yml já completo + start-dev.sh) | 2h |

---

## 5. DOCUMENTAÇÃO (PARA SESSÃO 3)

| ID | Item | Status | Estimativa |
|----|------|--------|------------|
| DO-01 | Swagger/OpenAPI | ✅ DONE (OpenApiConfig.kt criado) | 3h |
| DO-02 | README Update | ✅ DONE (workflows atualizado) | 1h |
| DO-03 | ARCHITECTURE.md Sync | ✅ DONE (Swagger + branch strategy) | 2h |
| DO-04 | DESIGN-SYSTEM.md Sync | ✅ DONE (já alinhado) | 2h |
| DO-05 | CONTRIBUTING.md | ✅ DONE | 1h |
| DO-06 | Fix .env.local | ✅ DONE | 0.5h |

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
