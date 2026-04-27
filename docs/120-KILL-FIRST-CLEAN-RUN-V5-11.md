# V5.11 — Kill First + Clean Run

## Motivo

O erro real da V5.10 foi pasta travada:

```text
K:\dev\repos\gal-atelier-os
O processo não pode acessar o arquivo porque ele está sendo usado por outro processo.
```

Isso acontecia porque IDEs, terminais, OpenCode, Java/Node ou Explorer seguravam a pasta antiga. O Docker ficava vazio porque o script parava antes de chegar no `docker compose up`.

## Correção

A V5.11 roda uma fase zero antes do orquestrador:

```text
tools/preclean-v5-11.ps1
```

Ela faz:

1. Fecha janelas Explorer abertas no projeto.
2. Mata processos que usam `gal-atelier-os` na command line.
3. Mata processos em portas 3000 e 8080.
4. Em modo agressivo, fecha IDEs/runtimes comuns:
   - IntelliJ
   - VS Code
   - OpenCode
   - Node
   - Java
   - Git Bash/Mintty
5. Derruba stack Docker antiga.
6. Remove containers/imagens antigas por nome.
7. Move o projeto antigo para backup.
8. Só então libera o orquestrador principal para copiar o projeto limpo.

## Logs

```text
K:\dev\logs\preclean\preclean-v5-11-<timestamp>.log
K:\dev\logs\preclean\preclean-v5-11-<timestamp>.json
```

## Resultado esperado

O Docker Desktop deve sair de vazio para:

```text
gal-atelier-backend
gal-atelier-frontend
```
