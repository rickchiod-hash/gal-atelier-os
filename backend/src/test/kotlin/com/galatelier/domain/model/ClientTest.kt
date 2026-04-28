package com.galatelier.domain.model

import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class ClientTest {

    @Test
    fun `deve criar cliente valido`() {
        val client = Client(
            id = UUID.randomUUID(),
            name = "Maria Silva",
            whatsapp = "5511999999999",
            createdAt = java.time.Instant.now()
        )
        assertEquals("Maria Silva", client.name)
        assertEquals("5511999999999", client.whatsapp)
    }

    @Test
    fun `deve falhar com nome em branco`() {
        assertFailsWith<IllegalArgumentException> {
            Client(
                id = UUID.randomUUID(),
                name = "   ",
                whatsapp = "5511999999999",
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com nome vazio`() {
        assertFailsWith<IllegalArgumentException> {
            Client(
                id = UUID.randomUUID(),
                name = "",
                whatsapp = "5511999999999",
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com whatsapp muito curto`() {
        assertFailsWith<IllegalArgumentException> {
            Client(
                id = UUID.randomUUID(),
                name = "Maria",
                whatsapp = "551199999",
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve falhar com whatsapp muito longo`() {
        assertFailsWith<IllegalArgumentException> {
            Client(
                id = UUID.randomUUID(),
                name = "Maria",
                whatsapp = "5511999999999999999",
                createdAt = java.time.Instant.now()
            )
        }
    }

    @Test
    fun `deve aceitar whatsapp com 12 digitos`() {
        val client = Client(
            id = UUID.randomUUID(),
            name = "Maria",
            whatsapp = "551199999999",
            createdAt = java.time.Instant.now()
        )
        assertEquals("551199999999", client.whatsapp)
    }

    @Test
    fun `deve aceitar whatsapp com 13 digitos`() {
        val client = Client(
            id = UUID.randomUUID(),
            name = "Maria",
            whatsapp = "5511999999999",
            createdAt = java.time.Instant.now()
        )
        assertEquals("5511999999999", client.whatsapp)
    }
}
