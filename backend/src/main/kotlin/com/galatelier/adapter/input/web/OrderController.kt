package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.entity.OrderStatus as EntityOrderStatus
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/orders")
class OrderController(
    private val orderRepository: OrderRepository
) {

    @GetMapping
    fun list(): List<OrderResponse> = orderRepository.findAll()
        .sortedByDescending { it.createdAt }
        .map { it.toResponse() }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): OrderResponse? = 
        orderRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<OrderResponse> =
        orderRepository.findAll()
            .filter { it.customerId.toString() == customerId }
            .sortedByDescending { it.createdAt }
            .map { it.toResponse() }

    @PostMapping
    fun create(@RequestBody request: CreateOrderRequest): OrderResponse {
        val order = OrderEntity(
            customerId = UUID.fromString(request.customerId),
            customerName = request.customerName,
            serviceType = request.serviceType,
            price = request.price.toBigDecimal(),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        return orderRepository.save(order).toResponse()
    }

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateOrderStatusRequest): OrderResponse? {
        val existing = orderRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityOrderStatus.valueOf(request.status),
            paymentStatus = request.paymentStatus ?: existing.paymentStatus,
            depositPaid = request.depositPaid?.toBigDecimal() ?: existing.depositPaid,
            updatedAt = LocalDateTime.now()
        )
        return orderRepository.save(updated).toResponse()
    }
}

fun OrderEntity.toResponse() = OrderResponse(
    id = id.toString(),
    customerId = customerId.toString(),
    customerName = customerName,
    serviceType = serviceType,
    price = price.toDouble(),
    status = status,
    depositPaid = depositPaid.toDouble(),
    paymentStatus = paymentStatus,
    timeline = emptyList(),
    createdAt = createdAt.toLocalDate().toString(),
    updatedAt = updatedAt.toLocalDate().toString()
)

data class OrderResponse(
    val id: String,
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val price: Double,
    val status: EntityOrderStatus,
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