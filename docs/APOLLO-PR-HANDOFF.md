# APOLLO PR HANDOFF — Novo PR Consolidado

## Contexto
Como PRs anteriores foram modificados fora do Codex, a estratégia segura é abrir **um novo PR consolidado** com todas as correções de CI/workflow/docs já aplicadas nesta branch.

## Branch de consolidação (Apollo)
`apollo/unified-pr-integration`

## Escopo consolidado neste PR
- Correção do lint frontend no CI (`next lint` sem argumento inválido).
- Logs de diagnóstico no step de lint frontend.
- Guard para Slack: notificação só executa quando `SLACK_WEBHOOK_URL` estiver definido.
- Ajustes de trigger e branch flow para compatibilidade com `develop`/`release/**`/`main`.
- Playbook de unificação de PRs e governança documental (Apollo).

## Como abrir o novo PR
1. Push da branch `apollo/unified-pr-integration`.
2. Abrir PR para `develop`.
3. Título sugerido:
   - `fix(ci): consolidate workflow, lint and notification fixes from Apollo`
4. Descrição:
   - incluir lista de conflitos resolvidos e motivo da criação de PR novo.

## Critério de aceite
- CI de frontend não falha mais por diretório inválido de lint.
- Job de Slack não falha quando webhook não está configurado.
- Workflows de branch disparam apenas nos alvos corretos.
