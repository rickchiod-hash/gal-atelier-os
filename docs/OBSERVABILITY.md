# Observability

## Logs

- `TraceIdFilter` injeta `X-Trace-Id`.
- Logs do backend incluem traceId no pattern.
- Use case registra criação de orçamento com id, cliente, recomendado e sinal.

## Health

- `/api/health`
- `/actuator/health`
- `/actuator/metrics`

## Frontend Observability (V6)

- Não usar skeleton loaders (usar texto elegante: "Carregando experiência...").
- Estados de erro com tipografia clara, não alertas coloridas gritantes.
- Toast notifications: suaves, backdrop blur, posicionamento fixo inferior direito.
- Transições de página: crossfade simples (400ms), sem slides ou bounces.
