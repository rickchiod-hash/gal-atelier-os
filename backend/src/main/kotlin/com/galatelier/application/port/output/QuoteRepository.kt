package com.galatelier.application.port.output

import com.galatelier.domain.model.Quote

interface QuoteRepository {
    fun save(quote: Quote): Quote
    fun findAll(): List<Quote>
    fun findById(id: UUID): Quote?
    fun update(quote: Quote): Quote
}
