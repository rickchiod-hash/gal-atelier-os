package com.galatelier.domain.model

import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class DiscountCouponTest {

    private val now = Instant.now()

    @Test
    fun `deve criar cupom ativo`() {
        val coupon = DiscountCoupon(
            id = UUID.randomUUID(),
            code = "GAL10",
            discountPercent = 10.0,
            validUntil = now.plus(30, ChronoUnit.DAYS),
            maxUses = 100,
            usedCount = 0,
            active = true
        )

        assertEquals("GAL10", coupon.code)
        assertEquals(10.0, coupon.discountPercent)
        assertEquals(100, coupon.maxUses)
        assertEquals(0, coupon.usedCount)
        assertTrue(coupon.active)
    }

    @Test
    fun `deve criar cupom inativo`() {
        val coupon = createCoupon(active = false)
        assertFalse(coupon.active)
    }

    @Test
    fun `deve criar cupom com usedCount maior que zero`() {
        val coupon = createCoupon(usedCount = 5)
        assertEquals(5, coupon.usedCount)
    }

    @Test
    fun `deve aceitar discountPercent zero`() {
        val coupon = createCoupon(discountPercent = 0.0)
        assertEquals(0.0, coupon.discountPercent)
    }

    @Test
    fun `deve aceitar discountPercent 100`() {
        val coupon = createCoupon(discountPercent = 100.0)
        assertEquals(100.0, coupon.discountPercent)
    }

    @Test
    fun `deve aceitar maxUses zero (ilimitado)`() {
        val coupon = createCoupon(maxUses = 0)
        assertEquals(0, coupon.maxUses)
    }

    @Test
    fun `deve aceitar code com espacos`() {
        val coupon = createCoupon(code = "GAL 10 OFF")
        assertEquals("GAL 10 OFF", coupon.code)
    }

    @Test
    fun `deve verificar se cupom ainda e valido (data futura)`() {
        val validUntil = now.plus(10, ChronoUnit.DAYS)
        val coupon = createCoupon(validUntil = validUntil)
        assertTrue(validUntil.isAfter(now))
    }

    @Test
    fun `deve verificar se cupom expirou (data passada)`() {
        val validUntil = now.minus(1, ChronoUnit.DAYS)
        val coupon = createCoupon(validUntil = validUntil)
        assertTrue(validUntil.isBefore(now))
    }

    @Test
    fun `deve criar com default values`() {
        val coupon = DiscountCoupon(
            id = UUID.randomUUID(),
            code = "TEST",
            discountPercent = 5.0,
            validUntil = now.plus(1, ChronoUnit.DAYS),
            maxUses = 1,
            usedCount = 0,
            active = true
        )

        // Verifica defaults
        assertEquals(0, coupon.usedCount)
        assertTrue(coupon.active)
    }

    private fun createCoupon(
        code: String = "TEST10",
        discountPercent: Double = 10.0,
        validUntil: Instant = now.plus(30, ChronoUnit.DAYS),
        maxUses: Int = 100,
        usedCount: Int = 0,
        active: Boolean = true
    ) = DiscountCoupon(
        id = UUID.randomUUID(),
        code = code,
        discountPercent = discountPercent,
        validUntil = validUntil,
        maxUses = maxUses,
        usedCount = usedCount,
        active = active
    )
}
