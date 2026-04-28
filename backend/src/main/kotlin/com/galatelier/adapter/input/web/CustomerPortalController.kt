package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/portal")
class CustomerPortalController(
    private val customerRepository: CustomerRepository,
    private val orderRepository: OrderRepository
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    @GetMapping("/customer/{whatsapp}")
    fun getCustomerArea(@PathVariable whatsapp: String): CustomerPortalResponse {
        logger.info("Portal consulta para whatsapp=$whatsapp")
        
        val customer = customerRepository.findByWhatsapp(whatsapp)
        if (customer == null) {
            return CustomerPortalResponse(
                found = false,
                customerName = null,
                orders = emptyList()
            )
        }

        val orders = orderRepository.findAll()
            .filter { it.customerId == customer.id }
            .sortedByDescending { it.createdAt }
            .map { it.toPortalResponse() }

        return CustomerPortalResponse(
            found = true,
            customerName = customer.name,
            orders = orders
        )
    }
}

fun OrderEntity.toPortalResponse() = PortalOrderResponse(
    id = id.toString(),
    serviceType = serviceType,
    price = price.toDouble(),
    status = status.name,
    depositPaid = depositPaid.toDouble(),
    paymentStatus = paymentStatus,
    createdAt = createdAt.toLocalDate().toString()
)

data class CustomerPortalResponse(
    val found: Boolean,
    val customerName: String?,
    val orders: List<PortalOrderResponse>
)

data class PortalOrderResponse(
    val id: String,
    val serviceType: String,
    val price: Double,
    val status: String,
    val depositPaid: Double,
    val paymentStatus: String,
    val createdAt: String
)
