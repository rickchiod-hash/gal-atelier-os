# PRODUCT ROADMAP — Gal Atelier OS / Veloura Beauty OS

## Visão do Produto (V6 — Editorial Atelier)

Sistema operacional para wigmaker/perucas com estética de **loja de luxo + atelier artesanal**:

- CRM de clientes e leads (Concierge list view, não Kanban colorido)
- Catálogo técnico de wigs (10 tipos) em lookbook layout
- Pedidos personalizados com formulário single-column (inputs border-bottom only)
- Gestão de produção com micro-interações polite (400ms fade)
- Agenda de instalação/manutenção com tipografia Playfair Display
- Financeiro (Pix/sinal) com accents sutis (máximo 2% da página)
- WhatsApp operacional integrado sem skeleton loaders
- Área da cliente com whitespace generoso (mínimo 40% vazio)
- Anti-dashboard: sem card-mania, sem gráficos SVG falsos

---

## Versão Atual: V6 (Editorial Atelier)

**Data**: 2026-04-27
**Visual**: Anti-dashboard, loja de luxo + atelier artesanal, whitespace generoso, Playfair Display + Inter

---

## FASE 1 — MVP VENDÁVEL ✅ CONCLUÍDO

### Backend
| # | Endpoint | Método | Descrição | Status |
|---|----------|--------|----------|--------|
| 1 | /api/health | GET | Health check | ✅ |
| 2 | /api/quotes | POST | Criar orçamento | ✅ |
| 3 | /api/quotes | GET | Listar orçamentos | ✅ |
| 4 | /api/quotes/metrics | GET | Métricas | ✅ |
| 5 | /api/services | GET | Catálogo (10 tipos) | ✅ |
| 6 | /api/pipeline | GET | Pipeline CRM | ✅ |
| 7 | /api/dashboard | GET | Dashboard | ✅ |
| 8 | /api/leads | GET/POST/PATCH | Leads | ✅ |
| 9 | /api/diagnostics/recommendation | POST | Recomendação | ✅ |
| 10 | /api/templates/whatsapp | GET | Templates WhatsApp | ✅ |
| 11 | /api/customers | GET/POST/PATCH | Clientes | ✅ |
| 12 | /api/orders | GET/POST/PATCH | Pedidos | ✅ |
| 13 | /api/inventory | GET/POST/PATCH | Estoque | ✅ |
| 14 | /api/appointments | GET/POST/PATCH | Agenda | ✅ |
| 15 | /api/finance | GET | Financeiro | ✅ |
| 16 | /api/campaign | GET/POST/PATCH | Campanhas | ✅ |
| 17 | /api/notifications/email | POST | Email | ✅ |
| 18 | /api/webhook/pix | POST | Pix Webhook | ✅ |

### Frontend
| # | Componente | Status |
|---|----------|--------|
| 1 | Design system V6 — Editorial Atelier | ✅ |
| 2 | Hero editorial (split layout, não cards) | ✅ |
| 3 | Dashboard insights bar (horizontal, não grid) | ✅ |
| 4 | CRM Concierge list (não Kanban) | ✅ |
| 5 | Catálogo lookbook (1 full-width + 2-col grid) | ✅ |
| 6 | Quote wizard single-column (border-bottom inputs) | ✅ |
| 7 | Dark mode (paleta específica) | ✅ |
| 8 | Toast notifications (backdrop blur) | ✅ |
| 9 | Micro-interações polite (400ms, cubic-bezier) | ✅ |
| 10 | Header minimalista (logo + whitespace) | ✅ |
| 11 | Acessibilidade WCAG | ✅ |
| 12 | Anti-dashboard (removido skeletons, gráficos fake) | ✅ |

### Testes
- 8 testes passando ✅
- JaCoCo coverage

### Infraestrutura
- Docker Compose ✅
- Maven build ✅
- npm build ✅

---

## FASE 2 — OPERAÇÃO REAL (EM PROGRESSO)

### Prioridade Alta
- [x] Banco de dados PostgreSQL
- [x] Flyway/Liquibase migrations
- [ ] Status automático de pagamento (Mercado Pago/Asaas)
- [ ] Upload de fotos do processo

### Prioridade Média
- [ ] Ordem de produção
- [ ] Comissão de vendedor
- [ ] Cupom de desconto
- [ ] Área da cliente (portal)

### Prioridade Baixa
- [ ] Reviews/galeria antes/depois
- [ ] Segmentação automática

## FASE 3 — V6 VISUAL OVERHAUL ✅ CONCLUÍDO

### Prioridade Alta (Anti-Dashboard)
- [x] Hero split editorial (não cards sobrepostas) - v6
- [x] Dashboard horizontal bar (não grid de metric cards) - v6
- [x] CRM Concierge list (não Kanban colorido) - v6

### Prioridade Média (Editorial Atelier)
- [x] Catálogo lookbook layout (1 full-width + 2-col grid) - v6
- [x] Quote form single-column (inputs border-bottom only) - v6
- [x] Botões 2px radius (não pill-shaped) - v6
- [x] Remover gradientes pesados - v6

### Prioridade Baixa (Polish)
- [x] Remover skeleton loaders (usar texto elegante) - v6
- [x] Remover gráficos SVG falsos - v6
- [x] Micro-interações polite (400ms, cubic-bezier) - v6

---

## FASE 3 — INTELIGÊNCIA (ROADMAP)

- [ ] IA para recomendação de wig
- [ ] IA para responder WhatsApp
- [ ] Previsão de recompra
- [ ] Alerta de estoque
- [ ] Sugestão de preço/margem
- [ ] Relatórios avançados
- [ ] Integração Instagram/TikTok

---

## Catálogo de Serviços (10 tipos)

| # | Tipo | Descrição | Preço Base | Prazo |
|-----|---------|-----------|-----------|-------|
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

## Pipeline CRM (11 estágios)

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

## Erros Padronizados

```json
{
  "traceId": "...",
  "code": "VALIDATION_ERROR",
  "message": "...",
  "fields": {}
}
```

---

## Variáveis de Ambiente

```bash
WHATSAPP_RECEIVER=5511914136961
PIX_KEY=your-pix-key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Próximos Passos Imediatos

1. Merge na main
2. Implementar PostgreSQL com Flyway
3. Adicionar pagamento real (com aprovação)
4. Criar área da cliente

---

## Links

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- Health: http://localhost:8080/api/health
- JaCoCo: backend/target/site/jacoco/index.html