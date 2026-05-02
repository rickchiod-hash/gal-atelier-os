package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.SalesCommissionEntity
import com.galatelier.adapter.output.persistence.repository.SalesCommissionRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.util.UUID

class SalesCommissionControllerUnitTest {
    private val repository: SalesCommissionRepository = mock()
    private val controller = SalesCommissionController(repository)

    @Test
    fun `listBySeller should map commissions`() {
        whenever(repository.findBySellerId("seller-1")).thenReturn(
            listOf(SalesCommissionEntity(orderId = UUID.randomUUID(), sellerId = "seller-1", commissionRate = 10.0, commissionAmount = 100.0))
        )

        val result = controller.listBySeller("seller-1")

        assertEquals(1, result.size)
        assertEquals("seller-1", result.first().sellerId)
    }
}
