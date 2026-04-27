# Arquitetura

## Hexagonal

```text
adapter.input.web
↓
application.port.input
↓
application.service
↓
domain
↓
application.port.output
↓
adapter.output
```

## Regra

- Domain não conhece Spring.
- Controller só traduz HTTP.
- Use case orquestra.
- Policy calcula.
- Adapters integram Pix/WhatsApp/Persistência.
