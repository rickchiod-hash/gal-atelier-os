package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "customers")
class CustomerEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, unique = true)
    var whatsapp: String,

    var email: String? = null,

    @Column(precision = 12, scale = 2)
    var totalSpent: BigDecimal = BigDecimal.ZERO,

    var ordersCount: Int = 0,

    var favoriteService: String? = null,

    var lastOrderDate: LocalDate? = null,

    @Enumerated(EnumType.STRING)
    var tier: CustomerTier = CustomerTier.NEW,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class CustomerTier {
    NEW, BRONZE, SILVER, GOLD, PLATINUM, VIP
}