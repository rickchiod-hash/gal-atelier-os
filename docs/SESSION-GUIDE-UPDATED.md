# SESSION GUIDE (Atualizado)

## Objetivo
Guia operacional para as próximas sessões (Backend, Frontend e QA) com o estado atual do projeto.

## Sessão Backend (10 melhorias prioritárias)
1. Refatorar `AppointmentsController` para UseCase/Service (hexagonal).
2. Refatorar `InventoryController` para UseCase/Service.
3. Refatorar `CampaignController` para UseCase/Service.
4. Adicionar validações Bean Validation nos DTOs de entrada (`@Valid` + constraints).
5. Criar testes de integração para endpoints Pix.
6. Criar testes de integração para endpoints de cupons.
7. Criar testes de integração para endpoints de comissões.
8. Cobrir cenários de erro em `ApiExceptionHandler`.
9. Garantir contratos estáveis de response (campos obrigatórios) com testes.
10. Revisar performance de consultas `findAll().filter` em controllers e mover para repositório.

## Sessão Frontend (10 melhorias prioritárias)
1. Migrar seções placeholder para conteúdo funcional (Agenda/CRM/Pedidos).
2. Substituir `img` por `next/image` nas seções críticas.
3. Garantir acessibilidade AA (roles/labels/focus visible).
4. Revisar responsividade de `HeroSection` e `CatalogSection`.
5. Unificar tokens visuais com limites V6 (accent <= 2%).
6. Refatorar `QuoteSection` em subcomponentes menores.
7. Cobrir fluxos de erro do formulário (toast e estado).
8. Adicionar testes de interação para filtros do catálogo.
9. Adicionar testes de regressão de Header/Menu mobile.
10. Reforçar isolamento de dados mock para evitar flaky tests.

## Sessão QA/CI (10 melhorias prioritárias)
1. Reativar pipeline principal automática mínima (sem avalanche).
2. Manter pipelines legados somente manual.
3. Publicar matriz de smoke tests por branch (`feature/develop/release/main`).
4. Adicionar job de `mvn -q test` + relatório.
5. Adicionar job de `npm run test -- --runInBand` + relatório.
6. Adicionar baseline de cobertura backend (target progressivo).
7. Adicionar baseline de cobertura frontend (target progressivo).
8. Garantir artifacts com fallback (`if-no-files-found: ignore` onde aplicável).
9. Padronizar logs de diagnóstico em frontend/backend.
10. Formalizar regra de bloqueio PR por testes críticos (backend+frontend).

## Critério de conclusão por sessão
- Todo item concluído precisa:
  - mudança de código;
  - teste automatizado associado;
  - atualização no SCRUM board;
  - evidência de comando executado.
