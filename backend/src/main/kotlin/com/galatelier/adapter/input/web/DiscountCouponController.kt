package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.DiscountCouponEntity
import com.galatelier.adapter.output.persistence.repository.DiscountCouponRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/coupons")
class DiscountCouponController(
    private val repository: DiscountCouponRepository
) {
    @GetMapping
    fun listAll(): List<DiscountCouponResponse> =
        repository.findAll().map { it.toResponse() }

    @GetMapping("/active")
    fun listActive(): List<DiscountCouponResponse> =
        repository.findByActiveTrue().map { it.toResponse() }

    @GetMapping("/{code}")
    fun getByCode(@PathVariable code: String): DiscountCouponResponse? =
        repository.findByCode(code)?.toResponse()

    @PostMapping
    fun create(@RequestBody request: CreateCouponRequest): DiscountCouponResponse {
        val entity = DiscountCouponEntity(
            code = request.code,
            discountPercent = request.discountPercent,
            validUntil = request.validUntil,
            maxUses = request.maxUses
        )
        return repository.save(entity).toResponse()
    }

    @PatchMapping("/{id}/use")
    fun useCoupon(@PathVariable id: String): DiscountCouponResponse? {
        val existing = repository.findById(UUID.fromString(id))
        if (existing.isEmpty) return null
        val updated = existing.get().copy(usedCount = existing.get().usedCount + 1)
        return repository.save(updated).toResponse()
    }

    @PatchMapping("/{id}/deactivate")
    fun deactivate(@PathVariable id: String): DiscountCouponResponse? {
        val existing = repository.findById(UUID.fromString(id))
        if (existing.isEmpty) return null
        val updated = existing.get().copy(active = false)
        return repository.save(updated).toResponse()
    }
}

fun DiscountCouponEntity.toResponse() = DiscountCouponResponse(
    id = id.toString(),
    code = code,
    discountPercent = discountPercent,
    validUntil = validUntil.toString(),
    maxUses = maxUses,
    usedCount = usedCount,
    active = active
)

data class DiscountCouponResponse(
    val id: String,
    val code: String,
    val discountPercent: Double,
    val validUntil: String,
    val maxUses: Int,
    val usedCount: Int,
    val active: Boolean
)

data class CreateCouponRequest(
    val code: String,
    val discountPercent: Double,
    val validUntil: Instant,
    val maxUses: Int
)
