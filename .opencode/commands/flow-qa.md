---
description: Validar fluxo completo V5.3
agent: plan
---

Não edite arquivos.

Execute/valide conceitualmente:
1. docker info
2. docker compose config
3. docker compose ps
4. docker compose logs backend --tail=120
5. docker compose logs frontend --tail=120
6. GET http://localhost:8080/api/health
7. POST http://localhost:8080/api/quotes
8. GET http://localhost:3000

Entregue diagnóstico, risco, causa provável e próximo passo.
