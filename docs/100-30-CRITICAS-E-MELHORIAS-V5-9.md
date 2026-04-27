# V5.9 — 30 críticas e melhorias aplicadas

1. O script usava `ProcessStartInfo.ArgumentList`, incompatível com PowerShell 5.1/.NET Framework.
2. Agora usa `ProcessStartInfo.Arguments` com quoting próprio.
3. OpenCode não deve bloquear o app; continua auxiliar.
4. Ferramentas são validadas antes de instalar.
5. VS Code extensions são instaladas só se faltarem.
6. IntelliJ é aberto no projeto com caminho explícito.
7. VS Code abre com `--reuse-window`.
8. Explorer abre no projeto.
9. Browser abre frontend/backend/cobertura após validação.
10. Logs separados por processo externo.
11. Summary JSON final em `K:\dev\logs`.
12. Retry para Maven.
13. Retry para npm build.
14. Fallback para npm install explícito.
15. Retry para Docker build.
16. Retry para Docker up.
17. Healthcheck backend e frontend antes do browser final.
18. POST real em `/api/quotes`.
19. Verificação de id, Pix, WhatsApp e preço.
20. Fechamento de terminais antigos do Gal Atelier antes de abrir novos.
21. Validação de processos abertos: Explorer, IntelliJ e VS Code.
22. Logs de programas abertos com PID.
23. PATH mínimo para processos externos.
24. PATH deduplicado para evitar variável longa.
25. Docker remove stack antiga antes de rebuild.
26. Docker build sem cache.
27. Docker up com `--force-recreate`.
28. Diagnóstico Docker salvo em falha.
29. Relatório JaCoCo salvo/aberto.
30. Falha parcial ainda abre IDEs para investigação.
