package com.galatelier.application.port.output

import java.util.UUID

interface CustomerRepositoryPort {
    fun findAll(): List<CustomerSummary>
}

data class CustomerSummary(
    val id: UUID
)
