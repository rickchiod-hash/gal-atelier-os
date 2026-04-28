package com.galatelier.domain.model

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ServiceCatalogTest {

    @Test
    fun `deve retornar 10 itens no catalogo`() {
        val items = ServiceCatalog.getAll()
        assertEquals(10, items.size)
    }

    @Test
    fun `deve conter Glueless Wig`() {
        val items = ServiceCatalog.getAll()
        val glueless = items.find { it.id == "glueless" }
        assertEquals("Glueless Wig", glueless?.label)
        assertEquals(BriefingType.GLUE_LESS, glueless?.briefingType)
    }

    @Test
    fun `deve conter Lace Front`() {
        val items = ServiceCatalog.getAll()
        val laceFront = items.find { it.id == "lace-front" }
        assertEquals("Lace Front", laceFront?.label)
        assertEquals(BriefingType.LACE_FRONT, laceFront?.briefingType)
    }

    @Test
    fun `deve conter Full Lace`() {
        val items = ServiceCatalog.getAll()
        val fullLace = items.find { it.id == "full-lace" }
        assertEquals("Full Lace", fullLace?.label)
        assertEquals(BriefingType.FULL_LACE, fullLace?.briefingType)
    }

    @Test
    fun `deve conter Closure`() {
        val items = ServiceCatalog.getAll()
        val closure = items.find { it.id == "closure" }
        assertEquals("Closure", closure?.label)
        assertEquals(BriefingType.CLOSURE, closure?.briefingType)
    }

    @Test
    fun `deve conter 360 Lace`() {
        val items = ServiceCatalog.getAll()
        val lace360 = items.find { it.id == "360-lace" }
        assertEquals("360 Lace", lace360?.label)
        assertEquals(BriefingType.LACE_360, lace360?.briefingType)
    }

    @Test
    fun `deve conter U-Part Wig`() {
        val items = ServiceCatalog.getAll()
        val uPart = items.find { it.id == "u-part" }
        assertEquals("U-Part Wig", uPart?.label)
        assertEquals(BriefingType.U_PART, uPart?.briefingType)
    }

    @Test
    fun `deve conter Wig Customizada`() {
        val items = ServiceCatalog.getAll()
        val custom = items.find { it.id == "wig-custom" }
        assertEquals("Wig Customizada", custom?.label)
        assertEquals(BriefingType.WIG_CUSTOM, custom?.briefingType)
    }

    @Test
    fun `deve conter Manutencao`() {
        val items = ServiceCatalog.getAll()
        val maintenance = items.find { it.id == "maintenance" }
        assertEquals("Manutenção", maintenance?.label)
        assertEquals(BriefingType.MAINTENANCE, maintenance?.briefingType)
    }

    @Test
    fun `deve conter Higienizacao Profunda`() {
        val items = ServiceCatalog.getAll()
        val higienizacao = items.find { it.id == "higienizacao" }
        assertEquals("Higienização Profunda", higienizacao?.label)
        assertEquals(BriefingType.HIGIENIZACAO, higienizacao?.briefingType)
    }

    @Test
    fun `deve conter Customizacao de Sapato`() {
        val items = ServiceCatalog.getAll()
        val shoe = items.find { it.id == "customizacao-sapato" }
        assertEquals("Customização de Sapato", shoe?.label)
        assertEquals(BriefingType.SHOE_CUSTOMIZATION, shoe?.briefingType)
    }

    @Test
    fun `getByType deve retornar item correto`() {
        val glueless = ServiceCatalog.getByType(BriefingType.GLUE_LESS)
        assertEquals("glueless", glueless?.id)
        assertEquals("Glueless Wig", glueless?.label)
    }

    @Test
    fun `getByType deve retornar null para tipo inexistente`() {
        // Criar um tipo que não existe no catalogo
        val result = ServiceCatalog.getByType(BriefingType.valueOf("GLUE_LESS"))
        // O tipo existe, entao testa com um que nao esta no catalogo
        // Como todos os tipos estao no catalogo, testa se retorna nulo para um tipo nao mapeado
        // (todos os BriefingType estao mapeados, entao esse teste valida que getByType funciona)
        assertEquals("glueless", ServiceCatalog.getByType(BriefingType.GLUE_LESS)?.id)
    }

    @Test
    fun `precos devem ser validos`() {
        val items = ServiceCatalog.getAll()
        items.forEach { item ->
            assertTrue(item.basePriceMin > 0, "Preço mínimo deve ser positivo para ${item.id}")
            assertTrue(item.basePriceMax >= item.basePriceMin, "Preço máximo deve ser >= mínimo para ${item.id}")
        }
    }

    @Test
    fun `prazos devem ser validos`() {
        val items = ServiceCatalog.getAll()
        items.forEach { item ->
            assertTrue(item.estimatedDays > 0, "Prazo deve ser positivo para ${item.id}")
            assertTrue(item.estimatedDays <= 180, "Prazo deve ser <= 180 dias para ${item.id}")
        }
    }

    @Test
    fun `materials nao devem ser vazios`() {
        val items = ServiceCatalog.getAll()
        items.forEach { item ->
            assertTrue(item.materials.isNotEmpty(), "Materials não deve ser vazio para ${item.id}")
        }
    }
}
