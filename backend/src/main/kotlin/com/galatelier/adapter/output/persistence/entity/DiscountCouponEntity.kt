package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "discount_coupons")
data class DiscountCouponEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(name = "code", nullable = false, unique = true)
    var code: String,

    @Column(name = "discount_percent", nullable = false)
    var discountPercent: Double,

    @Column(name = "valid_until", nullable = false)
    var validUntil: Instant,

    @Column(name = "max_uses", nullable = false)
    var maxUses: Int,

    @Column(name = "used_count")
    var usedCount: Int = 0,

    @Column(name = "active")
    var active: Boolean = true
)
