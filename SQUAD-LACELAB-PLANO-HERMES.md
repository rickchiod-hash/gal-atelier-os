# SQUAD-LACELAB-PLANO-HERMES.md
## Plano de Transformação Gal Atelier OS — Beauty Premium Experience

**Data**: 29/04/2026  
**Autor**: HERMES (opencode/nemotron-3-super-free)  
**Branch Base**: `feature/tests-docs-ci`  
**Squad**: LaceLab  

---

## 1. RESUMO EXECUTIVO

O Gal Atelier OS precisa evoluir de uma experiência que remete a SaaS/dashboard para uma **experiência beauty premium editorial**, focada em wigmakers e clientes consumistas. O diagnóstico revela:

- **Catálogo insuficiente**: 20 itens atuais vs. 41 no novo manifesto
- **Paleta inadequadada**: Azul/cyan (Atelier Blue) briga com o nicho beauty/wigmaker
- **Textos quebrados**: Mistura de idiomas, caracteres acidentais (chinês: "转移视觉效果突出")
- **Estrutura de fotos limitada**: Falta suporte para múltiplas imagens por produto
- **UX genérica**: Falta personalização para 10 perfis de clientes
- **Falta conversão**: Sem comparador, cross-sell inteligente ou recomendações

**Objetivo**: Transformar o sistema em uma vitrine beauty premium com catálogo rico, visual editorial e UX educativa.

---

## 2. DIAGNÓSTICO DO ESTADO ATUAL

### 2.1 Catálogo (frontend/data/galAtelierCatalog.ts)
**Estado**: 20 produtos com interface básica:
```typescript
export interface CatalogItem {
  id: string;
  name: string;
  category: "wigs" | "extensoes" | "servicos" | "acessorios";
  description: string;
  priceRange: string;
  duration: string;
  profile: string;
  image: string;
  technicalTags: string[];
  subtitle: string;
}
```

**Problemas identificados**:
- ✗ Apenas 20 produtos (precisa de 41)
- ✗ Campos insuficientes (faltam: `slug`, `collection`, `emotionalBenefit`, `galleryImages`, `crossSell`, `faq`, `popularityScore`, `featured`, `photoChecklist`)
- ✗ Textos quebrados: "转移视觉效果突出" (w6), "dom安娜护理" (a4)
- ✗ Mistura de português/inglês: "Setup inicial", "Transfer visuals"
- ✗ Categorias limitadas (faltam: "bases")

### 2.2 Paleta Visual (frontend/src/app/globals.css)
**Estado atual**: Atelier Blue (inadequado para beauty)
```css
--color-bg: #07111F; /* Navy Black */
--color-primary: #2563EB; /* Royal Blue */
--color-accent: #38BDF8; /* Cyan Glow */
```

**Problema**: Azul saturado/cyan briga com nicho de beleza, pele e cabelo. Cliente espera tons terrosos, quentes, luxuosos.

### 2.3 Estrutura de Fotos (public/gal-assets/catalog/)
**Estado**: Apenas 1 imagem por produto (hero.png)
**Necessário** (conforme photoChecklist):
- `hero.png`
- `lace-close.png`
- `inside-cap.png`
- `texture.png`
- `side-view.png`
- `scale-length.png`
- `before-after.png` (se serviço)
- `alt-text.txt`

### 2.4 Frontend Visual
**Estado**: Segue Design System V6 (Editorial Atelier) mas com paleta errada
- ✅ Tipografia Playfair Display + Inter
- ✅ Whitespace generoso
- ✅ Anti-dashboard (sem card-mania)
- ✗ Cores azuis/cyans em toda interface
- ✗ Falta modo iniciante/profissional
- ✗ Falta quiz de recomendação

### 2.5 Backend (backend/)
**Estado**: Arquitetura hexagonal sólida
- ✅ Domain models bem definidos
- ✅ Testes passando (122 testes)
- ✅ CI/CD configurado
- ℹ️ ServiceCatalog tem 10 itens hardcoded (precisa expandir para 41)

---

## 3. BACKLOG POR ÉPICO

### ÉPICO 01 — Catálogo 41+ e Modelo Rico

**Histórias**:
1. **H-01-01**: Expandir interface CatalogItem com campos ricos
2. **H-01-02**: Migrar 20 produtos atuais para novo formato
3. **H-01-03**: Adicionar 21 novos produtos do manifesto
4. **H-01-04**: Corrigir textos quebrados/misturados
5. **H-01-05**: Atualizar ServiceCatalog.kt (backend) para 41 itens
6. **H-01-06**: Garantir compatibilidade com UI atual

**Critérios de Aceite**:
- [ ] Interface TypeScript tem todos os campos do manifesto
- [ ] 41 produtos no catálogo
- [ ] Zero textos com caracteres acidentais
- [ ] Fallbacks para campos opcionais
- [ ] Build frontend passando (`npm run build`)
- [ ] Testes backend passando (`mvn test`)

---

### ÉPICO 02 — Foto Review Completo

**Histórias**:
1. **H-02-01**: Criar estrutura `public/gal-assets/catalog/[slug]/`
2. **H-02-02**: Adicionar placeholders para 8 tipos de imagem
3. **H-02-03**: Criar documentação de photo review (PHOTO-REVIEW-CHECKLIST.md)
4. **H-02-04**: Implementar alt-text automático
5. **H-02-05**: Usar assets ilustrativos como placeholders

**Critérios de Aceite**:
- [ ] Estrutura de pastas criada para todos os 41 produtos
- [ ] Placeholder images em todas as categorias
- [ ] Alt-text presente em todas as imagens
- [ ] Documentação de photo review no repo
- [ ] Assets ilustrativos NÃO usados como fotos finais de venda

---

### ÉPICO 03 — UX para 10 Classes de Clientes

**Histórias**:
1. **H-03-01**: Implementar seção "Comece Aqui"
2. **H-03-02**: Criar quiz de recomendação (10 perfis)
3. **H-03-03**: Criar glossário visual
4. **H-03-04**: Implementar modo iniciante/profissional
5. **H-03-05**: Priorizar turista iniciante e cliente perdida

**Critérios de Aceite**:
- [ ] Quiz funcional com 10 perfis de `personas_10_clientes.json`
- [ ] Glossário visual acessível
- [ ] Modo toggle iniciante/profissional
- [ ] Seção "Comece Aqui" na landing page
- [ ] Recomendações baseadas no perfil

---

### ÉPICO 04 — Vitrine Beauty Premium

**Histórias**:
1. **H-04-01**: Atualizar tokens CSS (globals.css) com paleta Beauty Premium
2. **H-04-02**: Substituir azul/cyan por Deep Espresso, Warm Ivory, Rosewood
3. **H-04-03**: Preservar micro-accentos (Champagne Gold, Muted Mauve)
4. **H-04-04**: Garantir contraste WCAG AA
5. **H-04-05**: Testar em mobile (manter elegância)

**Critérios de Aceite**:
- [ ] Zero cores azul/cyan na vitrine principal
- [ ] Paleta Beauty Premium aplicada (Deep Espresso, Warm Ivory, etc.)
- [ ] Micro-accentos preservados (< 2% da página)
- [ ] Whitespace mantido (mínimo 40% vazio)
- [ ] Contraste WCAG AA em textos
- [ ] Mobile-first com elegância (não empilhamento)

---

### ÉPICO 05 — Conversão

**Histórias**:
1. **H-05-01**: Criar coleções comerciais (Primeira Wig, HD Lace, etc.)
2. **H-05-02**: Implementar filtros avançados (dificuldade, manutenção, prazo)
3. **H-05-03**: Criar comparador de até 3 produtos
4. **H-05-04**: Implementar cross-sell inteligente
5. **H-05-05**: Criar lógica de recomendados por ocasião/nível
6. **H-05-06**: Adicionar CTA WhatsApp/orçamento

**Critérios de Aceite**:
- [ ] Coleções filtráveis e navegáveis
- [ ] Comparador funcional (até 3 produtos lado a lado)
- [ ] Cross-sell dinâmico baseado em `crossSell` do catálogo
- [ ] Recomendações contextuais funcionando
- [ ] CTA levando para WhatsApp com dados pré-preenchidos

---

## 4. HISTÓRIAS REFINADAS

### H-01-01: Expandir Interface CatalogItem
**Descrição**: Adicionar campos ricos do manifesto à interface TypeScript
**Campos a adicionar**:
- `slug`, `collection`, `emotionalBenefit`
- `technicalSpecs` (objeto com tags, difficultyLevel, maintenanceLevel, stockType)
- `galleryImages` (array), `crossSell` (array)
- `faq` (array de Q&A), `popularityScore`, `featured`
- `photoChecklist` (array)

**Arquivos**: `frontend/data/galAtelierCatalog.ts`

---

### H-04-01: Atualizar Tokens CSS
**Descrição**: Migrar paleta Atelier Blue para Beauty Premium
**Mudanças em `globals.css`**:
```css
/* ANTES */
--color-bg: #07111F; /* Navy Black */
--color-primary: #2563EB; /* Royal Blue */
--color-accent: #38BDF8; /* Cyan Glow */

/* DEPOIS */
--color-bg: #1B1212; /* Deep Espresso */
--color-bg-soft: #2A1C1A; /* Cocoa Surface */
--color-surface: #0F0D0D; /* Soft Black */
--color-text: #FAF7F2; /* Warm Ivory */
--color-primary: #7A3E3E; /* Rosewood */
--color-accent: #D8B46A; /* Champagne Gold */
```

**Arquivos**: `frontend/src/app/globals.css`

---

## 5. CRITÉRIOS DE ACEITE (GLOBAIS)

### Qualidade de Código
- [ ] Não quebrar build (`npm run build`, `mvn package`)
- [ ] Não remover funcionalidade sem justificativa
- [ ] Não alterar branch `main`
- [ ] PRs pequenos e revisáveis (< 500 linhas)
- [ ] Atualizar documentação junto com mudanças

### Padrão de Texto
- [ ] Nomes consistentes em português
- [ ] Termos técnicos padronizados (ex: "instalação", não "instalacao")
- [ ] Zero caracteres acidentais (chinês, coreano, etc.)
- [ ] Sem textos em inglês quando não agregarem

### Design System V6
- [ ] Seguir Anti-Dashboard (sem card-mania)
- [ ] Whitespace mínimo 40%
- [ ] Tipografia hierárquica (Playfair + Inter)
- [ ] Micro-interações polite (400ms, cubic-bezier)

---

## 6. ARQUIVOS IMPACTADOS

### Frontend
| Arquivo | Ação | Épico |
|---------|------|-------|
| `frontend/data/galAtelierCatalog.ts` | Reescrever com 41 itens | 01 |
| `frontend/src/app/globals.css` | Migrar paleta | 04 |
| `frontend/components/CatalogSection.tsx` | Adaptar para novos campos | 01, 05 |
| `frontend/components/CatalogoLookbookSection.tsx` | Ajustar layout | 04 |
| `frontend/app/page.tsx` | Adicionar seções (Comece Aqui, Quiz) | 03 |

### Backend
| Arquivo | Ação | Épico |
|---------|------|-------|
| `backend/.../domain/model/ServiceCatalog.kt` | Expandir para 41 itens | 01 |
| `backend/.../application/service/CatalogService.kt` | (criar se não existir) | 01 |

### Documentação
| Arquivo | Ação |
|---------|------|
| `docs/DESIGN-SYSTEM.md` | Atualizar paleta |
| `docs/PHOTO-REVIEW-CHECKLIST.md` | Criar/revisar |
| `docs/BACKLOG-EPICOS-HISTORIAS.md` | Já existe no pacote |

### Assets
| Diretório | Ação |
|-----------|------|
| `public/gal-assets/catalog/[slug]/` | Criar para 41 produtos |
| `assets/illustrative-images/` | Usar como placeholders |

---

## 7. ORDEM DE PRS (SUGERIDA)

### PR 1 — Diagnóstico + Docs + Manifesto
**Branch**: `feature/hermes-diagnostico-docs`
- Adicionar `docs/10-CRITICAS-BASEADAS-NOS-CLIENTES.md`
- Adicionar `docs/BACKLOG-EPICOS-HISTORIAS.md`
- Adicionar `docs/PHOTO-REVIEW-CHECKLIST.md`
- Adicionar `docs/PALETA-BEAUTY-PREMIUM.md`
- Adicionar `data/catalog_manifest_41_products.json`
- Adicionar `data/personas_10_clientes.json`
- Atualizar `README.md` com contexto Squad LaceLab

**Tamanho estimado**: ~300 linhas

---

### PR 2 — Catálogo e Tipagem
**Branch**: `feature/hermes-catalogo-41-ricos`
- Reescrever `frontend/data/galAtelierCatalog.ts` com 41 itens
- Adicionar todos os campos ricos da interface
- Corrigir textos quebrados
- Garantir fallbacks para campos opcionais
- Testar compatibilidade com UI atual

**Tamanho estimado**: ~500 linhas

---

### PR 3 — Estrutura de Fotos
**Branch**: `feature/hermes-photo-assets`
- Criar `public/gal-assets/catalog/[slug]/` para 41 produtos
- Adicionar placeholders ilustrativos
- Implementar alt-text automático
- Documentar estrutura no repo

**Tamanho estimado**: ~200 linhas + assets

---

### PR 4 — Paleta Beauty Premium
**Branch**: `feature/hermes-paleta-beauty`
- Atualizar `frontend/src/app/globals.css`
- Substituir azul/cyan por paleta Beauty Premium
- Garantir contraste WCAG AA
- Testar em mobile

**Tamanho estimado**: ~150 linhas

---

### PR 5 — Catálogo UX (Coleções, Filtros)
**Branch**: `feature/hermes-catalogo-ux`
- Implementar coleções comerciais
- Criar filtros avançados
- Adicionar estado vazio
- Implementar ordenação

**Tamanho estimado**: ~400 linhas

---

### PR 6 — Comece Aqui + Quiz
**Branch**: `feature/hermes-onboarding-quiz`
- Criar seção "Comece Aqui"
- Implementar quiz de recomendação
- Criar glossário visual
- Adicionar modo iniciante/profissional

**Tamanho estimado**: ~600 linhas

---

### PR 7 — Conversão
**Branch**: `feature/hermes-conversao`
- Criar comparador de 3 produtos
- Implementar cross-sell inteligente
- Adicionar produtos relacionados
- Configurar CTA WhatsApp

**Tamanho estimado**: ~500 linhas

---

## 8. TAREFAS PARA ATHENA (Backend)

Conforme regras do HERMES-SCOPE.md:
> "HERMES não pode alterar: backend funcional, CI/CD"

Porém, o Épico 01 exige atualização do `ServiceCatalog.kt` (backend).

### Tarefas para Athena:
1. **Expandir ServiceCatalog.kt** para 41 itens
   - Atualizar `backend/.../domain/model/ServiceCatalog.kt`
   - Adicionar todos os 41 produtos do manifesto
   - Manter compatibilidade com API atual

2. **Criar CatalogService** (se necessário)
   - Use case para buscar produtos com filtros
   - Integração com nova estrutura

3. **Atualizar testes**
   - `ServiceCatalogTest.kt` já existe e passa
   - Adicionar testes para novos campos

**Handoff Necessário**: Criar HANDOFF de HERMES → ATHENA para backend

---

## 9. TAREFAS PARA VENUS (Frontend/UX)

Conforme regras:
> "VENUS não mexe em backend/CI"

### Tarefas para Venus:
1. **Implementar nova UI com paleta Beauty Premium**
   - Atualizar todos os componentes para usar novos tokens
   - Garantir que não há azul/cyan na vitrine

2. **Criar componentes de conversão**
   - `ProductComparator.tsx` (comparador)
   - `CrossSellSection.tsx`
   - `QuizModal.tsx`

3. **Implementar foto gallery**
   - `ProductGallery.tsx` com múltiplas imagens
   - Lightbox para zoom

4. **Responsividade mobile**
   - Testar todos os novos componentes
   - Garantir elegância editorial no mobile

**Handoff Necessário**: Criar HANDOFF de HERMES → VENUS para frontend visual

---

## 10. CHECKLIST FINAL DE VALIDAÇÃO

### Antes de cada PR:
- [ ] Criar branch a partir de `feature/tests-docs-ci`
- [ ] Seguir naming convention: `feature/hermes-<descricao>`
- [ ] Fazer commits atômicos e descritivos
- [ ] Rodar `npm run lint` e corrigir warnings
- [ ] Rodar `npm run build` e garantir sucesso
- [ ] Rodar `mvn test` no backend e garantir sucesso

### Ao finalizar todos os PRs:
- [ ] Fazer merge para `feature/tests-docs-ci`
- [ ] Testar fluxo completo localmente
- [ ] Validar com personas (10 clientes)
- [ ] Verificar se paleta azul/cyan foi removida
- [ ] Contar 41 produtos no catálogo
- [ ] Validar fotos em todas as páginas
- [ ] Testar quiz e recomendações
- [ ] Confirmar CTA WhatsApp funcionando

### Documentação:
- [ ] Atualizar `docs/ARCHITECTURE.md` se necessário
- [ ] Atualizar `docs/DESIGN-SYSTEM.md` com nova paleta
- [ ] Criar `docs/PHOTO-REVIEW-CHECKLIST.md` (se não existir)
- [ ] Atualizar `BACKLOG.md` com progresso

---

## 11. RISCOS TÉCNICOS

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Quebra de API (backend/frontend) | Alto | Manter compatibilidade, usar fallbacks |
| Perda de dados no catálogo | Alto | Backup antes de migrar, commits atômicos |
| Regressão visual | Médio | Testar em dev antes de merge, usar feature flags |
| Conflitos de merge | Médio | PRs pequenos, sync frequente com base |
| Performance (41 produtos) | Baixo | Lazy loading, paginação se necessário |

---

## 12. ESTRATÉGIA DE EXECUÇÃO

### Princípios:
1. **Uma história por vez** (conforme SESSION-BOARD.md)
2. **PRs pequenos** (< 500 linhas)
3. **Não misturar** refatoração visual, dados e lógica no mesmo PR
4. **Atualizar documentação** junto com mudanças
5. **Testar antes de commitar**

### Fluxo:
```
feature/tests-docs-ci
  ↓
  PR 1: feature/hermes-diagnostico-docs
  ↓
  PR 2: feature/hermes-catalogo-41-ricos
  ↓
  PR 3: feature/hermes-photo-assets
  ↓
  PR 4: feature/hermes-paleta-beauty
  ↓
  PR 5: feature/hermes-catalogo-ux
  ↓
  PR 6: feature/hermes-onboarding-quiz
  ↓
  PR 7: feature/hermes-conversao
  ↓
  Merge para feature/tests-docs-ci
  ↓
  PR para dev (via Athena/Venus)
```

---

## 13. PRÓXIMOS PASSOS (IMEDIATOS)

1. ✅ Criar este plano (`SQUAD-LACELAB-PLANO-HERMES.md`)
2. ⬜ Atualizar `HERMES-STATUS.md` com nova missão
3. ⬜ Atualizar `HERMES-CONTINUE.md` com próximos passos
4. ⬜ Executar SYNC3 final
5. ⬜ Criar PR 1 (Diagnóstico + Docs + Manifesto)
6. ⬜ Notificar Athena sobre backend (Handoff)
7. ⬜ Notificar Venus sobre frontend (Handoff)

---

**Documento criado por HERMES em 29/04/2026 23:30 UTC-3**  
**Status**: Aguardando aprovação para iniciar PR 1