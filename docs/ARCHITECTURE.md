# Arquitetura

## Hexagonal

Fluxo de dependência unidirecional, domínio isolado de frameworks externos.

```text
adapter.input.web (Controllers, Auth)
↓
application.port.input (Use Case Interfaces)
↓
application.service (Use Case Implementations, Policies)
↓
domain.model (Entities, Value Objects)
↓
application.port.output (Repository/Integration Interfaces)
↓
adapter.output (Persistence, WhatsApp, Pix, Email)
```

### Pacotes Reais (com.galatelier)

| Camada | Pacote | Exemplos |
|--------|--------|----------|
| Input Adapters | `adapter.input.web` | `CustomerController`, `AuthController`, `JwtService` |
| Input Ports | `application.port.input` | `CustomerUseCase`, `CreateQuoteUseCase`, `ListQuotesUseCase` |
| Application Services | `application.service` | `CustomerApplicationService`, `QuoteApplicationService`, `QuotePricingPolicy` |
| Domain Model | `domain.model` | `Client`, `Quote`, `Money`, `WigBriefing`, `OrderStatus` |
| Domain Policy | `domain.policy` | `QuotePricingPolicy` |
| Output Ports | `application.port.output` | `CustomerRepositoryPort`, `PixPaymentPort`, `WhatsAppMessagePort` |
| Output Adapters | `adapter.output` | `CustomerRepositoryAdapter`, `StaticPixPaymentAdapter`, `WhatsAppWebAdapter`, `MockEmailAdapter` |
| Config | `config` | `SecurityConfig`, `BeanConfiguration` |

## Regras

- Domain (`domain.*`) não importa Spring ou qualquer framework externo.
- Controllers (`adapter.input.web`) apenas traduzem HTTP: validam input, mapeiam para use case, retornam HTTP response.
- Use cases (`application.service`) orquestram lógica de negócio, dependem apenas de input/output ports.
- Policies (`domain.policy` / `application.service`) calculam regras financeiras complexas.
- Adapters (`adapter.output`) implementam ports de saída: integram com banco de dados, APIs externas (Pix, WhatsApp), email.
- Configuração (`config`) define beans Spring, segurança, propriedades.

## Documentação API

- **Swagger UI**: `/swagger-ui.html` (disponível em dev/homolog)
- **OpenAPI Schema**: `/api-docs` (formato JSON)
- Configuração em `config/OpenApiConfig.kt`

## Branch Strategy

```
feature/** → dev → homolog → main
```

- **feature/***: novas funcionalidades
- **dev**: desenvolvimento (auto-merge enabled)
- **homolog**: homologação (PR requerido)
- **main**: produção (PR + revisão obrigatória)
