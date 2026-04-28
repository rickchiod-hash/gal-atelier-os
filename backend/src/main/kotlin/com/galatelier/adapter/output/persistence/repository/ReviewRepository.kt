package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.ReviewEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ReviewRepository : JpaRepository<ReviewEntity, UUID> {
    fun findByCustomerId(customerId: UUID): List<ReviewEntity>
    fun findByOrderId(orderId: UUID): ReviewEntity?
    fun findByApprovedTrue(): List<ReviewEntity>
}
