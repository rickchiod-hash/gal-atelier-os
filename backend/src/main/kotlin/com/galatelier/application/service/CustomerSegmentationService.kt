package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import org.springframework.stereotype.Service

@Service
class CustomerSegmentationService(
    private val customerRepository: CustomerRepository
) {
    fun categorizeCustomer(customer: CustomerEntity): String {
        val ordersCount = customer.ordersCount ?: 0
        val totalSpent = customer.totalSpent ?: 0.0

        return when {
            totalSpent >= 3000 -> "VIP_GOLD"
            totalSpent >= 1500 -> "VIP_SILVER"
            ordersCount >= 5 -> "RECURRING"
            ordersCount >= 2 -> "ACTIVE"
            ordersCount == 1 -> "NEW"
            else -> "LEAD"
        }
    }

    fun getAllWithSegments(): List<CustomerSegmentResponse> =
        customerRepository.findAll().map { customer ->
            CustomerSegmentResponse(
                customerId = customer.id.toString(),
                name = customer.name,
                whatsapp = customer.whatsapp,
                totalSpent = customer.totalSpent ?: 0.0,
                ordersCount = customer.ordersCount ?: 0,
                segment = categorizeCustomer(customer)
            )
        }

    fun getBySegment(segment: String): List<CustomerSegmentResponse> =
        getAllWithSegments().filter { it.segment == segment }
}

data class CustomerSegmentResponse(
    val customerId: String,
    val name: String,
    val whatsapp: String,
    val totalSpent: Double,
    val ordersCount: Int,
    val segment: String
)
