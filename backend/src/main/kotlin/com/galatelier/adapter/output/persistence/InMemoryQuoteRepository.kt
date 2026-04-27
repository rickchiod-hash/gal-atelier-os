package com.galatelier.adapter.output.persistence

import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.domain.model.Quote
import org.springframework.stereotype.Repository
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

@Repository
class InMemoryQuoteRepository : QuoteRepository {
    private val storage = ConcurrentHashMap<UUID, Quote>()

    override fun save(quote: Quote): Quote {
        storage[quote.id] = quote
        return quote
    }

    override fun findAll(): List<Quote> = storage.values.toList()
}
