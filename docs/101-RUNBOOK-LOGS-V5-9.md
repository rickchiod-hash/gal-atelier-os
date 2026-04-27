# Runbook de logs V5.9

## Principais arquivos

```text
K:\dev\logs\gal-atelier-final-v5-9-<timestamp>.log
K:\dev\logs\gal-atelier-run-summary-<timestamp>.json
K:\dev\logs\gal-atelier-opened-programs-<timestamp>.txt
K:\dev\logs\gal-atelier-e2e-<timestamp>.json
K:\dev\logs\maven-clean-verify-<timestamp>.log
K:\dev\logs\npm-install-frontend-<timestamp>.log
K:\dev\logs\npm-build-frontend-<timestamp>.log
K:\dev\logs\docker-compose-build-<timestamp>.log
K:\dev\logs\docker-compose-up-<timestamp>.log
```

## Como diagnosticar

1. Se falhar antes do Maven, veja o log principal.
2. Se falhar Maven, veja `maven-clean-verify`.
3. Se falhar frontend, veja `npm-install-frontend` e `npm-build-frontend`.
4. Se falhar Docker, veja `docker-compose-build`, `docker-compose-up` e `gal-atelier-compose-logs`.
5. Se os programas não abrirem, veja `gal-atelier-opened-programs`.
6. Se subir mas não funcionar, veja `gal-atelier-e2e`.
