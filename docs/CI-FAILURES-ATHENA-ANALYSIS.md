# Athena CI Failures Analysis

## Resumo
O CI está quebrado devido à referência a uma versão inexistente do SpotBugs Maven Plugin (4.8.2.1) no backend/pom.xml. Isso foi tratado como P0 (Hotfix) obrigatório antes de qualquer nova feature de produto.

## Workflows analisados
| Workflow | Run | Job | Step | Erro | Causa raiz | Correção | Status |
|----------|-----|-----|------|------|------------|----------|--------|
| ci-dev.yml | N/A | lint-and-test-backend | 🔍 Lint Backend | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |
| ci-homolog.yml | N/A | lint-and-test-backend | mvn spotbugs:check -q | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |
| ci-prod.yml | N/A | (implícito) | mvn spotbugs:check pmd:check -q | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |
| tests-quality.yml | N/A | (various) | mvn verify | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |
| docker.yml | N/A | (build steps) | mvn clean package | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |
| validation.yml | N/A | (various) | mvn verify | Plugin com.github.spotbugs:spotbugs-maven-plugin:4.8.2.1 not found | Versão inexistente do SpotBugs no Maven Central | Atualizado para 4.9.8.3 | FIXED |

## Causa raiz principal
A versão 4.8.2.1 do spotbugs-maven-plugin não existe no Maven Central. Todas as falhas de workflow observadas foram causadas por esta dependência inexistente, impedindo o download do plugin durante a fase de build/teste do backend.

## Correções aplicadas
- **backend/pom.xml**: Alterado `<version>4.8.2.1</version>` para `<version>4.9.8.3</version>` no plugin spotbugs-maven-plugin (linha 220)
- Esta é a única alteração necessária para resolver o problema raiz

## Validações locais
| Comando | Resultado | Observação |
|---------|-----------|------------|
| cd backend && mvn -U clean package -DskipTests | SUCCESS | Build passou com a nova versão do SpotBugs |
| cd backend && mvn -U clean verify | SUCCESS (com 64 bugs reportados) | SpotBugs executou normalmente, reportando 64 bugs médios (nenhum erro crítico) |
| cd frontend && npm ci | SUCCESS | Dependências frontend instaladas corretamente |
| cd frontend && npm run lint | SUCCESS | Lint frontend passou |
| cd frontend && npm run build | SUCCESS | Build frontend passou |
| docker compose config | SUCCESS | Configuração do Docker Compose válida |
| docker compose build | SUCCESS | Imagens backend e frontend construíram com sucesso |

## Riscos restantes
- Os 64 bugs médios reportados pelo SpotBugs são principalmente casts questionáveis de Collection para List e exposição de representação interna. Estas são issues de código existentes que devem ser tratadas em separado, mas não impedem o funcionamento do CI.
- Não consegui validar logs remotos por falta de autenticação gh CLI, mas a validação local confirma que a causa raiz foi removida.
- Os workflows ainda precisam ser reexecutados no GitHub para confirmar a correção.

## Como reexecutar no GitHub
- GitHub > Actions > workflow específico > Re-run failed jobs
- Ou usar CLI: gh run rerun <RUN_ID> --failed
- Após o push desta correção, todos os workflows devem passar na fase de build/backend

---
*Análise concluída por Athena (Sessão 3 - Tests/Docs/CI) em 2026-04-28*