package com.galatelier.config

import com.galatelier.application.port.output.PixPaymentPort
import com.galatelier.application.port.output.QuoteRepository
import com.galatelier.application.port.output.WhatsAppMessagePort
import com.galatelier.application.service.QuoteApplicationService
import com.galatelier.domain.policy.QuotePricingPolicy
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Clock

@Configuration
class BeanConfiguration {
    @Bean
    fun clock(): Clock = Clock.systemUTC()

    @Bean
    fun quotePricingPolicy(): QuotePricingPolicy = QuotePricingPolicy()

    @Bean
    fun quoteApplicationService(
        quoteRepository: QuoteRepository,
        pixPaymentPort: PixPaymentPort,
        whatsAppMessagePort: WhatsAppMessagePort,
        quotePricingPolicy: QuotePricingPolicy,
        clock: Clock
    ): QuoteApplicationService =
        QuoteApplicationService(
            quoteRepository = quoteRepository,
            pixPaymentPort = pixPaymentPort,
            whatsAppMessagePort = whatsAppMessagePort,
            quotePricingPolicy = quotePricingPolicy,
            clock = clock
        )
}
