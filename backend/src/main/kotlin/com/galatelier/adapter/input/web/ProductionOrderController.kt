package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.entity.OrderStatus
import com.galatelier.adapter.output.persistence.entity.toResponse
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/production-orders")
class ProductionOrderController(
    private val orderRepository: OrderRepository
) {
    @GetMapping
    fun listInProduction(): List<OrderResponse> =
        orderRepository.findAll()
            .filter { it.status == OrderStatus.PRODUCTION }
            .map { it.toResponse() }

    @PatchMapping("/{id}/advance")
    fun advanceStage(@PathVariable id: String): OrderResponse? {
        val order = orderRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val newStatus = when (order.status) {
            OrderStatus.PRODUCTION -> OrderStatus.READY
            OrderStatus.LEAD -> OrderStatus.PRODUCTION
            else -> order.status
        }
        val updated = order.copy(status = newStatus, updatedAt = LocalDateTime.now())
        return orderRepository.save(updated).toResponse()
    }
}
