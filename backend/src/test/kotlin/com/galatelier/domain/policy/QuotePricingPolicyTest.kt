package com.galatelier.domain.policy

import com.galatelier.domain.model.Money
import java.math.BigDecimal
import kotlin.test.Test
import kotlin.test.assertEquals

class QuotePricingPolicyTest {
    private val policy = QuotePricingPolicy()

    @Test
    fun `calcula minimo recomendado premium e sinal`() {
        val result = policy.calculate(
            QuotePricingInput(
                materialCost = Money.of("150"),
                laborCost = Money.of("250"),
                complexityCost = Money.of("80"),
                urgencyCost = Money.of("20"),
                marginPercent = BigDecimal("30")
            )
        )

        assertEquals("575.00", result.minimumPrice.plain())
        assertEquals("650.00", result.recommendedPrice.plain())
        assertEquals("877.50", result.premiumPrice.plain())
        assertEquals("227.50", result.depositPrice.plain())
    }
}
