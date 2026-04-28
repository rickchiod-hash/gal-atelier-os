# HANDOFFS — Gal Atelier OS

**Scrum Master**: Hermes QA PM  
**Última Atualização**: 2026-04-28

---

## HANDOFFS ABERTOS

| Handoff ID | Título | Descrição | Responsável | Status | Prioridade |
|------------|--------|-----------|-------------|--------|------------|
| HERMES-001 | Arquivo órfão em branch errada | `Makefile` e `backlog_at_head.txt` no root não deveriam estar na branch atual | Hermes | ✅ RESOLVIDO | - |
| HERMES-002 | Arquivos deletados no root | Verificar se há referências a arquivos deletados no root do projeto | Hermes | ✅ RESOLVIDO | - |
| HERMES-003 | Status inconsistentes (docs vs git) | Docs marcam tasks como Done mas git não reflete | Hermes | ✅ RESOLVIDO | - |
| HERMES-004 | 🔴 CRÍTICO: Build quebrado (OrderResponse) | `OrderResponse.kt` não existe, build Kotlin falha | Atena | 🔴 Open | 🔴 Critical |
| HERMES-005 | US-01 incompleto (T-03 pendente) | CustomerController não refatorado para UseCase | Atena | 📋 Open | High |
| HERMES-006 | 🔴 Build quebrado (Header.module.css) | `Header.module.css` criado, build parcialmente fixo | Vênus | ✅ Resolved | 🔴 Critical |
| HERMES-008 | 🔴 CRÍTICO: next.config.ts não suportado | Renomeado para next.config.js, resolvido | Vênus | ✅ Resolved | 🔴 Critical |

---

## HANDOFFS RESOLVIDOS

| Handoff ID | Título | Resolução | Data |
|------------|--------|-----------|------|
| HERMES-001 | Arquivo órfão | Deletado backlog_at_head.txt, Makefile mantido | 2026-04-28 |
| HERMES-002 | Arquivos deletados | Verificado - sem referências pendentes | 2026-04-28 |
| HERMES-003 | Status inconsistentes | Commits verificados (233dd50, ff7e3eb) | 2026-04-28 |
| HERMES-007 | Spotbugs version fix | Atualizada para 4.9.8.3, plugin descomentado (commit 9723307) | 2026-04-28 |

---

## HANDOFFS ABERTOS PARA VÊNUS (Frontend)

| Handoff ID | Título | Descrição | Status |
|------------|--------|-----------|--------|
| HERMES-006 | Build quebrado (Header) | Header.module.css existe, mas build falha por next.config.ts | 🔴 Open |
| HERMES-008 | 🔴 CRÍTICO: next.config.ts | Erro: "Configuring Next.js via 'next.config.ts' is not supported". Renomear para .js ou .mjs | 🔴 Open |

---

## INSTRUÇÕES PARA RESOLUÇÃO

### HERMES-001: Arquivo órfão em branch errada
**Problema**: `Makefile` e `backlog_at_head.txt` estão no root mas não deveriam estar na branch atual (ou deveriam estar em outro lugar).

**Ação Hermes**:
1. Verificar se `Makefile` deve estar no root ou em `docs/`
2. Verificar se `backlog_at_head.txt` é temporário e pode ser deletado
3. Mover/remover conforme necessário
4. Atualizar `.gitignore` se necessário

**Status Atual**:
```
?? Makefile
?? backlog_at_head.txt
```

---

### HERMES-002: Arquivos deletados no root
**Problema**: Arquivos podem ter sido deletados do root mas ainda há referências.

**Ação Hermes**:
1. Verificar git log para arquivos deletados recentemente
2. Atualizar referências em docs se necessário

---

### HERMES-003: Status inconsistentes (docs vs git)
**Problema**: Docs marcam tasks como Done mas git não reflete o estado.

**Ação Hermes**:
1. Comparar SCRUM-BOARD.md com `git log --oneline`
2. Verificar se commits mencionados existem
3. Atualizar status conforme git real

**Verificação**:
- [ ] US-16: commit 233dd50 existe?
- [ ] US-31: commit ff7e3eb existe?
- [ ] US-35: .env.local no gitignore?

---

### HERMES-004: Build quebrado (OrderResponse) — 🔴 CRÍTICO
**Problema**: `OrderResponse.kt` não existe em `backend/src/main/kotlin/com/galatelier/adapter/input/web/`

**Responsável**: Atena Backend  
**Branch**: `feature/backend-hexagonal`

**Ação Atena**:
1. Criar `OrderResponse.kt` (data class)
2. Criar extensão: `fun OrderEntity.toResponse(): OrderResponse`
3. Rodar: `cd backend && mvn -B clean test`
4. Commit: `fix(backend): resolve OrderResponse build error (US-02)`

**Status**: Aguardando Atena

---

### HERMES-005: US-01 incompleto (T-03 pendente)
**Problema**: CustomerController não foi refatorado para usar UseCase (T-03 ainda 📋 To Do)

**Responsável**: Atena Backend  
**Branch**: `feature/backend-hexagonal`

**Ação Atena**:
1. Refatorar `CustomerController.kt` para usar `CustomerUseCase`
2. Remover dependência direta de JPA/Repository
3. Rodar testes: `mvn -B clean test`
4. Commit: `refactor(backend): update CustomerController to use UseCase (US-01)`

**Status**: Aguardando Atena

---

### HERMES-006: Build quebrado (Header.module.css) — 🔴 CRÍTICO
**Problema**: `Header.module.css` não existe em `frontend/components/Header.module.css`

**Responsável**: Vênus UX Front  
**Branch**: `feature/frontend-v6`

**Ação Vênus**:
1. Criar `frontend/components/Header.module.css` com estilos do header
2. Verificar se `Header.tsx` tem a importação correta
3. Rodar: `cd frontend && npm run build`
4. Commit: `fix(frontend): add missing Header.module.css (US-10)`

**Status**: Aguardando Vênus

---

## WORKFLOW DE RESOLUÇÃO

1. **Agente responsável** lê o Handoff
2. **Executa ação** descrita
3. **Atualiza status** no SCRUM-BOARD.md
4. **Commita** com padrão correto
5. **Hermes valida** e move para "Resolvidos"

---

**Próxima Revisão**: Após resolução dos críticos (HERMES-004 e HERMES-006)
