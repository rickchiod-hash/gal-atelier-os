package com.galatelier.application.port.output

interface EmailNotificationPort {
    fun sendEmail(to: String, subject: String, body: String, isHtml: Boolean = false): EmailResult
}

data class EmailResult(
    val id: java.util.UUID,
    val success: Boolean,
    val sentAt: java.time.Instant = java.time.Instant.now()
)