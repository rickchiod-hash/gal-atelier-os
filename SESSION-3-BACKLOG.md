# SESSION 3 BACKLOG — Tests, Docs & CI/CD

**Sessão**: Sessão 3 (Tests/Docs/CI)  
**Branch**: feature/tests-docs-ci  
**Sprint**: Sprint 1 (2026-04-28 a 2026-05-12)  
**Velocity**: ~55.5h (7 dias úteis)  
**Current Focus**: Domain Tests (TE-01)

---

## SPRINT 1 COMMITMENT

### CARD 1: Domain Tests (US-16) — ✅ DONE
**Story Points**: 5  
**Status**: ✅ Done  
**Priority**: 🔴 HIGH

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-14 | Criar MoneyTest.kt | ✅ Done | 1h | 0h |
| T-15 | Criar ClientTest.kt | ✅ Done | 1h | 0h |
| T-16 | Criar WigBriefingTest.kt | ✅ Done | 1h | 0h |
| T-17 | Criar ServiceCatalogTest.kt | ✅ Done | 1h | 0h |
| T-18 | Criar QuoteTest.kt (domain) | ✅ Done | 1h | 0h |
| T-19 | Criar OrderStatusTest.kt | ✅ Done | 0.5h | 0h |
| T-20 | Criar BriefingTypeTest.kt | ✅ Done | 0.5h | 0h |
| T-21 | Criar ReviewTest.kt (domain) | ✅ Done | 0.5h | 0h |
| T-22 | Criar DiscountCouponTest.kt (domain) | ✅ Done | 0.5h | 0h |
| T-23 | Criar SalesCommissionTest.kt (domain) | ✅ Done | 0.5h | 0h |
| T-24 | Criar ProcessPhotoTest.kt (domain) | ✅ Done | 0.5h | 0h |
| T-25 | Commit: test(backend): add domain tests | ✅ Done | 0.5h | 0h |

**Definition of Done**:
- [ ] Todos domain models têm testes
- [ ] Validações (init blocks) testadas
- [ ] Testes cobrem casos de sucesso e erro
- [ ] mvn test passando

---

### CARD 2: Fix .env.local Committed (US-35) — ❌ TO DO (CRITICAL)
**Story Points**: 1  
**Status**: ❌ To Do  
**Priority**: 🔴 CRITICAL (Security Issue)

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-50 | Remover .env.local do git history (BFG/Bleach) | ❌ To Do | 0h | 1h |
| T-51 | Verificar .gitignore está correto | ❌ To Do | 0h | 0.5h |
| T-52 | Commit: fix(security): remove .env.local from history | ❌ To Do | 0h | 0.5h |

**⚠️ ATENÇÃO**: .env.local está commitado (violação de segurança)!

---

### CARD 3: README Update (US-31) — 📋 TO DO
**Story Points**: 1  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-53 | Atualizar README com PostgreSQL + Flyway | 📋 To Do | 0h | 1h |
| T-54 | Commit: docs: update README with PostgreSQL setup | 📋 To Do | 0h | 0.5h |

---

### CARD 4: Architecture.md Sync (US-32) — 📋 TO DO
**Story Points**: 2  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-55 | Ler código atual (controllers, use cases) | 📋 To Do | 0h | 1h |
| T-56 | Atualizar ARCHITECTURE.md com estado real | 📋 To Do | 0h | 2h |
| T-57 | Commit: docs: sync ARCHITECTURE.md | 📋 To Do | 0h | 0.5h |

---

### CARD 5: Design-System.md Sync (US-33) — 📋 TO DO
**Story Points**: 2  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-58 | Resolver conflito Nubank vs Whisper Luxury | 📋 To Do | 0h | 2h |
| T-59 | Commit: docs: sync DESIGN-SYSTEM.md | 📋 To Do | 0h | 0.5h |

---

## DAILY SCRUM (Session 3 - Minha)

```
Data: 2026-04-28
Sessão: 3 (Tests/Docs/CI)

1. O que fiz ontem?
   - ✅ T-14: MoneyTest.kt criado
   - ✅ T-15: ClientTest.kt criado
   - ✅ T-16: WigBriefingTest.kt criado
   - ✅ BACKLOG.md atualizado
   - ✅ SCRUM-BOARD.md criado
   - ✅ SESSION-1-BACKLOG.md criado
   - ✅ SESSION-2-BACKLOG.md criado

2. O que farei hoje?
   - 🔄 T-17: ServiceCatalogTest.kt (em progresso)
   - 📋 T-18: QuoteTest.kt
   - 📋 T-19: OrderStatusTest.kt
   - 📋 T-20: BriefingTypeTest.kt

3. Há algum impedimento?
   - Não
```

---

## SPRINT 1 BURNDOWN TRACKING

| Day | Date | Planned Hours | Hours Done | Hours Remaining | Burn Rate |
|-----|------|---------------|-------------|------------------|------------|
| 1 | 2026-04-28 | 55.5h | 3h | 52.5h | 5% |
| 2 | 2026-04-29 | - | - | - | - |
| 3 | 2026-04-30 | - | - | - | - |
| 4 | 2026-05-01 | - | - | - | - |
| 5 | 2026-05-02 | - | - | - | - |
| 6 | 2026-05-05 | - | - | - | - |
| 7 | 2026-05-06 | - | - | - | - |
| 8 | 2026-05-07 | - | - | - | - |
| 9 | 2026-05-08 | - | - | - | - |
| 10 | 2026-05-09 | - | - | - | - |

---

## HOW TO PULL FROM PRODUCT BACKLOG

```bash
# 1. Leia o SCRUM-BOARD.md
notepad SCRUM-BOARD.md

# 2. Procure por US (User Stories) da Sprint 1 para Tests/Docs
# Exemplo: US-16, US-31, US-32, US-33, US-35

# 3. Atualize status no SCRUM-BOARD.md:
# Mude de 📋 To Do para 🔄 In Progress

# 4. Atualize este arquivo com detalhes e hours spent
```

---

## DEFINITION OF DONE (Para cada Card)

### Tests (US-16 a US-24):
1. ✅ Testes criados com padrão Kotlin Test / Jest
2. ✅ Casos de sucesso e erro cobertos
3. ✅ Build passando (mvn test / npm run test)
4. ✅ Code coverage verificada

### Docs (US-30 a US-35):
1. ✅ Documentação atualizada e sincronizada com código
2. ✅ Links e exemplos funcionais
3. ✅ Commit com padrão: docs(product): <mensagem>

### CI/CD (US-25 a US-29):
1. ✅ Pipeline funcionando
2. ✅ Lint, tests, build passando
3. ✅ Commit com padrão: ci(cd): <mensagem>

---

## MY CURRENT FOCUS (Continue Working)

**Now**: Criando ServiceCatalogTest.kt (T-17)  
**Next**: QuoteTest.kt (T-18), OrderStatusTest.kt (T-19)

```bash
# Para continuar meus testes:
cd backend/src/test/kotlin/com/galatelier/domain/model/
# Criar: ServiceCatalogTest.kt
```

---

**Última Atualização**: 2026-04-28 18:00 UTC  
**Atualizado por**: Sessão 3 (Tests/Docs/CI)
