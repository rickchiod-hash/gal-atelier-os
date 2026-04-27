# MELHORIAS — Gal Atelier / Veloura Beauty OS

Este arquivo é parte de um fluxo seguro para OpenCode em 2 sessões.

Regra principal: **melhorar o que já existe sem apagar nada, sem reescrever o projeto inteiro e sem trocar a stack atual sem aprovação.**

O projeto atual é Gal Atelier OS:
- Backend: Kotlin + Spring Boot + Maven + arquitetura hexagonal.
- Frontend: Next.js + TypeScript.
- Execução: Docker Compose.
- Canal operacional: WhatsApp + Pix/sinal.
- Nicho: wigmaker, perucas, lace wigs, glueless wigs, customização, instalação, manutenção, pós-venda.

Contexto estratégico incorporado:
O sistema ideal não é só CRM. É um Beauty Commerce CRM para Wigmakers:
CRM + ecommerce + catálogo técnico de wigs + pedidos personalizados + agenda + estoque + financeiro + WhatsApp + pós-venda + recompra.


# MELHORIAS — SESSÃO C — Integração final

## Missão

Você é a sessão de integração final. Sua tarefa é validar o trabalho da Sessão A e Sessão B.

## Escopo permitido

Você pode editar pequenas correções de integração em:

```text
frontend/lib/**
frontend/types/**
docs/**
backend/**
```

Não faça redesign grande.  
Não reescreva frontend.  
Não troque stack.  
Não mexa em tools/batches.

## Etapas

### C1 — Ler relatórios das sessões

Procure respostas/arquivos gerados pelas sessões A e B.

Leia:

```text
prompts/MELHORIAS-01-SESSAO-A-FRONTEND-LUXO-FUNCIONAL.md
prompts/MELHORIAS-02-SESSAO-B-PRODUTO-BACKEND-QA.md
docs/**
```

### C2 — Validar contratos

Confirme:

```text
frontend chama endpoints existentes
tipos batem com backend
orçamento continua funcionando
WhatsApp/Pix continuam funcionando
```

### C3 — Validar builds

Rode:

```bat
cd /d K:\dev\repos\gal-atelier-os\backend
mvn -B clean verify

cd /d K:\dev\repos\gal-atelier-os\frontend
npm install --no-audit --no-fund --include=dev --legacy-peer-deps
npm run build
```

### C4 — Validar Docker

Se Docker estiver disponível:

```bat
cd /d K:\dev\repos\gal-atelier-os
docker compose -p gal-atelier-os build --no-cache
docker compose -p gal-atelier-os up -d --force-recreate --remove-orphans
docker compose -p gal-atelier-os ps
```

### C5 — Entrega final

Responda:

```text
MELHORIAS — Integração final concluída
Backend
Frontend
Docker
Endpoints
Problemas encontrados
Correções aplicadas
Riscos restantes
Próximo passo
```
