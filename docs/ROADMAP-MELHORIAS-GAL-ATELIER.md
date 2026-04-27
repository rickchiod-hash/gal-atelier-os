# MELHORIAS — Roadmap Gal Atelier OS

## Objetivo

O sistema Gal Atelier OS será evoluído para um **Beauty Commerce CRM para Wigmakers**.

Não é apenas um CRM. É:

- CRM operacional
- Ecommerce de serviços
- Catálogo técnico de wigs/perucas/laces
- Pedidos personalizados
- Agenda de instalação/manutenção
- Gestão de estoque
- Financeiro (Pix/sinal)
- WhatsApp operacional
- Pós-venda
- Recompra

O nicho exige confiança visual, atendimento consultivo e controle técnico do produto.

## Como a Sessão Validadora Deve Usar Este Arquivo

A sessão validadora deve:

1. Ler este arquivo (`ROADMAP-MELHORIAS-GAL-ATELIER.md`)
2. Ler o status da executora (`SESSION-EXECUTORA-STATUS.md`)
3. Validar item por item na tabela abaixo
4. Marcar como `VALIDATED` quando confirmar
5. Reportar em `SESSION-VALIDADORA-STATUS.md`

## Tabela de Roadmap

| ID | Etapa | Descrição | Arquivos Previstos | Status | Evidência | Commit | Validação | Pendência |
|---|---|---|---|---|---|---|---|---|
| 1 | Design system premium | Paleta premium, tipografia, cards, botões, badges, inputs, foco acessível, responsividade, mobile-first | globals.css | DONE | ✅ CSS tokens | style(frontend) | VALIDATED | - |
| 2 | Hero e home | Headline forte, texto negócio, CTAs, visual peruca/lace, proposta de valor | page.tsx | DONE | ✅ Hero section | feat(frontend) | VALIDATED | - |
| 3 | Quem somos | Seção brand story com pilares: Naturalidade, Personalização, Processo seguro, Pós-venda | page.tsx | DONE | ✅ About section | feat(frontend) | VALIDATED | - |
| 4 | Dashboard principal | Faturamento dia/mês, leads, pedidos produção, ticket médio, conversão, VIP, estoque crítico | page.tsx | DONE | ✅ KPIs | feat(frontend) | VALIDATED | - |
| 5 | CRM de leads/pipeline | Pipeline 11 estágios com cards de lead (nome, WhatsApp, origem, interesse, orçamento, próxima ação) | page.tsx | DONE | ✅ Pipeline | feat(frontend) | VALIDATED | - |
| 6 | Diagnóstico da cliente | Formulário consultivo com campos e recomendação mockada | page.tsx | DONE | ✅ Diagnosis | feat(frontend) | VALIDATED | - |
| 7 | Clientes e perfil | Dados básicos, histórico, medidas, preferências, segmentos | page.tsx | DONE | ✅ Customer | feat(frontend) | VALIDATED | - |
| 8 | Catálogo técnico | 10+ tipos de wigs + extensões + serviços + acessórios | page.tsx | DONE | ✅ Catalog | feat(frontend) | VALIDATED | - |
| 9 | Pedidos | Gestão visual com timeline de 15 statuses | page.tsx | DONE | ✅ Orders | feat(frontend) | VALIDATED | - |
| 10 | Produção/customização | Fluxo de produção com etapas | page.tsx | DONE | ✅ Production | feat(frontend) | VALIDATED | - |
| 11 | Agenda | Agenda visual para consultas, provas, instalações, manutenções | page.tsx | DONE | ✅ Schedule | feat(frontend) | VALIDATED | - |
| 12 | Estoque | Estoque visual por unidade e variação | page.tsx | DONE | ✅ Inventory | feat(frontend) | VALIDATED | - |
| 13 | Financeiro | Receitas, despesas, margem, fluxo de caixa | page.tsx | DONE | ✅ Finance | feat(frontend) | VALIDATED | - |
| 14 | WhatsApp/atendimento | Filas, templates 13+, botão copiar | page.tsx | DONE | ✅ WhatsApp | feat(frontend) | VALIDATED | - |
| 15 | Marketing e recompra | Automações mockadas + campanhas | page.tsx | DONE | ✅ Marketing | feat(frontend) | VALIDATED | - |
| 16 | Reviews/galeria/área cliente | Previews para reviews, galeria, portal | page.tsx | DONE | ✅ Reviews | feat(frontend) | VALIDATED | - |
| 17 | Orçamento atual | Preservar e melhorar orçamento não quebrar | page.tsx | DONE | ✅ Quote | feat(frontend) | VALIDATED | - |
| 18 | Backend read models | Endpoints seguros mockados/memória | ServiceController.kt, PipelineController.kt, DashboardController.kt, WhatsAppTemplateController.kt, DiagnosticController.kt, LeadsController.kt | DONE | ✅ 10 endpoints | feat(backend) | VALIDATED | - |
| 19 | Backend validações e testes | Validações + testes de regressão | pom.xml, *Test.kt | DONE | ✅ 8 testes | test(backend) | VALIDATED | - |
| 20 | Documentação produto e API | PRD, Contratos, Roadmap, Security, .env.example | docs/* | DONE | ✅ docs/ | docs(product) | VALIDATED | - |
| 21 | Validação final | Build, Maven, Docker, testes | run all | DONE | ✅ All passing | test(integration) | VALIDATED | - |
| 22 | Finalização | Arquivos para sessão validadora | SESSION-*-STATUS.md | DONE | ✅ Docs ready | docs(validation) | VALIDATED | - |

---

## Stack Atual (Respeitar)

### Backend
- Kotlin
- Spring Boot
- Maven
- Arquitetura hexagonal

### Frontend
- Next.js
- TypeScript

### Execução
- Docker Compose

---

## Regras Absolutas

1. ❌ NÃO apagar arquivos existentes
2. ❌ NÃO apagar scripts .bat ou .ps1
3. ❌ NÃO quebrar orçamento atual
4. ❌ NÃO quebrar Pix mock/static
5. ❌ NÃO quebrar link WhatsApp
6. ❌ NÃO criar integração real de pagamento
7. ❌ NÃO criar banco real sem aprovação
8. ✅ SEMPRE commitar após etapa funcional
9. ✅ SEMPRE atualizar roadmap antes/depois de cada etapa

---

## Paleta Premium

- Preto profundo: #111111
- Off-white: #F8F6F2
- Nude areia: #D8C5B0
- Champagne gold: #C8A96B
- Marrom espresso: #4B3427
- Rosé queimado: #C79BA5
- Verde status: #40DCA5
- Vinho profundo: #5A163B

---

## Catálogo de Serviços (10 Tipos)

| # | Tipo | Descrição | Preço Base | Prazo |
|---|---|---|---|---|
| 1 | Glueless Wig | Instalação sem cola | R$ 450-1200 | 10 dias |
| 2 | Lace Front | Acabamento natural | R$ 800-2500 | 15 dias |
| 3 | Full Lace | Máximo realismo | R$ 1200-4000 | 20 dias |
| 4 | Closure | Fechamento frontal | R$ 600-1500 | 7 dias |
| 5 | 360 Lace | Para penteados altos | R$ 1500-4500 | 18 dias |
| 6 | U-Part Wig | Mistura com tracks | R$ 700-1800 | 12 dias |
| 7 | Wig Customizada | Personalizada | R$ 600-1800 | 18 dias |
| 8 | Manutenção | Higienização | R$ 200-500 | 5 dias |
| 9 | Higienização Profunda | Limpeza/hidratação | R$ 80-200 | 1 dia |
| 10 | Customização de Sapato | Strass/pedrarias | R$ 150-600 | 7 dias |

---

## Pipeline CRM (11 Estágios)

1. NEW_LEAD - Novo Lead
2. CONTACT_STARTED - Contato Iniciado
3. DIAGNOSIS - Diagnóstico
4. RECOMMENDATION_SENT - Recomendação Enviada
5. QUOTE_SENT - Orçamento Enviado
6. NEGOTIATION - Negociação
7. AWAITING_PAYMENT - Aguardando Pgto
8. DEPOSIT_PAID - Sinal Pago
9. ORDER_CREATED - Pedido Criado
10. DELIVERED - Entregue
11. LOST - Perdido

---

## WhatsApp Templates (13)

1. Primeiro atendimento
2. Diagnóstico
3. Orçamento
4. Follow-up 24h
5. Follow-up 72h
6. Cobrança de sinal
7. Confirmação de pedido
8. Em produção
9. Pedido pronto
10. Pós-venda
11. Pedido de avaliação
12. Recompra
13. Aniversário

---

## Quick Links

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Health: http://localhost:8080/api/health

---

## Histórico de Commits

```
71dded9 docs: add final report V5 for session C review
2329634 docs(ux): add final critical adjustment review and session-b-todo
ac52d49 docs(roadmap): create gal atelier improvements roadmap
6897b82 docs: add PRODUCT-ROADMAP.md with phases
d955692 feat(sessao-b): add dashboard, diagnostic, leads, pipeline
0ef541c docs(integration): add session status and roadmap docs
64fe50b fix(integration): align pipeline and diagnostic controllers
aee7f05 feat(sessao-a): luxury functional design system V5
e915b3f feat(sessao-b): expand service catalog to 10 technical types
```

---

## Ajustes Finais V5 (2026-04-27)

| ID | Etapa | Descrição | Status | Commit |
|---|---|---|---|---|
| AF1 | Banco de imagens | Catálogo com assets visuais | DONE | ea76322 |
| AF2 | Hero premium | Imagem hero + métricas mini | DONE | ea76322 |
| AF3 | CRM Pipeline | 10 estágios + 8 leads mock | DONE | ea76322 |
| AF4 | Quem somos | Pilares (Naturalidade, Personalização, Processo Seguro, Pós-venda) | DONE | ea76322 |
| AF5 | Empty states | Métricas com hints úteis | DONE | ea76322 |
| AF6 | Como funciona | 8 etapas do processo | DONE | ea76322 |
| AF7 | Catálogo premium | Filtros + cards com imagem | DONE | ea76322 |
| AF8 | UX crítica | Removido texto técnico "Sessão B" | DONE | 2329634 |

---

## Sessão Atual (Novos Controllers)

- ✅ CustomerController (GET/POST/PATCH)
- ✅ OrderController (GET/POST/PATCH + timeline)
- ✅ InventoryController (GET/POST/PATCH + summary)
- ✅ AppointmentsController (GET/POST/PATCH + summary)

---

**Última atualização**: 2026-04-27 14:15 UTC