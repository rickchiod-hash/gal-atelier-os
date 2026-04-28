package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class SalesCommission(
    val id: UUID,
    val orderId: UUID,
    val sellerId: String,
    val commissionRate: Double, // ex: 0.10 (10%)
    val commissionAmount: Double,
    val paid: Boolean = false,
    val createdAt: Instant
)
