package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.adapter.output.persistence.entity.CustomerTier
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import com.galatelier.application.port.input.CreateCustomerRequest
import com.galatelier.application.port.input.CustomerUseCase
import com.galatelier.application.port.input.UpdateCustomerRequest
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class CustomerApplicationService(
    private val customerRepository: CustomerRepository
) : CustomerUseCase {

    override fun list(): List<CustomerResponse> =
        customerRepository.findAll()
            .sortedByDescending { it.totalSpent }
            .map { it.toResponse() }

    override fun get(id: String): CustomerResponse? =
        customerRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    override fun create(request: CreateCustomerRequest): CustomerResponse {
        val customer = CustomerEntity(
            name = request.name,
            whatsapp = request.whatsapp,
            email = request.email,
            tier = CustomerTier.NEW
        )
        return customerRepository.save(customer).toResponse()
    }

    override fun update(id: String, request: UpdateCustomerRequest): CustomerResponse? {
        val existing = customerRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            name = request.name ?: existing.name,
            whatsapp = request.whatsapp ?: existing.whatsapp,
            email = request.email ?: existing.email,
            updatedAt = LocalDateTime.now()
        )
        return customerRepository.save(updated).toResponse()
    }
}

fun CustomerEntity.toResponse() = CustomerResponse(
    id = id.toString(),
    name = name,
    whatsapp = whatsapp,
    email = email ?: "",
    totalSpent = totalSpent.toDouble(),
    ordersCount = ordersCount,
    favoriteService = favoriteService ?: "-",
    lastOrderDate = lastOrderDate?.toString() ?: "-",
    tier = tier,
    createdAt = createdAt.toLocalDate().toString()
)
