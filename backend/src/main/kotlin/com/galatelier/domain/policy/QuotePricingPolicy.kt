package com.galatelier.domain.policy

import com.galatelier.domain.model.Money
import java.math.BigDecimal
import java.math.RoundingMode

data class QuotePricingInput(
    val materialCost: Money,
    val laborCost: Money,
    val complexityCost: Money,
    val urgencyCost: Money,
    val marginPercent: BigDecimal
)

data class QuotePricingBreakdown(
    val minimumPrice: Money,
    val recommendedPrice: Money,
    val premiumPrice: Money,
    val depositPrice: Money
)

class QuotePricingPolicy {
    fun calculate(input: QuotePricingInput): QuotePricingBreakdown {
        require(input.marginPercent >= BigDecimal.ZERO) { "Margin percent cannot be negative" }

        val base = input.materialCost + input.laborCost + input.complexityCost + input.urgencyCost
        val marginMultiplier = BigDecimal.ONE.add(
            input.marginPercent.divide(BigDecimal("100"), 4, RoundingMode.HALF_UP)
        )

        val recommended = base * marginMultiplier
        val minimum = base * BigDecimal("1.15")
        val premium = recommended * BigDecimal("1.35")
        val deposit = recommended * BigDecimal("0.35")

        return QuotePricingBreakdown(
            minimumPrice = minimum,
            recommendedPrice = recommended,
            premiumPrice = premium,
            depositPrice = deposit
        )
    }
}
