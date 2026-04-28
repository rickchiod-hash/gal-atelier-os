# Melhorias de design — Gal Atelier com paleta azul-marinho

## Diagnóstico

A direção do projeto está boa, mas a execução visual ainda parece protótipo. Há desalinhamento, header com aparência de bloco solto, conteúdo grudado na esquerda, dashboard sem hierarquia e catálogo com textos/imagens cortados.

## Nova direção visual

Premium, artesanal, segura, feminina sem ficar infantil, técnica sem parecer sistema hospitalar.

## Paleta recomendada

- Fundo principal: `#070B1D`
- Superfície: `#0E1530`
- Superfície secundária: `#111A3A`
- Creme premium: `#F8F1E8`
- Nude quente: `#EFE2D3`
- Dourado/champagne: `#C6A15B`
- Dourado claro: `#E7D3A0`
- Berry/logo: `#9B3D69`
- Texto claro: `#F9FAFB`
- Texto suave: `#B8C0D6`
- Texto escuro: `#141827`
- Sucesso/status: `#2F9E75`
- Alerta: `#DDA15E`

## Aplicação

### Header
- Fundo creme ou blur escuro translúcido.
- Conteúdo dentro de `.container`.
- Botão orçamento em azul-marinho com texto creme.
- WhatsApp com borda dourada/berry.

### Hero
- Fundo azul-marinho com radial-gradient sutil.
- Título branco com destaque champagne.
- Foto real em card creme com sombra premium.

### Catálogo
- Grid 3 colunas desktop, 2 tablet, 1 mobile.
- Imagem `aspect-ratio: 4/5`.
- `object-fit: cover`.
- Overlay com gradiente inferior.
- Badges: `Lace Front`, `Full Lace`, `Orgânica`, `Humana`, `Sob medida`.

### Dashboard
- Dividir em: resumo financeiro, agenda da semana e pipeline.
- Status chips: Diagnóstico, Orçamento, Negociação, Em Produção, Entregue, Pós-venda.
- Fonte maior e mais espaçamento.

## CSS base

```css
body {
  background:
    radial-gradient(circle at top right, rgba(155, 61, 105, .20), transparent 30%),
    linear-gradient(180deg, #070B1D 0%, #0B1027 100%);
  color: var(--color-text);
}

.container {
  width: min(100% - 48px, 1180px);
  margin-inline: auto;
}

.section {
  padding-block: clamp(48px, 7vw, 88px);
}

.card-premium {
  border: 1px solid rgba(198, 161, 91, .18);
  background: rgba(14, 21, 48, .86);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, .35);
}

.btn-primary {
  background: #0B1F4D;
  color: #F8F1E8;
  border: 1px solid rgba(198, 161, 91, .35);
}
```

## Veredito

Use azul-marinho como base, creme nos cards/fotos, dourado nos detalhes premium e berry apenas como assinatura da marca. Trocar tudo para azul mataria parte da identidade atual.
