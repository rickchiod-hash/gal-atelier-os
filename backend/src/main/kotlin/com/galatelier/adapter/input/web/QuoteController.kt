package com.galatelier.adapter.input.web

import com.galatelier.application.port.input.CreateQuoteCommand
import com.galatelier.application.port.input.CreateQuoteUseCase
import com.galatelier.application.port.input.ListQuotesUseCase
import com.galatelier.domain.model.BriefingType
import com.galatelier.domain.model.OrderStatus
import com.galatelier.domain.model.Quote
import jakarta.validation.Valid
import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/quotes")
class QuoteController(
    private val createQuoteUseCase: CreateQuoteUseCase,
    private val listQuotesUseCase: ListQuotesUseCase
) {
    @PostMapping
    fun create(@Valid @RequestBody request: CreateQuoteRequest): QuoteResponse =
        createQuoteUseCase.create(request.toCommand()).toResponse()

    @GetMapping
    fun list(): List<QuoteResponse> =
        listQuotesUseCase.list().map { it.toResponse() }

    @GetMapping("/metrics")
    fun metrics(): QuoteMetricsResponse {
        val metrics = listQuotesUseCase.metrics()
        return QuoteMetricsResponse(
            quotes = metrics.quotes,
            revenuePotential = metrics.revenuePotential.value,
            depositsPotential = metrics.depositsPotential.value
        )
    }
}

data class CreateQuoteRequest(
    @field:NotBlank @field:Size(min = 2, max = 80)
    val clientName: String,

    @field:NotBlank @field:Size(min = 10, max = 20)
    val clientWhatsapp: String,

    val type: BriefingType,

    @field:NotBlank @field:Size(min = 2, max = 60)
    val color: String,

    @field:Min(10) @field:Max(120)
    val lengthCm: Int,

    @field:NotBlank @field:Size(min = 2, max = 60)
    val texture: String,

    @field:NotBlank @field:Size(min = 2, max = 60)
    val density: String,

    @field:Size(max = 60)
    val capSize: String? = null,

    @field:Min(1) @field:Max(180)
    val deadlineDays: Int,

    @field:DecimalMin("0.00")
    val materialCost: BigDecimal,

    @field:DecimalMin("0.00")
    val laborCost: BigDecimal,

    @field:DecimalMin("0.00")
    val complexityCost: BigDecimal,

    @field:DecimalMin("0.00")
    val urgencyCost: BigDecimal = BigDecimal.ZERO,

    @field:DecimalMin("0.00") @field:DecimalMax("300.00")
    val marginPercent: BigDecimal = BigDecimal("30"),

    @field:Size(max = 300)
    val notes: String? = null
) {
    fun toCommand(): CreateQuoteCommand =
        CreateQuoteCommand(
            clientName = clientName,
            clientWhatsapp = clientWhatsapp,
            type = type,
            color = color,
            lengthCm = lengthCm,
            texture = texture,
            density = density,
            capSize = capSize,
            deadlineDays = deadlineDays,
            materialCost = materialCost,
            laborCost = laborCost,
            complexityCost = complexityCost,
            urgencyCost = urgencyCost,
            marginPercent = marginPercent,
            notes = notes
        )
}

data class QuoteMetricsResponse(
    val quotes: Int,
    val revenuePotential: BigDecimal,
    val depositsPotential: BigDecimal
)

data class QuoteResponse(
    val id: UUID,
    val clientName: String,
    val clientWhatsapp: String,
    val serviceType: BriefingType,
    val minimumPrice: BigDecimal,
    val recommendedPrice: BigDecimal,
    val premiumPrice: BigDecimal,
    val depositPrice: BigDecimal,
    val whatsappMessage: String,
    val whatsappLink: String,
    val pixCopyPaste: String,
    val status: OrderStatus,
    val createdAt: Instant
)

private fun Quote.toResponse(): QuoteResponse =
    QuoteResponse(
        id = id,
        clientName = client.name,
        clientWhatsapp = client.whatsapp,
        serviceType = briefing.type,
        minimumPrice = minimumPrice.value,
        recommendedPrice = recommendedPrice.value,
        premiumPrice = premiumPrice.value,
        depositPrice = depositPrice.value,
        whatsappMessage = whatsappMessage,
        whatsappLink = whatsappLink,
        pixCopyPaste = pixCopyPaste,
        status = status,
        createdAt = createdAt
    )
