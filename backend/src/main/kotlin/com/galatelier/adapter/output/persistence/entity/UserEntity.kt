package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(nullable = false)
    var passwordHash: String,

    @Column(nullable = false)
    var name: String,

    @Enumerated(EnumType.STRING)
    var role: UserRole = UserRole.CLIENT,

    @Column(name = "customer_id")
    var customerId: UUID? = null,

    @Column(name = "google_id")
    var googleId: String? = null,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)

enum class UserRole {
    ADMIN, STAFF, CLIENT
}