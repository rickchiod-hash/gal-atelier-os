# Design System V6 — Editorial Atelier

## Filosofia Visual

**"Editorial Atelier"** — O sistema não é um dashboard genérico. É uma experiência de marca premium para wigmakers:
- Parar de parecer ferramenta de vendas/SaaS
- Aparência de loja de luxo + atelier artesanal
- Whitespace generoso (o luxo é respirar)
- Tipografia com autoridade editorial
- Micro-accentos (cores no máximo 2% da página)

## Princípios

1. **Editorial primeiro** — Layouts de revista, não grids de planilha
2. **Whitespace é cor** — Espaçamento fluido com `clamp()`, minimum 40% vazio
3. **Sem card-mania** — Evitar caixas em tudo; usar listras elegantes ou hero sections
4. **Typografia com autoridade** — Playfair Display para títulos, Inter para corpo
5. **Micro-accentos** — Vinho/ouro só em detalhes (1-2% da página)
6. **Anti-dashboard** — Remover métricas em cards coloridos, gráficos SVG falsos, Kanban que lembra Jira
7. **Mobile-first** — Mas com elegância editorial, não empilhamento de caixas
8. **Estados visíveis** — Mas com sutileza (pontos, não badges colantes)

## Paleta "Atelier Blue" (Atual)

### Cores Base (80% da página)
- `--color-bg: #07111F` — Navy Black (--charcoal)
- `--color-bg-soft: #0B1F3A` — Midnight Navy
- `--color-surface: #102A43` — Deep Navy (--blush)
- `--color-surface-elevated: #132F4C` — Blue Surface
- `--color-text: #F8FAFC` — Text Primary (--ivory)
- `--color-text-secondary: #CBD5E1` — Text Secondary
- `--color-text-muted: #94A3B8` — Text Muted

### Accents (máximo 2% da página)
- `--color-primary: #2563EB` — Royal Blue (--color-brand)
- `--color-primary-dark: #1D4ED8` — Atelier Blue (--deep-espresso)
- `--color-primary-soft: #60A5FA` — Soft Blue (--rose)
- `--color-accent: #38BDF8` — Cyan Glow (--bronze)
- `--color-premium: #D8B46A` — Champagne Gold
- `--color-border: rgba(56, 189, 248, 0.3)` — Cyan Glow transparent

### Semântica
```css
--color-bg: #07111F;
--color-surface: #102A43;
--color-text: #F8FAFC;
--color-text-muted: #94A3B8;
--color-accent: #38BDF8;
--color-brand: #2563EB;
```

## Tipografia "Editorial Authority"

### Fontes
- `--font-display: 'Playfair Display', Georgia, serif` — Elegante, menos quirky que Cormorant
- `--font-body: 'Inter', system-ui, sans-serif` — Limpo, moderno
- `--font-caption: 'Inter', system-ui, sans-serif` — Mesmo que body, peso menor

### Hierarquia
- **H1**: Playfair Display 3.5rem / line-height 1.15 / letter-spacing -0.03em
- **H2**: Playfair Display 2.5rem / line-height 1.2
- **H3**: Playfair Display 2rem
- **Body**: Inter 1rem / line-height 1.7
- **Labels/Captions**: Inter 0.75rem / weight 600 / tracking 0.1em / uppercase

## Layout "Editorial Grid"

### Regras Anti-Dashboard
1. **Hero** → Split editorial (texto esquerda, imagem direita) — NÃO cards de métricas sobrepostas
2. **Dashboard** → Barra horizontal de insights (não cards em grid)
3. **Catalog** → Lookbook layout (1 destaque full-width + 2-col grid) — NÃO grid de cards idênticos
4. **CRM** → Concierge list view (lista elegante com hover actions) — NÃO Kanban colorido
5. **Quote Form** → Single-column concierge (inputs border-bottom only) — NÃO formulário em caixa

### Espaçamento Fluido
```css
--space-1: clamp(0.375rem, 0.35rem + 0.15vw, 0.5rem);
--space-2: clamp(0.625rem, 0.55rem + 0.35vw, 0.875rem);
--space-3: clamp(0.875rem, 0.75rem + 0.6vw, 1.25rem);
--space-4: clamp(1.125rem, 0.95rem + 0.9vw, 1.75rem);
--space-5: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
--space-6: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
--space-8: clamp(3rem, 2rem + 4vw, 5rem);
--space-12: clamp(4rem, 2.5rem + 6vw, 7rem);
```

## Componentes "Anti-SaaS"

### Buttons — Filled mas suaves
```css
background: var(--deep-espresso);
color: white;
border-radius: 2px; /* Afiado, NÃO pill-shaped */
padding: 1rem 2rem;
letter-spacing: 0.05em;
text-transform: none; /* Deixar a fonte trabalhar */
```

### Inputs — Bottom-border only
```css
border: none;
border-bottom: 1px solid var(--blush);
padding: 0.75rem 0;
transition: border-color 0.3s;
```

### Cards (apenas onde ABSOLUTAMENTE necessário)
```css
background: white;
border: none;
box-shadow: 0 2px 8px rgba(44,44,44,0.04); /* Sombra sussurro */
border-radius: 4px; /* Afiado */
```

## Micro-Interações "Polite"

- **Fade + leve deslocamento** (20px up, não 30px)
- **Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` (não spring/elastic)
- **Duration**: 400ms (não 600-700ms)
- **Page transitions**: Crossfade simples, sem slides

## O que REMOVER (Anti-Dashboard)

- ❌ Skeleton loaders (usar texto elegante de loading)
- ❌ Gráficos SVG falsos (remover ou usar dados reais)
- ❌ Colored status badges (usar texto + ponto sutil)
- ❌ "Process flow" de 8 passos (muito operacional, não é premium)
- ❌ Metric cards com borda colorida no topo
- ❌ Botões pill-shaped (muito SaaS)
- ❌ Arco-íris de cores nos status do CRM

## Tokens (Oficiais)

- Cores: `--color-*`
- Espaços: `--space-*`
- Tipografia: `--font-display`, `--font-body`, `--text-*`
- Raios: `--radius-*` (2px-8px)
- Sombras: `--shadow-*` (0 2px 8px máx)
- Transições: `--ease-polite`, `--duration-normal`

## Regra

1. NÃO criar CSS aleatório fora dos tokens sem justificar
2. NÃO usar gradientes (o luxo é sólido)
3. NÃO criar cards sem necessidade (whitespace é amigo)
4. SEMPRE testar em mobile (mas manter elegância, não empilhamento)
