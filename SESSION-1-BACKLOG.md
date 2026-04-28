# SESSION 1 BACKLOG — Backend Hexagonal

**Sessão**: Sessão 1 (Backend Development)  
**Branch**: feature/backend-hexagonal  
**Sprint**: Sprint 1 (2026-04-28 a 2026-05-12)  
**Velocity**: ~36h (5 dias úteis)

---

## SPRINT 1 COMMITMENT

### CARD 1: Customer Hexagonal (US-01) — 🔄 IN PROGRESS
**Story Points**: 5  
**Status**: 🔄 In Progress (uncommitted files exist)

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-01 | Criar CustomerUseCase.kt | ✅ Done | 1h | 0h |
| T-02 | Criar CustomerApplicationService.kt | ✅ Done | 1h | 0h |
| T-03 | Refatorar CustomerController.kt para usar UseCase | 📋 To Do | 0h | 2h |
| T-04 | Criar Customer domain model (extrair de CustomerEntity) | 📋 To Do | 0h | 2h |
| T-05 | Commit: feat(backend): implement customer hexagonal | 📋 To Do | 0h | 0.5h |

**Definition of Done**:
- [ ] CustomerController usa CustomerUseCase (não JPA direto)
- [ ] CustomerApplicationService implementa CustomerUseCase
- [ ] CustomerRepositoryAdapter implementa CustomerRepositoryPort
- [ ] Testes unitários criados
- [ ] Build passando (mvn test)

---

### CARD 2: Order Hexagonal (US-02) — 📋 TO DO
**Story Points**: 5  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-06 | Criar OrderUseCase.kt interface | 📋 To Do | 0h | 1h |
| T-07 | Criar OrderApplicationService.kt | 📋 To Do | 0h | 2h |
| T-08 | Refatorar OrderController.kt | 📋 To Do | 0h | 2h |
| T-09 | Criar Order domain model | 📋 To Do | 0h | 3h |
| T-10 | Commit: feat(backend): implement order hexagonal | 📋 To Do | 0h | 0.5h |

---

### CARD 3: Appointment Hexagonal (US-03) — 📋 TO DO
**Story Points**: 5  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-11 | Criar AppointmentUseCase.kt | 📋 To Do | 0h | 1h |
| T-12 | Criar AppointmentApplicationService.kt | 📋 To Do | 0h | 2h |
| T-13 | Refatorar AppointmentsController.kt | 📋 To Do | 0h | 2h |
| T-14 | Commit: feat(backend): implement appointment hexagonal | 📋 To Do | 0h | 0.5h |

---

### CARD 4: Inventory Hexagonal (US-04) — 📋 TO DO
**Story Points**: 3  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-15 | Criar InventoryUseCase.kt | 📋 To Do | 0h | 1h |
| T-16 | Refatorar InventoryController.kt | 📋 To Do | 0h | 2h |
| T-17 | Commit: feat(backend): implement inventory hexagonal | 📋 To Do | 0h | 0.5h |

---

### CARD 5: Campaign Hexagonal (US-05) — 📋 TO DO
**Story Points**: 3  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-18 | Criar CampaignUseCase.kt | 📋 To Do | 0h | 1h |
| T-19 | Refatorar CampaignController.kt | 📋 To Do | 0h | 2h |
| T-20 | Commit: feat(backend): implement campaign hexagonal | 📋 To Do | 0h | 0.5h |

---

## DAILY SCRUM TEMPLATE (Session 1)

```
Data: YYYY-MM-DD
Sessão: 1 (Backend)

1. O que fiz ontem?
   - 

2. O que farei hoje?
   - 

3. Há algum impedimento?
   - 
```

---

## HOW TO PULL FROM PRODUCT BACKLOG

```bash
# 1. Leia o SCRUM-BOARD.md
notepad SCRUM-BOARD.md

# 2. Procure por US (User Stories) da Sprint 1 não atribuídas
# Exemplo: US-02, US-03, US-04, US-05

# 3. Atualize status no SCRUM-BOARD.md:
# Mude de 📋 To Do para 🔄 In Progress

# 4. Crie/atualize este arquivo com os detalhes
```

---

## DEFINITION OF DONE (Para cada Card)

1. ✅ Use Case interface criada em application/port/input/
2. ✅ Service implementado em application/service/
3. ✅ Controller refatorado para usar Use Case (não JPA direto)
4. ✅ Domain model extraído (se necessário)
5. ✅ Testes unitários criados
6. ✅ Build passando: cd backend && mvn -B clean verify
7. ✅ Commit com padrão: feat(backend): <mensagem>

---

**Última Atualização**: 2026-04-28 17:45 UTC  
**Atualizado por**: Sessão 3 (para Sessão 1)
