package com.galatelier.application.port.output

interface WhatsAppMessagePort {
    fun createMessage(input: WhatsAppMessageInput): String
    fun createLink(message: String): String
}

data class WhatsAppMessageInput(
    val clientName: String,
    val serviceLabel: String,
    val color: String,
    val lengthCm: Int,
    val texture: String,
    val density: String,
    val deadlineDays: Int,
    val recommendedPrice: String,
    val depositPrice: String
)
