# V5.7 — run/open all

## Correções

1. Abre IntelliJ e VS Code logo após o projeto ser criado, não só no final.
2. Abre Explorer no projeto.
3. Abre OpenCode em terminal dedicado se `opencode.cmd` responder.
4. Copia prompt Big Pickle para o clipboard.
5. Abre navegador no frontend e backend após validação.
6. Abre relatório JaCoCo após validação.
7. `Start-Process` agora usa `-WorkingDirectory` e registra PID.
8. Programas abertos são registrados em `K:\dev\logs\gal-atelier-opened-programs-<timestamp>.txt`.
9. VS Code usa `--reuse-window`.
10. IntelliJ usa `idea64.exe <ProjectRoot>`.
11. Instala extensões VS Code somente se faltarem.
12. OpenCode não é reinstalado no fluxo principal.
13. npm do frontend roda por `ProcessStartInfo`, com PATH mínimo.
14. npm install tem fallback com dependências explícitas.
15. Docker continua sendo Docker First.
16. Se o fluxo falhar, ainda tenta abrir IDEs para investigação.
17. Logs de cada processo externo são salvos separadamente.
18. `docker rm/rmi` com item inexistente não derruba o fluxo.
19. Mantém healthcheck/E2E antes de abrir browser de acompanhamento final.
20. Adiciona `open-all.bat` para abrir tudo manualmente depois.
