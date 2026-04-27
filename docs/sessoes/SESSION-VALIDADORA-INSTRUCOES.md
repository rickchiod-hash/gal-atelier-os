# SESSÃO VALIDADORA — INSTRUÇÕES (V6 Editorial Atelier)

## Objetivo

A sessão validadora deve **validar item por item** do roadmap V6 (Editorial Atelier) sem implementar grandes features, sem apagar nada e sem rodar comandos destrutivos.

---

## O Que a Sessão Validadora Deve Fazer

### 1. Ler os Arquivos Principais (Atualizados V6)

Antes de validar, leia:

1. **docs/ROADMAP-MELHORIAS-GAL-ATELIER.md** - Tabela de roadmap com V6 palette + rules
2. **docs/DESIGN-SYSTEM.md** - V6 Whisper Luxury palette + anti-dashboard rules
3. **docs/sessoes/SESSION-EXECUTORA-STATUS.md** - Status V6 atualizado
4. **docs/PRODUCT-ROADMAP.md** - Roadmap V6 (Editorial Atelier vision)
5. **docs/SECURITY.md** - Segurança + V6 design security
6. **docs/QA-REVIEW-V5-FASE1.md** - V6 QA criteria (anti-dashboard checklist)

### 2. Validar Item por Item (V6 Visual Overhaul)

Para cada etapa na tabela de roadmap V6:

#### Alta Prioridade (Anti-Dashboard)
- [ ] Hero split editorial (texto esquerda, imagem direita, NÃO cards sobrepostas)
- [ ] Dashboard horizontal bar (NÃO grid de metric cards)
- [ ] CRM Concierge list (NÃO Kanban colorido, NÃO drag-and-drop)

#### Média Prioridade (Editorial Atelier)
- [ ] Catálogo lookbook layout (1 full-width + 2-col grid, NÃO grid uniforme)
- [ ] Quote form single-column (inputs border-bottom only, NÃO caixa com border-radius)
- [ ] Botões 2px radius (NÃO pill-shaped, NÃO border-radius: 9999px)
- [ ] Inputs border-bottom only (NÃO inputs com borda completa)

#### Baixa Prioridade (Polish)
- [ ] Remover skeleton loaders (usar texto elegante "Carregando experiência...")
- [ ] Remover gráficos SVG falsos (usar dados reais ou omitir)
- [ ] Micro-interações polite (400ms, cubic-bezier, NÃO bounce/spring)

### 3. Validar Paleta V6 "Whisper Luxury"

- [ ] Ivory #FAF8F5 (base, não off-white)
- [ ] Charcoal #2C2C2C (texto, não preto)
- [ ] Blush #E8DDD3 (neutro, não "nude")
- [ ] Bronze #A67C52 (accents, máximo 2% da página)
- [ ] Deep Espresso #3D2B1F (CTAs, não marrom claro)
- [ ] Whitespace generoso (mínimo 40% vazio)

### 4. Validar Tipografia V6

- [ ] Playfair Display para H1 (3.5rem), H2 (2.5rem)
- [ ] Inter para body (1rem, line-height 1.7)
- [ ] Labels: Inter 0.75rem, weight 600, uppercase, tracking 0.1em

### 5. Não Fazer

- ❌ Não implementar grandes features
- ❌ Não apagar arquivos existentes
- ❌ Não rodar comandos como `rm -rf` ou `git reset --hard`
- ❌ Não fazer refatoração gigante
- ❌ Não migrar stack
- ❌ Não criar componentes com cara de SaaS dashboard

### 6. Marcar Evidências

Para cada item validado, registrar:

- **VALIDATED** - Item confirmado (V6 conforme)
- **NEEDS_REVIEW** - Precisa de revisão (parcialmente V6)
- **BLOCKED** - Bloqueado (ainda V5, não conforme)

### 7. Rodar Testes e Builds

Validar que tudo funciona:

```bash
# Backend
cd backend && mvn -B clean verify

# Frontend
cd frontend && npm run build

# CSS V6 - Verificar variáveis
grep -r "clamp(" frontend/app/globals.css
grep -r "Playfair Display" frontend/app/globals.css
grep -r "border-bottom:" frontend/app/globals.css

# Docker
docker compose -p gal-atelier-os ps
```

### 8. Validar Checklist Anti-Dashboard

```bash
# NÃO deve ter:
grep -r "skeleton" frontend/app/page.tsx
grep -r "border-radius: 9999px" frontend/app/globals.css
grep -r "chart-svg" frontend/app/page.tsx

# DEVE ter:
grep -r "whitespace" docs/DESIGN-SYSTEM.md
grep -r "cubic-bezier(0.25, 0.1, 0.25, 1)" frontend/app/globals.css
grep -r "Playfair Display" frontend/app/globals.css
```

### 9. Registrar Achados

Criar arquivo: **docs/sessoes/SESSION-VALIDADORA-STATUS.md**

Registrar:

- itens validados (V6 conforme)
- problemas encontrados (ainda V5)
- recomendações para próximos passos

---

## Checklist de Validação Técnica

### Frontend V6
- [ ] globals.css tem variáveis V6 (--ivory, --charcoal, --blush, --bronze)
- [ ] globals.css tem clamp() para espaçamento
- [ ] globals.css tem Playfair Display para --font-display
- [ ] page.tsx NÃO tem metric cards com gradientes
- [ ] page.tsx NÃO tem CRM Kanban colorido
- [ ] page.tsx NÃO tem gráficos SVG falsos
- [ ] page.tsx NÃO tem skeleton loaders
- [ ] Botões têm border-radius: 2px (não pill)
- [ ] Inputs têm border-bottom only (não borda completa)

### Backend
- [ ] /api/health
- [ ] /api/quotes (POST/GET)
- [ ] /api/quotes/metrics
- [ ] /api/services (10 tipos)
- [ ] /api/pipeline
- [ ] /api/dashboard
- [ ] /api/leads
- [ ] /api/diagnostics/recommendation
- [ ] /api/templates/whatsapp (13)

### Testes
- [ ] 8 testes passando
- [ ] Maven build
- [ ] npm build

### Infraestrutura
- [ ] Docker containers healthy
- [ ] Frontend rodando (localhost:3000)
- [ ] Backend rodando (localhost:8080)

---

## Critérios de Produto V6

Validar que em 3 segundos fica claro que é **loja de luxo + atelier artesanal** e NÃO dashboard SaaS:

- [ ] Visual premium (Playfair Display + Inter)
- [ ] Whitespace generoso (mínimo 40% vazio)
- [ ] Micro-accentos sutis (máximo 2% da página)
- [ ] NÃO parece SaaS corporativo
- [ ] NÃO tem card-mania
- [ ] NÃO tem métricas em cards coloridos
- [ ] Orçamento, Pix e WhatsApp funcionando
- [ ] Não houve quebra de funcionalidades existentes

---

## Arquivos para Sessão Validadora Ler (V6 Atualizados)

1. **docs/DESIGN-SYSTEM.md** - V6 Whisper Luxury + anti-dashboard rules
2. **docs/ROADMAP-MELHORIAS-GAL-ATELIER.md** - V6 palette + rules
3. **docs/QA-REVIEW-V5-FASE1.md** - V6 QA criteria
4. **docs/sessoes/SESSION-EXECUTORA-STATUS.md** - V6 status
5. **docs/PRODUCT-ROADMAP.md** - V6 Editorial Atelier vision
6. **docs/AGENTS.md** - V6 mission + visual rules
7. **README.md** - Visão geral

---

## Próxima Ação

Após validar tudo, criar **docs/sessoes/SESSION-VALIDADORA-STATUS.md** com:

- Data da validação
- Itens validados com evidência (V6 conforme)
- Problemas encontrados (ainda V5, precisando refatoração)
- Recomendação: prosseguir com refatoração globals.css + page.tsx