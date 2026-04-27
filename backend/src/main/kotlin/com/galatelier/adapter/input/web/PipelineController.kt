package com.galatelier.adapter.input.web

import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.domain.model.OrderStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/pipeline")
class PipelineController(
    private val quoteRepository: QuoteRepository
) {
    @GetMapping
    fun pipeline(): PipelineResponse {
        val quotes = quoteRepository.findAll()
        val stages = PipelineStage.entries.map { stage ->
            val quotesInStage = quotes.filter { mapToStage(it.status) == stage }
            PipelineStageData(
                stage = stage,
                label = stage.label,
                count = quotesInStage.size,
                quotes = quotesInStage.map { q ->
                    PipelineQuoteItem(
                        id = q.id.toString(),
                        clientName = q.client.name,
                        whatsapp = q.client.whatsapp,
                        serviceType = q.briefing.type.name,
                        price = q.recommendedPrice.value.toDouble(),
                        createdAt = q.createdAt.toString()
                    )
                },
                totalValue = quotesInStage.fold(0.0) { acc, q -> acc + q.recommendedPrice.value.toDouble() }
            )
        }

        val totalValue = quotes.fold(0.0) { acc, q -> acc + q.recommendedPrice.value.toDouble() }
        val totalDeposits = quotes.fold(0.0) { acc, q -> acc + q.depositPrice.value.toDouble() }

        return PipelineResponse(
            stages = stages,
            totalQuotes = quotes.size,
            totalValue = totalValue,
            totalDeposits = totalDeposits,
            conversionRate = 72.0
        )
    }

    private fun mapToStage(status: OrderStatus) = when (status) {
        OrderStatus.LEAD -> PipelineStage.NEW_LEAD
        OrderStatus.BRIEFING -> PipelineStage.DIAGNOSIS
        OrderStatus.QUOTED -> PipelineStage.QUOTE_SENT
        OrderStatus.WAITING_PIX -> PipelineStage.AWAITING_PAYMENT
        OrderStatus.PAID -> PipelineStage.DEPOSIT_PAID
        OrderStatus.PRODUCTION -> PipelineStage.ORDER_CREATED
        OrderStatus.READY -> PipelineStage.ORDER_CREATED
        OrderStatus.DELIVERED -> PipelineStage.DELIVERED
        OrderStatus.LOST -> PipelineStage.LOST
    }
}

data class PipelineResponse(
    val stages: List<PipelineStageData>,
    val totalQuotes: Int,
    val totalValue: Double,
    val totalDeposits: Double,
    val conversionRate: Double
)

data class PipelineStageData(
    val stage: PipelineStage,
    val label: String,
    val count: Int,
    val quotes: List<PipelineQuoteItem>,
    val totalValue: Double
)

data class PipelineQuoteItem(
    val id: String,
    val clientName: String,
    val whatsapp: String,
    val serviceType: String,
    val price: Double,
    val createdAt: String
)

enum class PipelineStage(val label: String) {
    NEW_LEAD("Novo Lead"),
    CONTACT_STARTED("Contato Iniciado"),
    DIAGNOSIS("Diagnóstico"),
    RECOMMENDATION_SENT("Recomendação Enviada"),
    QUOTE_SENT("Orçamento Enviado"),
    NEGOTIATION("Negociação"),
    AWAITING_PAYMENT("Aguardando Pgto"),
    DEPOSIT_PAID("Sinal Pago"),
    ORDER_CREATED("Pedido Criado"),
    DELIVERED("Entregue"),
    LOST("Perdido")
}