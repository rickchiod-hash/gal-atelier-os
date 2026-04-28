package com.galatelier.adapter.output.persistence

import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import com.galatelier.application.port.output.CustomerRepositoryPort
import com.galatelier.application.port.output.CustomerSummary
import org.springframework.stereotype.Component

@Component
class CustomerRepositoryAdapter(
    private val customerRepository: CustomerRepository
) : CustomerRepositoryPort {

    override fun findAll(): List<CustomerSummary> =
        customerRepository.findAll().map { CustomerSummary(it.id) }
}
