package com.galatelier.adapter.output.whatsapp

import com.galatelier.application.port.output.WhatsAppMessageInput
import com.galatelier.application.port.output.WhatsAppMessagePort
import com.galatelier.config.GalAtelierProperties
import org.springframework.stereotype.Component
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Component
class WhatsAppWebAdapter(
    private val properties: GalAtelierProperties
) : WhatsAppMessagePort {
    override fun createMessage(input: WhatsAppMessageInput): String =
        """
        Oi, ${input.clientName}! ✨
        Analisei sua ideia para ${input.serviceLabel}.

        Resumo do briefing:
        • Cor: ${input.color}
        • Comprimento: ${input.lengthCm}cm
        • Textura: ${input.texture}
        • Densidade: ${input.density}
        • Prazo estimado: ${input.deadlineDays} dias

        Valor recomendado: R$ ${input.recommendedPrice}
        Para reservar a produção, o sinal fica em R$ ${input.depositPrice} via Pix.

        Posso seguir com sua reserva?
        """.trimIndent()

    override fun createLink(message: String): String {
        val encoded = URLEncoder.encode(message, StandardCharsets.UTF_8)
        return "https://wa.me/${properties.whatsappReceiver}?text=$encoded"
    }
}
