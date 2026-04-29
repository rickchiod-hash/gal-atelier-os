package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.application.port.input.CreateCustomerRequest
import com.galatelier.application.port.input.CustomerUseCase
import com.galatelier.application.port.input.UpdateCustomerRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/customers")
class CustomerController(
    private val customerUseCase: CustomerUseCase
) {

    @GetMapping
    fun list(): List<CustomerResponse> = customerUseCase.list()

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): CustomerResponse? = customerUseCase.get(id)

    @PostMapping
    fun create(@RequestBody request: com.galatelier.application.port.input.CreateCustomerRequest): CustomerResponse =
        customerUseCase.create(request)

    @PatchMapping("/{id}")
    fun update(@PathVariable id: String, @RequestBody request: com.galatelier.application.port.input.UpdateCustomerRequest): CustomerResponse? =
        customerUseCase.update(id, request)
}
