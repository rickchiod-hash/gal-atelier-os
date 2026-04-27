# MELHORIAS — Redesign com Banco de Imagens e Catálogo Visual Real para Gal Atelier OS

Você é o OpenCode trabalhando no projeto `K:\dev\repos\gal-atelier-os`.

## Objetivo

Corrigir o visual atual do Gal Atelier OS usando o banco de imagens/ilustrações em:

```text
frontend/public/gal-assets
```

O sistema deve parar de parecer um dashboard genérico e passar a parecer um **Beauty Commerce CRM premium para wigmakers/perucas/laces**.

O produto correto não é só CRM: é **CRM + ecommerce operacional + catálogo técnico de wigs + pedidos personalizados + agenda + estoque + financeiro + WhatsApp + pós-venda + recompra**.

## Crítica dura ao design atual

A tela atual ainda está fraca para o nicho.

Problemas:

1. O hero ainda parece layout de SaaS genérico.
2. A imagem principal é uma ilustração abstrata demais; não vende lace, peruca, cabelo, textura nem transformação.
3. O catálogo usa emojis e cards brancos pobres; isso destrói a percepção premium.
4. A tipografia grande está pesada, desbalanceada e com cara de template.
5. O contraste entre texto, fundo e cards é tímido.
6. As cores não constroem uma marca memorável; parecem "bege bonito", não "atelier premium".
7. O pipeline está visualmente vazio e sem storytelling de venda consultiva.
8. O catálogo não tem imagem de produto, não mostra lace, glueless, full lace, manutenção, acessórios ou serviços.
9. A página não tem densidade visual suficiente para um negócio de beleza high-ticket.
10. Falta sensação de desejo, transformação, cuidado artesanal, textura e confiança.

Veredito: o design está funcional, mas ainda não é vendável. É bonito de longe e fraco de perto.

## Regra principal

Não apague nada. Não quebre backend. Não quebre orçamento, Pix, WhatsApp ou Docker.

Você deve usar os assets novos, reorganizar a UI e melhorar profundamente a percepção visual.

## Arquivos de assets

Leia:

```text
frontend/public/gal-assets/manifest/catalog-assets.json
frontend/public/gal-assets/BANCOS-DE-IMAGENS-LIVRES.md
frontend/public/gal-assets/reference-current-ui/*.png
```

Use como assets principais:

```text
frontend/public/gal-assets/catalog/hero-beauty-commerce-crm.png
frontend/public/gal-assets/catalog/lace-front-natural.png
frontend/public/gal-assets/catalog/full-lace-premium.png
frontend/public/gal-assets/catalog/glueless-wig.png
frontend/public/gal-assets/catalog/wig-cacheada.png
frontend/public/gal-assets/catalog/wig-lisa-sleek.png
frontend/public/gal-assets/catalog/ruivo-cobre-editorial.png
frontend/public/gal-assets/catalog/medical-wig-soft.png
frontend/public/gal-assets/catalog/braided-wig.png
frontend/public/gal-assets/catalog/headband-wig.png
frontend/public/gal-assets/catalog/bundles-body-wave.png
frontend/public/gal-assets/catalog/closure-frontal.png
frontend/public/gal-assets/catalog/clip-in-extensions.png
frontend/public/gal-assets/catalog/ponytail-extension.png
frontend/public/gal-assets/catalog/hair-topper.png
frontend/public/gal-assets/catalog/manutencao-premium.png
frontend/public/gal-assets/catalog/instalacao-lace.png
frontend/public/gal-assets/catalog/customizacao-cor.png
frontend/public/gal-assets/catalog/plucking-bleached-knots.png
frontend/public/gal-assets/catalog/higienizacao-hidratacao.png
frontend/public/gal-assets/catalog/wig-cap.png
frontend/public/gal-assets/catalog/lace-glue.png
frontend/public/gal-assets/catalog/wig-stand.png
frontend/public/gal-assets/catalog/care-kit.png
```

No Next.js, usar caminho público:

```text
/gal-assets/catalog/nome-do-arquivo.png
```

## Etapa 1 — Diagnóstico antes de editar

Antes de alterar código, responda:

```text
MELHORIAS — Diagnóstico visual
1. Arquivos lidos.
2. Onde a tela atual falha.
3. Quais componentes serão alterados.
4. Como as imagens serão usadas.
5. Plano de patch.
6. Riscos.
```

## Etapa 2 — Criar/atualizar dados do catálogo

Criar ou atualizar um arquivo como:

```text
frontend/data/galAtelierCatalog.ts
```

Cada produto/serviço deve ter:

```ts
id
name
category
description
priceRange
duration
profile
image
technicalTags
```

Categorias:

```text
Wigs
Extensões
Serviços
Acessórios
```

## Etapa 3 — Hero realmente ligado ao nicho

Substituir o hero abstrato por composição com:

- imagem `hero-beauty-commerce-crm.png`;
- frase forte;
- CTA Criar orçamento;
- CTA WhatsApp;
- cards pequenos com métricas;
- mini-vitrine de categorias.

Copy sugerida:

```text
Wigs, laces e atendimentos premium em um fluxo visual, técnico e vendável.
```

Subcopy:

```text
Do diagnóstico ao Pix: organize cada lead, catálogo, pedido, produção e pós-venda com cara de atelier de verdade.
```

## Etapa 4 — Catálogo premium com imagens

Eliminar os emojis como representação principal dos produtos.

Criar cards com:

- imagem grande;
- nome;
- descrição;
- preço;
- prazo;
- tags técnicas;
- CTA "Ver briefing";
- CTA "Orçar".

O catálogo deve ter filtros por:

```text
Todos
Wigs
Extensões
Serviços
Acessórios
```

## Etapa 5 — Blocos por módulo de negócio

Criar ou melhorar seções visuais para:

- Dashboard;
- CRM;
- Diagnóstico;
- Clientes;
- Catálogo;
- Pedidos;
- Produção;
- Agenda;
- Estoque;
- Financeiro;
- WhatsApp;
- Marketing;
- Reviews;
- Área da cliente.

Usar imagens dos assets quando fizer sentido.

## Etapa 6 — Pipeline com narrativa

Trocar o pipeline vazio por cards mockados e estados de venda consultiva:

```text
Novo lead
Diagnóstico
Recomendação
Orçamento
Sinal Pix
Produção
Prova
Entrega
Pós-venda
```

Cada card precisa mostrar:

- nome;
- interesse;
- origem;
- valor estimado;
- próxima ação;
- responsável;
- botão WhatsApp.

## Etapa 7 — Melhorar estilo global

Atualizar CSS para:

- layout mais premium;
- imagem com proporção correta;
- cards menos brancos e mais editoriais;
- sombras sutis;
- detalhes champagne;
- botões mais fortes;
- grid responsivo;
- espaçamento melhor;
- títulos menores onde necessário.

Evitar:
- tudo gigante;
- cartões vazios;
- emoji;
- gradientes aleatórios;
- textos centralizados demais;
- layout com cara de template.

## Etapa 8 — Validar

Rodar:

```bat
cd /d K:\dev\repos\gal-atelier-os\frontend
npm run build
```

Se falhar, corrigir.

## Etapa 9 — Commit

Sempre commitar.

```bat
git status
git add frontend/app frontend/components frontend/data frontend/public/gal-assets docs prompts .opencode
git commit -m "feat(frontend): apply catalog image bank and premium wig redesign"
```

Se não houver todos esses caminhos, adicionar apenas os que existem.

## Resposta final

Responder:

```text
MELHORIAS — Redesign com imagens concluído

Arquivos alterados
Imagens usadas
O que mudou visualmente
Build
Commit
Riscos restantes
Próximo passo
```
