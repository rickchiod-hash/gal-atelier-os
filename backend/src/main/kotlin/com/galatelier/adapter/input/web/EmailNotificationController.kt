package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.email.MockEmailAdapter
import com.galatelier.adapter.output.email.EmailRecord
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/emails")
class EmailNotificationController(
    private val mockEmailAdapter: MockEmailAdapter
) {
    private val logger = LoggerFactory.getLogger(javaClass)

    @PostMapping("/send")
    fun sendEmail(@RequestBody request: EmailSendRequest): EmailSendResponse {
        logger.info("Enviando email mock para ${request.to} - Assunto: ${request.subject}")

        val result = mockEmailAdapter.sendEmail(
            to = request.to,
            subject = request.subject,
            body = request.body,
            isHtml = request.isHtml
        )

        return EmailSendResponse(
            messageId = result.id,
            to = request.to,
            subject = request.subject,
            sentAt = result.sentAt,
            success = result.success
        )
    }

    @GetMapping("/sent")
    fun getSentEmails(): List<EmailRecord> = mockEmailAdapter.getSentEmails()
}

data class EmailSendRequest(
    val to: String,
    val subject: String,
    val body: String,
    val isHtml: Boolean = false
)

data class EmailSendResponse(
    val messageId: UUID,
    val to: String,
    val subject: String,
    val sentAt: Instant,
    val success: Boolean
)