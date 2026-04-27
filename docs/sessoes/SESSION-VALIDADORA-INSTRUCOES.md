# SESSÃO VALIDADORA — INSTRUÇÕES

## Objetivo

A sessão validadora deve **validar item por item** do roadmap sem implementar grandes features, sem apagar nada e sem rodar comandos destrutivos.

---

## O Que a Sessão Validadora Deve Fazer

### 1. Ler os Arquivos Principais

Antes de validar, leia:

1. **docs/ROADMAP-MELHORIAS-GAL-ATELIER.md** - Tabela de roadmap com 22 etapas
2. **docs/sessoes/SESSION-EXECUTORA-STATUS.md** - Status da executora
3. **docs/PRODUCT-ROADMAP.md** - Roadmap completo do produto
4. **docs/SECURITY.md** - Segurança e variáveis

### 2. Validar Item por Item

Para cada etapa na tabela de roadmap:

- Verificar se o **arquivo existe**
- Verificar se a **feature aparece na UI** (acesso via browser)
- Verificar se o **endpoint responde** (teste com curl/Postman)
- Verificar se o **teste existe**
- Verificar se o **build passa**
- Verificar se o **commit existe**
- Verificar se **não houve quebra de escopo** (orçamento, Pix, WhatsApp)

### 3. Não Fazer

- ❌ Não implementar grandes features
- ❌ Não apagar arquivos existentes
- ❌ Não rodar comandos como `rm -rf` ou `git reset --hard`
- ❌ Não fazer refatoração gigante
- ❌ Não migrar stack

### 4. Marcar Evidências

Para cada item validado, registrar:

- **VALIDATED** - Item confirmado
- **NEEDS_REVIEW** - Precisa de revisão
- **BLOCKED** - Bloqueado (com justificativa técnica)

### 5. Rodar Testes e Builds

Validar que tudo funciona:

```bash
# Backend
cd backend && mvn -B clean verify

# Frontend
cd frontend && npm run build

# Docker
docker compose -p gal-atelier-os ps
```

### 6. Registrar Achados

Criar arquivo: **docs/sessoes/SESSION-VALIDADORA-STATUS.md**

Registrar:
- itens validados
- problemas encontrados
- recomendações

---

## Checklist de Validação

### Frontend
- [ ] Design system premium (paleta, tipografia)
- [ ] Hero com identidade de wigmaker
- [ ] Seção "Quem somos"
- [ ] Dashboard principal
- [ ] CRM pipeline
- [ ] Diagnóstico da cliente
- [ ] Catálogo técnico (10+ tipos)
- [ ] Gestão de pedidos
- [ ] Fluxo de produção
- [ ] Agenda visual
- [ ] Estoque
- [ ] Financeiro
- [ ] WhatsApp templates
- [ ] Marketing/recompra
- [ ] Reviews/galeria
- [ ] Orçamento não quebrado

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

## Critérios de Produto

Validar que em 3 segundos fica claro que é **atelier de perucas/laces** e não dashboard genérico:

- [ ] Visual premium de boutique
- [ ] Não parece SaaS corporativo
- [ ] Orçamento, Pix e WhatsApp funcionando
- [ ] Não houve quebra de funcionalidades existentes

---

## Arquivos para Sessão Validadora Ler

1. **docs/ROADMAP-MELHORIAS-GAL-ATELIER.md** - Tabela de roadmap
2. **docs/sessoes/SESSION-EXECUTORA-STATUS.md** - Status executora
3. **docs/PRODUCT-ROADMAP.md** - Roadmap produto
4. **docs/SECURITY.md** - Segurança
5. **README.md** - Visão geral

---

## Próxima Ação

Após validar tudo, criar **docs/sessoes/SESSION-VALIDADORA-STATUS.md** com:
- Data da validação
- Itens validados com evidência
- Problemas encontrados (se houver)
- Recomendação de merge (sim/não)