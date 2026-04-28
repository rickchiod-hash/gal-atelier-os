package com.galatelier.application.service

import com.galatelier.application.port.input.CreateQuoteCommand
import com.galatelier.application.port.output.PixPaymentPort
import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.application.port.output.WhatsAppMessageInput
import com.galatelier.application.port.output.WhatsAppMessagePort
import com.galatelier.domain.model.BriefingType
import com.galatelier.domain.model.Money
import com.galatelier.domain.model.Quote
import com.galatelier.domain.policy.QuotePricingPolicy
import java.math.BigDecimal
import java.time.Clock
import java.time.Instant
import java.time.ZoneOffset
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class QuoteApplicationServiceTest {
    @Test
    fun `cria orcamento com portas e adapters fake`() {
        val repo = FakeQuoteRepository()
        val service = QuoteApplicationService(
            quoteRepository = repo,
            pixPaymentPort = FakePixPaymentPort(),
            whatsAppMessagePort = FakeWhatsAppPort(),
            quotePricingPolicy = QuotePricingPolicy(),
            clock = Clock.fixed(Instant.parse("2026-01-01T00:00:00Z"), ZoneOffset.UTC)
        )

        val quote = service.create(
            CreateQuoteCommand(
                clientName = "Maria",
                clientWhatsapp = "11999999999",
                type = BriefingType.LACE_FRONT,
                color = "Castanho",
                lengthCm = 55,
                texture = "Ondulada",
                density = "180%",
                capSize = "M",
                deadlineDays = 15,
                materialCost = BigDecimal("150"),
                laborCost = BigDecimal("250"),
                complexityCost = BigDecimal("80"),
                urgencyCost = BigDecimal("20"),
                marginPercent = BigDecimal("30"),
                notes = null
            )
        )

        assertEquals("650.00", quote.recommendedPrice.plain())
        assertEquals("5511999999999", quote.client.whatsapp)
        assertTrue(quote.pixCopyPaste.startsWith("PIX-FAKE"))
        assertEquals(1, repo.findAll().size)
    }
}

private class FakeQuoteRepository : QuoteRepository {
    private val quotes = mutableListOf<Quote>()
    override fun save(quote: Quote): Quote {
        quotes.add(quote)
        return quote
    }
    override fun findAll(): List<Quote> = quotes
    override fun findById(id: UUID): Quote? = quotes.find { it.id == id }
    override fun update(quote: Quote): Quote = quote
}

private class FakePixPaymentPort : PixPaymentPort {
    override fun createCopyPaste(amount: Money, txId: String): String =
        "PIX-FAKE-${amount.plain()}-$txId"
}

private class FakeWhatsAppPort : WhatsAppMessagePort {
    override fun createMessage(input: WhatsAppMessageInput): String =
        "Mensagem ${input.clientName} ${input.recommendedPrice}"

    override fun createLink(message: String): String =
        "https://wa.me/5511914136961?text=fake"
}
