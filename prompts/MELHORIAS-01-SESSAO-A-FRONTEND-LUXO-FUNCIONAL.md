# MELHORIAS — Gal Atelier / Veloura Beauty OS

Este arquivo é parte de um fluxo seguro para OpenCode em 2 sessões.

Regra principal: **melhorar o que já existe sem apagar nada, sem reescrever o projeto inteiro e sem trocar a stack atual sem aprovação.**

O projeto atual é Gal Atelier OS:
- Backend: Kotlin + Spring Boot + Maven + arquitetura hexagonal.
- Frontend: Next.js + TypeScript.
- Execução: Docker Compose.
- Canal operacional: WhatsApp + Pix/sinal.
- Nicho: wigmaker, perucas, lace wigs, glueless wigs, customização, instalação, manutenção, pós-venda.

Contexto estratégico incorporado:
O sistema ideal não é só CRM. É um Beauty Commerce CRM para Wigmakers:
CRM + ecommerce + catálogo técnico de wigs + pedidos personalizados + agenda + estoque + financeiro + WhatsApp + pós-venda + recompra.


# MELHORIAS — SESSÃO A — Frontend, aparência, marca e UX

## Missão da Sessão A

Você é a sessão responsável pelo **frontend, marca, aparência futurista/premium e experiência visual**.

Você deve transformar o Gal Atelier OS em uma experiência com cara de:

- atelier premium de perucas/laces;
- beauty tech;
- boutique de luxo;
- sistema operacional para wigmaker;
- produto vendável, não dashboard genérico.

## Escopo permitido

Você pode editar somente:

```text
frontend/app/page.tsx
frontend/app/globals.css
frontend/app/layout.tsx somente se necessário
frontend/components/**
frontend/data/**
frontend/lib/**
frontend/types/**
frontend/public/**
docs/FRONTEND-REDESIGN-*.md
```

## Escopo proibido

Não edite:

```text
backend/**
tools/**
*.bat
*.ps1
docker-compose.yml
pom.xml
```

Se precisar de endpoint novo, escreva no final: "Solicitação para Sessão B".

## Antes de editar

1. Leia o estado atual do frontend.
2. Não apague o que já funciona.
3. Não faça `page.tsx` monstro se puder separar componentes.
4. Não remova integração existente de orçamento/WhatsApp/Pix.
5. Não invente depoimentos reais.
6. Não use imagem externa obrigatória.
7. Não instale dependência sem necessidade.
8. Se precisar criar mocks, crie em `frontend/data/velouraMockData.ts`.

## Diagnóstico obrigatório antes do patch

Responda primeiro:

```text
MELHORIAS — Sessão A diagnóstico
Arquivos lidos
O que já existe
O que está ruim
Arquivos que vou alterar
Arquivos que não vou tocar
Plano em etapas
Riscos
```

Depois implemente.

---

# Etapas da Sessão A

## Etapa A1 — Design system "Luxo funcional"

Criar ou melhorar tokens visuais:

```text
Preto profundo: #111111
Off-white: #F8F6F2
Nude areia: #D8C5B0
Champagne gold: #C8A96B
Marrom espresso: #4B3427
Rosé queimado: #C79BA5
Verde status: #40DCA5
Vinho profundo: #5A163B
Rose neon suave: #FF7AC8
```

Critérios:

- visual premium;
- pouco ruído;
- cards grandes;
- cantos arredondados;
- contraste;
- hierarquia clara;
- mobile-first;
- foco visível;
- sem emoji como base visual principal.

## Etapa A2 — Header e navegação

Criar header com:

```text
Logo/monograma Gal Atelier ou Veloura Beauty OS
Dashboard
Leads
Clientes
Produtos
Pedidos
Estoque
Agenda
Financeiro
WhatsApp
```

O logo deve sugerir fio de cabelo, lace ou monograma elegante.

## Etapa A3 — Hero/landing operacional

A primeira dobra precisa comunicar o nicho em 3 segundos.

Copy sugerida:

```text
Beauty Commerce CRM para wigmakers.
Venda, personalize e acompanhe perucas, laces e manutenções em um fluxo premium do briefing ao pós-venda.
```

CTAs:

```text
Criar orçamento
Abrir WhatsApp
Ver pipeline
```

O visual deve mostrar cabelo/peruca/lace com CSS/SVG/gradientes, não abstração solta.

## Etapa A4 — Quem somos

Criar seção "Quem somos":

```text
Gal Atelier é um espaço especializado em perucas, laces, customizações e manutenção. Unimos técnica artesanal, atendimento consultivo e organização digital para transformar desejo em um visual seguro, bonito e previsível.
```

Pilares:

```text
Naturalidade
Personalização
Processo seguro
Pós-venda
```

## Etapa A5 — Dashboard principal

Implementar cards:

```text
Faturamento do dia
Faturamento do mês
Leads novos
Pedidos em produção
Pedidos atrasados
Agendamentos de hoje
Ticket médio
Taxa de conversão
Produto mais vendido
Cliente VIP do mês
Estoque crítico
Contas a receber
```

Use dados mockados se backend ainda não fornecer.

## Etapa A6 — CRM de leads em Kanban visual

Criar visual para etapas:

```text
Novo lead
Contato iniciado
Diagnóstico
Recomendação enviada
Orçamento enviado
Negociação
Aguardando pagamento
Sinal pago
Pedido criado
Perdido
Reativar futuramente
```

Cada card deve mostrar:

```text
nome
WhatsApp
origem
interesse
orçamento aproximado
próxima ação
responsável
```

## Etapa A7 — Diagnóstico da cliente

Criar bloco/tela/seção de diagnóstico consultivo:

Campos visuais:

```text
objetivo de uso
experiência com wigs/laces
estilo desejado
restrições
tom de pele
cor desejada
comprimento
textura
frequência de uso
orçamento
```

Mostrar recomendação mockada:

```text
Recomendação: glueless lace 5x5 ou 13x4, densidade 150%, cabelo humano, comprimento 16–20", pré-customização.
```

## Etapa A8 — Catálogo técnico visual

Criar categorias:

```text
Wigs
Extensões
Serviços
Acessórios
```

Cards para:

```text
Glueless wig
Lace front wig
Full lace wig
Closure wig
360 lace wig
U-part wig
V-part wig
Headband wig
Medical wig
Braided wig
Fitness wig
Custom wig
Bundles
Closures
Frontals
Clip-ins
Ponytails
Hair toppers
Customização
Instalação
Manutenção
Lavagem
Hidratação
Restauração
Coloração
Plucking
Bleached knots
Lace tint
Wig cap
Wig grip
Lace glue
Lace tape
Adhesive remover
Wax stick
Mousse
Shampoo
Conditioner
Wig stand
Touca de cetim
Cabeça de manequim
```

Não precisa mostrar todos na home se ficar poluído. Pode criar filtros/tabs.

## Etapa A9 — Pedidos e produção

Criar visão de pedidos com status:

```text
Criado
Aguardando pagamento
Sinal pago
Pago integral
Aguardando produto
Em customização
Em instalação
Em conferência
Pronto para retirada
Enviado
Entregue
Pós-venda
Concluído
Cancelado
Reembolso solicitado
```

Criar timeline visual de produção:

```text
Aguardando material
Separação
Plucking
Bleached knots
Lace tint
Corte da lace
Coloração
Lavagem
Finalização
Fotos finais
Conferência
Pronto
```

## Etapa A10 — Estoque simples

Criar cards/tabela para unidades rastreáveis:

```text
SKU
código único
produto
variação
status
localização
custo
fornecedor
data de entrada
observações
```

Status:

```text
Em estoque
Reservado
Vendido
Em produção
Em manutenção
Devolvido
Defeito
Mostruário
```

## Etapa A11 — Agenda

Criar agenda visual com tipos:

```text
Consulta virtual
Prova presencial
Instalação
Manutenção
Retirada
Sessão de fotos
Customização interna
Entrega local
Atendimento VIP
```

## Etapa A12 — Financeiro básico

Criar dashboard financeiro mockado:

```text
receitas
despesas
lucro bruto
margem por produto
margem por pedido
comissão
taxa de gateway
frete
contas a receber
contas a pagar
fluxo de caixa
```

## Etapa A13 — WhatsApp e templates

Criar seção de templates manuais:

```text
primeiro atendimento
diagnóstico
orçamento
follow-up 24h
follow-up 72h
cobrança de sinal
confirmação de pedido
pedido em produção
pedido enviado
pós-venda
pedido de avaliação
recompra
aniversário
```

Não integrar API real. Apenas botão para copiar/abrir WhatsApp se já existir.

## Etapa A14 — Marketing, reviews, área da cliente como preview

Criar blocos de roadmap/preview, sem implementar fluxo real completo:

```text
Campanhas
Reviews
Antes e depois
Área da cliente
Recompra
```

## Etapa A15 — Validação

Rode:

```bat
cd /d K:\dev\repos\gal-atelier-os\frontend
npm install --no-audit --no-fund --include=dev --legacy-peer-deps
npm run build
```

Se não puder rodar, informe exatamente o motivo.

## Entrega final da Sessão A

Responda:

```text
MELHORIAS — Sessão A concluída
Arquivos alterados
Componentes criados
Dados mockados criados
Build
O que ficou pendente para Sessão B
Riscos restantes
```
