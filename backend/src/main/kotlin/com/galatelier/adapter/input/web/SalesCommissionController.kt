package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.SalesCommissionEntity
import com.galatelier.adapter.output.persistence.repository.SalesCommissionRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/commissions")
class SalesCommissionController(
    private val repository: SalesCommissionRepository
) {
    @GetMapping
    fun listAll(): List<SalesCommissionResponse> =
        repository.findAll().map { it.toResponse() }

    @GetMapping("/seller/{sellerId}")
    fun listBySeller(@PathVariable sellerId: String): List<SalesCommissionResponse> =
        repository.findBySellerId(sellerId).map { it.toResponse() }

    @GetMapping("/order/{orderId}")
    fun listByOrder(@PathVariable orderId: String): List<SalesCommissionResponse> =
        repository.findByOrderId(java.util.UUID.fromString(orderId)).map { it.toResponse() }

    @PostMapping
    fun create(@RequestBody request: CreateCommissionRequest): SalesCommissionResponse {
        val entity = SalesCommissionEntity(
            orderId = java.util.UUID.fromString(request.orderId),
            sellerId = request.sellerId,
            commissionRate = request.commissionRate,
            commissionAmount = request.commissionAmount
        )
        return repository.save(entity).toResponse()
    }

    @PatchMapping("/{id}/pay")
    fun markAsPaid(@PathVariable id: String): SalesCommissionResponse? {
        val existing = repository.findById(java.util.UUID.fromString(id))
        if (existing.isEmpty) return null
        val updated = existing.get().copy(paid = true)
        return repository.save(updated).toResponse()
    }
}

fun SalesCommissionEntity.toResponse() = SalesCommissionResponse(
    id = id.toString(),
    orderId = orderId.toString(),
    sellerId = sellerId,
    commissionRate = commissionRate,
    commissionAmount = commissionAmount,
    paid = paid,
    createdAt = createdAt.toString()
)

data class SalesCommissionResponse(
    val id: String,
    val orderId: String,
    val sellerId: String,
    val commissionRate: Double,
    val commissionAmount: Double,
    val paid: Boolean,
    val createdAt: String
)

data class CreateCommissionRequest(
    val orderId: String,
    val sellerId: String,
    val commissionRate: Double,
    val commissionAmount: Double
)
