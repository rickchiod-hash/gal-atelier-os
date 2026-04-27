# Gal Atelier OS — Final Enterprise V5.12

Sistema operacional para a Gal vender e operar serviços de wigmaker/perucas com briefing, orçamento, Pix e WhatsApp.

## Stack

- Kotlin 2.1.x
- Spring Boot 3.4.x
- Maven
- JaCoCo coverage
- Arquitetura hexagonal
- Next.js + TypeScript
- Docker Compose first
- Fallback local Maven + npm
- Design system próprio
- Logs com traceId
- OpenCode agents

## Rodar

Use o batch raiz do pacote:

```bat
00-RODAR-TUDO-GAL-ATELIER-FINAL.bat
```

## URLs

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8080/api/health
```

## Logs

```text
K:\dev\logs
```

Logs antigos são arquivados em:

```text
K:\dev\logs\archive
```

## Cobertura

```text
K:\dev\repos\gal-atelier-os\backend\target\site\jacoco\index.html
```

## Agentes

O batch abre OpenCode e copia o prompt mestre para o clipboard.
Use também:

```text
/opencode flow-qa
/opencode docker-qa
/opencode review
```

## OpenCode

A V5.12 valida `opencode --version` antes de tentar instalar. Se já estiver funcional, pula reinstalação.

## V5.12

Hard clean de Docker/projeto e OpenCode validado sem reinstalação obrigatória.

## V5.12

Fluxo abre IntelliJ, VS Code, Explorer, OpenCode, browser, Docker e relatório JaCoCo com logs de processos abertos.

## V5.12

Corrige parser PowerShell causado por `$Name:` em string interpolada; usa `${Name}:`.

## V5.12

Runbook, retry/fallback, logs por processo, compatibilidade PowerShell 5.1 sem `ArgumentList` e validação de programas abertos.

## V5.12

Corrige execução de npm/docker sem argumentos. Docker Desktop agora deve mostrar os containers `gal-atelier-backend` e `gal-atelier-frontend`.

## V5.12

Adiciona fase `Kill First + Clean Run` antes do orquestrador para liberar `K:\dev\repos\gal-atelier-os` e evitar pasta travada por IDEs, terminais, Node, Java, OpenCode ou Explorer.

## V5.12

Corrige `$PID` readonly no preclean e torna Docker cleanup não bloqueante quando o Docker Engine ainda não respondeu.
