package com.galatelier.adapter.input.web

import java.time.LocalDateTime
import java.util.UUID

data class OrderResponse(
    val id: UUID,
    val customerId: UUID,
    val customerName: String,
    val serviceType: String,
    val price: java.math.BigDecimal,
    val status: String,
    val paymentStatus: String,
    val depositPaid: java.math.BigDecimal,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime?
)
