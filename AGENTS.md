# AGENTS.md

## Missão

Evoluir o Gal Atelier OS com qualidade de empresa grande: domínio limpo, UX limpa, logs úteis, testes e scripts previsíveis.

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

## Fluxo dos agentes

1. Plan agent lê arquitetura.
2. Review agent critica.
3. Build backend agent implementa backend.
4. Build frontend agent implementa frontend.
5. QA agent valida comandos.
6. Nenhum agente faz deploy produção.
