package com.galatelier.application.port.output

import com.galatelier.domain.model.OrderStatus
import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

data class OrderSummary(
    val id: UUID,
    val price: BigDecimal,
    val status: OrderStatus,
    val depositPaid: BigDecimal,
    val paymentStatus: String,
    val createdAt: Instant
)

interface OrderRepositoryPort {
    fun findAll(): List<OrderSummary>
}
