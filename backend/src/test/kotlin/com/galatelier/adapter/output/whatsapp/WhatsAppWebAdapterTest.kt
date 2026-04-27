package com.galatelier.adapter.output.whatsapp

import com.galatelier.application.port.output.WhatsAppMessageInput
import com.galatelier.config.GalAtelierProperties
import kotlin.test.Test
import kotlin.test.assertTrue

class WhatsAppWebAdapterTest {
    @Test
    fun `cria mensagem e link para atendimento da Gal`() {
        val adapter = WhatsAppWebAdapter(GalAtelierProperties(whatsappReceiver = "5511914136961"))

        val message = adapter.createMessage(
            WhatsAppMessageInput(
                clientName = "Maria",
                serviceLabel = "lace front personalizada",
                color = "Castanho",
                lengthCm = 55,
                texture = "Ondulada",
                density = "180%",
                deadlineDays = 15,
                recommendedPrice = "650.00",
                depositPrice = "227.50"
            )
        )
        val link = adapter.createLink(message)

        assertTrue(message.contains("Maria"))
        assertTrue(message.contains("R$ 650.00"))
        assertTrue(link.startsWith("https://wa.me/5511914136961?text="))
    }
}
