package com.galatelier.adapter.input.web

import com.galatelier.domain.model.BriefingType
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class ServiceControllerTest(
    @Autowired private val rest: TestRestTemplate
) {
    @Test
    fun `retorna catalogo de servicos`() {
        val response = rest.getForEntity("/api/services", Array<ServiceResponse>::class.java)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertTrue(response.body?.size ?: 0 >= 5)

        val types = response.body?.map { it.type } ?: emptyList()
        assertTrue(BriefingType.LACE_FRONT in types)
        assertTrue(BriefingType.FULL_LACE in types)
        assertTrue(BriefingType.WIG_CUSTOM in types)
    }
}