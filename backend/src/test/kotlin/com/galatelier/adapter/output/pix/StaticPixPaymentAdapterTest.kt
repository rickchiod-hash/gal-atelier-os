package com.galatelier.adapter.output.pix

import com.galatelier.config.GalAtelierProperties
import com.galatelier.domain.model.Money
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class StaticPixPaymentAdapterTest {
    @Test
    fun `gera payload pix copia e cola com crc deterministico`() {
        val properties = GalAtelierProperties(
            pixKey = "teste@pix.com",
            pixMerchantName = "Gal Atelier",
            pixMerchantCity = "Sao Paulo"
        )
        val adapter = StaticPixPaymentAdapter(properties)

        val payload = adapter.createCopyPaste(Money.of("227.50"), "abc123")

        assertTrue(payload.startsWith("000201"))
        assertTrue(payload.contains("br.gov.bcb.pix"))
        assertTrue(payload.contains("teste@pix.com"))
        assertTrue(payload.endsWith(payload.takeLast(4)))
        assertEquals(payload, adapter.createCopyPaste(Money.of("227.50"), "abc123"))
    }
}
