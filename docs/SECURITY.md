# SECURITY — Gal Atelier OS / Veloura Beauty OS

## Variáveis de Ambiente

```bash
# WhatsApp (obrigatório)
WHATSAPP_RECEIVER=5511914136961

# Pix (para geração de QR Code - não use conta real agora)
PIX_KEY=your-pix-key-here
PIX_MERCHANT_NAME=Gal Atelier
PIX_MERCHANT_CITY=Sao Paulo

# API
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WHATSAPP_RECEIVER=5511914136961

# AI (mockado por enquanto)
AI_PROVIDER=mock
```

## Regras de Segurança

### ⚠️ Nunca faça commit
- `.env.local`
- Chaves Pix reais
- Tokens de API
- senhas
- credentials

### ✅ use .gitignore
 Já está configurado para ignorar `.env.local`.

## CORS

O CORS está configurado em `WebConfiguration.kt`.

## LGPD e Dados

### Dados coletados
- Nome da cliente
- WhatsApp (para operacional)
- Medidas (circunferência, Testim)
- Preferências (cor, textura,密度)
- Histórico de pedidos

### Autorização de imagem
- Fotos de antes/depois precisam de autorização escrita
- Armazenar consentimento junto com a imagem

## Integrações Futuras

### WhatsApp Business API
- Usar webhook para status
- Não implementar sem aprovação

### Pagamento (Mercado Pago/Asaas)
- Split de pagamento para comissão
- Status automático de pagamento
- Não implementar agora

### Backend real
- PostgreSQL via Flyway/Liquibase
- Não migrar agora

## Logs

- TraceId em todas as requisições
- Não logar dados sensíveis (CPF, RG, dados financeiros)
- logs em `K:\dev\logs`