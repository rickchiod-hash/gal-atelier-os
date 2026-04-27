# API CONTRACT — Gal Atelier OS (V6 Editorial Atelier)

## Health

### GET /api/health
```json
{ "status": "ok", "timestamp": "2026-04-27T12:00:00Z" }
```

---

## Quotes

### GET /api/quotes
```json
[
  {
    "id": "uuid",
    "clientName": "Maria",
    "clientWhatsapp": "5511999999999",
    "serviceType": "LACE_FRONT",
    "status": "QUOTED",
    "minimumPrice": 500.00,
    "recommendedPrice": 650.00,
    "premiumPrice": 877.50,
    "depositPrice": 227.50,
    "whatsappMessage": "Oi, Maria! ✨...",
    "whatsappLink": "https://wa.me/5511914136961?text=...",
    "pixCopyPaste": "000201...",
    "createdAt": "2026-04-27T12:00:00Z"
  }
]
```

### POST /api/quotes
Request:
```json
{
  "clientName": "Maria",
  "clientWhatsapp": "11999999999",
  "type": "LACE_FRONT",
  "color": "Castanho iluminado",
  "lengthCm": 55,
  "texture": "Ondulada",
  "density": "180%",
  "capSize": "M",
  "deadlineDays": 15,
  "materialCost": 150.00,
  "laborCost": 250.00,
  "complexityCost": 80.00,
  "urgencyCost": 20.00,
  "marginPercent": 30,
  "notes": "Acabamento natural"
}
```

Response: Same as GET /api/quotes

### GET /api/quotes/metrics
```json
{
  "quotes": 10,
  "revenuePotential": 6500.00,
  "depositsPotential": 2275.00
}
```

---

## Services/Catalog

### GET /api/services
```json
[
  {
    "id": "lace-front",
    "type": "LACE_FRONT",
    "label": "Lace Front",
    "description": "Peruca frontal de lace com acabamento natural...",
    "basePriceMin": 450.0,
    "basePriceMax": 1200.0,
    "estimatedDays": 15,
    "materials": ["Lace frontal", "Cabelo virgem", "TNT", "Elastic lace"]
  }
]
```

---

## Cliente (Roadmap)

### GET /api/clientes
```json
[
  {
    "id": "uuid",
    "name": "Maria",
    "whatsapp": "5511999999999",
    "email": "maria@email.com",
    "createdAt": "2026-04-27T12:00:00Z"
  }
]
```

### GET /api/clientes/{id}
```json
{
  "id": "uuid",
  "name": "Maria",
  "whatsapp": "5511999999999",
  "email": "maria@email.com",
  "medidas": {
    "circunferencia": 54,
    "testim": 21,
    "capSize": "M"
  },
  "preferencias": {
      "cor": "Castanho",
    "textura": "Ondulada",
    "densidade": "180%"
  },
  "observacoes": "Pele sensível",
  "createdAt": "2026-04-27T12:00:00Z"
}
```

---

## Pedidos (Roadmap)

### GET /api/pedidos
```json
[
  {
    "id": "uuid",
    "clienteId": "uuid",
    "servico": "LACE_FRONT",
    "status": "ORÇADO",
    "valorTotal": 650.00,
    "sinalPago": 227.50,
    "dataSinal": "2026-04-27T12:00:00Z",
    "prazo": "2026-05-12",
    "createdAt": "2026-04-27T12:00:00Z"
  }
]
```

### PUT /api/pedidos/{id}/status
Request:
```json
{
  "status": "APROVADO"
}
```

---

## Erros

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Erro de validação",
  "fields": {
    "clientWhatsapp": "tamanho deve ser entre 10 e 20"
  }
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Recurso não encontrado"
}
```

---

## Headers

| Header | Descrição |
|--------|----------|
| X-Trace-Id | Trace ID para logs |
| Content-Type | application/json |