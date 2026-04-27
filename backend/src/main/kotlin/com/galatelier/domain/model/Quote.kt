package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class Quote(
    val id: UUID,
    val client: Client,
    val briefing: WigBriefing,
    val minimumPrice: Money,
    val recommendedPrice: Money,
    val premiumPrice: Money,
    val depositPrice: Money,
    val whatsappMessage: String,
    val whatsappLink: String,
    val pixCopyPaste: String,
    val status: OrderStatus,
    val createdAt: Instant
)
