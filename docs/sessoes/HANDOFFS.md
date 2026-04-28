# HANDOFFS — Registro de Passagem de Trabalho entre Sessões

**Scrum Master**: Hermes QA PM  
**Última atualização**: 2026-04-28 18:00 UTC

---

## Handoff — HERMES-001

- **Criado por**: Hermes QA PM
- **Sessão destino**: ATENA BACKEND
- **História relacionada**: US-17 (Application Service Tests)
- **Arquivo/área**: `backend/src/test/kotlin/com/galatelier/application/service/FinanceApplicationServiceTest.kt`
- **Problema**: Arquivo de teste backend encontrado na branch frontend (`feature/frontend-v6`) sem estar no escopo da Vênus. Arquivo parece ser responsabilidade da Atena ou minha sessão.
- **Evidência**: 
  ```
  git status mostra: ?? backend/src/test/kotlin/com/galatelier/application/service/FinanceApplicationServiceTest.kt
  Branch atual: feature/frontend-v6
  ```
- **Impacto**: Arquivo órfão na branch errada. Pode causar conflito ao merge.
- **Sugestão**: Atena deve mover para branch `feature/backend-hexagonal` ou Hermes pode assumir na `feature/tests-docs-ci`
- **Bloqueia entrega?** Não
- **Status**: OPEN
- **Commit relacionado**: Nenhum (arquivo não commitado)

---

## Handoff — HERMES-002

- **Criado por**: Hermes QA PM
- **Sessão destino**: VÊNUS UX FRONT
- **História relacionada**: US-10, US-11 (Frontend V6)
- **Arquivo/área**: Root directory + `frontend/app/globals.css`
- **Problema**: 
  1. Arquivos deletados no root sem commits: BACKLOG.md, SCRUM-BOARD.md, SESSION-1-BACKLOG.md, SESSION-3-BACKLOG.md
  2. `frontend/app/globals.css` modificado sem commit na branch `feature/frontend-v6`
- **Evidência**: 
  ```
  git status:
   D BACKLOG.md
   D SCRUM-BOARD.md
   D SESSION-1-BACKLOG.md
   D SESSION-3-BACKLOG.md
   M frontend/app/globals.css
  ```
- **Impacto**: Perda de arquivos de documentação Scrum. Alterações CSS não rastreadas.
- **Sugestão**: 
  1. Restaurar arquivos deletados: `git restore BACKLOG.md SCRUM-BOARD.md SESSION-1-BACKLOG.md SESSION-3-BACKLOG.md`
  2. Fazer commit do globals.css ou desfazer alterações se não for intencional
  3. Commitar arquivos restaurados no SCRUM-BOARD.md
- **Bloqueia entrega?** Não (mas prejudica rastreabilidade)
- **Status**: OPEN
- **Commit relacionado**: Nenhum

---

## Handoff — HERMES-003

- **Criado por**: Hermes QA PM
- **Sessão destino**: VÊNUS UX FRONT
- **História relacionada**: US-10 (page.tsx refactor)
- **Arquivo/área**: `frontend/app/page.tsx`, `frontend/components/*.tsx`
- **Problema**: Identidade da Vênus (SESSION-2) indica que T-36 (Extrair CSS inline para módulos CSS) está em andamento, mas arquivos deletados no root sugerem trabalho incompleto ou erro operacional.
- **Evidência**: Session file da Vênus indica branch correta mas status inconsistente com git status
- **Impacto**: Confusão sobre o que foi feito vs. o que está documentado
- **Sugestão**: Vênus deve atualizar SESSION-2-BACKLOG.md com status real e fazer commit das alterações pendentes
- **Bloqueia entrega?** Não
- **Status**: OPEN
- **Commit relacionado**: 9f251ea (feat(frontend): add GallerySection and ReviewsSection (US-10))

---

## INSTRUÇÕES PARA OUTRAS SESSÕES

### Como ler handoffs:
1. Procure por handoffs com sua sessão como "Sessão destino"
2. Verifique se o status é OPEN
3. Resolva o problema
4. Atualize o status para CLOSED
5. Adicione "Resolvido por: [nome]" e "Resolução: [como resolveu]"

### Como criar handoff para Hermes:
```markdown
## Handoff — [SUA_SESSAO]-[NÚMERO]

- Criado por: [SEU_NOME]
- Sessão destino: HERMES QA PM
- História relacionada: [US-XX]
- Arquivo/área: [caminho]
- Problema: [descrição]
- Evidência: [logs/commits]
- Impacto: [consequência]
- Sugestão: [recomendação]
- Bloqueia entrega? Sim/Não
- Status: OPEN
- Commit relacionado: [se houver]
```

---

**Total de handoffs abertos**: 3  
**Total de handoffs resolvidos**: 0
