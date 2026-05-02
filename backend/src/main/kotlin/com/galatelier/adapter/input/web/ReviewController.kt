package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.repository.ReviewRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/reviews")
class ReviewController(
    private val repository: ReviewRepository
) {
    @GetMapping
    fun listAll(): List<ReviewResponse> =
        repository.findAll().map { it.toResponse() }

    @GetMapping("/approved")
    fun listApproved(): List<ReviewResponse> =
        repository.findByApprovedTrue().map { it.toResponse() }

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<ReviewResponse> =
        repository.findByCustomerId(java.util.UUID.fromString(customerId)).map { it.toResponse() }

    @PostMapping
    fun create(@RequestBody request: CreateReviewRequest): ReviewResponse {
        val entity = com.galatelier.adapter.output.persistence.entity.ReviewEntity(
            orderId = java.util.UUID.fromString(request.orderId),
            customerId = java.util.UUID.fromString(request.customerId),
            rating = request.rating,
            comment = request.comment,
            photoUrl = request.photoUrl,
            beforePhotoUrl = request.beforePhotoUrl,
            afterPhotoUrl = request.afterPhotoUrl
        )
        return repository.save(entity).toResponse()
    }

    @PatchMapping("/{id}/approve")
    fun approve(@PathVariable id: String): ReviewResponse? {
        val existing = repository.findById(java.util.UUID.fromString(id))
        if (existing.isEmpty) return null
        val updated = existing.get().copy(approved = true)
        return repository.save(updated).toResponse()
    }
}

fun com.galatelier.adapter.output.persistence.entity.ReviewEntity.toResponse() = ReviewResponse(
    id = id.toString(),
    orderId = orderId.toString(),
    customerId = customerId.toString(),
    rating = rating,
    comment = comment,
    photoUrl = photoUrl,
    beforePhotoUrl = beforePhotoUrl,
    afterPhotoUrl = afterPhotoUrl,
    approved = approved,
    createdAt = createdAt.toString()
)

data class ReviewResponse(
    val id: String,
    val orderId: String,
    val customerId: String,
    val rating: Int,
    val comment: String?,
    val photoUrl: String?,
    val beforePhotoUrl: String?,
    val afterPhotoUrl: String?,
    val approved: Boolean,
    val createdAt: String
)

data class CreateReviewRequest(
    val orderId: String,
    val customerId: String,
    val rating: Int,
    val comment: String?,
    val photoUrl: String?,
    val beforePhotoUrl: String?,
    val afterPhotoUrl: String?
)
