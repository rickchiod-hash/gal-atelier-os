package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class CustomerSegmentationService(
    private val customerRepository: CustomerRepository
) {
    fun categorizeCustomer(customer: CustomerEntity): String {
        val ordersCount = customer.ordersCount ?: 0
        val totalSpent = customer.totalSpent ?: BigDecimal.ZERO

        if (totalSpent >= BigDecimal("3000")) return "VIP_GOLD"
        if (totalSpent >= BigDecimal("1500")) return "VIP_SILVER"
        if (ordersCount >= 5) return "RECURRING"
        if (ordersCount >= 2) return "ACTIVE"
        if (ordersCount == 1) return "NEW"
        return "LEAD"
    }

    fun getAllWithSegments(): List<CustomerSegmentResponse> =
        customerRepository.findAll().map { customer ->
            CustomerSegmentResponse(
                customerId = customer.id.toString(),
                name = customer.name,
                whatsapp = customer.whatsapp,
                totalSpent = customer.totalSpent?.toDouble() ?: 0.0,
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
