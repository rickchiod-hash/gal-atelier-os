package com.galatelier.adapter.input.web

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import com.galatelier.application.port.input.ListQuotesUseCase

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class QuoteControllerIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var createQuoteUseCase: com.galatelier.application.port.input.CreateQuoteUseCase

    @MockBean
    private lateinit var listQuotesUseCase: ListQuotesUseCase

    @Test
    fun `GET api-quotes should return list`() {
        whenever(listQuotesUseCase.list()).thenReturn(listOf())

        mockMvc.get("/api/quotes")
            .andExpect {
                status { isOk() }
                jsonPath("$") { isArray() }
            }
    }

    @Test
    fun `GET api-quotes-metrics should return metrics`() {
        whenever(listQuotesUseCase.metrics()).thenReturn(
            com.galatelier.application.port.input.QuoteMetrics(
                quotes = 0,
                revenuePotential = com.galatelier.domain.model.Money.of("0.00"),
                depositsPotential = com.galatelier.domain.model.Money.of("0.00")
            )
        )

        mockMvc.get("/api/quotes/metrics")
            .andExpect {
                status { isOk() }
                jsonPath("$.quotes") { exists() }
            }
    }
}
