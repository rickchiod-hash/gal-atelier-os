package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "orders")
class OrderEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(name = "customer_id")
    var customerId: UUID,

    @Column(name = "customer_name")
    var customerName: String = "",

    @Column(name = "service_type", nullable = false)
    var serviceType: String,

    @Column(precision = 12, scale = 2, nullable = false)
    var price: BigDecimal,

    @Enumerated(EnumType.STRING)
    var status: OrderStatus = OrderStatus.LEAD,

    @Column(name = "deposit_paid", precision = 12, scale = 2)
    var depositPaid: BigDecimal = BigDecimal.ZERO,

    @Column(name = "payment_status")
    var paymentStatus: String = "PENDING",

    @Column(columnDefinition = "jsonb")
    var timeline: String = "[]",

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class OrderStatus {
    LEAD, BRIEFING, QUOTED, WAITING_PIX, PAID, PRODUCTION, READY, DELIVERED, LOST
}