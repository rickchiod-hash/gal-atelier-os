Objetivo:
Revisar o fluxo operacional V5.3 como se fosse um release candidate.

Não edite arquivos inicialmente.

Valide:
1. docker info
2. docker compose config
3. docker compose ps
4. mvn test
5. npm run build
6. GET http://localhost:8080/api/health
7. GET http://localhost:3000
8. POST http://localhost:8080/api/quotes

Analise:
- falhas de arquitetura;
- falhas de logs;
- falhas de DX;
- falhas de Docker;
- falhas de mobile;
- falhas de segurança;
- próximos 5 passos de produto.

Só implemente depois de aprovação explícita.
