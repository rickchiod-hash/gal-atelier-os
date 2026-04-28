package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.entity.OrderStatus as EntityOrderStatus
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import com.galatelier.application.port.input.CreateOrderRequest
import com.galatelier.application.port.input.OrderUseCase
import com.galatelier.application.port.input.UpdateOrderStatusRequest
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class OrderApplicationService(
    private val orderRepository: OrderRepository
) : OrderUseCase {

    override fun list(): List<OrderResponse> =
        orderRepository.findAll()
            .sortedByDescending { it.createdAt }
            .map { it.toResponse() }

    override fun get(id: String): OrderResponse? =
        orderRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    override fun listByCustomer(customerId: String): List<OrderResponse> =
        orderRepository.findAll()
            .filter { it.customerId.toString() == customerId }
            .sortedByDescending { it.createdAt }
            .map { it.toResponse() }

    override fun create(request: CreateOrderRequest): OrderResponse {
        val order = OrderEntity(
            customerId = UUID.fromString(request.customerId),
            customerName = request.customerName,
            serviceType = request.serviceType,
            price = request.price.toBigDecimal(),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        return orderRepository.save(order).toResponse()
    }

    override fun updateStatus(id: String, request: UpdateOrderStatusRequest): OrderResponse? {
        val existing = orderRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityOrderStatus.valueOf(request.status),
            paymentStatus = request.paymentStatus ?: existing.paymentStatus,
            depositPaid = request.depositPaid?.toBigDecimal() ?: existing.depositPaid,
            updatedAt = LocalDateTime.now()
        )
        return orderRepository.save(updated).toResponse()
    }
}
