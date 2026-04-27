package com.galatelier.adapter.output.persistence.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "whatsapp_templates")
data class WhatsAppTemplateEntity(
    @Id
    var id: UUID = UUID.randomUUID(),

    @Column(nullable = false, unique = true)
    var templateId: String,

    @Column(nullable = false)
    var name: String,

    @Column(columnDefinition = "text", nullable = false)
    var content: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var templateType: TemplateType,

    @Column(nullable = false)
    var active: Boolean = true,

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at")
    var updatedAt: LocalDateTime = LocalDateTime.now()
)
