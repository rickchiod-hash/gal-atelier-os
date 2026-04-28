package com.galatelier.domain.model

import java.math.BigDecimal
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class MoneyTest {

    @Test
    fun `deve criar Money com escala 2`() {
        val money = Money.of("123.45")
        assertEquals("123.45", money.plain())
    }

    @Test
    fun `deve arredondar para escala 2`() {
        val money = Money.of("123.456")
        assertEquals("123.46", money.plain())
    }

    @Test
    fun `deve falhar com escala maior que 2`() {
        val money = Money.of(BigDecimal("100.00"))
        // O init block verifica se scale == 2
        assertEquals(2, money.value.scale())
    }

    @Test
    fun `deve falhar com valor negativo`() {
        assertFailsWith<IllegalArgumentException> {
            Money.of("-10.00")
        }
    }

    @Test
    fun `deve somar dois Money`() {
        val a = Money.of("100.50")
        val b = Money.of("50.25")
        assertEquals("150.75", (a + b).plain())
    }

    @Test
    fun `deve multiplicar Money por BigDecimal`() {
        val money = Money.of("100.00")
        val result = money * BigDecimal("1.3")
        assertEquals("130.00", result.plain())
    }

    @Test
    fun `deve comparar Money corretamente`() {
        val a = Money.of("100.00")
        val b = Money.of("100.00")
        val c = Money.of("150.00")

        assertEquals(0, a.compareTo(b))
        assert(a < c)
        assert(c > a)
    }

    @Test
    fun `deve criar ZERO corretamente`() {
        assertEquals("0.00", Money.ZERO.plain())
    }

    @Test
    fun `equals deve comparar valores numericamente`() {
        val a = Money.of("100.00")
        val b = Money.of("100.000") // será arredondado para 100.00
        assertEquals(a, b)
    }

    @Test
    fun `hashCode deve ser consistente`() {
        val a = Money.of("100.00")
        val b = Money.of("100.00")
        assertEquals(a.hashCode(), b.hashCode())
    }

    @Test
    fun `toString deve retornar valor plain`() {
        val money = Money.of("123.45")
        assertEquals("123.45", money.toString())
    }
}
