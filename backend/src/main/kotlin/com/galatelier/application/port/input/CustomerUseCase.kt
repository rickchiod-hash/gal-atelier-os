package com.galatelier.application.port.input

import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.adapter.output.persistence.entity.CustomerTier

interface CustomerUseCase {
    fun list(): List<CustomerResponse>
    fun get(id: String): CustomerResponse?
    fun create(request: CreateCustomerRequest): CustomerResponse
    fun update(id: String, request: UpdateCustomerRequest): CustomerResponse?
}

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
