package com.galatelier.domain.model

import java.math.BigDecimal
import java.math.RoundingMode

class Money private constructor(val value: BigDecimal) : Comparable<Money> {
    init {
        require(value.scale() == 2) { "Money must have scale 2" }
        require(value >= BigDecimal.ZERO) { "Money cannot be negative" }
    }

    operator fun plus(other: Money): Money = of(value.add(other.value))
    operator fun times(multiplier: BigDecimal): Money = of(value.multiply(multiplier))

    override fun compareTo(other: Money): Int = value.compareTo(other.value)

    fun plain(): String = value.toPlainString()

    override fun equals(other: Any?): Boolean =
        other is Money && value.compareTo(other.value) == 0

    override fun hashCode(): Int = value.stripTrailingZeros().hashCode()

    override fun toString(): String = plain()

    companion object {
        val ZERO: Money = of(BigDecimal.ZERO)

        fun of(value: BigDecimal): Money =
            Money(value.setScale(2, RoundingMode.HALF_UP))

        fun of(value: String): Money = of(BigDecimal(value))
    }
}
