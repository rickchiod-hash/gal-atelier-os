package com.galatelier.adapter.input.web

import com.galatelier.application.port.output.WhatsAppMessagePort
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentMap

@RestController
@RequestMapping("/api/templates")
class WhatsAppTemplateController(
    private val whatsAppMessagePort: WhatsAppMessagePort
) {
    private val logger = LoggerFactory.getLogger(javaClass)
    private val sentMessages: ConcurrentMap<UUID, WhatsAppSentMessage> = ConcurrentHashMap()

    @GetMapping("/whatsapp")
    fun whatsappTemplates(): List<WhatsAppTemplate> = listOf(
        WhatsAppTemplate(
            id = "primeiro-atendimento",
            name = "Primeiro atendimento",
            content = "Olá, {nome}! 😍\nObrigada pelo interesse.\nSou especialista em perucas e laces personalizadas.\nComo posso te ajudar hoje?"
        ),
        WhatsAppTemplate(
            id = "diagnostico",
            name = "Diagnóstico",
            content = "Oi, {nome}! Para te indicar a melhor opção, preciso saber:\n• Já usou wig ou lace antes?\n• Qual o tom da sua pele?\n• Prefere liso ou cacheado?\n• quanto tempo vc quer usar por dia?\nMe conta! 😊"
        ),
        WhatsAppTemplate(
            id = "orcamento",
            name = "Orçamento",
            content = "Oi, {nome}! Segue o orçamento:\n\n{servico}\nValor: R$ {valor}\nPrazo: {prazo}dias\n\nO sinal de R$ {sinal} confirma a reserva.\nPosso te enviar fotos dos materiais?"
        ),
        WhatsAppTemplate(
            id = "follow-up-24h",
            name = "Follow-up 24h",
            content = "Oi, {nome}! Tudo bem?\nVi que recebeu o orçamento.\nTem alguma dúvida?\nEstou à disposição! 💕"
        ),
        WhatsAppTemplate(
            id = "follow-up-72h",
            name = "Follow-up 72h",
            content = "Oi, {nome}! Passando para lembrar do orçamento.\nAs vagas para esse serviço são limitadas.\nMe conta se precisa de algo mais! 😘"
        ),
        WhatsAppTemplate(
            id = "cobranca-sinal",
            name = "Cobrança de sinal",
            content = "Oi, {nome}! Tudo certo?\nO prazo para confirmar a reserva é hoje.\nO sinal de R$ {sinal} pode ser via Pix:\n{pix}\nMe avisa quando transferir! ✅"
        ),
        WhatsAppTemplate(
            id = "confirmacao-pedido",
            name = "Confirmação de pedido",
            content = "Eba, {nome}! Pedido confirmado! 🎉\n\nServiço: {servico}\nPrazo: {prazo} dias\nVou te mandar fotos do progresso!\n\nQualquer dúvida é só chamar."
        ),
        WhatsAppTemplate(
            id = "em-producao",
            name = "Em produção",
            content = "Oi, {nome}! Seu pedido está em produção! 🔨\nJá fiz a base e escolhi o cabelo.\nTe mando fotos em breve!\n\nPrazo: {prazo} dias"
        ),
        WhatsAppTemplate(
            id = "pedido-pronto",
            name = "Pedido pronto",
            content = "Oi, {nome}! Seu wig/lace está PRONTO! ✨\n\nVem buscar ou prefere que eu envie?\nNão esquece de levar a faixa ou fixação que vc usa em casa!\n\nSee you! 💕"
        ),
        WhatsAppTemplate(
            id = "pos-venda",
            name = "Pós-venda",
            content = "Oi, {nome}! Como ficou o wig/lace? 💕\n\nEspero que ame!\nQualquer dúvida sobre manutenção ou ajuste, me chama.\n\nE se precisar de outro serviço ou indication, será um prazer ajudar! 😍"
        ),
        WhatsAppTemplate(
            id = "pedido-avaliacao",
            name = "Pedido de avaliação",
            content = "Oi, {nome}! amou o resultado? 📸\n\nSe puder, me manda uma foto e conta o que achou!\nSua opinião é muito importante!\n\nE se conhece alguém que也想, me indica! 😘"
        ),
        WhatsAppTemplate(
            id = "recompra",
            name = "Recompra",
            content = "Oi, {nome}! Passando para lembrar:\nSeu wig já tem {meses} meses.\nÉ hora de fazer manutenção?\nPosso agendar um horário!\n\nOu se quiser uma nova opção, tenho modelos Lindos! 💕"
        ),
        WhatsAppTemplate(
            id = "aniversario",
            name = "Aniversário",
            content = "Feliz aniversário, {nome}! 🎂🎉\n\nQue seu dia seja LINDO!\nEspero que vc ame cada momento.\n\nQuando tiver um tempinho, me conta como foi!\nTe mando um beijo! 😘"
        )
    )

    @PostMapping("/whatsapp/send")
    fun sendWhatsAppMessage(@RequestBody request: WhatsAppSendRequest): WhatsAppSendResponse {
        val template = whatsappTemplates().find { it.id == request.templateId }
            ?: throw IllegalArgumentException("Template não encontrado: ${request.templateId}")

        var content = template.content
        request.variables.forEach { (key, value) ->
            content = content.replace("{$key}", value)
        }

        val messageId = UUID.randomUUID()
        val message = WhatsAppSentMessage(
            id = messageId,
            recipientPhone = request.phone,
            message = content,
            link = whatsAppMessagePort.createLink(content)
        )
        sentMessages[messageId] = message

        logger.info("WhatsApp mock enviado para ${request.phone} com template ${request.templateId}")

        return WhatsAppSendResponse(
            messageId = messageId,
            message = content,
            link = message.link,
            sentAt = message.sentAt
        )
    }

    @GetMapping("/whatsapp/sent")
    fun getSentMessages(): List<WhatsAppSentMessage> = sentMessages.values.toList()
}

data class WhatsAppTemplate(
    val id: String,
    val name: String,
    val content: String
)

data class WhatsAppSentMessage(
    val id: UUID,
    val recipientPhone: String,
    val message: String,
    val link: String,
    val sentAt: java.time.Instant = java.time.Instant.now()
)

data class WhatsAppSendRequest(
    val phone: String,
    val templateId: String,
    val variables: Map<String, String> = emptyMap()
)

data class WhatsAppSendResponse(
    val messageId: UUID,
    val message: String,
    val link: String,
    val sentAt: java.time.Instant
)