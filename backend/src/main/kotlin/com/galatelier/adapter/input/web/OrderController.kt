package com.galatelier.adapter.input.web

import com.galatelier.application.port.input.OrderUseCase
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
class OrderController(
    private val orderUseCase: OrderUseCase
) {

    @GetMapping
    fun list(): List<com.galatelier.adapter.output.persistence.entity.OrderResponse> = orderUseCase.list()

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): com.galatelier.adapter.output.persistence.entity.OrderResponse? = 
        orderUseCase.get(id)

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<com.galatelier.adapter.output.persistence.entity.OrderResponse> =
        orderUseCase.listByCustomer(customerId)

    @PostMapping
    fun create(@RequestBody request: com.galatelier.application.port.input.CreateOrderRequest): com.galatelier.adapter.output.persistence.entity.OrderResponse =
        orderUseCase.create(request)

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: com.galatelier.application.port.input.UpdateOrderStatusRequest): com.galatelier.adapter.output.persistence.entity.OrderResponse? =
        orderUseCase.updateStatus(id, request)
}