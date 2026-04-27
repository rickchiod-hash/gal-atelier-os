package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID

data class WigBriefing(
    val id: UUID,
    val clientId: UUID,
    val type: BriefingType,
    val color: String,
    val lengthCm: Int,
    val texture: String,
    val density: String,
    val capSize: String?,
    val deadlineDays: Int,
    val notes: String?,
    val createdAt: Instant
) {
    init {
        require(color.isNotBlank()) { "Color cannot be blank" }
        require(texture.isNotBlank()) { "Texture cannot be blank" }
        require(density.isNotBlank()) { "Density cannot be blank" }
        require(lengthCm in 10..120) { "Length must be between 10 and 120 cm" }
        require(deadlineDays in 1..180) { "Deadline must be between 1 and 180 days" }
    }
}
