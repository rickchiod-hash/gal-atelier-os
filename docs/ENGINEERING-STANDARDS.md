# Engineering Standards

## Backend

- Kotlin com data classes e value object `Money`.
- UseCase por intenção.
- Ports para saída.
- Logs com traceId.
- Erros padronizados.
- Testes unitários para domínio e aplicação.

## Frontend

- Design tokens (seguindo Design System V6 — Editorial Atelier).
- Responsivo (mobile-first com elegância, não empilhamento de caixas).
- Form acessível (labels com `htmlFor`/`id`, inputs border-bottom only).
- Sem regra financeira no client.
- Status de operação claro (usar texto + ponto sutil, não colored badges).
- Anti-dashboard: sem card-mania, sem métricas em cards com borda colorida, sem Kanban que lembra Jira.
- Micro-interações polite (fade + 20px up, easing `cubic-bezier(0.25, 0.1, 0.25, 1)`, 400ms).
- Tipografia hierárquica (Playfair Display para títulos, Inter para corpo).
