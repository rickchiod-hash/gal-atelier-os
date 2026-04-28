package com.galatelier.application.port.input

import com.galatelier.adapter.input.web.OrderResponse

interface OrderUseCase {
    fun list(): List<OrderResponse>
    fun get(id: String): OrderResponse?
    fun listByCustomer(customerId: String): List<OrderResponse>
    fun create(request: CreateOrderRequest): OrderResponse
    fun updateStatus(id: String, request: UpdateOrderStatusRequest): OrderResponse?
}

data class CreateOrderRequest(
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val price: Double
)

data class UpdateOrderStatusRequest(
    val status: String,
    val depositPaid: Double? = null,
    val paymentStatus: String? = null
)
