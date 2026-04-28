# SESSION 2 BACKLOG — Frontend V6 Editorial Atelier

**Sessão**: Sessão 2 (Frontend Improvements)  
**Branch**: feature/frontend-v6  
**Sprint**: Sprint 1 (2026-04-28 a 2026-05-12)  
**Velocity**: ~52.5h (7 dias úteis)

---

## SPRINT 1 COMMITMENT

### CARD 1: Playfair Display Typography (US-09) — ✅ DONE
**Story Points**: 3  
**Status**: ✅ Done (Commit: 133e652)  
**Priority**: 🔴 CRITICAL

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-31 | Importar Playfair Display via next/font/google | ✅ Done | 1h | 0h |
| T-32 | Corrigir --font-display no globals.css (linha 76) | ✅ Done | 0.5h | 0h |
| T-33 | Aplicar Playfair em H1, H2, H3 | ✅ Done | 2h | 0h |
| T-34 | Commit: style(frontend): add Playfair Display typography | ✅ Done | 0.5h | 0h |

**Definition of Done**:
- [ ] Playfair Display importado em layout.tsx
- [ ] --font-display mudado de 'Inter' para 'Playfair Display'
- [ ] Títulos usam font-display (verificar H1, H2, H3)
- [ ] Build passando (npm run build)

**⚠️ ATENÇÃO**: Este Card é BLOQUEANTE para outros Cards V6!

---

### CARD 2: page.tsx Refactoring (US-10) — 📋 TO DO
**Story Points**: 8  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-35 | Quebrar page.tsx em componentes (HeroSection, etc) | 📋 To Do | 0h | 6h |
| T-36 | Extrair 1064 linhas CSS inline para CSS modules | 📋 To Do | 0h | 4h |
| T-37 | Criar componentes: DashboardSection, CRMSection, etc | 📋 To Do | 0h | 4h |
| T-38 | Commit: refactor(frontend): break page.tsx into components | 📋 To Do | 0h | 0.5h |

---

### CARD 3: Hero Split Editorial (US-11) — 📋 TO DO
**Story Points**: 3  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-39 | Implementar split layout (texto ESQ, imagem DIR) | 📋 To Do | 0h | 3h |
| T-40 | Commit: feat(frontend): hero split editorial layout | 📋 To Do | 0h | 0.5h |

---

### CARD 4: V6 Compliance - Colors & Style (US-09 related) — 📋 TO DO
**Story Points**: 3  
**Status**: 📋 To Do

#### Tasks:
| Task ID | Task | Status | Hours Spent | Hours Remaining |
|----------|------|--------|-------------|-------------------|
| T-41 | Unificar paleta (resolver conflito Nubank vs Whisper) | 📋 To Do | 0h | 2h |
| T-42 | Reduzir accents para máximo 2% da página | 📋 To Do | 0h | 3h |
| T-43 | Validar inputs border-bottom only | 📋 To Do | 0h | 1h |
| T-44 | Commit: style(frontend): v6 compliance colors | 📋 To Do | 0h | 0.5h |

---

## DAILY SCRUM TEMPLATE (Session 2)

```
Data: YYYY-MM-DD
Sessão: 2 (Frontend)

1. O que fiz ontem?
   - 

2. O que farei hoje?
   - [CRÍTICO] T-31: Importar Playfair Display
   - 

3. Há algum impedimento?
   - 
```

---

## HOW TO PULL FROM PRODUCT BACKLOG

```bash
# 1. Leia o SCRUM-BOARD.md
notepad SCRUM-BOARD.md

# 2. Procure por US (User Stories) da Sprint 1 para Frontend
# Exemplo: US-09, US-10, US-11

# 3. ⚠️ ATENÇÃO: US-09 (Playfair) é CRÍTICO - faça primeiro!

# 4. Atualize status no SCRUM-BOARD.md:
# Mude de 📋 To Do para 🔄 In Progress

# 5. Crie/atualize este arquivo com os detalhes
```

---

## DEFINITION OF DONE (Para cada Card)

1. ✅ Design System V6 seguido (Playfair + Inter)
2. ✅ Whitespace mínimo 40%
3. ✅ Micro-accentos máximo 2%
4. ✅ Anti-dashboard: sem card-mania, sem Kanban
5. ✅ Micro-interações: 400ms, cubic-bezier
6. ✅ Build passando: cd frontend && npm run build
7. ✅ Commit com padrão: feat/fix/style(frontend): <mensagem>

---

## ⚠️ CRITICAL PATH (BLOQUEANTES)

```
T-31 (Playfair Import) → T-32 (--font-display fix) → T-33 (Apply to headings)
                                              ↓
                                    T-35 (page.tsx refactoring)
                                                ↓
                                    Outros cards V6 dependentes
```

**NÃO comece outros Cards sem terminar CARD 1 (Playfair)!**

---

**Última Atualização**: 2026-04-28 17:50 UTC  
**Atualizado por**: Sessão 3 (para Sessão 2)
