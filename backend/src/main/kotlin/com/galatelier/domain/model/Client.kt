package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class Client(
    val id: UUID,
    val name: String,
    val whatsapp: String,
    val createdAt: Instant
) {
    init {
        require(name.isNotBlank()) { "Client name cannot be blank" }
        require(whatsapp.length in 12..13) { "WhatsApp must be normalized with Brazil country code" }
    }
}
