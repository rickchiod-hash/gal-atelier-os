# 🎯 Quality Gates & Best Practices — Gal Atelier OS

## ✅ Esteira de Testes & Qualidade

A esteira **roda TODOS** os testes e verificações de qualidade a cada push.

```
git push → GitHub Actions
├─ ✅ Lint (ESLint, Spotless, Prettier)
├─ ✅ Unit Tests (Backend + Frontend)
├─ ✅ Integration Tests (Backend)
├─ ✅ Code Coverage (JaCoCo + Jest)
├─ ✅ Code Quality (SonarQube, SpotBugs, PMD)
├─ ✅ Security Scan (gitleaks, OWASP, Trivy)
├─ ✅ Docker Build
└─ ✅ Deploy (se passou tudo)
```

## 📊 Tools & Configuração

### Backend (Java/Kotlin + Maven)

#### JaCoCo Code Coverage
```bash
# Local run
mvn clean test jacoco:report

# View report
open target/site/jacoco/index.html

# Quality gates
- DEV:     No minimum
- HOMOLOG: >= 50%
- PROD:    >= 70%
```

**Config**: `backend/pom.xml` (lines 158-177)
**Report**: Automatico via `ci-prod.yml`
**Upload**: Codecov (`.github/workflows/ci-prod.yml`)

#### SpotBugs (Bug Detection)
```bash
# Run locally
mvn spotbugs:check

# Find bugs automatically
```

**Config**: `backend/pom.xml` (lines 179-198)
**In CI**: `ci-prod.yml` - linha 73

#### PMD (Code Quality)
```bash
# Run locally
mvn pmd:check

# Check for code smells
```

**Config**: `backend/pom.xml` (lines 200-224)
**In CI**: `ci-prod.yml` - linha 73

#### Spotless (Code Formatting)
```bash
# Check formatting
mvn spotless:check

# Auto-fix formatting
mvn spotless:apply
```

**Config**: `backend/pom.xml` (lines 226-242)
**In CI**: `tests-quality.yml` - linha 197

#### Maven Enforcer
```bash
# Check versions & rules
mvn enforcer:enforce
```

**Config**: `backend/pom.xml` (lines 244-266)
**Rules**: Java 21+, Maven 3.8.0+

### Frontend (TypeScript + Next.js)

#### Jest Unit Tests
```bash
# Run tests once
npm test

# Watch mode (development)
npm run test:watch

# CI mode (coverage + exit)
npm run test:ci
```

**Config**: `frontend/jest.config.js`
**Setup**: `frontend/jest.setup.js`
**Minimum**: 50% coverage
**In CI**: `tests-quality.yml` - linha 123-133

#### ESLint
```bash
# Check code style
npm run lint

# Fix issues
npm run lint:fix
```

**Config**: `.eslintrc.json` (Next.js default)
**In CI**: `ci-dev.yml` - linha 89

#### Prettier (Formatting)
```bash
# Check formatting
npm run format:check

# Auto-format
npm run format
```

**Config**: `frontend/.prettierrc`
**Ignore**: `frontend/.prettierignore`
**In CI**: `tests-quality.yml` - linha 186

### Code Quality (All)

#### SonarQube Analysis
```bash
# Requires SONAR_TOKEN secret
# Runs in: tests-quality.yml

# View dashboard
https://sonarcloud.io/dashboard?id=seu-projeto-id
```

**Config**: `sonar-project.properties`
**In CI**: `tests-quality.yml` - linhas 135-163

#### Security Scanning

**Gitleaks** (Secret detection)
```bash
# Detects hardcoded secrets
# In CI: ci-prod.yml - linha 28-32
```

**OWASP Dependency Check**
```bash
# Backend dependency scanning
mvn org.owasp:dependency-check-maven:check

# In CI: ci-homolog.yml, ci-prod.yml
```

**Trivy** (Container scanning)
```bash
# Scans filesystem for vulnerabilities
# In CI: tests-quality.yml - linhas 199-220
```

**Npm Audit** (Frontend)
```bash
# Check dependencies
npm audit

# In CI: tests-quality.yml - linhas 235-237
```

---

## 🎯 Quality Gates por Ambiente

### DEV (branch: dev)

| Check | Minimum | Enforce | Status |
|-------|---------|---------|--------|
| Build | Pass | ✅ | Required |
| Lint | 0 warnings (ESLint) | ✅ | Required |
| Tests | All pass | ✅ | Required |
| Coverage | No minimum | ⚠️ | Informational |
| Security | No critical | ✅ | Informational |

**Tempo**: ~10 minutos

### HOMOLOG (branch: homolog)

| Check | Minimum | Enforce | Status |
|-------|---------|---------|--------|
| Build | Pass | ✅ | Required |
| Lint | 0 warnings | ✅ | Required |
| Tests | All pass | ✅ | Required |
| Coverage | >= 50% | ✅ | **Enforced** |
| Security | No critical | ✅ | Required |
| Code Quality | Pass SonarQube | ✅ | Informational |

**Tempo**: ~15-20 minutos

### PRODUCTION (branch: main)

| Check | Minimum | Enforce | Status |
|-------|---------|---------|--------|
| Build | Pass | ✅ | Required |
| Lint | 0 warnings | ✅ | Required |
| Tests | All pass (unit + integration) | ✅ | **Required** |
| Coverage | >= 70% | ✅ | **Enforced** |
| Security | No critical + OWASP | ✅ | **Required** |
| Code Quality | SpotBugs + PMD + SonarQube | ✅ | **Enforced** |
| Secrets | No hardcoded secrets (gitleaks) | ✅ | **Required** |

**Tempo**: ~20-30 minutos

---

## 🔍 Como Executar Localmente

### Backend — Todos os Checks

```bash
cd backend

# Lint + Tests + Coverage
mvn clean verify

# Only tests
mvn test

# Only coverage report
mvn jacoco:report
# View: target/site/jacoco/index.html

# Code quality checks
mvn spotbugs:check pmd:check

# Fix formatting
mvn spotless:apply
```

### Frontend — Todos os Checks

```bash
cd frontend

# Install dependencies first
npm ci

# Tests + Coverage
npm run test:ci

# Lint check
npm run lint

# Fix lint
npm run lint:fix

# Format check
npm run format:check

# Fix formatting
npm run format

# Verify build
npm run build
```

### Ambos

```bash
# From root
# Lint: Backend + Frontend
mvn -f backend spotless:check
npm --prefix frontend run format:check

# Tests: Backend + Frontend
mvn -f backend test
npm --prefix frontend run test

# Coverage report: Backend
mvn -f backend jacoco:report
open backend/target/site/jacoco/index.html

# Coverage report: Frontend
npm --prefix frontend run test
open frontend/coverage/index.html
```

---

## ✨ Best Practices Implementadas

### Código

- ✅ **Type Safety**: TypeScript + Kotlin
- ✅ **Linting**: ESLint + Spotless + Prettier
- ✅ **Testing**: Jest (Frontend) + JUnit5 (Backend)
- ✅ **Coverage**: >= 50% (homolog), >= 70% (prod)
- ✅ **Code Quality**: SonarQube + SpotBugs + PMD
- ✅ **Error Handling**: Centralized exception handlers
- ✅ **Logging**: Structured with traceId

### Security

- ✅ **Secret Scanning**: gitleaks
- ✅ **Dependency Audit**: OWASP + npm audit
- ✅ **Container Scan**: Trivy
- ✅ **Protected Branches**: Required PR + status checks
- ✅ **SSH Deploy**: No hardcoded passwords

### CI/CD

- ✅ **Automated Testing**: Every push
- ✅ **Automated Build**: Every push
- ✅ **Automated Deploy**: homolog + prod
- ✅ **Health Checks**: Post-deploy
- ✅ **Notifications**: Slack + Email

### Documentation

- ✅ **Code Comments**: Key business logic
- ✅ **API Docs**: Swagger (Backend)
- ✅ **Architecture**: ARCHITECTURE.md
- ✅ **Runbooks**: Deployment procedures
- ✅ **Engineering Standards**: THIS FILE

---

## 🚀 Workflow Completo

### 1. Clone & Setup

```bash
git clone ...
cd gal-atelier-os
```

### 2. Backend Development

```bash
cd backend

# Install & verify dependencies
mvn clean verify

# Run locally
mvn spring-boot:run

# Tests
mvn test

# Full quality check
mvn clean verify
```

### 3. Frontend Development

```bash
cd frontend

# Install
npm ci

# Dev server
npm run dev

# Lint + Format
npm run lint
npm run format

# Tests
npm test

# Build
npm run build
```

### 4. Commit & Push

```bash
git checkout -b feature/US-10-name

# Make changes...

# Verify locally (optional but recommended)
mvn -f backend clean verify
npm --prefix frontend run test:ci

# Commit
git commit -m "feat(frontend): new hero (US-10)"

# Push to trigger CI
git push origin feature/US-10-name
```

### 5. GitHub Actions Runs

```
Feature push
  ↓
  ci-dev.yml runs
  ├─ Lint
  ├─ Tests
  ├─ Docker build
  └─ Slack notification
  ↓
  Pull Request created
  ↓
  Status checks display
  ↓
  Code review & merge
  ↓
  dev merged
  ↓
  ci-dev.yml runs again
```

### 6. Release to Staging

```bash
git checkout homolog
git merge dev
git push origin homolog

# ci-homolog.yml runs
├─ All DEV checks
├─ Enforce coverage >= 50%
├─ Security scan
├─ Docker build
├─ Deploy to homolog
└─ Slack notification
```

### 7. Release to Production

```bash
git checkout main
git merge homolog
git tag v1.0.0
git push origin main --tags

# ci-prod.yml runs
├─ All checks
├─ Enforce coverage >= 70%
├─ OWASP dependency check
├─ Create GitHub release
├─ Deploy to production
└─ Slack + Email notifications
```

---

## 🐛 Troubleshooting

### "Tests failed locally but passed in CI"

1. Verify Java/Node versions: `java -version`, `node -version`
2. Clear cache: `mvn clean`, `npm ci`
3. Run full suite: `mvn verify`, `npm run test:ci`

### "Coverage is too low"

1. Check actual coverage: `mvn jacoco:report`
2. View report: `target/site/jacoco/index.html`
3. Add tests for uncovered code
4. Don't commit low-coverage code

### "Lint failed"

1. Auto-fix: `mvn spotless:apply`, `npm run lint:fix`
2. Check what changed: `git diff`
3. Commit fixes

### "SonarQube not running"

1. Check secret: `gh secret list | grep SONAR`
2. Add token if missing: `.github/SECRETS.md`
3. Or disable (optional): Mark job as `continue-on-error`

### "Build succeeded but tests failed"

Check CI logs: GitHub Actions > Workflows > Run
Run locally: `mvn test`, `npm test`

---

## 📚 References

- [Maven JaCoCo](https://www.eclemma.org/jacoco/trunk/doc/maven.html)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [SonarQube](https://docs.sonarcloud.io/)
- [GitHub Actions](https://docs.github.com/actions)

---

## 🏆 Success Criteria

- ✅ All tests pass locally
- ✅ No lint warnings
- ✅ Coverage >= threshold
- ✅ No security issues
- ✅ Code review approved
- ✅ CI/CD pipeline successful
- ✅ Deployed to target environment

---

**Last Updated**: 2026-04-28
**Status**: ✅ COMPLETE & ENFORCED
**Responsibility**: Development Team

