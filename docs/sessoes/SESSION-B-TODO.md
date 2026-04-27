# SESSION-B-TODO — Tarefas Técnicas para Implementação Futura

## Data: 2026-04-27
## Status: BACKLOG

---

## ENDPOINTS A IMPLEMENTAR

### Diagnóstico Consultivo
```
POST /api/diagnosis
Campos:
  - objetivo (string)
  - experiência (string)
  - estilo (string)
  - restrições (string)
  - tomPele (string)
  - corDesejada (string)
  - comprimento (number)
  - textura (string)
  - frequênciaUso (string)
  - orçamento (string)
Retorno: recomendação de produto/serviço
Lógica: QuotePricingPolicy
```

---

## POLICIES A IMPLEMENTAR

### DiagnosisRecommendationPolicy
- Analisa perfil da cliente
- Recomenda tipo de lace (Lace Front, Full Lace, Glueless)
- Sugere densidade adequada
- Indica textura compatível
- Leva em conta orçamento e frequência

---

## FRONTEND A IMPLEMENTAR

### Wizard de Diagnóstico
- Passo 1: Dados pessoais (nome, whatsapp)
- Passo 2: Objetivo (primeira peruca, substituição, ampliação)
- Passo 3: Estilo (liso, cacheado, onulado, trançado)
- Passo 4: Características (cor, comprimento, textura, densidade)
- Passo 5: Preferências (com/sem cola, prazo, orçamento)
- Resultado: Recomendação personalizada

### Dashboard em Tempo Real
- Polling de métricas a cada 30 segundos
- Gráfico de tendência de orçamentos
- Gráfico de receita potencial vs realizada

### CRM Drag-and-Drop
- Kanban interativo para mover leads entre estágios
- Cards com drag-and-drop nativo
- Estados: Novo Lead, Contato, Diagnóstico, Recomendação, Orçamento, Sinal Pix, Produção, Prova, Entrega, Pós-venda, Perdido

### PDF do Orçamento
- Geração de comprovativo para cliente
- Template com dados do orçamento, Pix, WhatsApp
- Opção de download/impressão

### Histórico de Quotes
- Lista de orçamentos por cliente
- Filtro por período, status, tipo
- Detalhe de cada orçamento

---

## ADAPTERS A IMPLEMENTAR

### PixWebhookAdapter
- Recebe confirmação de pagamento
- Atualiza status do orçamento
- Notifica cliente

### WhatsAppBusinessAdapter
- Integração com WhatsApp Business API
- Envio de mensagens automatizadas
- Template de mensagens

### EmailNotificationAdapter
- Envio de e-mails transacionais
- Confirmação de orçamento
- Status de produção

---

## NOTAS

- UI atual não deve mostrar textos técnicos
- Implementar funcionalidades gradualmente
- Priorizar diagnóstico consultivo para próximo sprint