package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.CampaignEntity
import com.galatelier.adapter.output.persistence.entity.CampaignStatus
import com.galatelier.adapter.output.persistence.repository.CampaignRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/campaigns")
class CampaignController(
    private val campaignRepository: CampaignRepository
) {

    @GetMapping
    fun list(): List<CampaignResponse> = campaignRepository.findAll()
        .sortedByDescending { it.createdAt }
        .map { it.toResponse() }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): CampaignResponse? =
        campaignRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    @PostMapping
    fun create(@RequestBody request: CreateCampaignRequest): CampaignResponse {
        val campaign = CampaignEntity(
            name = request.name,
            description = request.description,
            discountPercent = request.discountPercent,
            discountValue = request.discountValue.toBigDecimal(),
            validUntil = request.validUntil?.let { LocalDate.parse(it) },
            targetAudience = request.targetAudience
        )
        return campaignRepository.save(campaign).toResponse()
    }

    @PatchMapping("/{id}")
    fun update(@PathVariable id: String, @RequestBody request: UpdateCampaignRequest): CampaignResponse? {
        val existing = campaignRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            name = request.name ?: existing.name,
            description = request.description ?: existing.description,
            discountPercent = request.discountPercent ?: existing.discountPercent,
            discountValue = request.discountValue?.toBigDecimal() ?: existing.discountValue,
            validUntil = request.validUntil?.let { LocalDate.parse(it) } ?: existing.validUntil,
            status = request.status?.let { CampaignStatus.valueOf(it) } ?: existing.status,
            targetAudience = request.targetAudience ?: existing.targetAudience,
            updatedAt = LocalDateTime.now()
        )
        return campaignRepository.save(updated).toResponse()
    }
}

fun CampaignEntity.toResponse() = CampaignResponse(
    id = id.toString(),
    name = name,
    description = description ?: "",
    discountPercent = discountPercent,
    discountValue = discountValue.toDouble(),
    validUntil = validUntil?.toString() ?: "",
    status = status,
    targetAudience = targetAudience,
    sendCount = sendCount,
    clickCount = clickCount,
    createdAt = createdAt.toLocalDate().toString(),
    updatedAt = updatedAt.toLocalDate().toString()
)

data class CampaignResponse(
    val id: String,
    val name: String,
    val description: String,
    val discountPercent: Int,
    val discountValue: Double,
    val validUntil: String,
    val status: CampaignStatus,
    val targetAudience: String,
    val sendCount: Int,
    val clickCount: Int,
    val createdAt: String,
    val updatedAt: String
)

data class CreateCampaignRequest(
    val name: String,
    val description: String? = null,
    val discountPercent: Int = 0,
    val discountValue: Double = 0.0,
    val validUntil: String? = null,
    val targetAudience: String = "ALL"
)

data class UpdateCampaignRequest(
    val name: String? = null,
    val description: String? = null,
    val discountPercent: Int? = null,
    val discountValue: Double? = null,
    val validUntil: String? = null,
    val status: String? = null,
    val targetAudience: String? = null
)
