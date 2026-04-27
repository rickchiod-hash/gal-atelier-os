# DATA MODEL ROADMAP — Veloura Beauty OS

## Modelo Atual (Fase 1)

### Cliente
```kotlin
data class Client(
    val id: UUID,
    val name: String,           // 2-80 chars
    val whatsapp: String,    // 5511... (12-13 digits)
    val createdAt: Instant
)
```

### WigBriefing
```kotlin
data class WigBriefing(
    val id: UUID,
    val clientId: UUID,
    val type: BriefingType,  // LACE_FRONT, FULL_LACE, etc.
    val color: String,       // 2-60 chars
    val lengthCm: Int,      // 10-120
    val texture: String,    // 2-60 chars
    val density: String,    // 2-60 chars
    val capSize: String?,   // 0-60 chars
    val deadlineDays: Int,  // 1-180
    val notes: String?,    // 0-300 chars
    val createdAt: Instant
)
```

### Quote
```kotlin
data class Quote(
    val id: UUID,
    val client: Client,
    val briefing: WigBriefing,
    val minimumPrice: Money,
    val recommendedPrice: Money,
    val premiumPrice: Money,
    val depositPrice: Money,
    val whatsappMessage: String,
    val whatsappLink: String,
    val pixCopyPaste: String,
    val status: OrderStatus,
    val createdAt: Instant
)
```

### Money (Value Object)
```kotlin
class Money(val value: BigDecimal) {
    // scale = 2
    // value >= 0
}
```

### BriefingType (Enum)
```kotlin
enum class BriefingType {
    LACE_FRONT,
    FULL_LACE,
    WIG_CUSTOM,
    MAINTENANCE,
    SHOE_CUSTOMIZATION
}
```

### OrderStatus (Enum)
```kotlin
enum class OrderStatus {
    LEAD,
    BRIEFING,
    QUOTED,
    WAITING_PIX,
    PAID,
    PRODUCTION,
    READY,
    DELIVERED,
    LOST
}
```

---

## Modelo Expansão (Fase 2)

### ClienteExpandido (novo)
```kotlin
data class Cliente(
    val id: UUID,
    val name: String,
    val whatsapp: String,
    val email: String?,
    val medidas: Medidas?,
    val preferencias: Preferencias?,
    val observacoes: String?,
    val createdAt: Instant,
    val updatedAt: Instant?
)
```

### Medidas (novo)
```kotlin
data class Medidas(
    val circunferenciaCm: Double,
    val testimCm: Double,
    val capSize: String,  // PP, P, M, G, GG
    val alturaOrelha: Double?,
    val profundidade: Double?
)
```

### Preferencias (novo)
```kotlin
data class Preferencias(
    val cor: String,
    val textura: String,
    val densidade: String,  // 100%, 130%, 150%, 180%
    val comprimento: String,
    val linhasPorPolegada: String
)
```

---

## Modelo Expansão (Fase 3)

### Pedido (novo)
```kotlin
data class Pedido(
    val id: UUID,
    val clienteId: UUID,
    val servico: BriefingType,
    val status: PedidoStatus,
    val valorTotal: Money,
    val sinalPago: Money?,
    val dataSinal: Instant?,
    val prazo: LocalDate,
    val briefing: WigBriefing,
    val historico: List<PedidoHistorico>,
    val createdAt: Instant
)
```

### PedidoStatus (novo)
```kotlin
enum class PedidoStatus {
    ORÇADO,
    APROVADO,
    ESPERA_SINAL,
    PAGAMENTO_CONFIRMADO,
    EM_PRODUÇÃO,
    PROVA_PRONTA,
    CONCLUÍDO,
    ENTREGUE,
    CANCELADO
}
```

### Estoque (novo)
```kotlin
data class Estoque(
    val id: UUID,
    val tipo: EstoqueTipo,  // TELA, CABELO, COLA, FITA, ACESSORIO
    val nome: String,
    val quantidade: Int,
    val unidade: String,  // metros, metros², unidades, gramas
    val fornecedor: String?,
    val custoUnitario: Money?,
    val createdAt: Instant
)
```

### Agenda (novo)
```kotlin
data class Agenda(
    val id: UUID,
    val clienteId: UUID,
    val pedidoId: UUID?,
    val tipo: AgendaTipo,  // INSTALACAO, PROVA, ENTREGA, MANUTENCAO
    val data: LocalDate,
    val hora: LocalTime,
    val duracaoMinutos: Int,
    val observacoes: String?,
    val status: AgendaStatus,  // AGENDADO, CONFIRMADO, CONCLUÍDO, CANCELADO
    val createdAt: Instant
)
```

---

## Relações

```
Cliente 1 ---- N Pedido
Cliente 1 ---- N Agenda
Pedido 1 ---- 1 Briefing
Pedido 1 ---- N PedidoHistorico
Estoque N ---- N Pedido (materiais)
```