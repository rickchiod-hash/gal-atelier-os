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


# MELHORIAS — SESSÃO B — Produto, backend, contratos, dados e QA

## Missão da Sessão B

Você é a sessão responsável por **produto, backend, contratos de API, testes, documentação, dados e integração operacional**.

Você deve transformar o projeto em uma base técnica real para um Beauty Commerce CRM de wigmaker, sem conflitar com a Sessão A.

## Escopo permitido

Você pode editar:

```text
backend/**
docs/**
prompts/**
.opencode/commands/**
frontend/lib/api* somente se necessário
frontend/types/** somente se necessário
.env.example
```

## Escopo proibido

Não edite:

```text
frontend/app/page.tsx
frontend/app/globals.css
frontend/components/**
tools/**
*.bat
*.ps1
docker-compose.yml sem autorização
```

## Observação crítica sobre stack

O prompt de origem cita Next.js, Tailwind, Shadcn, Prisma, PostgreSQL, Auth etc.  
Mas o projeto atual já usa Kotlin + Spring Boot no backend.

Logo:

- NÃO troque a stack agora.
- NÃO instale Prisma/PostgreSQL/Auth sem aprovação.
- Use o prompt de origem como roadmap de produto e modelo futuro.
- Na fase atual, implemente contratos e endpoints compatíveis com o backend Kotlin existente.
- Se algo for grande demais, documente em `docs/PRODUCT-ROADMAP.md`.

## Diagnóstico obrigatório antes do patch

Responda primeiro:

```text
MELHORIAS — Sessão B diagnóstico
Arquivos lidos
Endpoints atuais
Domínio atual
Use cases atuais
Adapters atuais
Testes atuais
O que falta para Beauty Commerce CRM
Arquivos que vou alterar
Arquivos que não vou tocar
Plano em etapas
Riscos
```

Depois implemente.

---

# Etapas da Sessão B

## Etapa B1 — Contrato do produto

Criar/atualizar:

```text
docs/PRODUCT-PRD-VEL0URA-BEAUTY-OS.md
docs/API-CONTRACT.md
docs/DATA-MODEL-ROADMAP.md
docs/VALIDATION-RUNBOOK.md
```

Esses docs devem conter o roadmap do prompt de origem:

```text
Dashboard
CRM de leads
Diagnóstico da cliente
Clientes
Catálogo técnico
Estoque
Pedidos
Produção/customização
Agenda
Financeiro
WhatsApp/atendimento
Marketing/automações
Reviews/galeria
Área da cliente
```

## Etapa B2 — Services/Catálogo

Implementar ou preparar endpoint:

```text
GET /api/services
```

Itens mínimos:

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
```

Payload sugerido:

```json
{
  "id": "lace-front",
  "name": "Lace Front Wig",
  "category": "WIG",
  "description": "Peruca com lace frontal para acabamento natural.",
  "priceRange": "R$ 800 - R$ 2.500",
  "duration": "5-15 dias",
  "profile": "Cliente que busca naturalidade frontal",
  "attributes": ["lace front", "human hair", "custom color"]
}
```

## Etapa B3 — Dashboard metrics

Implementar ou preparar:

```text
GET /api/dashboard
```

Campos:

```text
dailyRevenue
monthlyRevenue
newLeads
ordersInProduction
lateOrders
todayAppointments
averageTicket
conversionRate
bestSellingProduct
vipCustomer
criticalStock
accountsReceivable
```

## Etapa B4 — CRM Leads/Pipeline

Implementar ou preparar:

```text
GET /api/leads
GET /api/pipeline
POST /api/leads
PATCH /api/leads/{id}/status
```

Pipeline:

```text
NEW_LEAD
CONTACT_STARTED
DIAGNOSIS
RECOMMENDATION_SENT
QUOTE_SENT
NEGOTIATION
AWAITING_PAYMENT
DEPOSIT_PAID
ORDER_CREATED
LOST
REACTIVATE_LATER
```

## Etapa B5 — Diagnóstico da cliente

Implementar ou preparar:

```text
POST /api/diagnostics/recommendation
```

Entrada:

```text
usageGoal
experience
desiredStyle
restrictions
skinTone
desiredColor
desiredLength
desiredTexture
frequencyOfUse
budget
```

Saída:

```text
recommendedWigType
recommendedDensity
recommendedLace
priceRange
recommendedServices
recommendedAccessories
explanation
```

Pode ser regra simples, sem IA real.

## Etapa B6 — Clientes

Implementar ou preparar contratos:

```text
GET /api/customers
POST /api/customers
GET /api/customers/{id}
```

Campos importantes:

```text
name
phone
whatsapp
email
instagram
birthDate
city
state
origin
tags
status
averageTicket
lifetimeValue
lastPurchaseAt
nextRecommendedAction
lgpdConsent
imageUseConsent
preferences
```

## Etapa B7 — Produtos e atributos técnicos

Implementar ou documentar contratos:

```text
GET /api/products
POST /api/products
GET /api/products/{id}
```

Atributos:

```text
hairType
texture
lengthInches
density
laceType
laceSize
capSize
color
preCustomization
price
cost
margin
stock
supplier
restockDeadline
photos
videos
status
```

## Etapa B8 — Pedidos/produção/estoque/agenda/financeiro

Se for pequeno, criar endpoints mockados. Se for grande, documentar no contrato.

Endpoints mínimos desejados:

```text
GET /api/orders
GET /api/inventory
GET /api/appointments
GET /api/finance/summary
GET /api/message-templates
GET /api/campaigns
```

## Etapa B9 — Erros e validação

Garantir erro padronizado:

```json
{
  "traceId": "...",
  "code": "VALIDATION_ERROR",
  "message": "...",
  "fields": []
}
```

Validações:

```text
WhatsApp válido
nome obrigatório
status válido
valor não negativo
prazo não negativo
SKU único quando existir
```

## Etapa B10 — Testes de regressão

Adicionar/ajustar testes para endpoints implementados:

```text
health
quote
services
dashboard
pipeline
diagnostic recommendation
message templates
validation error
```

## Etapa B11 — Segurança

Criar/atualizar:

```text
.env.example
docs/SECURITY.md
```

Regras:

```text
PIX_KEY em env
WHATSAPP_RECEIVER em env
sem secrets hardcoded
CORS documentado
LGPD/consentimento documentado
```

## Etapa B12 — Validação

Rode:

```bat
cd /d K:\dev\repos\gal-atelier-os\backend
mvn -B clean verify
```

Se front tiver tipos/contratos alterados:

```bat
cd /d K:\dev\repos\gal-atelier-os\frontend
npm run build
```

## Entrega final da Sessão B

Responda:

```text
MELHORIAS — Sessão B concluída
Arquivos alterados
Endpoints criados/alterados
Contratos documentados
Testes
Build Maven
O que a Sessão A precisa saber
Riscos restantes
```
