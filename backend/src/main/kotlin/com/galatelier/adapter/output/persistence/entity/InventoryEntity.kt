package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "inventory")
data class InventoryEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true)
    var sku: String,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false)
    var category: String,

    @Column(name = "base_price", precision = 12, scale = 2, nullable = false)
    var basePrice: BigDecimal,

    var stock: Int = 0,

    @Column(name = "min_stock")
    var minStock: Int = 5,

    var location: String? = null,

    var supplier: String? = null,

    @Column(name = "last_restocked")
    var lastRestocked: LocalDate = LocalDate.now(),

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)