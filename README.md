# Gal Atelier OS — Sistema Operacional para Wigmakers

Sistema operacional para wigmakers/perucas com estética **Editorial Atelier** (V6) — loja de luxo + atelier artesanal.

## Stack

- **Backend**: Kotlin 2.1.20 + Spring Boot 3.4.5 + Maven
- **Frontend**: Next.js + TypeScript (Design System V6)
- **Database**: PostgreSQL 16 + Flyway Migrations
- **Architecture**: Hexagonal (Domain → Application → Adapter)
- **Infrastructure**: Docker Compose
- **Observability**: Logs com traceId, JaCoCo coverage
- **AI Agents**: OpenCode para planejamento e execução

---

## Pré-requisitos

- Java 21
- Node.js 22+
- Docker Desktop
- Maven 3.9+
- Git

---

## Como Rodar (Docker Compose - Recomendado)

```bash
# Clone o repositório
git clone <repo-url>
cd gal-atelier-os

# Suba todos os serviços
docker compose -p gal-atelier-os up -d

# Verifique os containers
docker compose -p gal-atelier-os ps

# Logs
docker compose -p gal-atelier-os logs -f
```

### URLs (Docker)

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| Health Check | http://localhost:8080/api/health |
| PostgreSQL | localhost:5432 |

---

## Como Rodar (Local - Desenvolvimento)

### Backend (Spring Boot)

```bash
cd backend

# Testes
mvn -B clean verify

# Rodar aplicação (dev profile)
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build
```

---

## Configuração de Ambiente

### Variáveis (Backend)
Crie `backend/src/main/resources/application-local.yml`:

```yaml
galatelier:
  whatsappReceiver: "5511999999999"
  pixKey: "sua-chave-pix"
  pixMerchantName: "GAL ATELIER"
  pixMerchantCity: "SAO PAULO"
  aiProvider: "mock"
```

Ou use variáveis de ambiente:
- `WHATSAPP_RECEIVER`
- `PIX_KEY`
- `PIX_MERCHANT_NAME`
- `PIX_MERCHANT_CITY`
- `AI_PROVIDER`

### Banco de Dados (PostgreSQL)

O projeto usa **Flyway** para migrations:
- `backend/src/main/resources/db/migration/V1__initial_schema.sql`
- `backend/src/main/resources/db/migration/V2__add_campaigns_table.sql`
- `backend/src/main/resources/db/migration/V3__add_process_photos.sql`
- `backend/src/main/resources/db/migration/V4__add_whatsapp_templates.sql`
- `backend/src/main/resources/db/migration/V5__add_customer_name_to_appointments.sql`

---

## Arquitetura

O projeto segue **Arquitetura Hexagonal**:

```
adapter.input.web (Controllers)
        ↓
application.port.input (Use Cases)
        ↓
application.service (Use Case Implementations)
        ↓
domain (Entities, Value Objects, Policies)
        ↓
application.port.output (Output Ports)
        ↓
adapter.output (Adapters: JPA, Pix, WhatsApp)
```

### Regras:
- Domain NÃO importa Spring
- Controllers apenas traduzem HTTP
- Use Cases orquestram regras de negócio
- Policies calculam (ex: QuotePricingPolicy)
- Adapters integram sistemas externos

---

## Design System V6 — Editorial Atelier

### Filosofia
- **NÃO é um dashboard SaaS** — É uma experiência de marca premium
- Whitespace generoso (mínimo 40% vazio)
- Tipografia: Playfair Display (títulos) + Inter (corpo)
- Micro-accentos (máximo 2% da página)
- Anti-dashboard: sem card-mania, sem Kanban colorido

### Cores (Nubank Purple Palette)
- `--nubank-dark: #1A1A2E` (80% da página)
- `--nubank-light: #F4F4F8`
- `--nubank-gray: #8A8A9A`
- `--nubank-magenta: #820AD1` (accent - máximo 2%)

### Tipografia
- **H1**: Playfair Display 3.5rem, line-height 1.15
- **H2**: Playfair Display 2.5rem
- **Body**: Inter 1rem, line-height 1.7

---

## Testes

### Backend
```bash
cd backend
mvn test                    # Todos os testes
mvn test -Dtest="com.galatelier.domain.model.*Test"  # Testes de domínio
mvn test -Dtest="com.galatelier.application.service.*Test"  # Use cases
```

### Cobertura (JaCoCo)
Após `mvn test`, abra:
```
backend/target/site/jacoco/index.html
```

---

## API Endpoints (Principais)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/quotes` | Criar orçamento |
| GET | `/api/quotes` | Listar orçamentos |
| GET | `/api/quotes/metrics` | Métricas |
| GET | `/api/services` | Catálogo (10 tipos) |
| GET/POST/PATCH | `/api/customers` | Clientes |
| GET/POST/PATCH | `/api/orders` | Pedidos |
| GET/POST/PATCH | `/api/appointments` | Agenda |
| GET/POST/PATCH | `/api/campaign` | Campanhas |
| POST | `/api/webhook/pix` | Pix webhook |

---

## Scripts Disponíveis

### Raiz do projeto:
- `run-all-v5.ps1` — Orquestração completa (PowerShell)
- `scripts/*.bat` — Scripts individuais (Windows)

### Exemplos:
```bash
scripts/coverage.bat     # Gera relatório JaCoCo
scripts/docker-logs.bat   # Logs do Docker
scripts/stop.bat         # Para todos os serviços
```

---

## CI/CD

GitHub Actions configurado (`.github/workflows/ci-cd.yml`):
- **backend-test**: Java 21, `mvn test`
- **frontend-build**: Node 22, `npm install && npm run build`

---

## Documentação Adicional

| Arquivo | Descrição |
|---------|-----------|
| `docs/ARCHITECTURE.md` | Arquitetura hexagonal |
| `docs/ENGINEERING-STANDARDS.md` | Padrões de código |
| `docs/DESIGN-SYSTEM.md` | Design System V6 completo |
| `docs/OBSERVABILITY.md` | Logs, health, frontend observability |
| `docs/PRODUCT-ROADMAP.md` | Roadmap de produto (Fases 1-3) |
| `docs/SUPER-ROADMAP-V6.md` | V6 checklist completo |
| `docs/ROADMAP-MELHORIAS-GAL-ATELIER.md` | 22-item melhorias |
| `BACKLOG.md` | Backlog atualizado com status |
| `SCRUM-BOARD.md` | Scrum board com User Stories |
| `SESSION-3-BACKLOG.md` | Minha backlog (Tests/Docs/CI) |

---

## Contribuição

1. Crie uma branch: `git checkout -b feature/sua-feature`
2. Siga os padrões:
   - Backend: `feat(backend)`, `fix(backend)`, `test(backend)`
   - Frontend: `feat(frontend)`, `fix(frontend)`, `style(frontend)`
   - Docs: `docs(product)`, `docs(architecture)`
   - CI: `ci(cd)`
3. Commits devem ser atômicos e descritivos
4. Execute `mvn test` e `npm run build` antes do PR
5. Abra um Pull Request

---

## Status Atual (2026-04-28)

- ✅ **Fase 1 (MVP)**: Concluída
- 🔄 **Fase 2 (Operação Real)**: Em progresso
- ✅ **Fase 3 (V6 Visual Overhaul)**: Concluída (frontend parcial)
- 🔄 **Sprint 1 (2026-04-28 a 2026-05-12)**: Em andamento
- ✅ **Domain Tests**: Concluídos (10 arquivos de teste)

---

## Links Úteis

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health**: http://localhost:8080/api/health
- **JaCoCo**: `backend/target/site/jacoco/index.html`

---

## Licença

Proprietária — Gal Atelier OS
