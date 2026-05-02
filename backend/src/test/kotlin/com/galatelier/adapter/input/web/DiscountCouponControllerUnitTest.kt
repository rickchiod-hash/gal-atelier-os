package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.DiscountCouponEntity
import com.galatelier.adapter.output.persistence.repository.DiscountCouponRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.time.Instant

class DiscountCouponControllerUnitTest {
    private val repository: DiscountCouponRepository = mock()
    private val controller = DiscountCouponController(repository)

    @Test
    fun `listActive should map active coupons`() {
        whenever(repository.findByActiveTrue()).thenReturn(
            listOf(DiscountCouponEntity(code = "VIP10", discountPercent = 10.0, validUntil = Instant.now(), maxUses = 10, active = true))
        )

        val result = controller.listActive()

        assertEquals(1, result.size)
        assertEquals("VIP10", result.first().code)
    }
}
