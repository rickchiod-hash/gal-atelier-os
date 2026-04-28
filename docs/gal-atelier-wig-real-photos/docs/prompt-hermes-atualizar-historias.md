# Prompt para Hermes atualizar histórias e interface com imagens reais

Hermes, assuma esta tarefa como especialista frontend/product designer do projeto Gal Atelier. Atualize as histórias/telas usando as novas imagens reais da pasta `gal-atelier-wig-real-photos/images`.

## Objetivo

Substituir as ilustrações genéricas atuais por fotos reais de perucas/wigs/laces, corrigir a composição visual e trocar a paleta para uma identidade premium baseada em azul-marinho, sem quebrar funcionalidades existentes.

## Imagens disponíveis

- `01-showroom-perucas-variadas-irham-setyaki.jpg`
- `02-manequins-wigs-cores-yns-plt.jpg`
- `03-wig-shop-manequins-taha.jpg`
- `04-duas-modelos-blonde-wigs-soweto-graphics.jpg`
- `05-manequim-wig-ruiva-lisa-j-morgan.jpg`
- `06-body-wave-black-wig-sunber-hair.jpg`
- `07-lace-seamless-hairline-sunber-hair.jpg`
- `08-vitrine-wigs-phil-hearing.jpg`
- `09-practice-heads-wigs-markus-spiske.jpg`

## Mapeamento por tela/história

1. **Home / Hero**
   - Usar `06-body-wave-black-wig-sunber-hair.jpg` como imagem principal.
   - Alternativa: `01-showroom-perucas-variadas-irham-setyaki.jpg`.
   - Layout: grid 2 colunas desktop, 1 coluna mobile.
   - CTA primário: `Criar orçamento`.
   - CTA secundário: `Ver catálogo`.
   - CTA WhatsApp como botão auxiliar.

2. **Sobre a Gal Atelier**
   - Usar `03-wig-shop-manequins-taha.jpg` ou `09-practice-heads-wigs-markus-spiske.jpg`.
   - Transformar Naturalidade, Personalização, Processo Seguro e Pós-venda em cards responsivos.

3. **Dashboard Operacional**
   - Corrigir layout: métricas em cards, calendário em card grande, pipeline em tabela/card com status chips.
   - Não deixar conteúdo colado na margem esquerda.
   - Não usar imagem como foco principal aqui.

4. **Catálogo**
   - Usar fotos reais nos cards.
   - Aplicar `aspect-ratio: 4 / 5; object-fit: cover;`.
   - Overlay inferior com gradiente, não tarja pesada.
   - Garantir que títulos e preços não sejam cortados.

5. **Stories / Histórias comerciais**
   - Criar stories sobre: naturalidade, transformação, atendimento sob medida, manutenção, pós-venda e orçamento via Pix.
   - Usar `04-duas-modelos-blonde-wigs-soweto-graphics.jpg` para lifestyle.
   - Usar `07-lace-seamless-hairline-sunber-hair.jpg` só para acabamento/linha frontal. Não afirmar que a modelo é cliente da marca.

## Paleta azul-marinho premium

```css
:root {
  --color-bg: #070B1D;
  --color-surface: #0E1530;
  --color-surface-2: #111A3A;
  --color-card: #F8F1E8;
  --color-card-soft: #EFE2D3;
  --color-text: #F9FAFB;
  --color-text-muted: #B8C0D6;
  --color-ink: #141827;
  --color-primary: #0B1F4D;
  --color-primary-2: #173B78;
  --color-accent: #C6A15B;
  --color-accent-soft: #E7D3A0;
  --color-berry: #9B3D69;
  --color-success: #2F9E75;
  --color-warning: #DDA15E;
  --radius-lg: 24px;
  --shadow-premium: 0 24px 80px rgba(0, 0, 0, .35);
}
```

## Correções obrigatórias

- Criar `.container`: `max-width: 1180px; margin: 0 auto; padding: 0 24px;`.
- Header full-width com conteúdo centralizado; remover aparência de bloco solto.
- Corrigir overflow horizontal.
- Seções com `padding: 72px 0` desktop e `48px 0` mobile.
- Títulos com `clamp()`.
- Cards com imagem, categoria, título, descrição curta, preço/prazo e CTA.
- Garantir build: `npm run build`.
- Validar mobile em 360px.

## Commits sugeridos

- `feat(ui): replace wig illustrations with real imagery`
- `style(theme): apply navy premium palette`
- `fix(layout): normalize containers and catalog cards`
