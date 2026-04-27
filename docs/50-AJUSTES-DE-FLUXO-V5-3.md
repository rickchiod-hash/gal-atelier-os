# 50 ajustes de fluxo — V5.3

1. Batch único mantido.
2. PackageRoot endurecido contra erro de aspas e barra final.
3. Resolução absoluta do PackageRoot.
4. Validação explícita de K:\.
5. Criação padronizada de K:\dev.
6. Criação padronizada de K:\dev\logs.
7. Criação padronizada de K:\dev\repos.
8. Criação padronizada de K:\dev\cache.
9. PATH recarregado de Machine + User.
10. PATH inclui npm-global no K.
11. PATH inclui Docker CLI.
12. PATH inclui Git.
13. PATH inclui Maven.
14. PATH inclui Node.
15. Instala/verifica Git.
16. Instala/verifica Java 21.
17. Instala/verifica Maven.
18. Instala/verifica Node.
19. Instala/verifica VS Code.
20. Instala/verifica GitHub CLI.
21. Instala/verifica IntelliJ Community.
22. Instala/atualiza OpenCode.
23. Instala extensões VS Code.
24. Tenta instalar plugins IntelliJ sem bloquear fluxo.
25. Faz backup do projeto anterior.
26. Copia payload final.
27. Cria .env.local.
28. Cria .vscode/settings.json.
29. Adiciona .editorconfig.
30. Adiciona .gitattributes.
31. Configura git core.autocrlf false no repo.
32. Mata portas 3000 e 8080.
33. Roda mvn test antes de subir.
34. Roda npm install.
35. Roda npm run build.
36. Desativa telemetria Next no ambiente do build.
37. Valida docker info.
38. Se Docker não responder, tenta abrir Docker Desktop.
39. Aguarda Docker Engine até 180 segundos.
40. Roda docker compose config.
41. Roda docker compose down --remove-orphans.
42. Roda docker compose up --build -d.
43. Usa healthcheck backend.
44. Usa healthcheck frontend.
45. Salva docker compose ps em log.
46. Salva docker compose logs em log.
47. Faz POST real em /api/quotes.
48. Valida id, WhatsApp, Pix e preço na resposta.
49. Só abre browser/IDEs/agentes depois das validações.
50. Mantém fallback local Maven + npm se Docker falhar.
