package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/production-orders")
class ProductionOrderController(
    private val orderRepository: OrderRepository
) {
    @GetMapping
    fun listInProduction(): List<OrderResponse> =
        orderRepository.findAll()
            .filter { it.status.name == "IN_PRODUCTION" || it.status.name == "PRODUCTION" }
            .map { it.toResponse() }

    @PatchMapping("/{id}/advance")
    fun advanceStage(@PathVariable id: String): OrderResponse? {
        val order = orderRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val newStatus = when (order.status) {
            OrderEntity.OrderStatus.IN_PRODUCTION -> OrderEntity.OrderStatus.READY
            OrderEntity.OrderStatus.LEAD -> OrderEntity.OrderStatus.IN_PRODUCTION
            else -> order.status
        }
        val updated = order.copy(status = newStatus, updatedAt = LocalDateTime.now())
        return orderRepository.save(updated).toResponse()
    }
}
