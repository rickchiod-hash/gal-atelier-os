package com.galatelier.adapter.input.web

import com.galatelier.application.port.input.CreateOrderRequest
import com.galatelier.application.port.input.OrderUseCase
import com.galatelier.application.port.input.UpdateOrderStatusRequest
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
class OrderController(
    private val orderUseCase: OrderUseCase
) {

    @GetMapping
    fun list(): List<OrderResponse> = orderUseCase.list()

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): OrderResponse? = 
        orderUseCase.get(id)

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<OrderResponse> =
        orderUseCase.listByCustomer(customerId)

    @PostMapping
    fun create(@RequestBody request: CreateOrderRequest): OrderResponse =
        orderUseCase.create(request)

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateOrderStatusRequest): OrderResponse? =
        orderUseCase.updateStatus(id, request)
}