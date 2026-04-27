package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.entity.CustomerTier as EntityTier
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/customers")
class CustomerController(
    private val customerRepository: CustomerRepository
) {

    @GetMapping
    fun list(): List<CustomerResponse> = customerRepository.findAll()
        .sortedByDescending { it.totalSpent }
        .map { it.toResponse() }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): CustomerResponse? = 
        customerRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    @PostMapping
    fun create(@RequestBody request: CreateCustomerRequest): CustomerResponse {
        val customer = CustomerEntity(
            name = request.name,
            whatsapp = request.whatsapp,
            email = request.email,
            tier = EntityTier.NEW
        )
        return customerRepository.save(customer).toResponse()
    }

    @PatchMapping("/{id}")
    fun update(@PathVariable id: String, @RequestBody request: UpdateCustomerRequest): CustomerResponse? {
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

data class CustomerResponse(
    val id: String,
    val name: String,
    val whatsapp: String,
    val email: String,
    val totalSpent: Double,
    val ordersCount: Int,
    val favoriteService: String,
    val lastOrderDate: String,
    val tier: EntityTier,
    val createdAt: String
)

data class CreateCustomerRequest(
    val name: String,
    val whatsapp: String,
    val email: String? = null
)

data class UpdateCustomerRequest(
    val name: String? = null,
    val whatsapp: String? = null,
    val email: String? = null
)