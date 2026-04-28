package com.galatelier.domain.model

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class BriefingTypeTest {

    @Test
    fun `deve conter 10 tipos`() {
        val types = BriefingType.values()
        assertEquals(10, types.size)
    }

    @Test
    fun `deve ter GLUE_LESS`() {
        assertEquals(BriefingType.GLUE_LESS, BriefingType.valueOf("GLUE_LESS"))
    }

    @Test
    fun `deve ter LACE_FRONT`() {
        assertEquals(BriefingType.LACE_FRONT, BriefingType.valueOf("LACE_FRONT"))
    }

    @Test
    fun `deve ter FULL_LACE`() {
        assertEquals(BriefingType.FULL_LACE, BriefingType.valueOf("FULL_LACE"))
    }

    @Test
    fun `deve ter CLOSURE`() {
        assertEquals(BriefingType.CLOSURE, BriefingType.valueOf("CLOSURE"))
    }

    @Test
    fun `deve ter LACE_360`() {
        assertEquals(BriefingType.LACE_360, BriefingType.valueOf("LACE_360"))
    }

    @Test
    fun `deve ter U_PART`() {
        assertEquals(BriefingType.U_PART, BriefingType.valueOf("U_PART"))
    }

    @Test
    fun `deve ter WIG_CUSTOM`() {
        assertEquals(BriefingType.WIG_CUSTOM, BriefingType.valueOf("WIG_CUSTOM"))
    }

    @Test
    fun `deve ter MAINTENANCE`() {
        assertEquals(BriefingType.MAINTENANCE, BriefingType.valueOf("MAINTENANCE"))
    }

    @Test
    fun `deve ter HIGIENIZACAO`() {
        assertEquals(BriefingType.HIGIENIZACAO, BriefingType.valueOf("HIGIENIZACAO"))
    }

    @Test
    fun `deve ter SHOE_CUSTOMIZATION`() {
        assertEquals(BriefingType.SHOE_CUSTOMIZATION, BriefingType.valueOf("SHOE_CUSTOMIZATION"))
    }

    @Test
    fun `deve mapear para ServiceCatalog`() {
        // Verifica se todos os BriefingType têm entrada no ServiceCatalog
        BriefingType.values().forEach { type ->
            val item = ServiceCatalog.getByType(type)
            assertTrue(item != null, "ServiceCatalog deve conter entrada para $type")
        }
    }

    @Test
    fun `deve iterar para catalogo`() {
        val typesForCatalog = listOf(
            BriefingType.GLUE_LESS,
            BriefingType.LACE_FRONT,
            BriefingType.FULL_LACE,
            BriefingType.CLOSURE,
            BriefingType.LACE_360,
            BriefingType.U_PART,
            BriefingType.WIG_CUSTOM,
            BriefingType.MAINTENANCE,
            BriefingType.HIGIENIZACAO,
            BriefingType.SHOE_CUSTOMIZATION
        )

        typesForCatalog.forEach { type ->
            val item = ServiceCatalog.getByType(type)
            assertEquals(type, item?.briefingType)
        }
    }
}
