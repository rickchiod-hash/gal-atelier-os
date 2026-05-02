package com.galatelier.adapter.input.web

import com.fasterxml.jackson.databind.ObjectMapper
import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.adapter.output.persistence.entity.CustomerTier
import com.galatelier.application.port.input.CreateCustomerRequest
import com.galatelier.application.port.input.CustomerUseCase
import com.galatelier.application.port.input.UpdateCustomerRequest
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(CustomerController::class)
@Import(ApiExceptionHandler::class)
@ActiveProfiles("test")
class CustomerControllerIntegrationTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @MockBean
    lateinit var customerUseCase: CustomerUseCase

    @Test
    fun `should list customers`() {
        given(customerUseCase.list()).willReturn(
            listOf(
                CustomerResponse(
                    id = "c1",
                    name = "Ana",
                    whatsapp = "5511999999999",
                    email = "ana@gal.com",
                    totalSpent = 1200.0,
                    ordersCount = 3,
                    favoriteService = "Lace Front",
                    lastOrderDate = "2026-04-01",
                    tier = CustomerTier.VIP,
                    createdAt = "2026-03-01"
                )
            )
        )

        mockMvc.perform(get("/api/customers"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].name").value("Ana"))
            .andExpect(jsonPath("$[0].tier").value("VIP"))
    }

    @Test
    fun `should create customer`() {
        val request = CreateCustomerRequest(
            name = "Bea",
            whatsapp = "5511888888888",
            email = "bea@gal.com"
        )
        given(customerUseCase.create(request)).willReturn(
            CustomerResponse(
                id = "c2",
                name = "Bea",
                whatsapp = "5511888888888",
                email = "bea@gal.com",
                totalSpent = 0.0,
                ordersCount = 0,
                favoriteService = "-",
                lastOrderDate = "-",
                tier = CustomerTier.NEW,
                createdAt = "2026-05-02"
            )
        )

        mockMvc.perform(
            post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value("c2"))
            .andExpect(jsonPath("$.name").value("Bea"))
    }

    @Test
    fun `should update customer`() {
        val request = UpdateCustomerRequest(name = "Carla")
        given(customerUseCase.update("c3", request)).willReturn(
            CustomerResponse(
                id = "c3",
                name = "Carla",
                whatsapp = "5511777777777",
                email = "carla@gal.com",
                totalSpent = 500.0,
                ordersCount = 1,
                favoriteService = "Closure",
                lastOrderDate = "2026-04-22",
                tier = CustomerTier.RECURRENT,
                createdAt = "2026-01-10"
            )
        )

        mockMvc.perform(
            patch("/api/customers/c3")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value("Carla"))
    }
}
