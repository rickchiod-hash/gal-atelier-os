# 🎀 Gal Atelier OS — Editorial Atelier V6

> **Sistema de operação premium para wigmakers/perucas**: Briefing artesanal, orçamentos, Pix e integração WhatsApp em uma experiência de loja de luxo.

[![CI - DEV](https://img.shields.io/badge/CI-DEV-blue?style=flat-square)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-dev.yml)
[![CI - HOMOLOG](https://img.shields.io/badge/CI-HOMOLOG-yellow?style=flat-square)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-homolog.yml)
[![CI - PRODUCTION](https://img.shields.io/badge/CI-PRODUCTION-green?style=flat-square)](https://github.com/seu-user/gal-atelier-os/actions/workflows/ci-prod.yml)
[![Coverage](https://img.shields.io/badge/Coverage-70%25-brightgreen?style=flat-square)](https://codecov.io)
[![SonarQube](https://img.shields.io/badge/Quality-SonarQube-blue?style=flat-square)](https://sonarcloud.io)

---

## 📋 Visão Geral

**Gal Atelier OS** é um sistema completo de **operação e vendas** para negócios de alta gama. Projetado como **Editorial Atelier** com:

- ✨ **UX Premium**: Whitespace 40%, tipografia editorial, micro-accentos discretos
- 🏗️ **Arquitetura Hexagonal**: Clean Code, testável, maintível
- ⚙️ **Automação Completa**: CI/CD com GitHub Actions, testes automáticos, deploy contínuo
- 🔒 **Enterprise Ready**: Security scanning, code quality gates, observabilidade

---

## 🛠️ Stack Completo

### Backend

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Java** | 21+ | Runtime |
| **Kotlin** | 2.1.x | Linguagem principal |
| **Spring Boot** | 3.4.5 | Framework web |
| **PostgreSQL** | 16 | Database |
| **Flyway** | 11.5 | Database migrations |
| **JUnit5 + MockK** | Latest | Testing framework |

### Frontend

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 20+ | Runtime |
| **TypeScript** | 5.3+ | Linguagem principal |
| **Next.js** | 14+ | Framework React |
| **Jest** | 29+ | Testing framework |
| **ESLint + Prettier** | Latest | Code quality |

### DevOps & Quality

| Tool | Propósito | Status |
|------|----------|--------|
| **GitHub Actions** | CI/CD automation | ✅ 7 workflows (ci.yml, docker-build.yml, security.yml, pr-flow.yml, manual-promote.yml) |
| **Docker** | Containerization | ✅ Backend + Frontend |
| **JaCoCo** | Code coverage | ✅ 50-70% enforced |
| **SpotBugs + PMD** | Bug detection | ✅ Enabled |
| **SonarQube** | Code analysis | ✅ Optional |
| **Gitleaks** | Secret scanning | ✅ Enabled |
| **OWASP Dep Check** | Dependency audit | ✅ Enabled |
| **Trivy** | Container scan | ✅ Enabled |
| **Dependabot** | Dependencies update | ✅ Enabled (weekly) |

---

## 🚀 Início Rápido

### 1. **Clone & Setup**

```bash
git clone https://github.com/seu-user/gal-atelier-os.git
cd gal-atelier-os
```

### 2. **Backend (Kotlin + Spring Boot)**

```bash
cd backend

# Install & verify
mvn clean verify

# Run locally
mvn spring-boot:run

# Tests with coverage
mvn clean test jacoco:report
open target/site/jacoco/index.html

# Full quality checks
mvn clean verify  # lint + test + coverage + SpotBugs + PMD
```

### 3. **Frontend (TypeScript + Next.js)**

```bash
cd frontend

# Install dependencies
npm ci

# Development server
npm run dev
# → http://localhost:3000

# Tests with coverage
npm run test:ci
open coverage/index.html

# Build for production
npm run build

# Full quality checks
npm run lint && npm run test:ci && npm run format:check
```

### 4. **Docker Compose (Recomendado)**

```bash
# From project root
docker-compose up -d

# Check status
docker-compose ps

# Logs
docker-compose logs -f backend frontend

# Stop
docker-compose down
```

---

## 📍 URLs & Endpoints

### Development

```
Frontend:     http://localhost:3000
Backend API:  http://localhost:8080
API Health:   http://localhost:8080/api/health
API Docs:     http://localhost:8080/swagger-ui.html
```

### Environments

```
DEV       → Continuous development (branch: dev)
HOMOLOG   → Staging/QA (branch: homolog)
PRODUCTION→ Live (branch: main)
```

---

## 🧪 Testes & Qualidade

### Rodar Localmente (Antes de Commitar)

```bash
# Backend
cd backend
mvn clean verify  # Lint + Tests + Coverage + Quality

# Frontend
cd frontend
npm run test:ci && npm run lint

# Ambos
cd ..
mvn -f backend clean verify
npm --prefix frontend run test:ci && npm --prefix frontend run lint
```

### Quality Gates por Ambiente

| Ambiente | Build | Tests | Lint | Coverage | Security |
|----------|-------|-------|------|----------|----------|
| **DEV** | ✅ | ✅ | ✅ | - | - |
| **HOMOLOG** | ✅ | ✅ | ✅ | **≥ 50%** | ✅ |
| **PRODUCTION** | ✅ | ✅ | ✅ | **≥ 70%** | ✅✅ |

### Tools

**Backend:**
- ✅ JaCoCo — Code coverage reporting
- ✅ SpotBugs — Automatic bug detection
- ✅ PMD — Code smell detection
- ✅ Spotless — Code formatting

**Frontend:**
- ✅ Jest — Unit testing
- ✅ Testing Library — Component testing
- ✅ ESLint — Linting
- ✅ Prettier — Formatting

**Ambos:**
- ✅ SonarQube — Comprehensive analysis (com token)
- ✅ Codecov — Coverage tracking
- ✅ Gitleaks — Secret scanning
- ✅ OWASP Dependency Check — Vulnerability audit
- ✅ Trivy — Container scanning

**Coverage Reports:**
- Backend: `backend/target/site/jacoco/index.html`
- Frontend: `frontend/coverage/index.html`

---

## 🔄 CI/CD & Automação

### GitHub Actions Workflows

```
📋 .github/workflows/
├── ci-dev.yml              ← Development (lint + test + build)
├── ci-homolog.yml          ← Staging (+ coverage 50% + deploy)
├── ci-prod.yml             ← Production (+ coverage 70% + release)
├── tests-quality.yml       ← Full test suite + SonarQube
├── docker.yml              ← Docker build & push
└── validation.yml          ← Health checks (6h schedule)
```

### Fluxo Automático

```
Feature Branch
  ↓ (push)
ci-dev.yml runs
  ├─ Lint (ESLint, Spotless, Prettier)
  ├─ Unit Tests + Coverage
  ├─ Docker Build
  └─ Test Results
  ↓ (PR + merge)
dev merged
  ↓
Create release
  ↓ (merge homolog)
ci-homolog.yml runs
  ├─ All dev checks
  ├─ Coverage >= 50% enforced
  ├─ Security scan
  ├─ Deploy to HOMOLOG
  └─ Slack notification
  ↓
Promote to production
  ↓ (merge main + tag)
ci-prod.yml runs
  ├─ All homolog checks
  ├─ Coverage >= 70% enforced
  ├─ SpotBugs + PMD + SonarQube
  ├─ OWASP + Trivy scan
  ├─ Create GitHub Release
  ├─ Deploy to PRODUCTION
  └─ Slack + Email notification
```

**Monitor da Esteira:**
```bash
# List runs
gh run list

# Watch specific run
gh run watch <RUN_ID>

# View logs
gh run view <RUN_ID> --log
```

---

## 📂 Estrutura do Projeto

```
gal-atelier-os/
├── backend/                          # Spring Boot (Kotlin)
│  ├── src/main/kotlin/com/galatelier/
│  │  ├── controller/                # REST controllers
│  │  ├── service/                   # Business logic (use cases)
│  │  ├── repository/                # Data access (adapters)
│  │  ├── domain/                    # Business entities
│  │  └── config/                    # Configuration
│  ├── src/test/kotlin/              # Unit & integration tests
│  └── pom.xml                       # Maven config (JaCoCo, SpotBugs, PMD)
│
├── frontend/                         # Next.js (TypeScript)
│  ├── app/                          # Page routes
│  ├── components/                   # React components
│  ├── __tests__/                    # Jest unit tests
│  ├── jest.config.js                # Jest configuration
│  ├── jest.setup.js                 # Jest setup
│  ├── .prettierrc                   # Prettier config
│  └── package.json                  # npm dependencies + scripts
│
├── .github/
│  ├── workflows/                    # GitHub Actions (6 workflows)
│  ├── WORKFLOWS.md                  # Workflow documentation
│  └── SECRETS.md                    # Secret configuration guide
│
├── docs/                            # Documentation
│  ├── ARCHITECTURE.md               # System design
│  ├── DESIGN-SYSTEM.md              # UI/UX principles
│  ├── SUPER-ROADMAP-V6.md           # Product roadmap
│  └── API-CONTRACT.md               # API specification
│
├── docker-compose.yml               # Local development stack
├── QUALITY-GATES.md                 # Testing & coverage guide
├── TESTES-QUALIDADE-ESTEIRA.md      # Test execution guide
├── BRANCH-STRATEGY.md               # Git branching strategy
├── CI-CD-QUICKSTART.md              # Quick start guide
└── README.md                        # This file
```

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| **🚀-CI-CD-START-HERE.md** | Quick visual guide (Portuguese) |
| **CI-CD-QUICKSTART.md** | 5-minute setup |
| **QUALITY-GATES.md** | Complete testing & coverage guide |
| **TESTES-QUALIDADE-ESTEIRA.md** | Test execution & tools |
| **BRANCH-STRATEGY.md** | Git Flow & branching |
| **.github/WORKFLOWS.md** | GitHub Actions details |
| **.github/SECRETS.md** | Secret configuration |
| **docs/ARCHITECTURE.md** | System architecture (hexagonal) |
| **docs/DESIGN-SYSTEM.md** | V6 Editorial Atelier design |
| **docs/API-CONTRACT.md** | API specification |

---

## 🔐 Security & Best Practices

✅ **Secrets Management**
- Never commit `.env`, `.env.local`, or `.env.production`
- Use GitHub Secrets for all sensitive data
- Gitleaks scans every push to main

✅ **Code Quality**
- SpotBugs detects bugs automatically
- PMD checks for code smells
- ESLint enforces code style
- Prettier auto-formats code

✅ **Testing**
- JUnit5 + MockK for backend
- Jest + Testing Library for frontend
- 50% minimum coverage (homolog)
- 70% minimum coverage (production)

✅ **Dependency Security**
- OWASP Dependency Check on every build
- npm audit for frontend packages
- Maven dependency convergence rules
- Trivy scans container images

---

## 🎯 Ambientes & Deploy

### Development (`dev` branch)

```bash
git checkout dev
git checkout -b feature/sua-feature
# ... code ...
git push origin feature/sua-feature
# → ci-dev.yml roda automaticamente
```

### Staging (`homolog` branch)

```bash
git checkout homolog
git merge dev
git push origin homolog
# → ci-homolog.yml roda + deploy automático
```

### Production (`main` branch)

```bash
git checkout main
git merge homolog
git tag v1.0.0
git push origin main --tags
# → ci-prod.yml roda + GitHub Release + deploy
```

---

## 📊 Logs & Observabilidade

### Logs Locais

```
K:\dev\logs\                    # Application logs
K:\dev\logs\archive\            # Archived logs
backend/target/logs/            # Backend logs
```

### Observabilidade

Backend expõe:
- `GET /api/health` — Health check
- `GET /actuator/metrics` — Metrics
- Structured logging com traceId
- Request correlation

Frontend:
- Console logging (dev)
- Error tracking (optional)
- Performance monitoring (optional)

---

## 🐛 Troubleshooting

### "Tests failed locally"

```bash
# Backend
cd backend
mvn clean test -DskipITs

# Frontend
cd frontend
npm run test -- --watchAll=false

# Check Java/Node versions
java -version
node -version
```

### "Build fails: Port already in use"

```bash
# Kill process on port 8080
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use Docker to avoid port conflicts
docker-compose up
```

### "Coverage too low"

```bash
# View coverage report
mvn -f backend jacoco:report
open backend/target/site/jacoco/index.html

npm --prefix frontend run test:ci
open frontend/coverage/index.html
```

### "GitHub Actions secret not found"

```bash
# Verify secrets configured
gh secret list

# Add missing secret
gh secret set SECRET_NAME --body "value"

# See: .github/SECRETS.md
```

---

## 🤝 Desenvolvimento Local

### Recomendado: Docker Compose

```bash
docker-compose up -d

# Verify
docker-compose ps

# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Access
curl http://localhost:8080/api/health
open http://localhost:3000
```

### Alternativa: Local Maven + npm

```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Database (Docker)
docker run --name postgres -e POSTGRES_PASSWORD=galatelier123 \
  -e POSTGRES_DB=galatelier -p 5432:5432 postgres:16-alpine
```

---

## 📈 Métricas & Performance

**Coverage Targets:**
- Backend: 70% (production enforced)
- Frontend: 50% (production enforced)

**Build Time:**
- DEV: 10-15 minutes
- HOMOLOG: 15-20 minutes
- PRODUCTION: 20-30 minutes

**Deploy Time:**
- Docker pull + build: ~5 min
- Container start: ~2 min
- Health checks: ~1 min

---

## 🎓 PRD & Roadmap

- **PRD**: `docs/PRODUCT-PRD-VELOURA-BEAUTY-OS.md`
- **Roadmap**: `docs/SUPER-ROADMAP-V6.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Design System**: `docs/DESIGN-SYSTEM.md`

---

## 👥 Team & Responsibility

| Role | Responsibility |
|------|-----------------|
| **Frontend (Vênus)** | UI/UX, Components, Tests |
| **Backend (Hermes)** | APIs, Business Logic, DB |
| **DevOps** | CI/CD, Deployment, Monitoring |
| **QA** | Testing, Quality Gates |

---

## 📝 Commit Convention

```bash
# Feature
git commit -m "feat(frontend): implement hero layout (US-11)"

# Bug fix
git commit -m "fix(backend): correct payment calculation"

# Refactor
git commit -m "refactor(backend): extract service"

# Tests
git commit -m "test(frontend): add Header tests"

# Docs
git commit -m "docs: update README"

# Chore
git commit -m "chore: bump dependencies"
```

---

## 📞 Support & Resources

- 📖 Full docs: See `docs/` directory
- 🚀 Quick start: `CI-CD-QUICKSTART.md`
- 🎯 Quality gates: `QUALITY-GATES.md`
- 🔑 Secrets setup: `.github/SECRETS.md`
- 🌳 Git strategy: `BRANCH-STRATEGY.md`

---

## 📋 Status

```
✅ Backend:         Production Ready (Kotlin + Spring Boot 3.4)
✅ Frontend:        Production Ready (Next.js 14 + TypeScript)
✅ CI/CD:           6 GitHub Actions workflows configured
✅ Testing:         JaCoCo + Jest + SpotBugs + PMD
✅ Security:        Gitleaks + OWASP + Trivy enabled
✅ Documentation:   Comprehensive guides
✅ Docker:          Docker Compose ready
✅ Design System:   V6 Editorial Atelier applied
🚀 PRODUCTION READY
```

---

## 📜 Licença

Projeto privado © 2026 Gal Atelier

---

**Última Atualização**: 2026-04-28
**Versão**: v6.0.0-editorial-atelier
**Status**: ✅ Production Ready
