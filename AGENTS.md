# AGENTS.md

## Missão

Evoluir o Gal Atelier OS com qualidade de empresa grande: domínio limpo, UX limpa, logs úteis, testes e scripts previsíveis.

## Visão Visual Atual (V6 — Editorial Atelier)

O sistema NÃO é um dashboard SaaS genérico. É uma experiência de marca premium para wigmakers:
- Parecer loja de luxo + atelier artesanal
- Whitespace generoso (mínimo 40% vazio)
- Tipografia com autoridade editorial (Playfair Display + Inter)
- Micro-accentos (vinho/ouro máximo 2% da página)
- Anti-dashboard: sem card-mania, gráficos SVG falsos, Kanban colorido

## Regras

- Não apagar arquivos sem autorização.
- Não colocar secrets no Git.
- Não commitar `.env.local`.
- Não mover regra de negócio para Controller.
- Não duplicar cálculo financeiro no frontend.
- Domain não importa Spring.
- Use cases dependem de ports.
- Adapters implementam ports.
- Toda regra crítica deve ter teste.
- IA planeja antes de editar.
- NÃO criar componentes com cara de SaaS dashboard (métricas em cards coloridos, gráficos fake, botões pill-shaped)
- NÃO usar gradientes pesados (o luxo é sólido)
- SEMPRE manter espaçamento fluido com `clamp()` e máximo 60% de conteúdo visual

## Fluxo dos agentes

1. Plan agent lê arquitetura E design system V6.
2. Review agent critica backend + frontend visual.
3. Build backend agent implementa backend.
4. Build frontend agent implementa frontend (seguindo padrão Editorial Atelier).
5. QA agent valida comandos E aparência visual (anti-dashboard).
6. Nenhum agente faz deploy produção.
