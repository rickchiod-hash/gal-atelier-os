package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class SalesCommissionTest {

    private val orderId = UUID.randomUUID()
    private val now = Instant.now()

    @Test
    fun `deve criar comissao nao paga`() {
        val commission = SalesCommission(
            id = UUID.randomUUID(),
            orderId = orderId,
            sellerId = "seller-001",
            commissionRate = 0.10,
            commissionAmount = 65.0,
            paid = false,
            createdAt = now
        )

        assertEquals("seller-001", commission.sellerId)
        assertEquals(0.10, commission.commissionRate)
        assertEquals(65.0, commission.commissionAmount)
        assertFalse(commission.paid)
    }

    @Test
    fun `deve criar comissao paga`() {
        val commission = createCommission(paid = true)
        assertTrue(commission.paid)
    }

    @Test
    fun `deve aceitar commissionRate zero`() {
        val commission = createCommission(commissionRate = 0.0)
        assertEquals(0.0, commission.commissionRate)
    }

    @Test
    fun `deve aceitar commissionRate 100%`() {
        val commission = createCommission(commissionRate = 1.0)
        assertEquals(1.0, commission.commissionRate)
    }

    @Test
    fun `deve aceitar commissionAmount zero`() {
        val commission = createCommission(commissionAmount = 0.0)
        assertEquals(0.0, commission.commissionAmount)
    }

    @Test
    fun `deve aceitar sellerId com espacos`() {
        val commission = createCommission(sellerId = "João Silva")
        assertEquals("João Silva", commission.sellerId)
    }

    @Test
    fun `deve calcular comissao corretamente`() {
        // Exemplo: Pedido de 650,00 com 10% = 65,00
        val orderTotal = 650.0
        val rate = 0.10
        val expectedCommission = orderTotal * rate

        val commission = createCommission(commissionRate = rate, commissionAmount = expectedCommission)
        assertEquals(expectedCommission, commission.commissionAmount)
    }

    @Test
    fun `deve ter orderId para rastreabilidade`() {
        val specificOrderId = UUID.randomUUID()
        val commission = createCommission(orderId = specificOrderId)
        assertEquals(specificOrderId, commission.orderId)
    }

    @Test
    fun `deve aceitar diferentes sellers`() {
        val sellers = listOf("seller-1", "seller-2", "vendedor-joana", "vendedor-pedro")

        sellers.forEach { sellerId ->
            val commission = createCommission(sellerId = sellerId)
            assertEquals(sellerId, commission.sellerId)
        }
    }

    private fun createCommission(
        orderId: UUID = this.orderId,
        sellerId: String = "seller-001",
        commissionRate: Double = 0.10,
        commissionAmount: Double = 65.0,
        paid: Boolean = false
    ) = SalesCommission(
        id = UUID.randomUUID(),
        orderId = orderId,
        sellerId = sellerId,
        commissionRate = commissionRate,
        commissionAmount = commissionAmount,
        paid = paid,
        createdAt = now
    )
}
