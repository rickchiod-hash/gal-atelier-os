package com.galatelier.adapter.input.web

import com.fasterxml.jackson.databind.ObjectMapper
import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.application.port.input.CustomerUseCase
import com.galatelier.application.port.input.CreateCustomerRequest
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import java.util.*

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CustomerControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var customerUseCase: CustomerUseCase

    @Test
    fun `GET api-customers should return list`() {
        whenever(customerUseCase.list()).thenReturn(listOf())

        mockMvc.get("/api/customers")
            .andExpect {
                status { isOk() }
                jsonPath("$") { isArray() }
            }
    }

    @Test
    fun `POST api-customers should create customer`() {
        val customerResponse = CustomerResponse(
            id = UUID.randomUUID().toString(),
            name = "João Silva",
            whatsapp = "11912345678",
            email = "joao@email.com",
            totalSpent = 0.0,
            ordersCount = 0,
            favoriteService = "-",
            lastOrderDate = "-",
            tier = com.galatelier.adapter.output.persistence.entity.CustomerTier.NEW,
            createdAt = "2026-01-01"
        )

        whenever(customerUseCase.create(any()))
            .thenReturn(customerResponse)

        val request = mapOf(
            "name" to "João Silva",
            "whatsapp" to "11912345678",
            "email" to "joao@email.com"
        )

        mockMvc.post("/api/customers") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(request)
        }.andExpect {
            status { isOk() }
            jsonPath("$.name") { value("João Silva") }
        }
    }

    @Test
    fun `GET api-customers with invalid ID should return 404`() {
        whenever(customerUseCase.get("00000000-0000-0000-0000-000000000000"))
            .thenThrow(CustomerNotFoundException())

        mockMvc.get("/api/customers/00000000-0000-0000-0000-000000000000")
            .andExpect {
                status { isNotFound() }
            }
    }
}
