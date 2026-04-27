# UX-AJUSTE-FINO-FINAL — Crítica Dura da Tela Atual

## Data: 2026-04-27
## Status: CRÍTICA INICIADA

---

## 1. O QUE ESTÁ FEIO

- Hero com layout genérico de SaaS
- Cards de métricas com fundo branco pobre
- Catálogo com emoji como imagem principal
- Pipeline vazio sem exemplos demonstrativos
- Formulário de orçamento sem agrupamento visual
- "Solicitação para Sessão B" visível na UI (Bastidor dev exposto)
- Texto técnico de endpoint na interface
- Empty states sem orientação, só "nenhum encontrado"

---

## 2. O QUE ESTÁ CONFUSO

- Ordem didática da página não guia a usuária
- Hero não explica claramente o que o sistema faz para pessoa comum
- Menu curto para o escopo real ( faltam: Diagnóstico, Pedidos, Produção, Agenda, Estoque, Financeiro, Marketing, Reviews)
- Pipeline não mostra storytelling de venda consultiva
- Não há explicação do fluxo: WhatsApp → Diagnóstico → Orçamento → Pix → Produção → Prova → Entrega → Pós-venda

---

## 3. O QUE PARECE GENÉRICO

- "Beauty Commerce CRM para wigmakers" como headline principal
- Cards sem identidade de atelier premium
- Layout com cara de template
- Tipografia grande demais, pesada e desbalanceada
- Cores que parecem "bege bonito" mas não "atelier premium"

---

## 4. O QUE NÃO COMUNICA PERUCA/LACE/WIG

- Imagem principal abstrata demais
- Catálogo sem imagem de produto real
- Não mostra lace, glueless, full lace, manutenção, acessórios
- Falta densidade visual de produto wigmaker
- Nenhuma menção a texturas, densidades, toucas

---

## 5. O QUE PARECE TÉCNICO DEMAIS

- "Beauty Commerce CRM" no hero (termo de dev, não de cliente)
- Endpoint POST /api/diagnosis visível
- Policy de recomendação mencionada
- "Sessão B" na UI
- Campos de formulário sem texto de ajuda

---

## 6. O QUE PARECE VAZIO

- Dashboard com métricas zeradas ocupando espaço
- Pipeline sem nenhum card de exemplo
- Hero sem storytelling de valor
- Seção "quem somos" inexistente
- Falta área de "como funciona"

---

## 7. O QUE ATRAPALHA CONVERSÃO

- CTA "Criar Orçamento" abaixo do fold
- Hero não gera desejo
- Catálogo fraco não vendável
- Pipeline vazio não inspira confiança
- Texto técnico exposto que quebra profissionalismo

---

## 8. O QUE ATRAPALHA OPERAÇÃO

- Wizard de orçamento não agrupado visualmente
- Campos de formulário soltos sem lógica de sessão
- Resultado do orçamento não destacado
- Status do sistema em painel separado
- Falta orientação para cada métrica zerada

---

## 9. O QUE PRECISA SAIR DA UI

- [x] "Solicitação para Sessão B"
- [x] "Endpoint POST /api/diagnosis"
- [x] "Política de recomendação em Policy"
- [x] Qualquer texto de bastidor de desenvolvimento
- [x] Emoji como representação principal de produto
- [x] "Beauty Commerce CRM" como headline principal

---

## 10. O QUE PRECISA VIRAR DOCUMENTAÇÃO INTERNA

- [x] docs/sessoes/SESSION-B-TODO.md — Lista de endpoints técnicos a implementar
- [x] docs/sessoes/SESSION-VALIDADORA-INSTRUCOES.md — Instruções para validação
- [ ] docs/PROCESS-MAP.md — Mapa do fluxo operacional (futuro)

---

## PLANO DE CORREÇÃO

### AJUSTES CRÍTICOS IMEDIATOS

1. Remover "Solicitação para Sessão B" e textos técnicos da UI
2. Reescrever hero com copy mais claro para cliente comum
3. Reordenar página seguindo ordem didática
4. Adicionar seção "Como funciona"
5. Adicionar mock didático no pipeline
6. Melhorar empty states com orientação
7. Agrupar campos do formulário por sessão
8. Melhorar cards de métricas com orientação quando zerado
9. Adicionar imagens do catálogo como protagonistas
10. Remover emoji como imagem principal

### AJUSTES VISUAIS

1. Menos branco vazio
2. Cards mais premium
3. Melhor contraste
4. Botões mais fortes
5. Seções mais separadas
6. Mobile-first real

---

## RISCO

- Remover texto técnico pode quebrar se houver dependência de referência
- Reescrever hero pode afetar SEO se não preservar palavras-chave
- Rearrumar página pode mover CTAs do fold
- Build precisa passar após todas alterações