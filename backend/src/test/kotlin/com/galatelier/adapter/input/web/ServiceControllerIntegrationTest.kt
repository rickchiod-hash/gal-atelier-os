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
class ServiceControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Test
    fun `GET api-services should return list of services`() {
        mockMvc.get("/api/services")
            .andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
                jsonPath("$") { isArray() }
                jsonPath("$.length()") { value(10) } // ServiceCatalog has 10 items
            }
    }

    @Test
    fun `GET api-services should return valid service structure`() {
        mockMvc.get("/api/services")
            .andExpect {
                status { isOk() }
                jsonPath("$[0].id") { exists() }
                jsonPath("$[0].type") { exists() }
                jsonPath("$[0].label") { exists() }
                jsonPath("$[0].description") { exists() }
                jsonPath("$[0].basePriceMin") { exists() }
                jsonPath("$[0].basePriceMax") { exists() }
                jsonPath("$[0].estimatedDays") { exists() }
                jsonPath("$[0].materials") { isArray() }
            }
    }
}
