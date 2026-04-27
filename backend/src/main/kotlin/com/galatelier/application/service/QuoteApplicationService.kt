package com.galatelier.application.service

import com.galatelier.application.port.input.CreateQuoteCommand
import com.galatelier.application.port.input.CreateQuoteUseCase
import com.galatelier.application.port.input.ListQuotesUseCase
import com.galatelier.application.port.input.QuoteMetrics
import com.galatelier.application.port.output.PixPaymentPort
import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.application.port.output.WhatsAppMessageInput
import com.galatelier.application.port.output.WhatsAppMessagePort
import com.galatelier.domain.model.BriefingType
import com.galatelier.domain.model.Client
import com.galatelier.domain.model.Money
import com.galatelier.domain.model.OrderStatus
import com.galatelier.domain.model.Quote
import com.galatelier.domain.model.WigBriefing
import com.galatelier.domain.policy.QuotePricingInput
import com.galatelier.domain.policy.QuotePricingPolicy
import org.slf4j.LoggerFactory
import java.time.Clock
import java.time.Instant
import java.util.UUID

class QuoteApplicationService(
    private val quoteRepository: QuoteRepository,
    private val pixPaymentPort: PixPaymentPort,
    private val whatsAppMessagePort: WhatsAppMessagePort,
    private val quotePricingPolicy: QuotePricingPolicy,
    private val clock: Clock
) : CreateQuoteUseCase, ListQuotesUseCase {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun create(command: CreateQuoteCommand): Quote {
        val now = Instant.now(clock)
        val client = Client(
            id = UUID.randomUUID(),
            name = command.clientName.trim(),
            whatsapp = normalizeBrazilianPhone(command.clientWhatsapp),
            createdAt = now
        )

        val briefing = WigBriefing(
            id = UUID.randomUUID(),
            clientId = client.id,
            type = command.type,
            color = command.color.trim(),
            lengthCm = command.lengthCm,
            texture = command.texture.trim(),
            density = command.density.trim(),
            capSize = command.capSize?.trim(),
            deadlineDays = command.deadlineDays,
            notes = command.notes?.trim(),
            createdAt = now
        )

        val pricing = quotePricingPolicy.calculate(
            QuotePricingInput(
                materialCost = Money.of(command.materialCost),
                laborCost = Money.of(command.laborCost),
                complexityCost = Money.of(command.complexityCost),
                urgencyCost = Money.of(command.urgencyCost),
                marginPercent = command.marginPercent
            )
        )

        val quoteId = UUID.randomUUID()
        val message = whatsAppMessagePort.createMessage(
            WhatsAppMessageInput(
                clientName = client.name,
                serviceLabel = label(command.type),
                color = briefing.color,
                lengthCm = briefing.lengthCm,
                texture = briefing.texture,
                density = briefing.density,
                deadlineDays = briefing.deadlineDays,
                recommendedPrice = pricing.recommendedPrice.plain(),
                depositPrice = pricing.depositPrice.plain()
            )
        )

        val quote = Quote(
            id = quoteId,
            client = client,
            briefing = briefing,
            minimumPrice = pricing.minimumPrice,
            recommendedPrice = pricing.recommendedPrice,
            premiumPrice = pricing.premiumPrice,
            depositPrice = pricing.depositPrice,
            whatsappMessage = message,
            whatsappLink = whatsAppMessagePort.createLink(message),
            pixCopyPaste = pixPaymentPort.createCopyPaste(pricing.depositPrice, quoteId.toString().take(25)),
            status = OrderStatus.QUOTED,
            createdAt = now
        )

        val saved = quoteRepository.save(quote)
        log.info("Quote created id={} client={} recommended={} deposit={}", saved.id, saved.client.name, saved.recommendedPrice.plain(), saved.depositPrice.plain())
        return saved
    }

    override fun list(): List<Quote> =
        quoteRepository.findAll().sortedByDescending { it.createdAt }

    override fun metrics(): QuoteMetrics {
        val quotes = quoteRepository.findAll()
        return QuoteMetrics(
            quotes = quotes.size,
            revenuePotential = quotes.fold(Money.ZERO) { acc, quote -> acc + quote.recommendedPrice },
            depositsPotential = quotes.fold(Money.ZERO) { acc, quote -> acc + quote.depositPrice }
        )
    }

    private fun normalizeBrazilianPhone(phone: String): String {
        val digits = phone.filter { it.isDigit() }
        return when {
            digits.startsWith("55") && digits.length in 12..13 -> digits
            digits.length in 10..11 -> "55$digits"
            else -> throw IllegalArgumentException("Telefone inválido. Use DDD + número.")
        }
    }

    private fun label(type: BriefingType): String =
        when (type) {
            BriefingType.LACE_FRONT -> "lace front personalizada"
            BriefingType.FULL_LACE -> "full lace personalizada"
            BriefingType.WIG_CUSTOM -> "wig customizada"
            BriefingType.MAINTENANCE -> "manutenção"
            BriefingType.SHOE_CUSTOMIZATION -> "customização de sapato"
        }
}
