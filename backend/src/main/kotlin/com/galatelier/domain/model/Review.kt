package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class Review(
    val id: UUID,
    val orderId: UUID,
    val customerId: UUID,
    val rating: Int, // 1-5
    val comment: String?,
    val photoUrl: String?,
    val beforePhotoUrl: String?,
    val afterPhotoUrl: String?,
    val approved: Boolean = false,
    val createdAt: Instant
)
