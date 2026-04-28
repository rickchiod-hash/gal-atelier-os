package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class DiscountCoupon(
    val id: UUID,
    val code: String,
    val discountPercent: Double,
    val validUntil: Instant,
    val maxUses: Int,
    val usedCount: Int = 0,
    val active: Boolean = true
)
