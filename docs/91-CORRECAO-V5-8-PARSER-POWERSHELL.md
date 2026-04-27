# V5.8 — correção de parser PowerShell

## Erro corrigido

```text
Referência de variável inválida. ':' não era seguido de um caractere de nome de variável válido.
```

## Causa

A string abaixo era inválida em PowerShell:

```powershell
"$Name: ..."
```

Quando uma variável é seguida por `:`, o PowerShell tenta interpretar como escopo ou drive de variável. O correto é:

```powershell
"${Name}: ..."
```

## Correções adicionais

1. `${Name}:` no log de falha ao abrir programas.
2. Resolução de executáveis via `Get-Command` dentro de `Invoke-LoggedProcess`.
3. Validação do Docker com exit code explícito.
4. Launcher temporário `.bat` para OpenCode Big Pickle, reduzindo risco de quote quebrado.
