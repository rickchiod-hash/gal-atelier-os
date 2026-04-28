# BACKLOG — Gal Atelier OS (30 Itens Críticos)

**Data**: 2026-04-28  
**Foco**: Frontend UX, Responsividade, WebDesigner, Experiência do Cliente  
**Especialista**: UX Nível Especialista + WebDesigner

---

## 1. EXPERIÊNCIA DO CLIENTE (Customer Experience)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| UX-01 | **Onboarding Visual** | Criar fluxo de boas-vindas para nova cliente com animação suave (fade-in) | 🔴 Alta | 4h |
| UX-02 | **Loading States Elegantes** | Substituir "Carregando..." por textos editoriais ("Preparando sua experiência...", "Consultando catálogo...") | 🔴 Alta | 2h |
| UX-03 | **Feedback Visual Premium** | Micro-interações em toasts: backdrop blur, posicionamento fixo inferior direito, 400ms easing | 🔴 Alta | 3h |
| UX-04 | **Empty States Informativos** | Estados vazios com ilustrações sutis e textos que ensinam a usar (não "Nenhum item encontrado") | 🟡 Médio | 3h |
| UX-05 | **Error States Editoriais** | Erros com tipografia clara, tom elegante (não alertas vermelhas gritantes) | 🔴 Alta | 2h |
| UX-06 | **Success Flows** | Celebração visual sutil ao completar ações (orçamento enviado, pedido criado) | 🟡 Médio | 3h |

---

## 2. WEBDESIGNER — VISUAL EDITORIAL (Design System V6)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| WD-01 | **Playfair Display Global** | Garantir que TODOS títulos (H1, H2, H3, seções) usem Playfair Display + Inter | 🔴 Crítico | 2h |
| WD-02 | **Whitespace Dinâmico** | Implementar `clamp()` para todas as margens/espaçamentos (mínimo 40% vazio) | 🔴 Alta | 3h |
| WD-03 | **Micro-Accents Precisos** | Garantir que cores de accent (magenta #820AD1) ocupem MÁXIMO 2% da página | 🔴 Alta | 2h |
| WD-04 | **Hero Split Editorial** | Implementar layout split (texto ESQ, imagem DIR) com animação de entrada | 🔴 Alta | 4h |
| WD-05 | **Lookbook Catalog** | 1 destaque full-width + grid 2-colunas (não uniforme) com hover effects sutis | 🔴 Alta | 5h |
| WD-06 | **Concierge CRM List** | Lista elegante com avatar, hover actions (não Kanban colorido) | 🔴 Alta | 4h |
| WD-07 | **Dashboard Horizontal Bar** | Barra horizontal de insights (não grid de metric cards) | 🔴 Alta | 3h |
| WD-08 | **Typography Hierarchy** | H1=3.5rem, H2=2.5rem, H3=2rem, Body=1rem com line-height 1.7 | 🔴 Alta | 2h |

---

## 3. MENUS E NAVEGAÇÃO

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| MN-01 | **Header Minimalista** | Logo + whitespace generoso (não menu inchado), mobile drawer elegante | 🔴 Alta | 3h |
| MN-02 | **Breadcrumbs Invisíveis** | Navegação contextual sutil (não breadcrumbs tradicionais) | 🟡 Médio | 2h |
| MN-03 | **Footer Editorial** | Footer com tipografia hierárquica, links organizados, whitespace | 🟢 Baixa | 2h |
| MN-04 | **Skip Links (Acessibilidade)** | Links para pular navegação (WCAG 2.1 AA) | 🔴 Alta | 1h |
| MN-05 | **Active States Sutis** | Indicação sutil de página ativa (não cores gritantes) | 🟡 Médio | 1h |
| MN-06 | **Mobile Menu Experience** | Menu mobile com animação fade + slide, fácil fechamento | 🔴 Alta | 3h |

---

## 4. RESPONSIVIDADE (Mobile-First com Elegância)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| RP-01 | **Mobile Hero Section** | Hero em single-column no mobile, tipografia escalonada (clamp()) | 🔴 Alta | 3h |
| RP-02 | **Touch Targets (48px min)** | Garantir que botões/links tenham mínimo 48px para toque (WCAG) | 🔴 Alta | 2h |
| RP-03 | **Tablet Layout (768px-1024px)** | Ajustes específicos para tablets (não empilhamento básico) | 🟡 Médio | 3h |
| RP-04 | **Desktop Premium (1024px+)** | Aproveitar espaço extra com whitespace generoso e tipografia autoritária | 🟡 Médio | 2h |
| RP-05 | **Images Responsivas** | `next/image` com `fill` ou `responsive`, lazy loading elegante | 🔴 Alta | 3h |
| RP-06 | **Horizontal Scroll Prevention** | Garantir que não há scroll horizontal acidental no mobile | 🔴 Alta | 1h |

---

## 5. FORMULÁRIOS (Single-Column Concierge)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| FM-01 | **Quote Form Single-Column** | Formulário de orçamento em coluna única, inputs border-bottom only | 🔴 Crítico | 3h |
| FM-02 | **Form Validation Visual** | Erros em texto sutil (não red borders), sucesso com micro-animations | 🔴 Alta | 3h |
| FM-03 | **Labels Flutuantes** | Labels que sobem ao focar (não placeholder tradicional) | 🟡 Médio | 2h |
| FM-04 | **Accessibility Labels** | `htmlFor`/`id` em TODOS inputs, `aria-describedby` para erros | 🔴 Alta | 2h |
| FM-05 | **Auto-Save Draft** | Salvar rascunho no localStorage enquanto cliente preenche | 🟢 Baixa | 3h |

---

## 6. PERFORMANCE E OTIMIZAÇÃO

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| PF-01 | **Image Optimization** | Comprimir e converter imagens para WebP/AVIF (catálogo) | 🟡 Médio | 2h |
| PF-02 | **Font Loading Strategy** | `next/font` com `swap`, preload para Playfair Display | 🔴 Alta | 1h |
| PF-03 | **CSS Minification** | Garantir que globals.css está minificado em produção | 🟢 Baixa | 1h |
| PF-04 | **Lazy Loading Components** | `React.lazy()` para seções abaixo do fold | 🟡 Médio | 3h |
| PF-05 | **Prefetching Links** | `prefetch` para páginas prováveis (portal, orçamento) | 🟢 Baixa | 2h |

---

## 7. MICRO-INTERAÇÕES (Polite Interactions)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| MI-01 | **Fade + 20px Up** | Todas animações de entrada: translateY(-20px) + opacity (não 30px) | 🔴 Alta | 2h |
| MI-02 | **Easing Cubico** | `cubic-bezier(0.25, 0.1, 0.25, 1)` em todas transições (não spring) | 🔴 Alta | 1h |
| MI-03 | **Duration 400ms** | Transições com 400ms (não 600-700ms lentos) | 🔴 Alta | 1h |
| MI-04 | **Page Transitions** | Crossfade simples entre páginas (não slides ou bounces) | 🟡 Médio | 3h |
| MI-05 | **Hover States Sutis** | Hover em links/botões com mudança de cor sutil (não transforms agressivos) | 🟡 Médio | 2h |
| MI-06 | **Reduced Motion** | `prefers-reduced-motion: reduce` → remova animações (WCAG) | 🔴 Alta | 1h |

---

## 8. ANTI-DASHBOARD (Garantir Identidade)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| AD-01 | **Remover Skeleton Loaders** | Usar textos editoriais ("Carregando experiência...") | 🔴 Alta | 1h |
| AD-02 | **Remover Gráficos SVG Falsos** | Gráficos com dados reais ou remover completamente | 🔴 Alta | 3h |
| AD-03 | **Remover Metric Cards Coloridos** | Substituir por barra horizontal de insights | 🔴 Alta | 2h |
| AD-04 | **Remover Kanban Colorido** | CRM como lista elegante (não colunas coloridas) | 🔴 Alta | 4h |
| AD-05 | **Remover Card-Mania** | Whitespace generoso, não caixas em tudo | 🔴 Alta | 3h |
| AD-06 | **Remover Botões Pill-Shaped** | Border-radius: 2-4px (não 9999px) | 🔴 Alta | 1h |
| AD-07 | **Remover Gradientes Pesados** | Cores sólidas (o luxo é sólido) | 🔴 Alta | 2h |

---

## 9. ACESSIBILIDADE (WCAG 2.1 AA)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| AC-01 | **Color Contrast 4.5:1** | Garantir contraste mínimo em texto/background (verificar magenta) | 🔴 Alta | 2h |
| AC-02 | **Keyboard Navigation** | TAB funcional em todos elementos interativos | 🔴 Alta | 3h |
| AC-03 | **Screen Reader Labels** | `aria-label`, `aria-live` para regiões dinâmicas (toasts, métricas) | 🔴 Alta | 3h |
| AC-04 | **Focus Visible** | Outline sutil (2px solid accent) em elementos focados | 🔴 Alta | 1h |
| AC-05 | **Alt Text em Imagens** | Todas imagens com `alt` descritivo (não "imagem 1") | 🔴 Alta | 1h |

---

## 10. PORTAL DO CLIENTE (Área Exclusiva)

| ID | Item | Descrição | Prioridade | Estimativa |
|----|------|-----------|----------|------------|
| PC-01 | **Dashboard Minimalista** | Visão geral com whitespace (não dashboard SaaS) | 🟡 Médio | 4h |
| PC-02 | **Status de Pedidos Visual** | Timeline visual elegante (não tabela com cores) | 🟡 Médio | 3h |
| PC-03 | **Galeria de Fotos** | Fotos do processo com lightbox elegante | 🟢 Baixa | 4h |
| PC-04 | **Histórico de Orçamentos** | Lista com hover actions e expand/collapse suave | 🟡 Médio | 3h |
| PC-05 | **Agendamento Self-Service** | Calendário visual para reagendamento | 🟡 Médio | 5h |

---

## RESUMO POR PRIORIDADE

### 🔴 Crítico (Fazer IMEDIATAMENTE):
1. **WD-01**: Playfair Display Global
2. **FM-01**: Quote Form Single-Column
3. **UX-03**: Feedback Visual Premium

### 🔴 Alta (Sprint Atual):
- UX-01 a UX-06 (Experiência)
- WD-02 a WD-08 (WebDesigner)
- MN-01, MN-04, MN-06 (Menus)
- RP-01, RP-02, RP-05, RP-06 (Responsividade)
- FM-02, FM-04 (Formulários)
- MI-01 a MI-03, MI-06 (Micro-interações)
- AD-01 a AD-07 (Anti-Dashboard)
- AC-01 a AC-05 (Acessibilidade)

### 🟡 Médio (Próximo Sprint):
- WD-05, WD-06 (Lookbook, CRM)
- MN-02, MN-03, MN-05 (Menus)
- RP-03, RP-04 (Responsividade)
- FM-03 (Formulários)
- MI-04, MI-05 (Micro-interações)
- PC-01 a PC-05 (Portal do Cliente)

### 🟢 Baixa (Backlog):
- FM-05 (Auto-Save)
- PF-01 a PF-05 (Performance)
- PC-03 (Galeria)

---

## TEMPLATE DE HISTÓRIA DE MELHORIA (User Story)

```markdown
### CARD: [Título]
**ID**: UX-00 / WD-00 / MN-00 / etc.  
**Story Points**: [1-8]  
**Priority**: 🔴 Crítico / 🔴 Alta / 🟡 Médio / 🟢 Baixa  
**Sessão**: 2 (Frontend)  

**Como** [tipo de usuário], **quero** [ação], **para** [benefício].

**Critérios de Aceite**:
- [ ] Critério 1
- [ ] Critério 2
- [ ] Build passando (`npm run build`)
- [ ] Mobile testado
- [ ] Acessibilidade verificada

**Tasks**:
| Task ID | Task | Status | Hours |
|----------|------|--------|-------|
| T-XXX | Criar componente X | 📋 To Do | 2h |

**Commit**: `feat(frontend): [mensagem]` / `style(frontend): [mensagem]`
```

---

## SPRINT PLANNING (Sugestão)

### Sprint 1 (Atual - 2026-04-28 a 2026-05-12):
- **Sessão 2 (Frontend)**: Focar em WD-01, WD-02, WD-03, FM-01, UX-03, AD-01 a AD-07
- **Estimativa**: ~25h

### Sprint 2 (2026-05-13 a 2026-05-26):
- **Sessão 2 (Frontend)**: WD-04 a WD-08, RP-01 a RP-06, MN-01 a MN-06
- **Estimativa**: ~35h

### Sprint 3 (2026-05-27 a 2026-06-09):
- **Sessão 2 (Frontend)**: UX-01 a UX-06, MI-01 a MI-06, AC-01 a AC-05
- **Estimativa**: ~30h

---

**Última Atualização**: 2026-04-28 01:15 UTC  
**Especialista**: UX Nível Especialista + WebDesigner  
**Foco**: Experiência Premium, Anti-Dashboard, Whitespace, Playfair Display
