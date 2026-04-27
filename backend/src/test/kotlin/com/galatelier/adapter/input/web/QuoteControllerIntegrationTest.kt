package com.galatelier.adapter.input.web

import com.galatelier.domain.model.BriefingType
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import java.math.BigDecimal

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class QuoteControllerIntegrationTest(
    @Autowired private val rest: TestRestTemplate
) {
    @Test
    fun `health responde ok`() {
        val response = rest.getForEntity("/api/health", Map::class.java)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals("ok", response.body?.get("status"))
    }

    @Test
    fun `cria orcamento e atualiza metricas`() {
        val request = CreateQuoteRequest(
            clientName = "Maria",
            clientWhatsapp = "11999999999",
            type = BriefingType.LACE_FRONT,
            color = "Castanho iluminado",
            lengthCm = 55,
            texture = "Ondulada",
            density = "180%",
            capSize = "M",
            deadlineDays = 15,
            materialCost = BigDecimal("150"),
            laborCost = BigDecimal("250"),
            complexityCost = BigDecimal("80"),
            urgencyCost = BigDecimal("20"),
            marginPercent = BigDecimal("30"),
            notes = "Teste de regressao"
        )
        val headers = HttpHeaders()
        headers["X-Trace-Id"] = "regression-test"
        val response = rest.exchange("/api/quotes", HttpMethod.POST, HttpEntity(request, headers), QuoteResponse::class.java)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals("Maria", response.body?.clientName)
        assertEquals(BigDecimal("650.00"), response.body?.recommendedPrice)
        assertTrue(response.body?.whatsappLink?.contains("wa.me/5511914136961") == true)
        assertTrue(response.body?.pixCopyPaste?.startsWith("000201") == true)

        val metrics = rest.getForEntity("/api/quotes/metrics", QuoteMetricsResponse::class.java)
        assertEquals(HttpStatus.OK, metrics.statusCode)
        assertNotNull(metrics.body)
        assertTrue((metrics.body?.quotes ?: 0) >= 1)
    }

    @Test
    fun `retorna erro para telefone invalido`() {
        val request = CreateQuoteRequest(
            clientName = "Maria",
            clientWhatsapp = "123",
            type = BriefingType.LACE_FRONT,
            color = "Castanho",
            lengthCm = 55,
            texture = "Ondulada",
            density = "180%",
            capSize = "M",
            deadlineDays = 15,
            materialCost = BigDecimal("150"),
            laborCost = BigDecimal("250"),
            complexityCost = BigDecimal("80"),
            urgencyCost = BigDecimal("20"),
            marginPercent = BigDecimal("30"),
            notes = null
        )

        val response = rest.postForEntity("/api/quotes", request, ErrorResponse::class.java)

        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
        assertTrue(response.body?.message?.contains("clientWhatsapp") == true)
    }
}
