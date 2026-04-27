# V5.4 — limpeza, testes e validação

## Problemas corrigidos

1. Projeto antigo era sobrescrito por cima, mantendo classes obsoletas.
2. Isso causava conflito entre `com.galatelier.health.HealthController` antigo e `com.galatelier.adapter.input.web.HealthController` novo.
3. Agora o script faz backup e remove o projeto antes de copiar o payload.
4. `docker compose down --remove-orphans --rmi local` remove imagem local antiga do projeto.
5. `node_modules` é removido antes do build do frontend.
6. O script valida `node_modules/.bin/next.cmd`.
7. Se o Next não existir, reinstala dependências explícitas.
8. O OpenCode não bloqueia mais o fluxo se npm/postinstall falhar.
9. O IntelliJ é encontrado também por atalhos `.lnk` em `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\JetBrains`.
10. Logs antigos são arquivados em `K:\dev\logs\archive`.

## Testes adicionados

- Policy de preço.
- Application service.
- Pix adapter.
- WhatsApp adapter.
- Health endpoint.
- POST `/api/quotes`.
- Métricas.
- Validação de erro.

## Cobertura

O projeto agora gera JaCoCo:

```text
backend\target\site\jacoco\index.html
```

Ainda não há promessa de 100%. A versão V5.4 mede cobertura e amplia regressão. Gate rígido de 100% seria artificial neste MVP.
