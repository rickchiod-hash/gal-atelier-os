# Contributing to Gal Atelier OS

## Arquitetura

O projeto segue **Arquitetura Hexagonal** com isolamento de domínio:

```
adapter.input.web → application.port.input → application.service → domain.model → application.port.output → adapter.output
```

- **Domain** (`domain.*`) não importa Spring ou frameworks externos
- **Controllers** apenas traduzem HTTP → Use Cases
- **Use Cases** orquestram lógica, dependem apenas de ports
- **Adapters** implementam ports de saída

## Padrão de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Tipos:**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `refactor:` refatoração sem mudança de comportamento
- `test:` testes
- `docs:` documentação
- `ci:` CI/CD, build, scripts
- `style:` formatação (Prettier, ktlint)

**Exemplos:**
```
feat(backend): add Order hexagonal architecture
fix(frontend): resolve Header.module.css missing
test(backend): add CustomerApplicationServiceTest
docs(readme): update ARCHITECTURE.md
```

## Branches

- `main` — produção (protegida)
- `feature/<name>` — novas funcionalidades
- `fix/<name>` — correções
- `chore/<name>` — tarefas de infra/CI

## Testes

### Backend (Kotlin + Maven)
```bash
cd backend && mvn test
# 133+ testes devems passar
```

### Frontend Unit (Jest)
```bash
cd frontend && npm test
# Coverage threshold: 50%
```

### Frontend E2E (Playwright)
```bash
cd frontend && npm run e2e
# 18+ testes E2E
```

### CI/CD - Regras de Merge

**Bloqueado se:**
- `mvn test` falhar
- `npm run build` falhar  
- Coverage < 50%
- Testes E2E falharem

**Workflow CI:**
```
feature/* → develop → release/* → main
     ↓          ↓           ↓
  auto-     PR Required   PR Required
  merge
```

## Design System (V6 — Editorial Atelier)

- **Tipografia:** Playfair Display (títulos) + Inter (corpo)
- **Cores:** Paleta Nubank Purple (`--nubank-dark`, `--nubank-magenta`)
- **Espaçamento:** Fluido com `clamp()`, mínimo 40% vazio
- **Anti-dashboard:** Sem cards coloridos, sem gráficos falsos, sem Kanban

## Regras de Negócio

- **NÃO** colocar regra financeira no frontend
- **NÃO** criar componentes com cara de SaaS dashboard
- **NÃO** usar gradientes (o luxo é sólido)
- **SEMRE** manter whitespace generoso (mínimo 40%)

## Code Review

Antes de commitar:
1. ✅ Build passando (`mvn test` / `npm run build`)
2. ✅ Testes passando
3. ✅ Lint clean (ktlint / Prettier)
4. ✅ Documentação atualizada (se aplicável)

## Contato

Dúvidas: abrir issue ou consultar sessão responsável:
- **Backend:** Atena
- **Frontend:** Vênus
- **Tests/Docs/CI:** Hermes (Sessão 3)
