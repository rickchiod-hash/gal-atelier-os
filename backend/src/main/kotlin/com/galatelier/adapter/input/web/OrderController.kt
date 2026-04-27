package com.galatelier.adapter.input.web

import com.galatelier.domain.model.OrderStatus as DomainOrderStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.UUID
import com.galatelier.domain.model.OrderStatus

@RestController
@RequestMapping("/api/orders")
class OrderController {

    private val orders = mutableListOf(
        OrderResponse(
            id = "1",
            customerId = "1",
            customerName = "Juliana Costa",
            serviceType = "Lace Front 13x4",
            price = 1800.0,
            status = OrderStatus.PRODUCTION,
            depositPaid = 900.0,
            paymentStatus = "DEPOSIT_PAID",
            timeline = listOf(
                TimelineEvent("2026-04-01", "Pedido criado"),
                TimelineEvent("2026-04-02", "Sinal recebido"),
                TimelineEvent("2026-04-05", "Em produção"),
                TimelineEvent("2026-04-10", "Pronto para entrega")
            ),
            createdAt = "2026-04-01",
            updatedAt = "2026-04-10"
        ),
        OrderResponse(
            id = "2",
            customerId = "2",
            customerName = "Patrícia Lima",
            serviceType = "Full Lace Premium",
            price = 3200.0,
            status = OrderStatus.LEAD,
            depositPaid = 0.0,
            paymentStatus = "PENDING",
            timeline = listOf(
                TimelineEvent("2026-04-20", "Briefing enviado"),
                TimelineEvent("2026-04-20", "Orçamento enviado")
            ),
            createdAt = "2026-04-20",
            updatedAt = "2026-04-20"
        ),
        OrderResponse(
            id = "3",
            customerId = "3",
            customerName = "Amanda Souza",
            serviceType = "Glueless Wig",
            price = 950.0,
            status = OrderStatus.DELIVERED,
            depositPaid = 950.0,
            paymentStatus = "FULL_PAID",
            timeline = listOf(
                TimelineEvent("2026-04-15", "Pedido criado"),
                TimelineEvent("2026-04-16", "Pagamento confirmado"),
                TimelineEvent("2026-04-20", "Em produção"),
                TimelineEvent("2026-04-25", "Entregue")
            ),
            createdAt = "2026-04-15",
            updatedAt = "2026-04-25"
        ),
        OrderResponse(
            id = "4",
            customerId = "5",
            customerName = "Beatriz Santos",
            serviceType = "Wig Customizada",
            price = 1600.0,
            status = OrderStatus.READY,
            depositPaid = 800.0,
            paymentStatus = "PARTIAL_PAID",
            timeline = listOf(
                TimelineEvent("2026-04-10", "Pedido criado"),
                TimelineEvent("2026-04-11", "Sinal recebido"),
                TimelineEvent("2026-04-15", "Em produção"),
                TimelineEvent("2026-04-22", "Pronto para entrega")
            ),
            createdAt = "2026-04-10",
            updatedAt = "2026-04-22"
        ),
        OrderResponse(
            id = "5",
            customerId = "2",
            customerName = "Patrícia Lima",
            serviceType = "360 Lace",
            price = 3800.0,
            status = OrderStatus.WAITING_PIX,
            depositPaid = 0.0,
            paymentStatus = "AWAITING",
            timeline = listOf(
                TimelineEvent("2026-04-18", "Orçamento enviado"),
                TimelineEvent("2026-04-18", "Aguardando Pix"),
                TimelineEvent("2026-04-19", "Lembrete enviado")
            ),
            createdAt = "2026-04-18",
            updatedAt = "2026-04-19"
        )
    )

    @GetMapping
    fun list(): List<OrderResponse> = orders.sortedByDescending { it.createdAt }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): OrderResponse? = orders.find { it.id == id }

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<OrderResponse> =
        orders.filter { it.customerId == customerId }.sortedByDescending { it.createdAt }

    @PostMapping
    fun create(@RequestBody request: CreateOrderRequest): OrderResponse {
        val order = OrderResponse(
            id = UUID.randomUUID().toString(),
            customerId = request.customerId,
            customerName = request.customerName,
            serviceType = request.serviceType,
            price = request.price,
            status = OrderStatus.LEAD,
            depositPaid = 0.0,
            paymentStatus = "PENDING",
            timeline = listOf(TimelineEvent(Instant.now().toString().take(10), "Pedido criado")),
            createdAt = Instant.now().toString().take(10),
            updatedAt = Instant.now().toString().take(10)
        )
        orders.add(0, order)
        return order
    }

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateOrderStatusRequest): OrderResponse? {
        val index = orders.indexOfFirst { it.id == id }
        if (index == -1) return null
        val current = orders[index]
        val today = Instant.now().toString().take(10)
        val newStatus = DomainOrderStatus.valueOf(request.status)
        val updated = current.copy(
            status = newStatus,
            paymentStatus = request.paymentStatus ?: current.paymentStatus,
            depositPaid = request.depositPaid ?: current.depositPaid,
            updatedAt = today,
            timeline = current.timeline + TimelineEvent(today, getStatusDescription(newStatus))
        )
        orders[index] = updated
        return updated
    }
}

data class OrderResponse(
    val id: String,
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val price: Double,
    val status: DomainOrderStatus,
    val depositPaid: Double,
    val paymentStatus: String,
    val timeline: List<TimelineEvent>,
    val createdAt: String,
    val updatedAt: String
)

data class TimelineEvent(
    val date: String,
    val description: String
)

data class CreateOrderRequest(
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val price: Double
)

data class UpdateOrderStatusRequest(
    val status: String,
    val depositPaid: Double? = null,
    val paymentStatus: String? = null
)

fun getStatusDescription(status: DomainOrderStatus): String = when (status) {
    DomainOrderStatus.LEAD -> "Novo lead"
    DomainOrderStatus.BRIEFING -> "Briefing enviado"
    DomainOrderStatus.QUOTED -> "Orçamento enviado"
    DomainOrderStatus.WAITING_PIX -> "Aguardando Pix"
    DomainOrderStatus.PAID -> "Pagamento confirmado"
    DomainOrderStatus.PRODUCTION -> "Em produção"
    DomainOrderStatus.READY -> "Pronto para entrega"
    DomainOrderStatus.DELIVERED -> "Entregue"
    DomainOrderStatus.LOST -> "Perdido"
}