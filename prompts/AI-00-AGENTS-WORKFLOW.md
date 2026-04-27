Objetivo:
Colocar os agentes para trabalhar no Gal Atelier OS sem quebrar a arquitetura.

Leia:
1. AGENTS.md
2. docs/ARCHITECTURE.md
3. docs/ENGINEERING-STANDARDS.md
4. docs/DESIGN-SYSTEM.md
5. docs/OBSERVABILITY.md

Tarefa inicial:
Não altere arquivos ainda.

Entregue:
1. Diagnóstico do backend.
2. Diagnóstico do frontend.
3. Diagnóstico dos scripts.
4. 10 riscos reais.
5. Primeira melhoria mínima.
6. Arquivos prováveis.
7. Comandos de validação.
8. Critério de pronto.

Restrições:
- Não mover regra para Controller.
- Não duplicar preço no front.
- Não criar banco antes de aprovar.
- Não usar Docker se o Docker local não validar.
- Não commitar secrets.
- Não fazer deploy produção.

Após minha aprovação:
Implemente uma melhoria por vez.
Sempre rode:
cd backend && mvn test
cd frontend && npm run build


Nota V5.3:
O fluxo principal é Docker First com fallback local. Use também prompts/AI-01-EXECUTE-FLOW-REVIEW.md.


Nota V5.4:
Antes de propor mudanças, leia docs/60-AJUSTES-V5-4.md e verifique o relatório JaCoCo.


Nota V5.5:
Antes de sugerir reinstalação do OpenCode, verifique docs/70-OPENCODE-AWARE-V5-5.md e `opencode --version`.


Nota V5.7:
Abra e use prompts/AI-02-BIG-PICKLE-START.md. Primeiro diagnostique, depois peça aprovação antes de editar.
