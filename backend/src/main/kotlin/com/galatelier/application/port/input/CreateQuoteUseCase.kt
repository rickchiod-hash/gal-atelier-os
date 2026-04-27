package com.galatelier.application.port.input

import com.galatelier.domain.model.BriefingType
import com.galatelier.domain.model.Quote
import java.math.BigDecimal

data class CreateQuoteCommand(
    val clientName: String,
    val clientWhatsapp: String,
    val type: BriefingType,
    val color: String,
    val lengthCm: Int,
    val texture: String,
    val density: String,
    val capSize: String?,
    val deadlineDays: Int,
    val materialCost: BigDecimal,
    val laborCost: BigDecimal,
    val complexityCost: BigDecimal,
    val urgencyCost: BigDecimal,
    val marginPercent: BigDecimal,
    val notes: String?
)

interface CreateQuoteUseCase {
    fun create(command: CreateQuoteCommand): Quote
}
