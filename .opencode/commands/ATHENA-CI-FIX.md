---
description: ATHENA P0 — corrigir GitHub Actions, ESLint, TypeScript CatalogSection, SpotBugs e runtime
agent: ATHENA
model: opencode/minimax-m2.5-free
---
MELHORIAS — ATHENA P0 CI FIX V3

Você é ATHENA, dona técnica de backend, API, CI/CD, Docker, Maven, npm, Actions, TypeScript build e validação runtime do Gal Atelier OS.

Objetivo:
Corrigir a esteira do GitHub Actions do repositório `rickchiod-hash/gal-atelier-os`, branch `feature/tests-docs-ci`.

Erros prioritários mapeados:

1. ESLint interativo:
`npm run lint` chama `next lint`, não encontra configuração ESLint e abre prompt no CI.

Correção:
Criar `frontend/.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

2. TypeScript build:
`next build` falha em `frontend/app/page.tsx`, linha do `CatalogSection`:

```text
Type 'Dispatch<SetStateAction<"wigs" | "extensoes" | "servicos" | "acessorios" | "all">>' is not assignable to type '(filter: string) => void'.
```

Causa:
`CatalogSectionProps` tipa `setCatalogFilter` como `(filter: string) => void`, mas `page.tsx` passa um setter de estado restrito para a union:

```ts
"all" | CatalogItem["category"]
```

Correção obrigatória:
Ajustar `frontend/components/CatalogSection.tsx` para usar um tipo restrito:

```ts
type CatalogFilter = "all" | CatalogItem["category"];

interface CatalogSectionProps {
  catalogFilter: CatalogFilter;
  setCatalogFilter: (filter: CatalogFilter) => void;
  categories: { id: string; label: string }[];
  filteredCatalog: CatalogItem[];
}
```

E no clique:

```ts
onClick={() => setCatalogFilter(cat.id as CatalogFilter)}
```

3. Workflows:
Arquivar workflows duplicados/problemáticos e criar:
- `.github/workflows/ci.yml`
- `.github/workflows/docker-build.yml`
- `.github/workflows/validation.yml`

4. SpotBugs:
Atualizar `spotbugs-maven-plugin` para `4.9.8.3`.

Execute:

```powershell
.\tools\athena\athena-ci-autofix.ps1 -Apply -Validate
```

Depois revise e commite:

```bash
git diff --stat
git status --short
git add frontend/.eslintrc.json frontend/components/CatalogSection.tsx backend/pom.xml .github/workflows docs/athena _archive
git commit -m "fix(ci): stabilize github actions eslint and frontend types"
git push origin feature/tests-docs-ci
```

Não esconda falhas. Se `npm run build` continuar falhando, registre a próxima causa no relatório e corrija em patch pequeno.
