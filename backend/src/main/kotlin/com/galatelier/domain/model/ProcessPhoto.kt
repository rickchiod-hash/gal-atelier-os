package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class ProcessPhoto(
    val id: UUID,
    val orderId: UUID,
    val photoUrl: String,
    val description: String?,
    val uploadedAt: Instant
)
