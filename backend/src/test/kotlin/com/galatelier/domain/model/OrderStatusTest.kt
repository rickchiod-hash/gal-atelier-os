package com.galatelier.domain.model

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class OrderStatusTest {

    @Test
    fun `deve conter 9 status`() {
        val statuses = OrderStatus.values()
        assertEquals(9, statuses.size)
    }

    @Test
    fun `deve ter LEAD como primeiro status`() {
        assertEquals(OrderStatus.LEAD, OrderStatus.valueOf("LEAD"))
    }

    @Test
    fun `deve ter LOST como último status`() {
        val statuses = OrderStatus.values()
        assertEquals(OrderStatus.LOST, statuses.last())
    }

    @Test
    fun `deve validar todos os status`() {
        val expectedStatuses = listOf(
            "LEAD",
            "BRIEFING",
            "QUOTED",
            "WAITING_PIX",
            "PAID",
            "PRODUCTION",
            "READY",
            "DELIVERED",
            "LOST"
        )

        expectedStatuses.forEach { statusName ->
            // Não deve lançar exceção
            val status = OrderStatus.valueOf(statusName)
            assertEquals(statusName, status.name)
        }
    }

    @Test
    fun `deve iterar sobre status para pipeline`() {
        val pipelineOrder = listOf(
            OrderStatus.LEAD,
            OrderStatus.BRIEFING,
            OrderStatus.QUOTED,
            OrderStatus.WAITING_PIX,
            OrderStatus.PAID,
            OrderStatus.PRODUCTION,
            OrderStatus.READY,
            OrderStatus.DELIVERED
        )

        // Simula progressão de um pedido
        var currentStatus = OrderStatus.LEAD
        pipelineOrder.forEach { nextStatus ->
            assertTrue(currentStatus.ordinal <= nextStatus.ordinal)
            currentStatus = nextStatus
        }
    }
}
