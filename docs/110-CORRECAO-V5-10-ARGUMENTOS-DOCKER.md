# V5.10 — Correção de argumentos e Docker parado sem containers

## Sintoma

Docker Desktop abria, mas ficava sem containers.

O log mostrava comandos como:

```text
Executando: C:\Program Files\nodejs\npm.cmd
Executando: C:\Program Files\Docker\Docker\resources\bin\docker.exe
```

Sem argumentos.

Por isso:
- `npm.cmd` abria apenas help;
- `docker.exe` não recebia `compose ...`;
- nenhum container era criado.

## Correção

1. `Invoke-LoggedProcess` agora usa o operador `&` com array splatting: `& $resolvedFilePath @ArgList`.
2. Remove a dependência de montar linha de comando para comandos CLI.
3. Renomeia argumentos internos para `ArgList`.
4. Mantém logs completos por comando.
5. Preserva PATH mínimo.
6. Docker agora recebe corretamente:
   - `compose -p gal-atelier-os config`
   - `compose -p gal-atelier-os build --no-cache`
   - `compose -p gal-atelier-os up -d --force-recreate --remove-orphans`

## Validação esperada

No log, agora deve aparecer algo como:

```text
Executando: C:\Program Files\Docker\Docker\resources\bin\docker.exe compose -p gal-atelier-os up -d --force-recreate --remove-orphans
```

E o Docker Desktop deve mostrar:

```text
gal-atelier-backend
gal-atelier-frontend
```
