# PRODUCT ROADMAP — Gal Atelier OS / Veloura Beauty OS

## Visão do Produto

Sistema operacional para wigmaker/perucas com:
- CRM de clientes e leads
- Catálogo técnico de wigs (10 tipos)
- Pedidos personalizados
- Gestão de produção
- Agenda de instalação/manutenção
- Financeiro (Pix/sinal)
- WhatsApp operacional
- Área da cliente

---

## Versão Atual: V5 (Enterprise)

**Data**: 2026-04-27

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

### Frontend
| # | Componente | Status |
|---|----------|--------|
| 1 | Design system premium V5 | ✅ |
| 2 | Dashboard KPIs | ✅ |
| 3 | CRM pipeline visual | ✅ |
| 4 | Catálogo técnico | ✅ |
| 5 | Wizard de orçamento | ✅ |
| 6 | Dark mode | ✅ |
| 7 | Toast notifications | ✅ |
| 8 | Skeleton loading | ✅ |
| 9 | Header mobile | ✅ |
| 10 | Acessibilidade WCAG | ✅ |

### Testes
- 8 testes passando ✅
- JaCoCo coverage

### Infraestrutura
- Docker Compose ✅
- Maven build ✅
- npm build ✅

---

## FASE 2 — OPERAÇÃO REAL (PENDENTE)

### Prioridade Alta
- [ ] Banco de dados PostgreSQL
- [ ] Flyway/Liquibase migrations
- [ ] Status automático de pagamento (Mercado Pago/Asaas)
- [ ] Upload de fotos do processo

### Prioridade Média
- [ ] Ordem de produção
- [ ] Comissão de vendedor
- [ ] Cupom de desconto
- [ ] Área da cliente (portal)

### Prioridade Baixa
- [ ] Reviews/galeria antes/depois
- [ ]-segmentação automática

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