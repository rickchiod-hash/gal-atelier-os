package com.galatelier.adapter.output.persistence

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import com.galatelier.application.port.output.OrderRepositoryPort
import com.galatelier.application.port.output.OrderSummary
import com.galatelier.domain.model.OrderStatus
import java.time.Instant
import java.util.UUID
import org.springframework.stereotype.Component
import java.time.ZoneOffset

@Component
class OrderRepositoryAdapter(
    private val orderRepository: OrderRepository
) : OrderRepositoryPort {

    override fun findAll(): List<OrderSummary> =
        orderRepository.findAll().map { it.toSummary() }

    private fun OrderEntity.toSummary() = OrderSummary(
        id = id,
        price = price,
        status = status.toDomain(),
        depositPaid = depositPaid,
        paymentStatus = paymentStatus,
        createdAt = createdAt.toInstant(ZoneOffset.UTC)
    )

    private fun com.galatelier.adapter.output.persistence.entity.OrderStatus.toDomain(): OrderStatus =
        when (this) {
            com.galatelier.adapter.output.persistence.entity.OrderStatus.LEAD -> OrderStatus.LEAD
            com.galatelier.adapter.output.persistence.entity.OrderStatus.BRIEFING -> OrderStatus.BRIEFING
            com.galatelier.adapter.output.persistence.entity.OrderStatus.QUOTED -> OrderStatus.QUOTED
            com.galatelier.adapter.output.persistence.entity.OrderStatus.WAITING_PIX -> OrderStatus.WAITING_PIX
            com.galatelier.adapter.output.persistence.entity.OrderStatus.PAID -> OrderStatus.PAID
            com.galatelier.adapter.output.persistence.entity.OrderStatus.PRODUCTION -> OrderStatus.PRODUCTION
            com.galatelier.adapter.output.persistence.entity.OrderStatus.READY -> OrderStatus.READY
            com.galatelier.adapter.output.persistence.entity.OrderStatus.DELIVERED -> OrderStatus.DELIVERED
            com.galatelier.adapter.output.persistence.entity.OrderStatus.LOST -> OrderStatus.LOST
        }
}
