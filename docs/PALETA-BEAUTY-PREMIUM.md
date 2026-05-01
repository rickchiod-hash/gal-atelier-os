# Paleta Beauty Premium

Paleta de cores refinada para o nicho de beleza premium (wigmakers), substituindo a paleta Atelier Blue/Nubank Purple por uma identidade visual mais adequada ao atelier artesanal de luxo.

## Filosofia
- **Luxo silencioso**: Cores sofisticadas que não gritam, mas transmitem qualidade e exclusividade
- **Base neutra quente**: Fundos que realçam os produtos sem competir com eles
- **Micro-accentos estratégicos**: Uso cuidadoso de cores de destaque para guiar a atenção
- **Contraste acessível**: Garantia de legibilidade WCAG AA em todos os usos

## Cores Base (80% da página)
Estas cores compõem a maior parte da interface e devem ser usadas generosamente.

### Neutros Quentes
- `--color-bg: #FAF5F0` — Warm Ivory (fundo principal, 60-70% da página)
- `--color-surface: #FFFFFF` — Pure White (superfícies de cards, modais, 20-25% da página)
- `--color-bg-muted: #F8F4F0` — Ivory Mist (fundos secundários, seções alternadas)

### Textos Primários
- `--color-text: #2C2C2C` — Charcoal Soft (texto principal, 85-90% do texto)
- `--color-text-muted: #8A8078` — Dusty Taupe (texto secundário, labels, 10-15% do texto)
- `--color-text-dark: #1F1F1F` — Almost Black (texto de destaque, títulos importantes)

## Micro-Accents (máximo 2% da página)
Estas cores devem ser usadas com moderação, exclusivamente para elementos de destaque, interações e estados.

### Accents Principais
- `--color-accent: #A67C52` — Bronze Soft (ouro contido, botões primários, links importantes)
- `--color-brand: #3D2B1F` — Deep Espresso (marrom profundo, hover, estados ativos)
- `--color-rose: #C1978E` — Rose Muted (rosa suave, hover secundário, estados suaves)

### Accents de Estado
- `--color-success: #8B7355` — Olive Soft (sucesso, confirmações)
- `--color-warning: #D4B483` — Sand Soft (aviso, atenção)
- `--color-error: #C76B6B` — Rose Clay (erro, validação negativa)

### Micro-Accents Decorativos (máximo 0.5% da página)
- `--color-champagne: #D8B46A` — Champagne Gold (detalhes decorativos, ícones premium)
- `--color-mauve: #B8A594` — Muted Mauve (detalhes sutis, divisórias finas)

## Semântica CSS
```css
/* Fundos e superfícies */
--color-bg: var(--color-bg);
--color-surface: var(--color-surface);
--color-card: var(--color-surface);
--color-bg-muted: var(--color-bg-muted);

/* Textos */
--color-text: var(--color-text);
--color-text-muted: var(--color-text-muted);
--color-text-dark: var(--color-text-dark);

/* Accents e estados */
--color-accent: var(--color-accent);
--color-brand: var(--color-brand);
--color-success: var(--color-success);
--color-warning: var(--color-warning);
--color-error: var(--color-error);

/* Micro-accentos decorativos */
--color-champagne: var(--color-champagne);
--color-mauve: var(--color-mauve);

/* Sombras (suaves, sem glow) */
--shadow-xs: 0 1px 3px rgba(0,0,0,0.05);
--shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
--shadow-md: 0 4px 16px rgba(0,0,0,0.10);
--shadow-lg: 0 6px 24px rgba(0,0,0,0.12);

/* Raio (afinado, nunca pill-shaped) */
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;

/* Transições polidas */
--ease-polite: cubic-bezier(0.25, 0.1, 0.25, 1);
--duration-normal: 350ms;
```

## Diretrizes de Uso

### 1. **Regra do 80-20**
- 80% da página: cores base (Warm Ivory, Pure White, Charcoal Soft)
- 20% máximo: combinações de superfície e texto
- 2% máximo: micro-accentos (Bronze Soft, Deep Espresso, Rose Muted, etc.)

### 2. **Hierarquia Visual**
- **Primário**: Deep Espresso para ações principais (CTAs primários)
- **Secundário**: Bronze Soft para ações secundárias
- **Terciário**: Rose Muted para ações de baixo destaque
- **Neutro**: Warm Ivory/Pure White para fundos e superfícies

### 3. **Estados de Interação**
- **Hover**: Transição suave para a cor de accent correspondente (10-15% de mudança)
- **Focus**: Outline de 2px em Deep Espresso ou Champagne Gold
- **Pressed**: Redução de 5% na luminosidade da cor base
- **Disabled**: Opacidade de 50% na cor de texto ou superfície

### 4. **Acessibilidade (WCAG AA)**
- Todas as combinações de texto/fundo devem manter contraste mínimo de 4.5:1
- Textos grandes (18pt+ ou 14pt bold): contraste mínimo de 3:1
- Componentes ícones apenas com texto acompanhando ou rótulo aria-label

### 5. **Aplicação em Componentes**
#### Botões
- **Primário**: Background Deep Espresso, texto Warm Ivory
- **Secundário**: Background transparente, border Deep Espresso, texto Deep Espresso
- **Terciário**: Background transparente, border Rose Muted, texto Rose Muted
- **Hover**: Aumentar intensidade da cor de background em 10%

#### Inputs
- **Border**: 1px solid Dusty Taupe (estado normal)
- **Focus**: Border 2px solid Deep Espresso + sombra suave
- **Error**: Border 2px solid Rose Clay + ícone de erro sutil
- **Success**: Border 2px solid Olive Soft + ícone de sucesso sutil

#### Cards e Superfícies
- **Background**: Pure White ou Warm Ivory (alternar em listas)
- **Border**: 1px solid Ivory Mist (opcional, para definição sutil)
- **Shadow**: Aplicar shadow-sm para elevação suave
- **Hover**: TranslateY(-2px) + aumento suave de shadow

## Implementação em globals.css
Substituir a seção de cores Nubank Purple pelas definições acima, mantendo:
- Sistema de espaçamento fluido (`clamp()`)
- Tipografia Editorial (Playfair Display + Inter)
- Transições polidas e animações de entrada
- Componentes anti-SaaS (bordas afiadas, sem pill-shapes)

## Validação
- [ ] Contraste WCAG AA verificado para todos os pares texto/fundo
- [ ] Testado em mobile (320px-480px) mantendo elegância editorial
- [ ] Verificado uso de micro-accentos ≤ 2% em telas representativas
- [ ] Confirmado ausência de elementos SaaS dashboard (cards coloridos, badges, gráficos falsos)