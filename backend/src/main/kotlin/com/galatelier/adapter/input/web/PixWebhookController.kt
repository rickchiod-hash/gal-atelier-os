package com.galatelier.adapter.input.web

import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.domain.model.OrderStatus
import com.galatelier.domain.model.Quote
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

@RestController
@RequestMapping("/api/pix")
class PixWebhookController(
    private val quoteRepository: QuoteRepository
) {

    private val logger = LoggerFactory.getLogger(javaClass)
    private val confirmedPayments = ConcurrentHashMap<UUID, PixConfirmation>()

    data class PixWebhookRequest(
        val txId: String,
        val quoteId: UUID,
        val amount: String,
        val status: String,
        val timestamp: Instant = Instant.now()
    )

    data class PixConfirmation(
        val quoteId: UUID,
        val txId: String,
        val amount: String,
        val confirmedAt: Instant,
        val status: OrderStatus = OrderStatus.PAID
    )

    data class PixStatusResponse(
        val quoteId: UUID,
        val status: String,
        val confirmed: Boolean,
        val confirmedAt: Instant?
    )

    @PostMapping("/webhook")
    fun receivePixConfirmation(@RequestBody request: PixWebhookRequest): PixWebhookResponse {
        logger.info("Recebida confirmação Pix: txId=${request.txId} quoteId=${request.quoteId} status=${request.status}")

        return if (request.status == "CONFIRMED" || request.status == "COMPLETED") {
            val confirmation = PixConfirmation(
                quoteId = request.quoteId,
                txId = request.txId,
                amount = request.amount,
                confirmedAt = Instant.now()
            )
            confirmedPayments[request.quoteId] = confirmation

            // Atualiza status do orçamento para PAID
            val quote = quoteRepository.findById(request.quoteId)
            if (quote != null) {
                val updatedQuote = quote.copy(status = OrderStatus.PAID)
                quoteRepository.update(updatedQuote)
                logger.info("Status do quoteId=${request.quoteId} atualizado para PAID")
            } else {
                logger.warn("Quote não encontrado para quoteId=${request.quoteId}")
            }

            logger.info("Pix confirmado para quoteId=${request.quoteId}")
            PixWebhookResponse(success = true, message = "Pagamento confirmado", quoteId = request.quoteId)
        } else {
            logger.warn("Status Pix não reconhecido: ${request.status}")
            PixWebhookResponse(success = false, message = "Status não reconhecido: ${request.status}", quoteId = request.quoteId)
        }
    }

    @GetMapping("/status/{quoteId}")
    fun getPixStatus(@PathVariable quoteId: UUID): PixStatusResponse {
        val confirmation = confirmedPayments[quoteId]
        return PixStatusResponse(
            quoteId = quoteId,
            status = confirmation?.status?.name ?: "AWAITING_PAYMENT",
            confirmed = confirmation != null,
            confirmedAt = confirmation?.confirmedAt
        )
    }

    @PostMapping("/simulate/{quoteId}")
    fun simulatePaymentConfirmation(@PathVariable quoteId: UUID): PixStatusResponse {
        logger.info("Simulando confirmação Pix para quoteId=$quoteId")
        val confirmation = PixConfirmation(
            quoteId = quoteId,
            txId = "SIM${System.currentTimeMillis()}",
            amount = "100.00",
            confirmedAt = Instant.now()
        )
        confirmedPayments[quoteId] = confirmation

        // Atualiza status do orçamento para PAID
        val quote = quoteRepository.findById(quoteId)
        if (quote != null) {
            val updatedQuote = quote.copy(status = OrderStatus.PAID)
            quoteRepository.update(updatedQuote)
            logger.info("Status do quoteId=$quoteId atualizado para PAID (simulação)")
        } else {
            logger.warn("Quote não encontrado para quoteId=$quoteId (simulação)")
        }

        return PixStatusResponse(
            quoteId = quoteId,
            status = "PAID",
            confirmed = true,
            confirmedAt = confirmation.confirmedAt
        )
    }
}

data class PixWebhookResponse(
    val success: Boolean,
    val message: String,
    val quoteId: UUID
)