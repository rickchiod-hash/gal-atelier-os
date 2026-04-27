# VALIDATION RUNBOOK — Veloura Beauty OS

## Como Validar o Sistema

### 1. Health Check

```bash
curl http://localhost:8080/api/health
```

Esperado:
```json
{ "status": "ok" }
```

---

### 2. Criar Orçamento

```bash
curl -X POST http://localhost:8080/api/quotes \
  -H "Content-Type: application/json" \
  -H "X-Trace-Id: test-001" \
  -d '{
    "clientName": "Maria Silva",
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
    "notes": "Teste de validação"
  }'
```

Esperado: retorna orçamento com `id`, `recommendedPrice`, `depositPrice`, `whatsappLink`, `pixCopyPaste`

---

### 3. Validar Campos

| Campo | Regra | Erro se |
|-------|-------|---------|
| clientName | 2-80 chars | 400 |
| clientWhatsapp | 10-20 digits | 400 |
| lengthCm | 10-120 | 400 |
| deadlineDays | 1-180 | 400 |
| materialCost | >= 0 | 400 |
| marginPercent | 0-300% | 400 |

---

### 4. Listar Orçamentos

```bash
curl http://localhost:8080/api/quotes
```

Esperado: lista com `clientName`, `status`, `recommendedPrice`

---

### 5. Métricas

```bash
curl http://localhost:8080/api/quotes/metrics
```

Esperado:
```json
{
  "quotes": 1,
  "revenuePotential": 650.00,
  "depositsPotential": 227.50
}
```

---

### 6. Catálogo

```bash
curl http://localhost:8080/api/services
```

Esperado: lista com 5+ serviços

---

## Casos de Teste

### TC001 - Criar orçamento válido
- Input: válido
- Esperado: 200, retorna orçamento

### TC002 - Cliente com nome curto
- Input: clientName = "A"
- Esperado: 400, "clientName deve ter entre 2 e 80 caracteres"

### TC003 - Telefone inválido
- Input: clientWhatsapp = "123"
- Esperado: 400, "clientWhatsapp deve ter entre 10 e 20 caracteres"

### TC004 - Comprimento inválido
- Input: lengthCm = 5
- Esperado: 400, "must be between 10 and 120"

### TC005 - Prazo inválido
- Input: deadlineDays = 200
- Esperado: 400, "must be between 1 and 180"

### TC006 - Margem excessiva
- Input: marginPercent = 500
- Esperado: 400, "must be between 0 and 300"

### TC007 - Listar vazio
- Input: Nenhum orçamento
- Esperado: 200, []

### TC008 - health check
- Input: N/A
- Esperado: 200, { "status": "ok" }

---

## Frontend

### Build
```bash
cd frontend && npm run build
```
Esperado: sucesso

### Entwicklung
```bash
cd frontend && npm run dev
```
Esperado: http://localhost:3000

---

## Docker

### Build
```bash
docker compose -p gal-atelier-os build
```

### Up
```bash
docker compose -p gal-atelier-os up -d
```

### Logs
```bash
docker compose -p gal-atelier-os logs -f
```

### Down
```bash
docker compose -p gal-atelier-os down
```

---

## Testes Automatizados

### Backend
```bash
cd backend && mvn clean verify
```
Esperado: 8+ testes passando

---

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---------|-----------|-------|
| API_URL | URL do backend | http://localhost:8080 |
| WHATSAPP_RECEIVER | Número WhatsApp | 5511914136961 |

---

## Troubleshooting

### Backend não sobe
1. Verificar porta 8080 livre: `netstat -ano | findstr 8080`
2. Verificar logs: `docker logs gal-atelier-backend`

### Frontend não builda
1. Verificar node_modules: `rm -rf node_modules && npm install`
2. Verificar TypeScript: `npx tsc --noEmit`

### Testes falham
1. Limpar target: `mvn clean`
2. Executar novamente: `mvn verify`