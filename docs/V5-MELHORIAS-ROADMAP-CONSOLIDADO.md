# V5 MELHORIAS — Roadmap Consolidado Gal Atelier OS

## Status: Fases 1-3 em desenvolvimento

---

## ✅ Fase 1 — V5 Core (Implementado)
### Sessão A — Frontend Luxo Funcional
- Design system premium (cores: off-white, nude, champagne gold, espresso, wine, rose)
- Tipografia: Cormorant Garamond (display) + Inter (body)
- Dashboard KPIs: 8 métricas visuais com animações
- CRM pipeline Kanban: 5 estágios (Orçamento → Aprovado → Produção → Concluído → Cancelado)
- Catálogo técnico: 6 serviços com cards animados
- Wizard orçamento: 3 etapas
- Toast notifications + Skeleton loading
- Dark mode com persistência localStorage
- Menu mobile com drawer responsivo
- Acessibilidade WCAG (aria-labels, foco, contraste 4.5:1)

### Sessão B — Backend + Produto
- GET /api/dashboard — Métricas completas
- GET /api/services — 10 serviços técnicos (Glueless, Lace Front, Full Lace, Closure, 360 Lace, U-Part, Wig Custom, Manutenção, Higienização, Custom Sapato)
- GET /api/leads + POST + PATCH /stage
- POST /api/diagnostics/recommendation — Diagnóstico consultivo
- GET /api/pipeline — Pipeline de quotes

---

## 🔲 Fase 2 — CRM Completo (Roadmap)
### Backend
- [ ] GET /api/customers — Lista de clientes
- [ ] POST /api/customers — Criar cliente
- [ ] GET /api/customers/{id} — Detalhe com medidas e preferências
- [ ] PUT /api/customers/{id} — Atualizar cliente
- [ ] GET /api/orders — Lista de pedidos
- [ ] POST /api/orders — Criar pedido
- [ ] GET /api/orders/{id} — Detalhe do pedido
- [ ] PATCH /api/orders/{id}/status — Atualizar status pedido

### Frontend
- [ ] Tela de clientes com histórico
- [ ] Tela de pedidos com timeline de produção
- [ ] Filtros avançados por status, data, cliente

---

## 🔲 Fase 3 — Operacional (Roadmap)
### Backend
- [ ] GET /api/inventory — Estoque
- [ ] POST /api/inventory — Adicionar item
- [ ] PATCH /api/inventory/{id} — Atualizar estoque
- [ ] GET /api/appointments — Agenda
- [ ] POST /api/appointments — Agendar
- [ ] GET /api/finance/summary — Resumo financeiro
- [ ] GET /api/templates — Templates WhatsApp
- [ ] GET /api/campaigns — Campanhas

### Frontend
- [ ] Tela de estoque
- [ ] Calendário de agenda
- [ ] Dashboard financeiro
- [ ] Editor de templates WhatsApp

---

## 🔲 Fase 4 — Cliente & Marketing (Roadmap)
- [ ] Área da cliente (portal público)
- [ ] Sistema de reviews/fotos
- [ ] Campanhas de marketing
- [ ] Programa de fidelidade
- [ ] Recompra automática

---

## 📊 Endpoints Implementados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/health | Health check |
| GET | /api/dashboard | Dashboard KPIs |
| GET | /api/quotes | Lista orçamentos |
| POST | /api/quotes | Criar orçamento |
| GET | /api/quotes/metrics | Métricas |
| GET | /api/services | Catálogo 10 serviços |
| GET | /api/leads | Lista leads |
| POST | /api/leads | Criar lead |
| PATCH | /api/leads/{id}/stage | Atualizar estágio |
| POST | /api/diagnostics/recommendation | Diagnóstico |
| GET | /api/pipeline | Pipeline quotes |

---

## 🎯 Prioridades para Próxima Sprint

1. **GET /api/customers** — Entidade cliente para CRM completo
2. **GET /api/orders** — Ciclo de pedido completo
3. **GET /api/templates** — Templates WhatsApp operacionais
4. **Testes E2E** — Validação full flow (criar lead → diagnóstico → orçamento → pedido)

---

## 📝 Notas Técnicas

- Backend: Kotlin + Spring Boot 3.4.5 + Maven
- Frontend: Next.js 16.2.4 + TypeScript
- Arquitetura: Hexagonal (ports/adapters)
- Persistência: In-memory (preparado para PostgreSQL)
- Execução: Docker Compose
- Branch atual: `improvements/v5-fase1-qa`

---

## 🔗 Links Úteis

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Health: http://localhost:8080/api/health
- Dashboard: http://localhost:8080/api/dashboard
- Services: http://localhost:8080/api/services
- Leads: http://localhost:8080/api/leads
- Pipeline: http://localhost:8080/api/pipeline

---

**Última atualização:** 2026-04-27
**Versão:** v5.12