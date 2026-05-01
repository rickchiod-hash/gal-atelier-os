package com.galatelier.adapter.input.web

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import com.galatelier.application.port.input.OrderUseCase
import com.galatelier.adapter.output.persistence.entity.OrderResponse
import org.mockito.kotlin.whenever
import java.util.*

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class OrderControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var orderUseCase: OrderUseCase

    @Test
    fun `GET api-orders should return list`() {
        whenever(orderUseCase.list()).thenReturn(listOf())

        mockMvc.get("/api/orders")
            .andExpect {
                status { isOk() }
                jsonPath("$") { isArray() }
            }
    }

    @Test
    fun `GET api-orders-{id} with invalid UUID should return 400`() {
        mockMvc.get("/api/orders/metrics")
            .andExpect {
                status { isBadRequest() }
            }
    }
}
