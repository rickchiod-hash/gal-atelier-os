package com.galatelier.adapter.input.web
import com.galatelier.adapter.output.persistence.entity.CampaignEntity
import com.galatelier.adapter.output.persistence.entity.CampaignStatus as EntityCampaignStatus
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
    @GetMapping("/active")
    fun active(): List<CampaignResponse> = campaignRepository.findAll()
        .filter { it.status == EntityCampaignStatus.ACTIVE }
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
            validUntil = request.validUntil?.let { LocalDate.parse(it) },
            status = EntityCampaignStatus.ACTIVE,
            targetAudience = request.targetAudience ?: "ALL"
        )
        return campaignRepository.save(campaign).toResponse()
    }
    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateCampaignStatusRequest): CampaignResponse? {
        val existing = campaignRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityCampaignStatus.valueOf(request.status),
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
    validUntil = validUntil?.toString() ?: "",
    status = status,
    targetAudience = targetAudience,
    sendCount = sendCount,
    clickCount = clickCount,
    createdAt = createdAt.toLocalDate().toString()
)
data class CampaignResponse(
    val id: String,
    val name: String,
    val description: String,
    val discountPercent: Int,
    val validUntil: String,
    val status: EntityCampaignStatus,
    val targetAudience: String,
    val sendCount: Int,
    val clickCount: Int,
    val createdAt: String
)
data class CreateCampaignRequest(
    val name: String,
    val description: String? = null,
    val discountPercent: Int = 0,
    val validUntil: String? = null,
    val targetAudience: String? = null
)
data class UpdateCampaignStatusRequest(
    val status: String
)