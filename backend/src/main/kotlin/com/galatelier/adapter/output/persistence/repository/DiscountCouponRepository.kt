package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.DiscountCouponEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface DiscountCouponRepository : JpaRepository<DiscountCouponEntity, UUID> {
    fun findByCode(code: String): DiscountCouponEntity?
    fun findByActiveTrue(): List<DiscountCouponEntity>
}
