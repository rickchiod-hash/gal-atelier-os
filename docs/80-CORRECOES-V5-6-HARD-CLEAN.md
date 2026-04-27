# V5.6 — hard clean e OpenCode seguro

## Correções

1. OpenCode não é reinstalado no fluxo principal.
2. OpenCode é validado por caminho direto com PATH mínimo.
3. `.ps1` do OpenCode é ignorado; preferência por `.cmd`/`.exe`.
4. PATH do processo é deduplicado.
5. Se PATH estiver grande demais, o script usa PATH essencial.
6. Falha do OpenCode não derruba a aplicação.
7. Limpeza do Docker antigo roda antes de copiar o projeto novo.
8. `docker compose down --remove-orphans --rmi all -v` remove stack antiga do projeto.
9. Containers `gal-atelier-backend` e `gal-atelier-frontend` são removidos à força.
10. Imagens antigas do projeto são removidas.
11. Diagnóstico Docker só roda depois que o projeto novo foi preparado.
12. Build Docker usa `--no-cache`.
13. Up Docker usa `--force-recreate`.
14. O erro de bean duplicado antigo é tratado removendo projeto/target/imagem antigos.
15. O batch foi limpo para evitar mensagens estranhas como `'EM' não é reconhecido`.

## Causa raiz dos logs

A execução V5.5 falhou antes de limpar/copiar o projeto novo por causa de PATH grande demais ao tentar instalar OpenCode. Por isso o diagnóstico Docker ainda mostrou container velho com `com.galatelier.health.HealthController`.
