package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.TemplateType
import com.galatelier.adapter.output.persistence.entity.WhatsAppTemplateEntity
import com.galatelier.adapter.output.persistence.repository.WhatsAppTemplateRepository
import com.galatelier.application.port.output.WhatsAppMessagePort
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentMap

@RestController
@RequestMapping("/api/templates")
class WhatsAppTemplateController(
    private val templateRepository: WhatsAppTemplateRepository,
    private val whatsAppMessagePort: WhatsAppMessagePort
) {
    private val logger = LoggerFactory.getLogger(javaClass)
    private val sentMessages: ConcurrentMap<UUID, WhatsAppSentMessage> = ConcurrentHashMap()

    @GetMapping("/whatsapp")
    fun whatsappTemplates(): List<WhatsAppTemplateResponse> =
        templateRepository.findByActiveTrue().map { it.toResponse() }

    @GetMapping("/whatsapp/{id}")
    fun getTemplate(@PathVariable id: String): WhatsAppTemplateResponse? =
        templateRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    @GetMapping("/whatsapp/type/{type}")
    fun getTemplatesByType(@PathVariable type: TemplateType): List<WhatsAppTemplateResponse> =
        templateRepository.findByTemplateType(type).map { it.toResponse() }

    @PostMapping("/whatsapp")
    fun createTemplate(@RequestBody request: CreateWhatsAppTemplateRequest): WhatsAppTemplateResponse {
        val template = WhatsAppTemplateEntity(
            templateId = request.templateId,
            name = request.name,
            content = request.content,
            templateType = request.templateType,
            active = true
        )
        return templateRepository.save(template).toResponse()
    }

    @PutMapping("/whatsapp/{id}")
    fun updateTemplate(@PathVariable id: String, @RequestBody request: UpdateWhatsAppTemplateRequest): WhatsAppTemplateResponse? {
        val existing = templateRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            name = request.name ?: existing.name,
            content = request.content ?: existing.content,
            templateType = request.templateType ?: existing.templateType,
            active = request.active ?: existing.active,
            updatedAt = LocalDateTime.now()
        )
        return templateRepository.save(updated).toResponse()
    }

    @DeleteMapping("/whatsapp/{id}")
    fun deleteTemplate(@PathVariable id: String): Map<String, String> {
        templateRepository.deleteById(UUID.fromString(id))
        return mapOf("status" to "deleted")
    }

    @PostMapping("/whatsapp/send")
    fun sendWhatsAppMessage(@RequestBody request: WhatsAppSendRequest): WhatsAppSendResponse {
        val template = templateRepository.findByTemplateId(request.templateId)
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

        logger.info("WhatsApp enviado para ${request.phone} com template ${request.templateId}")

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

fun WhatsAppTemplateEntity.toResponse() = WhatsAppTemplateResponse(
    id = id.toString(),
    templateId = templateId,
    name = name,
    content = content,
    templateType = templateType,
    active = active,
    createdAt = createdAt.toString(),
    updatedAt = updatedAt.toString()
)

data class WhatsAppTemplateResponse(
    val id: String,
    val templateId: String,
    val name: String,
    val content: String,
    val templateType: TemplateType,
    val active: Boolean,
    val createdAt: String,
    val updatedAt: String
)

data class CreateWhatsAppTemplateRequest(
    val templateId: String,
    val name: String,
    val content: String,
    val templateType: TemplateType
)

data class UpdateWhatsAppTemplateRequest(
    val name: String? = null,
    val content: String? = null,
    val templateType: TemplateType? = null,
    val active: Boolean? = null
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