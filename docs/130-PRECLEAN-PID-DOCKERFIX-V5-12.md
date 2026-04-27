# V5.12 — Preclean PID + Docker pipe fix

## Erros corrigidos

### 1. `$PID` readonly

PowerShell é case-insensitive, então `$pid` e `$PID` são a mesma variável. `$PID` é uma variável automática somente leitura. A V5.11 usava `$pid` em alguns pontos, causando:

```text
Não é possível substituir a variável PID porque ela é somente leitura ou constante.
```

Correção:
- `$pid` virou `$targetPidText`;
- `$Process` virou `$ProcessInfo`;
- IDs internos usam `$targetProcessId`.

### 2. Docker pipe indisponível no preclean

O erro:

```text
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified
```

significa que o Docker Engine ainda não estava respondendo no momento da limpeza.

Correção:
- preclean roda `docker info`;
- se falhar, tenta abrir Docker Desktop;
- espera brevemente;
- tenta `docker info` de novo;
- se ainda falhar, registra aviso e continua;
- Docker cleanup não bloqueia mais a limpeza da pasta.

## Resultado esperado

A fase zero não deve mais parar por Docker indisponível. Ela só deve bloquear se a pasta continuar travada após matar processos.
