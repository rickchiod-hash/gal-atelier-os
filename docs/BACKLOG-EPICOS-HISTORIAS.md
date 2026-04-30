# Backlog refinado — Squad LaceLab

## Épico 01 — Catálogo rico 41+

### US-001 — Expandir catálogo para 41 itens
Como cliente consumista, quero variedade real de wigs, extensões, bases, serviços, acessórios e kits para comparar e desejar.

Critérios de aceite:
- Catálogo com no mínimo 41 itens.
- Todos os itens com slug, categoria, coleção, preço, prazo, dificuldade, manutenção e stockType.
- Nenhum texto quebrado, misto ou com caracteres acidentais.

### US-002 — Criar modelo rico de produto
Como cliente, quero ficha técnica e benefício emocional para entender valor e uso.

Critérios de aceite:
- Campos: collection, emotionalBenefit, technicalSpecs, galleryImages, crossSell, faq, stockType, popularityScore, featured.
- Tipagem TypeScript atualizada.

## Épico 02 — Foto review e assets

### US-003 — Criar estrutura de fotos por produto
Como time, quero pastas padronizadas para cada produto para não bagunçar assets.

Critérios de aceite:
- Cada slug tem pasta própria.
- Cada pasta tem checklist `_PHOTO-REVIEW.md`.
- Estrutura aceita hero, lace-close, inside-cap, texture, side-view, scale-length, before-after, educational.

### US-004 — Criar fallback de imagem elegante
Como cliente, não quero ver imagem quebrada.

Critérios de aceite:
- Fallback editorial para item sem foto.
- Alt text obrigatório.

## Épico 03 — UX de compra guiada

### US-005 — Criar Comece Aqui
Como turista/iniciante, quero entender o básico antes de escolher.

Critérios de aceite:
- Explicar lace front, closure, full lace, glueless e topper.
- CTA para quiz.

### US-006 — Criar quiz de recomendação
Como cliente perdida, quero responder perguntas e receber 3 opções.

Critérios de aceite:
- Perguntas sobre experiência, uso, cola, textura, orçamento e prazo.
- Resultado explica por que recomendou.

### US-007 — Criar filtros avançados
Como cliente, quero filtrar por necessidade real.

Critérios de aceite:
- Filtros por categoria, coleção, textura, preço, prazo, dificuldade, manutenção, pronta entrega, tipo de lace e densidade.

## Épico 04 — Design beauty premium

### US-008 — Redesenhar paleta
Como marca premium, quero parecer atelier de beleza, não dashboard SaaS.

Critérios de aceite:
- Remover azul/cyan dominante.
- Adotar Deep Espresso, Warm Ivory, Rosewood, Champagne Gold.
- Atualizar tokens e documentação.

### US-009 — Despoluir layout do catálogo
Como cliente, quero navegar sem excesso de cards e informações operacionais.

Critérios de aceite:
- Vitrine cliente separada da visão admin.
- Hierarquia: imagem, nome, benefício, faixa de preço e CTA.
- Detalhes técnicos expansíveis.

## Épico 05 — Conversão e ticket médio

### US-010 — Criar coleções comerciais
Coleções mínimas: Primeira Wig, Glueless Daily, HD Lace Premium, Curls & Volume, Editorial Colors, Medical Comfort, Evento Express, Wigmaker Tools, Care & Maintenance.

### US-011 — Criar comparador
Comparar até 3 produtos por preço, prazo, lace, densidade, dificuldade, manutenção e indicação.

### US-012 — Criar cross-sell inteligente
Wig sugere cap, cola/remover, stand, care kit e manutenção. Serviço sugere care kit e próxima manutenção.

## Ordem recomendada

P0: catálogo + textos + modelo rico + paleta + estrutura de fotos.
P1: filtros + coleções + Comece Aqui + quiz + detalhe produto.
P2: comparador + cross-sell + pós-venda + testes.
