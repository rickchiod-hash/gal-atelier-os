package com.galatelier.application.port.input

import com.galatelier.domain.model.Money
import com.galatelier.domain.model.Quote

data class QuoteMetrics(
    val quotes: Int,
    val revenuePotential: Money,
    val depositsPotential: Money
)

interface ListQuotesUseCase {
    fun list(): List<Quote>
    fun metrics(): QuoteMetrics
}
