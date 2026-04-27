---
description: Validar Docker Compose
agent: plan
---

Valide sem editar arquivos:
1. docker info
2. docker compose config
3. docker compose ps
4. docker compose logs backend --tail=80
5. docker compose logs frontend --tail=80
6. GET http://localhost:8080/api/health
7. GET http://localhost:3000

Entregue diagnóstico e próximos passos.
