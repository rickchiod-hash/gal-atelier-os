package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "reviews")
data class ReviewEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(name = "order_id", nullable = false)
    var orderId: UUID,

    @Column(name = "customer_id", nullable = false)
    var customerId: UUID,

    @Column(nullable = false)
    var rating: Int,

    @Column(length = 1000)
    var comment: String?,

    @Column(name = "photo_url")
    var photoUrl: String?,

    @Column(name = "before_photo_url")
    var beforePhotoUrl: String?,

    @Column(name = "after_photo_url")
    var afterPhotoUrl: String?,

    var approved: Boolean = false,

    @Column(name = "created_at")
    var createdAt: Instant = Instant.now()
)
