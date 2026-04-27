# QA Review - Melhorias V6 Editorial Atelier

## Data: 2026-04-27

## Visão Visual Atual (V6 — Editorial Atelier)

Sistema NÃO é dashboard SaaS genérico. É experiência de marca premium:
- Loja de luxo + atelier artesanal
- Whitespace generoso (mínimo 40% vazio)
- Tipografia com autoridade (Playfair Display + Inter)
- Micro-accentos (máximo 2% da página)
- Anti-dashboard: sem card-mania, gráficos SVG falsos, Kanban colorido

## Críticas Encontradas

### 🔴 Crítico (Visual)

#### 1. Hero section com cara de dashboard
- **Localização**: `frontend/app/page.tsx:413-453`
- **Problema**: Metrics cards sobrepostas à imagem hero
- **Violação**: Regra anti-dashboard ("Hero → Split editorial, NÃO cards")
- **Correção V6**: Split layout (texto esquerda, imagem direita), métricas vêm depois em barra horizontal

#### 2. Dashboard com metric cards coloridas
- **Localização**: `frontend/app/page.tsx:458-545`
- **Problema**: `.metric-card` com gradientes e sombras pesadas
- **Violação**: "Sem card-mania", "Sem métricas em cards com borda colorida"
- **Correção V6**: Barra horizontal de insights (não grid de cards)

#### 3. CRM Kanban colorido (parece Jira)
- **Localização**: `frontend/app/page.tsx:550-603`
- **Problema**: Colored columns, drag-and-drop, cards com badges
- **Violação**: "CRM → Concierge list view, NÃO Kanban colorido"
- **Correção V6**: Lista elegante com hover actions (não drag-and-drop)

### 🟡 Médio (Visual)

#### 4. Catálogo em grid de cards idênticos
- **Localização**: `frontend/app/page.tsx:608-653`
- **Problema**: Grid uniforme, cada card idêntico
- **Violação**: "Catalog → Lookbook layout (1 destaque full-width + 2-col grid)"
- **Correção V6**: Featured item full-width, depois 2-column grid

#### 5. Quote form em caixa com border-radius
- **Localização**: `frontend/app/page.tsx:658-856`
- **Problema**: `.quoteForm` com `border-radius: var(--radius-xl)`
- **Violação**: "Quote Form → Single-column concierge (inputs border-bottom only)"
- **Correção V6**: Remover caixa, inputs apenas border-bottom, coluna única

#### 6. Botões pill-shaped (muito SaaS)
- **Localização**: `frontend/app/globals.css` (`.button`, `.btn-*`)
- **Problema**: `border-radius: var(--radius-full)` (9999px = pill)
- **Violação**: "Buttons — Filled mas suaves", "border-radius: 2px"
- **Correção V6**: `border-radius: 2px` para primários, `4px` para cards

### 🟢 Observações

#### 7. Skeleton loaders (não são premium)
- **Regra V6**: "Não usar skeleton loaders (usar texto elegante)"
- **Correção**: Substituir por texto: "Carregando experiência..."

#### 8. Gráficos SVG falsos
- **Localização**: `frontend/app/page.tsx:499-543`
- **Regra V6**: "Remover ou usar dados reais"
- **Correção**: Remover SVG fake, usar dados reais ou omitir

#### 9. Process flow 8 etapas (muito operacional)
- **Localização**: `frontend/app/page.tsx:793-853`
- **Regra V6**: "Process flow de 8 passos é muito operacional, não é premium"
- **Correção**: Simplificar para 3-4 etapas ou remover

---

## Plano de Correções V6

### ✅ Concluído (sessions anteriores)

| # | Melhoria | Commit | Status |
|---|---------|--------|-------|
| 1 | Status no QuoteResponse | 7f50792 | ✅ |
| 2 | Validação WhatsApp | 7f50792 | ✅ |
| 3 | Acessibilidade labels | 7f50792 | ✅ |
| 4 | Endpoint /api/services | d92dad4 | ✅ |
| 5 | Pix simulation | 87b2dea | ✅ |
| 6 | Dark mode | ✅ | ✅ |

### ⏳ Pendente (V6 Visual Overhaul)

| # | Melhoria | Prioridade | Status |
|---|---------|------------|-------|
| 1 | Hero split editorial (não cards) | alta | 🔄 Em progresso |
| 2 | Dashboard horizontal bar (não grid) | alta | 🔄 Em progresso |
| 3 | CRM Concierge list (não Kanban) | alta | 🔄 Em progresso |
| 4 | Catálogo lookbook layout | média | 🔄 Em progresso |
| 5 | Quote form single-column | média | 🔄 Em progresso |
| 6 | Remover skeletons | baixa | 🔄 Em progresso |
| 7 | Remover gráficos fake | baixa | 🔄 Em progresso |
| 8 | Botões 2px radius (não pill) | média | 🔄 Em progresso |
| 9 | Inputs border-bottom only | média | 🔄 Em progresso |

---

## Validação Visual (Anti-Dashboard Checklist)

- [ ] NÃO tem metric cards com borda colorida
- [ ] NÃO tem Kanban colorido (CRM)
- [ ] NÃO tem gráficos SVG falsos
- [ ] NÃO tem skeleton loaders
- [ ] NÃO tem botões pill-shaped
- [ ] NÃO tem gradientes pesados
- [ ] Tem whitespace (mínimo 40% vazio)
- [ ] Tem Playfair Display para títulos
- [ ] Tem micro-accentos (máximo 2% da página)
- [ ] Tem micro-interações polite (400ms, não bouncy)

---

## Validação Técnica

```bash
# Backend - 8 testes passando
cd backend && mvn -B clean verify
# Tests run: 8, Failures: 0, Errors: 0

# Frontend - Build sem erros
cd frontend && npm run build

# CSS - Variáveis V6 presentes
grep -r "clamp(" frontend/app/globals.css
grep -r "Playfair Display" frontend/app/globals.css
grep -r "border-bottom:" frontend/app/globals.css
```