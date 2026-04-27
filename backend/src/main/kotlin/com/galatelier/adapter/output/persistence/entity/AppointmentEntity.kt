package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "appointments")
data class AppointmentEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    var customerId: UUID,

    var customerName: String = "",

    @Column(name = "service_type", nullable = false)
    var serviceType: String,

    @Column(nullable = false)
    var date: LocalDate,

    @Column(nullable = false)
    var time: String,

    var duration: Int = 60,

    @Enumerated(EnumType.STRING)
    var status: AppointmentStatus = AppointmentStatus.SCHEDULED,

    var notes: String? = null,

    @Column(precision = 12, scale = 2)
    var price: BigDecimal = BigDecimal.ZERO,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class AppointmentStatus {
    SCHEDULED, COMPLETED, CANCELLED, NO_SHOW
}