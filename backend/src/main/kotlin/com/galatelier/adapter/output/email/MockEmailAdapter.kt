package com.galatelier.adapter.output.email

import com.galatelier.application.port.output.EmailNotificationPort
import com.galatelier.application.port.output.EmailResult
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.time.Instant
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentMap

data class EmailRecord(
    val id: UUID,
    val to: String,
    val subject: String,
    val body: String,
    val isHtml: Boolean,
    val sentAt: Instant
)

@Component
class MockEmailAdapter : EmailNotificationPort {
    private val logger = LoggerFactory.getLogger(javaClass)
    private val sentEmails: ConcurrentMap<UUID, EmailRecord> = ConcurrentHashMap()

    override fun sendEmail(to: String, subject: String, body: String, isHtml: Boolean): EmailResult {
        val emailId = UUID.randomUUID()
        val sentAt = Instant.now()

        val record = EmailRecord(
            id = emailId,
            to = to,
            subject = subject,
            body = body,
            isHtml = isHtml,
            sentAt = sentAt
        )
        sentEmails[emailId] = record

        logger.info("Email mock enviado: id=$emailId to=$to subject=$subject")

        return EmailResult(
            id = emailId,
            success = true,
            sentAt = sentAt
        )
    }

    fun getSentEmails(): List<EmailRecord> = sentEmails.values.toList()
}