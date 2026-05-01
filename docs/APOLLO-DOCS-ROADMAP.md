# APOLLO — Roadmap de Governança de Documentação e Fluxo de Branches

**Data**: 2026-05-01  
**Autor**: Apollo  
**Objetivo**: reduzir conflito entre agentes (Venus, Hermes, Athena), remover ambiguidade de processo e consolidar a fonte de verdade operacional sem apagar histórico.

---

## 1) Diagnóstico rápido (estado atual)

### Problemas encontrados
- Há duplicidade de documentação de CI/CD (vários arquivos de “setup complete”, “quickstart”, “conclusão”) com conteúdo muito parecido.
- Há conflito de nomenclatura de branch (`main` vs `master`) entre documentos.
- Há instruções antigas orientando fluxo automático que não está consistente com o restante da documentação.
- O board Scrum não contém uma trilha explícita de **higienização documental + governança multiagente**.

### Risco para 4 agentes simultâneos
- **Venus/Hermes/Athena/Apollo** podem implementar em paralelo com interpretações diferentes de fluxo, causando PRs incompatíveis, conflitos de merge e regressão de processo.

---

## 2) Decisão de governança (fonte de verdade)

### Arquivos canônicos (manter como referência principal)
- `README.md` (entrada do projeto)
- `docs/ARCHITECTURE.md` (arquitetura)
- `docs/DESIGN-SYSTEM.md` (direção visual V6)
- `docs/ENGINEERING-STANDARDS.md` (padrões de engenharia)
- `BRANCH-STRATEGY.md` (estratégia de branches)
- `SCRUM-BOARD.md` (planejamento e execução)

### Arquivos legados (não apagar agora)
- Devem ser tratados como **arquivo histórico** até migração final.
- Regra: se contradizer arquivo canônico, prevalece canônico.

---

## 3) Melhores práticas adotadas neste roadmap

- Uma única “source of truth” para branching e promoção de ambientes.
- Separar claramente: documentação operacional viva vs documentação de histórico.
- Definir dono por área para evitar sobreposição entre agentes.
- Registrar handoff explícito antes de promoção (`feature -> dev -> homolog -> main`).
- Evitar automação opaca de merge sem revisão humana em ambientes críticos.

---

## 4) Plano de execução (tasks para Codex/Apollo)

## Fase A — Limpeza e unificação de docs (agora)
1. Criar roadmap de governança documental (este arquivo).
2. Atualizar `SCRUM-BOARD.md` com épico e tarefas de limpeza documental.
3. Corrigir `docs/athena/ATHENA-PR-FLOW-RUNBOOK.md` para eliminar `master` e alinhar com `main`.
4. Marcar material legado como histórico (sem deletar arquivos).

## Fase B — Normalização de branches
1. Confirmar branch principal oficial: `main`.
2. Garantir existência e proteção de `dev` e `homolog`.
3. Bloquear promoção direta `feature -> main`.
4. Padronizar templates de PR para declarar agente executor e escopo.

## Fase C — Segurança de trabalho paralelo (Venus/Hermes/Athena/Apollo)
1. Segmentar ownership por domínio:
   - **Venus**: frontend visual/editorial
   - **Hermes**: backend/use cases/ports
   - **Athena**: pipeline, PR-flow, merge safety
   - **Apollo**: governança, integração e conflitos cross-área
2. Toda task deve informar:
   - arquivos alvo
   - risco de conflito
   - branch sugerida
3. Handoff obrigatório no board ao concluir task crítica.

---

## 5) Matriz de conflitos prováveis

- **Frontend CSS global**: alto risco entre Venus e Apollo (ajustes de padrão visual).
- **Workflows CI/CD**: alto risco entre Athena e Apollo (mudanças simultâneas em YAML).
- **Docs de processo**: médio risco entre todos (edições concorrentes em board e runbooks).
- **Domínio backend**: baixo risco com Apollo se Hermes mantiver escopo em `backend/**`.

Mitigação:
- Curto prazo: 1 PR por área + rebase diário em `dev`.
- Médio prazo: CODEOWNERS por diretório.

---

## 6) Definição de pronto (DoD) para higienização documental

- Não há conflito `main/master` em docs ativas.
- Board contém tarefas explícitas para governança multiagente.
- Arquivos legados continuam no repositório, porém com status histórico definido.
- Fluxo oficial de promoção está legível e único.

---

## 7) Próximos passos imediatos

1. Executar revisão dos arquivos de CI/CD e rotular os redundantes como históricos.
2. Abrir PR dedicado apenas à governança documental.
3. Em paralelo, Athena valida se workflows ainda batem com o fluxo documentado.
