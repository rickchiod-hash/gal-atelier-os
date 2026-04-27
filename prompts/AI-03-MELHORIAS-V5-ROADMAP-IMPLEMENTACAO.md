# AI-03 â€” Melhorias V5 para Gal Atelier OS

## Objetivo
VocÃª Ã© o agente tÃ©cnico do projeto Gal Atelier OS. Sua missÃ£o Ã© ler o projeto, encontrar arquivos de melhorias V5 se existirem, analisar o estado atual e implementar a Fase 1 de melhorias com seguranÃ§a.

## Regras obrigatÃ³rias
1. Leia antes de editar: README.md, AGENTS.md, docs/*.md, prompts/*.md e .opencode/commands/*.md.
2. Procure arquivos com nomes: *melhoria*, *melhorias*, *v5*, *roadmap*, *runbook*.
3. Se encontrar melhoriasv5, MELHORIAS-V5.md ou similar, use como fonte prioritÃ¡ria.
4. NÃ£o apague scripts de batch, PowerShell, Docker ou logs.
5. NÃ£o implemente tudo de uma vez.
6. NÃ£o crie pagamento real, envio real de WhatsApp ou banco real sem aprovaÃ§Ã£o.
7. NÃ£o commite secrets.
8. Primeiro entregue diagnÃ³stico e plano; depois implemente somente a Fase 1.
9. Preserve arquitetura hexagonal.
10. Valide com Maven, npm build e Docker se possÃ­vel.

## InspiraÃ§Ã£o de produto
Use padrÃµes de sistemas como Fresha, Booksy, Square Appointments, Vagaro e GlossGenius:
- agendamento;
- pagamentos;
- lembretes;
- no-show protection;
- CRM;
- catÃ¡logo;
- relatÃ³rios;
- fidelidade;
- estoque;
- automaÃ§Ã£o de atendimento.

# 10 novas funcionalidades Ãºteis

1. Agenda inteligente para avaliaÃ§Ã£o, briefing, produÃ§Ã£o, prova, entrega e manutenÃ§Ã£o.
2. Funil CRM: novo lead, contato, orÃ§amento, Pix pendente, em produÃ§Ã£o, concluÃ­do e perdido.
3. CatÃ¡logo de serviÃ§os: lace front, peruca personalizada, manutenÃ§Ã£o, customizaÃ§Ã£o, colocaÃ§Ã£o, higienizaÃ§Ã£o.
4. OrÃ§amento versionado com histÃ³rico de alteraÃ§Ãµes e motivo.
5. Pix com sinal obrigatÃ³rio: total, percentual, valor do sinal, status e mensagem pronta.
6. Lembretes de WhatsApp gerados para sinal pendente, prova, entrega e follow-up.
7. Perfil completo da cliente: medidas, preferÃªncias, histÃ³rico e observaÃ§Ãµes.
8. Estoque de materiais: telas, laces, cabelos, colas, fitas, acessÃ³rios e fornecedores.
9. Fidelidade e indicaÃ§Ã£o: pontos, cupom, cliente VIP e desconto com regra.
10. Dashboard de negÃ³cio: leads, conversÃ£o, receita prevista, Pix pendente e prazos.

# 10 melhorias no backend

1. Preparar persistÃªncia desacoplada por ports/repositories.
2. Preparar Flyway/Liquibase se banco for aprovado.
3. Padronizar erros com traceId, code, message e fields.
4. Fortalecer validaÃ§Ãµes de domÃ­nio.
5. Adicionar idempotÃªncia para orÃ§amento/pagamento.
6. Melhorar logs estruturados, Actuator e mÃ©tricas.
7. Criar testes de regressÃ£o para preÃ§o, Pix, WhatsApp, status e validaÃ§Ãµes.
8. Adicionar OpenAPI/Swagger.
9. Melhorar seguranÃ§a: CORS, .env.example e secrets fora do cÃ³digo.
10. Garantir hexagonal: controller nÃ£o calcula regra, domain nÃ£o conhece Spring.

# 10 melhorias no frontend

1. Design system com tokens de cor, spacing, radius, sombra e tipografia.
2. Layout mobile-first e desktop responsivo.
3. Wizard de orÃ§amento em etapas.
4. Dashboard inicial com KPIs e prÃ³ximos prazos.
5. CRM visual com cards por status.
6. Agenda visual simples.
7. Tela de cliente com histÃ³rico e preferÃªncias.
8. Loading, skeleton, empty states, error states e toasts.
9. Acessibilidade: labels, foco, contraste e teclado.
10. OrganizaÃ§Ã£o: componentes menores, hooks de API e tipos TypeScript explÃ­citos.

# Fase 1 obrigatÃ³ria
Implemente somente:
1. Dashboard inicial;
2. CRM status bÃ¡sico;
3. catÃ¡logo de serviÃ§os mockado;
4. wizard de orÃ§amento melhorado;
5. testes backend existentes continuando verdes;
6. frontend buildando.

# Comandos de validaÃ§Ã£o
```bat
cd /d K:\dev\repos\gal-atelier-os\backend
mvn -B clean verify

cd /d K:\dev\repos\gal-atelier-os\frontend
npm install --no-audit --no-fund --include=dev --legacy-peer-deps
npm run build

cd /d K:\dev\repos\gal-atelier-os
docker compose -p gal-atelier-os build --no-cache
docker compose -p gal-atelier-os up -d --force-recreate --remove-orphans
```

# Resposta esperada
Entregue:
- DiagnÃ³stico;
- Arquivos lidos;
- Plano;
- ImplementaÃ§Ã£o feita;
- Arquivos alterados;
- Como validar;
- Riscos;
- PrÃ³xima fase.

