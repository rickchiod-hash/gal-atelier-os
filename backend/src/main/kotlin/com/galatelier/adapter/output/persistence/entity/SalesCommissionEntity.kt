package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "sales_commissions")
data class SalesCommissionEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(name = "order_id", nullable = false)
    var orderId: UUID,

    @Column(name = "seller_id", nullable = false)
    var sellerId: String,

    @Column(name = "commission_rate", nullable = false)
    var commissionRate: Double,

    @Column(name = "commission_amount", nullable = false)
    var commissionAmount: Double,

    @Column(name = "paid")
    var paid: Boolean = false,

    @Column(name = "created_at")
    var createdAt: Instant = Instant.now()
)
