# PRODUCT PRD — Veloura Beauty OS / Gal Atelier OS

## Visão do Produto

Sistema operacional para wigmaker/perucas com:
- CRM de clientes e leads
- Catálogo técnico de wigs
- Pedidos personalizados
- Gestão de produção
- Agenda de instalação/manutenção
- Financeiro (Pix/sinal)
- WhatsApp operacional
- Área da cliente

## Módulos do Produto

### 1. Dashboard
- KPIs: leads, conversão, receita, Pix pendente
- Próximas entregas
- Alertas de produção

### 2. CRM de Leads
- Pipeline: Lead → Contato → Orçamento → Pix Pendente → Em Produção → Concluído → Perdido
- Status por fase
- Histórico de interações

### 3. Diagnóstico da Cliente
- Medidas (circunferência,Testim)
- Preferências (cor, textura, densidade)
- Histórico de pedidos
- Observações

### 4. Catálogo Técnico
| Serviço | Descrição | Preço Base |
|---------|-----------|-----------|
| Glueless wig | Instalação sem cola | R$ 450-1200 |
| Lace front | Lace frontal personalizada | R$ 800-2500 |
| Full lace | Peruca toda em lace | R$ 1200-4000 |
| Closure wig | Fechamento frontal | R$ 600-1500 |
| 360 lace | Peruca 360 graus | R$ 1500-4500 |
| U-part wig | Parte frontal em U | R$ 700-1800 |
| Manutenção | Higienização mensal | R$ 200-500 |
| Customização | personalizationEvent | R$ 150-600 |

### 5. Estoque (Roadmap)
- Telas (laces, caps)
- Cabelos (virgem, sintético)
- Colas e fitas
- Acessórios
- Fornecedores

### 6. Pedidos/Orçamentos
- Versionamento com histórico
- Motivo de alteração
- Status: ORÇADO, APROVADO, EM_PRODUÇÃO, CONCLUÍDO, CANCELADO

### 7. Financeiro
- Sinal Pix obrigatório
- Percentual configurável
- Mensagem pronta
- Status de pagamento

### 8. Agenda (Roadmap)
- Instalação
- Prova
- Entrega
- Manutenção

### 9. WhatsApp
- Mensagem automática
- Link directo
- Template por etapa

### 10. Área da Cliente (Roadmap)
- Acompanhar pedido
- Ver histórico
- Agendar manutenção

---

## Endpoints Atuais

| Método | Endpoint | Descrição |
|--------|----------|----------|
| GET | /api/health | Health check |
| GET | /api/quotes | Listar orçamentos |
| POST | /api/quotes | Criar orçamento |
| GET | /api/quotes/metrics | Métricas |
| GET | /api/services | Catálogo |

---

## Roadmap de Expansão

### Fase 2 (Futuro)
- POST /api/clientes
- GET /api/clientes/{id}
- PUT /api/clientes/{id}
- POST /api/pedidos
- GET /api/pedidos/{id}
- PUT /api/pedidos/{id}/status

### Fase 3 (Futuro)
- Estoque
- Agenda
- Área da cliente