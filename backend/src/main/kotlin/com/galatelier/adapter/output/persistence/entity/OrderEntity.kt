package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "orders")
data class OrderEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    var customerId: UUID,

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

    @Column(columnDefinition = "text")
    var timeline: String = "[]",

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class OrderStatus {
    LEAD, BRIEFING, QUOTED, WAITING_PIX, PAID, PRODUCTION, READY, DELIVERED, LOST
}

fun OrderEntity.toResponse(): com.galatelier.adapter.input.web.OrderResponse = com.galatelier.adapter.input.web.OrderResponse(
    id = this.id,
    customerId = this.customerId,
    customerName = this.customerName,
    serviceType = this.serviceType,
    price = this.price,
    status = this.status.name,
    paymentStatus = this.paymentStatus,
    depositPaid = this.depositPaid,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt
)