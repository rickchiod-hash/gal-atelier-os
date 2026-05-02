package com.galatelier.adapter.input.web

import com.fasterxml.jackson.databind.ObjectMapper
import com.galatelier.application.port.input.CreateOrderRequest
import com.galatelier.application.port.input.OrderUseCase
import com.galatelier.application.port.input.UpdateOrderStatusRequest
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@WebMvcTest(OrderController::class)
@Import(ApiExceptionHandler::class)
@ActiveProfiles("test")
class OrderControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @MockitoBean
    lateinit var orderUseCase: OrderUseCase

    @Test
    fun `should list orders`() {
        val order = OrderResponse(
            id = UUID.randomUUID(),
            customerId = UUID.randomUUID(),
            customerName = "Ana",
            serviceType = "Lace Front",
            price = BigDecimal(1200),
            status = "LEAD",
            paymentStatus = "PENDING",
            depositPaid = BigDecimal.ZERO,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        given(orderUseCase.list()).willReturn(listOf(order))

        mockMvc.perform(get("/api/orders"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].customerName").value("Ana"))
            .andExpect(jsonPath("$[0].status").value("LEAD"))
    }

    @Test
    fun `should create order`() {
        val request = CreateOrderRequest(
            customerId = UUID.randomUUID().toString(),
            customerName = "Bea",
            serviceType = "Closure",
            price = 900.0
        )
        val response = OrderResponse(
            id = UUID.randomUUID(),
            customerId = UUID.fromString(request.customerId),
            customerName = request.customerName,
            serviceType = request.serviceType,
            price = BigDecimal(900),
            status = "LEAD",
            paymentStatus = "PENDING",
            depositPaid = BigDecimal.ZERO,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        given(orderUseCase.create(request)).willReturn(response)

        mockMvc.perform(
            post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.customerName").value("Bea"))
    }

    @Test
    fun `should update order status`() {
        val orderId = UUID.randomUUID().toString()
        val request = UpdateOrderStatusRequest(status = "PRODUCTION")
        val response = OrderResponse(
            id = UUID.fromString(orderId),
            customerId = UUID.randomUUID(),
            customerName = "Carla",
            serviceType = "Wig",
            price = BigDecimal(1000),
            status = "PRODUCTION",
            paymentStatus = "PENDING",
            depositPaid = BigDecimal.ZERO,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )
        given(orderUseCase.updateStatus(orderId, request)).willReturn(response)

        mockMvc.perform(
            patch("/api/orders/$orderId/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.status").value("PRODUCTION"))
    }
}
