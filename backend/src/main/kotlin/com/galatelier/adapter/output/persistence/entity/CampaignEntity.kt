package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "campaigns")
data class CampaignEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(nullable = false)
    var name: String,

    @Column(columnDefinition = "text")
    var description: String? = null,

    var discountPercent: Int = 0,

    var discountValue: BigDecimal = BigDecimal.ZERO,

    @Column(name = "valid_until")
    var validUntil: LocalDate? = null,

    @Enumerated(EnumType.STRING)
    var status: CampaignStatus = CampaignStatus.DRAFT,

    var targetAudience: String = "ALL",

    var sendCount: Int = 0,

    var clickCount: Int = 0,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class CampaignStatus {
    DRAFT, SCHEDULED, ACTIVE, PAUSED, COMPLETED
}