# Gal Atelier OS - Catálogo de Produtos (Assets)

Este diretório contém os assets visuais para os 41 produtos do catálogo Gal Atelier OS.

## Estrutura
```
public/
└── gal-assets/
    └── catalog/
        ├── [slug]/
        │   ├── primary.png          # Imagem principal do produto
        │   ├── gallery/
        │   │   ├── 01.jpg           # Fotos adicionais da galeria
        │   │   ├── 02.jpg
        │   │   └── ...
        │   └── README.md            # Documentação específica do produto
        └── README.md                # Este arquivo
```

## Convenções de Nomeação
- **Imagem principal**: `[slug].png` (referenciada no catalog como `image: "/gal-assets/catalog/[slug].png"`)
- **Galeria**: Pasta `gallery/` com imagens numeradas (`01.jpg`, `02.jpg`, etc.)
- **Formatos aceitos**: PNG para imagens principais, JPG para galeria
- **Otimização**: Imagens devem ser otimizadas para web (máximo 500KB para principais, 300KB para galeria)

## Produtos do Catálogo
Cada subdiretório representa um produto do catálogo com seu slug específico.

### Lista Completa de Slugs
braided-wig
bundles-body-wave
care-kit
clip-in-extensions
closure-frontal
customizacao-cor
full-lace-premium
glueless-wig
hair-topper
headband-wig
higienizacao-hidratacao
instalacao-lace
lace-front-natural
lace-glue
manutencao-premium
medical-wig-soft
plucking-bleached-knots
ponytail-extension
ruivo-cobre-editorial
wig-cacheada
wig-cap
wig-lisa-sleek
wig-stand

## Responsabilidades
- **VENUS**: Responsável por fornecer os assets visuais finais (fotos profissionais)
- **HERMES**: Responsável pela estrutura de diretórios e documentação
- **QA**: Validar que todos os 41 produtos têm pelo menos a imagem principal

## Status
- [ ] Estrutura de diretórios criada (HERMES - PR 3)
- [ ] Assets visuais fornecidos (VENUS - Sprint futura)
- [ ] Validação de assets completada (QA - Sprint futura)

---
*Estrutura criada como parte do PR 3: feature/hermes-photo-assets (Squad LaceLab)*