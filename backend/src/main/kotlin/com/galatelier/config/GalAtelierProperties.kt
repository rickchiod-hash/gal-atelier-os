package com.galatelier.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "galatelier")
data class GalAtelierProperties(
    var whatsappReceiver: String = "5511914136961",
    var pixKey: String = "chave-pix-exemplo",
    var pixMerchantName: String = "GAL ATELIER",
    var pixMerchantCity: String = "SAO PAULO",
    var aiProvider: String = "mock"
)
