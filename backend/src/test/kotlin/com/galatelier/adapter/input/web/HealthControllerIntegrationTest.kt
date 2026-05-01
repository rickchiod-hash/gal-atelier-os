package com.galatelier.adapter.input.web

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HealthControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `GET api-health should return OK`() {
        mockMvc.get("/api/health")
            .andExpect {
                status { isOk() }
            }
    }

    @Test
    fun `GET actuator-health should return health status`() {
        mockMvc.get("/actuator/health")
            .andExpect {
                status { isOk() }
            }
    }
}
