# V5.5 — OpenCode Aware

## Problema

O script tentava instalar `opencode-ai` sempre, mesmo quando `opencode --version` já funcionava.

Isso era ruim porque:
- gastava tempo;
- podia falhar em postinstall;
- podia quebrar por PATH do Node dentro de `cmd.exe`;
- bloqueava a percepção do fluxo mesmo com OpenCode já instalado.

## Correção

Agora o fluxo:

1. Procura `opencode` via `Get-Command`.
2. Procura `K:\dev\tools\npm-global\opencode.cmd`.
3. Procura `%APPDATA%\npm\opencode.cmd`.
4. Procura pelo `npm prefix -g`.
5. Executa `opencode --version`.
6. Se funcionar, pula instalação.
7. Se não funcionar, tenta `npm install -g opencode-ai`.
8. Se falhar, segue o app normalmente.

## Arquivo de validação

```text
K:\dev\logs\gal-atelier-opencode-<timestamp>.txt
```
