package com.galatelier.domain.model

import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertFailsWith

class WigBriefingTest {

    private val validClientId = UUID.randomUUID()

    @Test
    fun `deve criar briefing valido`() {
        val briefing = WigBriefing(
            id = UUID.randomUUID(),
            clientId = validClientId,
            type = BriefingType.LACE_FRONT,
            color = "Castanho",
            lengthCm = 50,
            texture = "Ondulada",
            density = "180%",
            capSize = "M",
            deadlineDays = 15,
            notes = "Sem notas",
            createdAt = java.time.Instant.now()
        )
        assertEquals("Castanho", briefing.color)
        assertEquals(50, briefing.lengthCm)
    }

    @Test
    fun `deve falhar com cor em branco`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "   ",
                lengthCm = 50,
                texture = "Lisa",
                density = "150%",
                capSize = null,
                deadlineDays = 10,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com textura em branco`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 50,
                texture = "",
                density = "150%",
                capSize = null,
                deadlineDays = 10,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com densidade em branco`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 50,
                texture = "Lisa",
                density = "   ",
                capSize = null,
                deadlineDays = 10,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com comprimento menor que 10`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 5,
                texture = "Lisa",
                density = "150%",
                capSize = null,
                deadlineDays = 10,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com comprimento maior que 120`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 150,
                texture = "Lisa",
                density = "150%",
                capSize = null,
                deadlineDays = 10,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com prazo menor que 1`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 50,
                texture = "Lisa",
                density = "150%",
                capSize = null,
                deadlineDays = 0,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com prazo maior que 180`() {
        assertFailsWith<IllegalArgumentException> {
            WigBriefing(
                id = UUID.randomUUID(),
                clientId = validClientId,
                type = BriefingType.GLUE_LESS,
                color = "Preto",
                lengthCm = 50,
                texture = "Lisa",
                density = "150%",
                capSize = null,
                deadlineDays = 200,
                notes = null,
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve aceitar capSize nulo`() {
        val briefing = WigBriefing(
            id = UUID.randomUUID(),
            clientId = validClientId,
            type = BriefingType.GLUE_LESS,
            color = "Preto",
            lengthCm = 50,
            texture = "Lisa",
            density = "150%",
            capSize = null,
            deadlineDays = 10,
            notes = null,
            createdAt = java.time.Instant.now()
        )
        assertEquals(null, briefing.capSize)
    }

    @Test
    fun `deve aceitar notas nulas`() {
        val briefing = WigBriefing(
            id = UUID.randomUUID(),
            clientId = validClientId,
            type = BriefingType.GLUE_LESS,
            color = "Preto",
            lengthCm = 50,
            texture = "Lisa",
            density = "150%",
            capSize = null,
            deadlineDays = 10,
            notes = null,
            createdAt = java.time.Instant.now()
        )
        assertEquals(null, briefing.notes)
    }
}
