package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals

class QuoteTest {

    private val clientId = UUID.randomUUID()
    private val briefingId = UUID.randomUUID()
    private val now = Instant.now()

    private fun createClient() = Client(
        id = clientId,
        name = "Maria Silva",
        whatsapp = "5511999999999",
        createdAt = now
    )

    private fun createBriefing() = WigBriefing(
        id = briefingId,
        clientId = clientId,
        type = BriefingType.LACE_FRONT,
        color = "Castanho",
        lengthCm = 50,
        texture = "Ondulada",
        density = "180%",
        capSize = "M",
        deadlineDays = 15,
        notes = "Sem notas",
        createdAt = now
    )

    @Test
    fun `deve criar quote valido`() {
        val quote = Quote(
            id = UUID.randomUUID(),
            client = createClient(),
            briefing = createBriefing(),
            minimumPrice = Money.of("575.00"),
            recommendedPrice = Money.of("650.00"),
            premiumPrice = Money.of("877.50"),
            depositPrice = Money.of("227.50"),
            whatsappMessage = "Mensagem teste",
            whatsappLink = "https://wa.me/5511999999999",
            pixCopyPaste = "PIX-FAKE-650.00",
            status = OrderStatus.QUOTED,
            createdAt = now
        )

        assertEquals("650.00", quote.recommendedPrice.plain())
        assertEquals(OrderStatus.QUOTED, quote.status)
        assertEquals("Maria Silva", quote.client.name)
    }

    @Test
    fun `deve aceitar status LEAD`() {
        val quote = Quote(
            id = UUID.randomUUID(),
            client = createClient(),
            briefing = createBriefing(),
            minimumPrice = Money.of("100.00"),
            recommendedPrice = Money.of("150.00"),
            premiumPrice = Money.of("200.00"),
            depositPrice = Money.of("50.00"),
            whatsappMessage = "Msg",
            whatsappLink = "Link",
            pixCopyPaste = "PIX",
            status = OrderStatus.LEAD,
            createdAt = now
        )
        assertEquals(OrderStatus.LEAD, quote.status)
    }

    @Test
    fun `deve aceitar status PAID`() {
        val quote = Quote(
            id = UUID.randomUUID(),
            client = createClient(),
            briefing = createBriefing(),
            minimumPrice = Money.of("100.00"),
            recommendedPrice = Money.of("150.00"),
            premiumPrice = Money.of("200.00"),
            depositPrice = Money.of("50.00"),
            whatsappMessage = "Msg",
            whatsappLink = "Link",
            pixCopyPaste = "PIX",
            status = OrderStatus.PAID,
            createdAt = now
        )
        assertEquals(OrderStatus.PAID, quote.status)
    }

    @Test
    fun `deve aceitar todos status validos`() {
        val validStatuses = listOf(
            OrderStatus.LEAD,
            OrderStatus.BRIEFING,
            OrderStatus.QUOTED,
            OrderStatus.WAITING_PIX,
            OrderStatus.PAID,
            OrderStatus.PRODUCTION,
            OrderStatus.READY,
            OrderStatus.DELIVERED,
            OrderStatus.LOST
        )

        validStatuses.forEach { status ->
            val quote = Quote(
                id = UUID.randomUUID(),
                client = createClient(),
                briefing = createBriefing(),
                minimumPrice = Money.of("100.00"),
                recommendedPrice = Money.of("150.00"),
                premiumPrice = Money.of("200.00"),
                depositPrice = Money.of("50.00"),
                whatsappMessage = "Msg",
                whatsappLink = "Link",
                pixCopyPaste = "PIX",
                status = status,
                createdAt = now
            )
            assertEquals(status, quote.status)
        }
    }
}
