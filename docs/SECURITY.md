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
- Medidas (circunferência, testím)
- Preferências (cor, textura, densidade)
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

## Design Security (V6 — Editorial Atelier)

### Imagens
- Usar apenas imagens licenciadas ou próprias (caminho `public/gal-assets/`)
- Não usar placeholders genéricos de terceiros
- Fotos de produtos: lifestyle (modelo usando wig) ou detalhe (textura, lace)
- Formato: WebP ou JPEG otimizado, máximo 200KB para thumbnails

### Assets
- Logo: `public/brand/logo-gal-atelier.svg` (vetorial, não raster)
- Hero images: proporção 4:3 ou 16:9, mínimo 1200px width
- Cards de catálogo: imagem full-width no topo, não lado a lado com texto