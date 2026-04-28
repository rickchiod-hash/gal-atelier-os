# SUPER ROADMAP V6 — Editorial Atelier

**Data**: 2026-04-27
**Versão**: V6 (Editorial Atelier)

---

## 1. VISUAL DIRECTION (V6 Editorial Atelier)

### Filosofia

**"Editorial Atelier"** — O sistema não é um dashboard SaaS genérico. É uma experiência de marca premium para wigmakers:

- Loja de luxo + atelier artesanal
- CRM operacional com cara de concierge, não Kanban
- Whitespace generoso (o luxo é respirar)
- Tipografia com autoridade editorial (Playfair Display + Inter)
- Micro-accentos (máximo 2% da página)

### Paleta "Whisper Luxury"

#### Cores Base (80% da página)

| Token | Valor | Uso |
|-------|-------|-----|
| `--ivory` | `#FAF8F5` | Background principal (mais quente que off-white) |
| `--charcoal` | `#2C2C2C` | Texto principal (mais suave que preto) |
| `--blush` | `#E8DDD3` | Borders, hovers (neutro quente, não "nude") |

#### Accents (máximo 2% da página)

| Token | Valor | Uso |
|-------|-------|-----|
| `--bronze` | `#A67C52` | Ouro contido, não gritante |
| `--deep-espresso` | `#3D2B1F` | CTAs, botões filled (marrom profundo) |
| `--rose` | `#C1978E` | Hover states (rosa murcho) |

#### Semântica CSS

```css
--color-bg: var(--ivory);
--color-surface: #FFFFFF;
--color-text: var(--charcoal);
--color-text-muted: #8A8078;
--color-accent: var(--bronze);
--color-brand: var(--deep-espresso);
```

### Tipografia "Editorial Authority"

| Elemento | Fonte | Tamanho | Linha | Letter-spacing |
|----------|-------|---------|-------|----------------|
| H1 | Playfair Display | 3.5rem | 1.15 | -0.03em |
| H2 | Playfair Display | 2.5rem | 1.2 | normal |
| H3 | Playfair Display | 2rem | 1.25 | normal |
| Body | Inter | 1rem | 1.7 | normal |
| Labels | Inter | 0.75rem | 1 | 0.1em uppercase |

### Layout Rules (Anti-Dashboard)

| Seção | Regra V6 | Não Fazer |
|-------|----------|-----------|
| Hero | Split editorial (texto ESQ, imagem DIR) | Cards sobrepostos |
| Dashboard | Barra horizontal de insights | Grid de metric cards |
| CRM | Concierge list view | Kanban colorido |
| Catalog | Lookbook (1 full-width + 2-col) | Grid uniforme |
| Quote | Single-column border-bottom | Formulário em caixa |

### Micro-Interações "Polite"

- **Fade + deslocamento**: 20px up (não 30px)
- **Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` (não spring)
- **Duration**: 400ms (não 600-700ms)

---

## 2. COMPLETED ITEMS (V5 + V6 Docs)

### Roadmap Items (22 + Finalização)

| ID | Item | Status | Commit | Arquivo |
|----|------|--------|--------|---------|
| 1 | Design system premium | ✅ DONE | style(frontend) | globals.css |
| 2 | Hero e home | ✅ DONE | feat(frontend) | page.tsx |
| 3 | Quem somos | ✅ DONE | feat(frontend) | page.tsx |
| 4 | Dashboard principal | ✅ DONE | feat(frontend) | page.tsx |
| 5 | CRM de leads/pipeline | ✅ DONE | feat(frontend) | page.tsx |
| 6 | Diagnóstico da cliente | ✅ DONE | feat(frontend) | page.tsx |
| 7 | Clientes e perfil | ✅ DONE | feat(frontend) | page.tsx |
| 8 | Catálogo técnico | ✅ DONE | feat(frontend) | page.tsx |
| 9 | Pedidos | ✅ DONE | feat(frontend) | page.tsx |
| 10 | Produção/customização | ✅ DONE | feat(frontend) | page.tsx |
| 11 | Agenda | ✅ DONE | feat(frontend) | page.tsx |
| 12 | Estoque | ✅ DONE | feat(frontend) | page.tsx |
| 13 | Financeiro | ✅ DONE | feat(frontend) | page.tsx |
| 14 | WhatsApp/atendimento | ✅ DONE | feat(frontend) | page.tsx |
| 15 | Marketing e recompra | ✅ DONE | feat(frontend) | page.tsx |
| 16 | Reviews/galeria/área cliente | ✅ DONE | feat(frontend) | page.tsx |
| 17 | Orçamento atual | ✅ DONE | feat(frontend) | page.tsx |
| 18 | Backend read models | ✅ DONE | feat(backend) | *Controller.kt |
| 19 | Backend validações e testes | ✅ DONE | test(backend) | *Test.kt |
| 20 | Documentação produto e API | ✅ DONE | docs(product) | docs/* |
| 21 | Validação final | ✅ DONE | test(integration) | run all |
| 22 | Finalização | ✅ DONE | docs(validation) | SESSION-*-STATUS.md |

### Ajustes Finais V5

| ID | Etapa | Descrição | Status | Commit |
|----|------|-----------|--------|--------|
| AF1 | Banco de imagens | Catálogo com assets visuais | ✅ DONE | ea76322 |
| AF2 | Hero premium | Imagem hero + métricas mini | ✅ DONE | ea76322 |
| AF3 | CRM Pipeline | 10 estágios + 8 leads mock | ✅ DONE | ea76322 |
| AF4 | Quem somos | Pilares | ✅ DONE | ea76322 |
| AF5 | Empty states | Métricas com hints | ✅ DONE | ea76322 |
| AF6 | Como funciona | 8 etapas | ✅ DONE | ea76322 |
| AF7 | Catálogo premium | Filtros + cards | ✅ DONE | ea76322 |
| AF8 | UX crítica | Remover "Sessão B" | ✅ DONE | 2329634 |

### Fase 2 — Operações

| ID | Etapa | Descrição | Status | Commit |
|----|------|-----------|--------|--------|
| V2-1 | Pix webhook | Simulação | ✅ DONE | 87b2dea |
| V2-2 | CRM Kanban | Drag-and-drop | ✅ DONE | 87b2dea |
| V2-3 | Dashboard tempo real | Gráficos | ✅ DONE | 87b2dea |
| V2-4 | PDF orçamento | Download | ✅ DONE | 87b2dea |
| V2-5 | Histórico quotes | Filtros | ✅ DONE | 87b2dea |
| V2-6 | Fix H2 migration | PostgreSQL | ✅ DONE | 87b2dea |
| V2-7 | Campaigns CRUD | Full CRUD | ✅ DONE | feat: add campaigns CRUD |

### Sessão Atual — Controllers

| Endpoint | Método | Status |
|----------|--------|--------|
| /api/health | GET | ✅ |
| /api/quotes | GET/POST | ✅ |
| /api/quotes/metrics | GET | ✅ |
| /api/services | GET | ✅ |
| /api/pipeline | GET | ✅ |
| /api/dashboard | GET | ✅ |
| /api/leads | GET/POST/PATCH | ✅ |
| /api/diagnostics/recommendation | POST | ✅ |
| /api/templates/whatsapp | GET | ✅ |
| /api/customers | GET/POST/PATCH | ✅ |
| /api/orders | GET/POST/PATCH | ✅ |
| /api/inventory | GET/POST/PATCH | ✅ |
| /api/appointments | GET/POST/PATCH | ✅ |
| /api/finance | GET | ✅ |
| /api/campaign | GET/POST/PATCH | ✅ |
| /api/notifications/email | POST | ✅ |
| /api/webhook/pix | POST | ✅ |

---

## 3. V6 VISUAL OVERHAUL (PENDING)

### Prioridade Alta (Anti-Dashboard)

| ID | Item | Current State | Target V6 State | File to Modify |
|----|------|--------------|----------------|----------------|
| V6-1 | Hero split editorial | Cards overlaid on image | Split layout, text left/image right | page.tsx:413-453 |
| V6-2 | Dashboard horizontal bar | Grid of metric cards | Horizontal insights bar, no cards | page.tsx:458-545 |
| V6-3 | CRM Concierge list | Kanban drag-and-drop | List view with hover actions | page.tsx:550-603 |

### Prioridade Média (Editorial Atelier)

| ID | Item | Current State | Target V6 State | File to Modify |
|----|------|--------------|----------------|----------------|
| V6-4 | Catalog lookbook | Uniform grid cards | 1 full-width + 2-col grid | page.tsx:608-653 |
| V6-5 | Quote single-column | Form in a box | Border-bottom inputs, no box | page.tsx:658-856 |
| V6-6 | Buttons 2px radius | Pill-shaped (9999px) | border-radius: 2px | globals.css |
| V6-7 | Inputs border-bottom | Full borders | border-bottom only | globals.css |
| V6-8 | Remove gradients | Gradient overload | Solid colors only | globals.css |

### Prioridade Baixa (Polish)

| ID | Item | Current State | Target V6 State | File to Modify |
|----|------|--------------|----------------|----------------|
| V6-9 | Remove skeletons | Skeleton loaders | Text: "Carregando experiência..." | page.tsx:111-122 |
| V6-10 | Remove fake charts | SVG fake charts | Remove or use real data | page.tsx:499-543 |
| V6-11 | Micro-interactions | Bouncy animations | 400ms, cubic-bezier | globals.css |

---

## 4. EXECUTION ORDER (For Other Sessions)

```
Phase 1: Documentation (✅ DONE)
  └─ Commit: a6e6fa2 - All docs updated to V6

Phase 2: CSS Refactoring (🔄 IN PROGRESS)
  ├─ globals.css V6 tokens
  ├─ Remove gradients
  ├─ Buttons 2px radius
  ├─ Inputs border-bottom only
  └─ Micro-interactions 400ms
      Status: IN PROGRESS

Phase 3: Page.tsx Refactoring (🔄 PENDING)
  ├─ Hero split editorial
  ├─ Dashboard horizontal bar
  ├─ CRM Concierge list
  ├─ Catalog lookbook
  └─ Quote single-column
      Status: PENDING

Phase 4: Components Refactoring (🔄 PENDING)
  ├─ Header.tsx minimalist (logo + whitespace)
  ├─ Remove skeletons (use elegant text)
  └─ Toast polite transitions
      Status: PENDING

Phase 5: Testing & Validation (🔄 PENDING)
  ├─ npm run build
  ├─ mvn -B clean verify
  ├─ Anti-dashboard checklist
  └─ Visual validation at localhost:3000
      Status: PENDING
```

---

## 5. ANTI-DASHBOARD CHECKLIST (For Validators)

### Deve Ter

- [ ] Whitespace (mínimo 40% vazio)
- [ ] Playfair Display para títulos (H1, H2, H3)
- [ ] Inter para corpo
- [ ] Micro-accentos (máximo 2% da página)
- [ ] Micro-interações polite (400ms, cubic-bezier)
- [ ] Buttons com border-radius: 2px (não pill)
- [ ] Inputs com border-bottom only (não borda completa)
- [ ] Hero split editorial (texto ESQ, imagem DIR)
- [ ] Dashboard barra horizontal (não grid de cards)
- [ ] CRM Concierge list (não Kanban colorido)
- [ ] Catalog lookbook (1 full-width + 2-col)

### NÃO Deve Ter

- [ ] Metric cards com colored top borders
- [ ] Kanban colored columns (CRM)
- [ ] Fake SVG charts
- [ ] Skeleton loaders
- [ ] Pill-shaped buttons (border-radius: 9999px)
- [ ] Gradient overload (o luxo é sólido)
- [ ] Card-mania (caixas em tudo)
- [ ] Colored status badges (usar texto + ponto sutil)

---

## 6. FILES TO MODIFY (Priority Order)

### 1. `frontend/app/globals.css` (Phase 2)

Modificações necessárias:

- ✅ Adicionar V6 tokens de cor (`--ivory`, `--charcoal`, etc.)
- ✅ Adicionar tipografia (`--font-display`, `--font-body`)
- ✅ Adicionar espaçamento fluido com `clamp()`
- 🔄 Buttons: `border-radius: 2px` (não `9999px`)
- 🔄 Inputs: `border-bottom: 1px solid var(--blush)` (não borda completa)
- 🔄 Remover gradientes pesados
- 🔄 Micro-interações: `transition: 400ms cubic-bezier(0.25, 0.1, 0.25, 1)`

### 2. `frontend/app/page.tsx` (Phase 3)

Modificações necessárias:

- 🔄 Hero: Split editorial (texto ESQ, imagem DIR)
- 🔄 Dashboard: Barra horizontal de insights (não grid)
- 🔄 CRM: Concierge list (não Kanban drag-and-drop)
- 🔄 Catalog: Lookbook layout (1 full + 2-col)
- 🔄 Quote: Single-column border-bottom (não caixa)
- 🔄 Remover skeletons (usar texto elegante)
- 🔄 Remover gráficos SVG falsos

### 3. `frontend/components/Header.tsx` (Phase 4)

Modificações necessárias:

- 🔄 Minimalist (logo + whitespace)
- 🔄 Remover navigation items extras

### 4. `frontend/components/Toast.tsx` (Phase 4)

Modificações necessárias:

- 🔄 Backdrop blur
- 🔄 Posicionamento fixo inferior direito
- 🔄 Transições 400ms

### 5. Backend (SEM ALTERAÇÕES)

O backend NÃO precisa de alterações para V6. A API permanece a mesma.

---

## 7. COMMANDS FOR OTHER SESSIONS

### Session A (Frontend V6)

```bash
# Navigate to frontend
cd K:\dev\repos\gal-atelier-os\frontend

# Test build
npm run build

# Start dev server
npm run dev
```

### Session B (Backend — No Changes Needed)

```bash
# Navigate to backend
cd K:\dev\repos\gal-atelier-os\backend

# Run tests
mvn -B clean verify

# Start server
mvn spring-boot:run
```

### Session Validator

```bash
# 1. Read SUPER-ROADMAP-V6.md
notepad docs\SUPER-ROADMAP-V6.md

# 2. Run anti-dashboard checklist
grep -r "skeleton" frontend/app/page.tsx
grep -r "border-radius: 9999px" frontend/app/globals.css

# 3. Verify visuals
# Open http://localhost:3000

# 4. Run builds
cd frontend && npm run build
cd backend && mvn -B clean verify
```

### Docker Compose

```bash
# Start all services
docker compose -p gal-atelier-os up -d

# Check status
docker compose -p gal-atelier-os ps

# View logs
docker compose -p gal-atelier-os logs -f
```

---

## 8. STACK ATUAL (Respeitar)

### Backend

- Kotlin
- Spring Boot
- Maven
- Arquitetura hexagonal
- Domain não conhece Spring

### Frontend

- Next.js
- TypeScript
- CSS Modules com V6 tokens
- Anti-dashboard design

### Execução

- Docker Compose

---

## 9. QUICK LINKS

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Health: http://localhost:8080/api/health
- JaCoCo: backend/target/site/jacoco/index.html

---

## 10. CRITÉRIOS DE VALIDAÇÃO

### Em 3 segundos deve ficar claro que é:

- ✅ Loja de luxo + atelier artesanal
- ✅ NÃO dashboard SaaS genérico

### Visual deve ter:

- ✅ Playfair Display + Inter
- ✅ Whitespace (40% mínimo)
- ✅ Micro-accentos sutis (máximo 2%)
- ✅ Anti-dashboard

### Funcionalidades devem funcionar:

- ✅ Orçamento (quote)
- ✅ Pix mock
- ✅ WhatsApp
- ✅ CRM pipeline
- ✅ Catalog

### Testes devem passar:

- ✅ npm run build
- ✅ mvn -B clean verify

---

**Última atualização**: 2026-04-27 16:00 UTC