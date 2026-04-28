# CONFLICTS — Registro de Conflitos entre Sessões

**Scrum Master**: Hermes QA PM  
**Última atualização**: 2026-04-28 18:05 UTC

---

## POLÍTICA DE RESOLUÇÃO DE CONFLITOS

### NÍVEL 1: Conflito de Branch
- **Detecção**: Duas sessões na mesma branch
- **Resolução**: Cada sessão deve estar em sua branch designada
- **Branches esperadas**:
  - Atena: `feature/backend-hexagonal`
  - Vênus: `feature/frontend-v6`
  - Hermes: `feature/tests-docs-ci`

### NÍVEL 2: Conflito de Arquivos
- **Detecção**: Mudanças em arquivos proibidos de outra sessão
- **Resolução**: Handoff imediato, sessão ofendida reverte ou pede reconsideração
- **Arquivos protegidos**:
  - `backend/src/main/**` → Apenas Atena
  - `frontend/app/**` e `frontend/components/**` → Apenas Vênus
  - `docs/sessoes/SESSION-3-*.md` → Apenas Hermes

### NÍVEL 3: Conflito de Escopo
- **Detecção**: Sessão implementando história de outra
- **Resolução**: Reversão imediata, handoff para sessão correta

### NÍVEL 4: Conflito de Commit
- **Detecção**: Commits com mensagens erradas ou arquivos errados
- **Resolução**: Hermes (Scrum Master) faz correção via rebase/amend (com aprovação)

---

## CONFLITOS DETECTADOS

### CONFLICT-001: Branch Errada (HERMES)

- **Detectado por**: Hermes QA PM
- **Sessão afetada**: HERMES (eu)
- **Problema**: Estou na branch `feature/frontend-v6` (branch da Vênus) em vez de `feature/tests-docs-ci`
- **Evidência**: `git branch --show-current` retorna `feature/frontend-v6`
- **Impacto**: Risco de editar arquivos da Vênus sem querer, confusão no histórico
- **Status**: 🔄 RESOLVING
- **Ação tomada**: Criando docs/sessoes/SESSION-3-HERMES-QA-PM.md na branch errada temporariamente
- **Próximo passo**: Mudar para `feature/tests-docs-ci` ou criar se não existir

---

### CONFLICT-002: Arquivos Deletados no Root

- **Detectado por**: Hermes QA PM
- **Sessão suspeita**: VÊNUS (branch `feature/frontend-v6`)
- **Problema**: Arquivos deletados sem commit: BACKLOG.md, SCRUM-BOARD.md, SESSION-1-BACKLOG.md, SESSION-3-BACKLOG.md
- **Evidência**: `git status` mostra ` D ` (deleted) para esses arquivos
- **Impacto**: Perda de documentação Scrum, quebra rastreabilidade
- **Status**: 📋 OPEN
- **Handoff criado**: HERMES-002
- **Ação necessária**: Vênus deve fazer `git restore` dos arquivos e commitar

---

### CONFLICT-003: Arquivo Órfão na Branch Errada

- **Detectado por**: Hermes QA PM
- **Sessão afetada**: ATENA (arquivo de backend) na branch da VÊNUS
- **Problema**: `backend/src/test/kotlin/com/galatelier/application/service/FinanceApplicationServiceTest.kt` encontrado na branch `feature/frontend-v6`
- **Evidência**: `git status` mostra `??` (untracked) para arquivo de teste backend
- **Impacto**: Conflito de escopo, arquivo pode ser perdido no merge
- **Status**: 📋 OPEN
- **Handoff criado**: HERMES-001
- **Ação necessária**: Atena deve mover para sua branch ou Hermes assumir na branch correta

---

## HISTÓRICO DE RESOLUÇÕES

| ID | Data | Sessão | Problema | Resolução | Status |
|----|------|--------|----------|-----------|--------|
| - | - | - | - | - | - |

---

**Total de conflitos abertos**: 3  
**Total de conflitos resolvidos**: 0
