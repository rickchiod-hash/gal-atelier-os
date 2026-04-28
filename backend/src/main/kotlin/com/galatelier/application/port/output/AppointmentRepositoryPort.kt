package com.galatelier.application.port.output

import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

data class AppointmentSummary(
    val id: UUID,
    val status: String,
    val price: BigDecimal,
    val createdAt: Instant
)

interface AppointmentRepositoryPort {
    fun findAll(): List<AppointmentSummary>
}
