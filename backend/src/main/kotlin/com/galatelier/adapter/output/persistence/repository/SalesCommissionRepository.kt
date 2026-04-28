package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.SalesCommissionEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface SalesCommissionRepository : JpaRepository<SalesCommissionEntity, UUID> {
    fun findByOrderId(orderId: UUID): List<SalesCommissionEntity>
    fun findBySellerId(sellerId: String): List<SalesCommissionEntity>
}
