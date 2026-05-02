package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.InventoryEntity
import com.galatelier.adapter.output.persistence.repository.InventoryRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.math.BigDecimal

class InventoryControllerUnitTest {
    private val repository: InventoryRepository = mock()
    private val controller = InventoryController(repository)

    @Test
    fun `lowStock should return only items below min stock`() {
        whenever(repository.findAll()).thenReturn(
            listOf(
                InventoryEntity(sku = "A1", name = "Item A", category = "lace", basePrice = BigDecimal.TEN, stock = 1, minStock = 2),
                InventoryEntity(sku = "B1", name = "Item B", category = "lace", basePrice = BigDecimal.TEN, stock = 5, minStock = 2)
            )
        )

        val result = controller.lowStock()

        assertEquals(1, result.size)
        assertEquals("A1", result.first().sku)
    }
}
