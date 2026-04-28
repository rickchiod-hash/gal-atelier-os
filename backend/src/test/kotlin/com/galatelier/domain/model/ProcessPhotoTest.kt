package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ProcessPhotoTest {

    private val orderId = UUID.randomUUID()
    private val now = Instant.now()

    @Test
    fun `deve criar foto de processo`() {
        val photo = ProcessPhoto(
            id = UUID.randomUUID(),
            orderId = orderId,
            photoUrl = "https://example.com/photo1.jpg",
            description = "Início da produção",
            uploadedAt = now
        )

        assertEquals(orderId, photo.orderId)
        assertEquals("https://example.com/photo1.jpg", photo.photoUrl)
        assertEquals("Início da produção", photo.description)
    }

    @Test
    fun `deve aceitar description nula`() {
        val photo = createPhoto(description = null)
        assertNull(photo.description)
    }

    @Test
    fun `deve aceitar URL com https`() {
        val photo = createPhoto(photoUrl = "https://cdn.galatelier.com/process/step1.jpg")
        assertTrue(photo.photoUrl.startsWith("https://"))
    }

    @Test
    fun `deve aceitar diferentes orderIds`() {
        val order1 = UUID.randomUUID()
        val order2 = UUID.randomUUID()

        val photo1 = createPhoto(orderId = order1)
        val photo2 = createPhoto(orderId = order2)

        assertEquals(order1, photo1.orderId)
        assertEquals(order2, photo2.orderId)
    }

    @Test
    fun `deve criar multiplas fotos para mesma ordem`() {
        val sameOrderId = UUID.randomUUID()

        val photo1 = createPhoto(orderId = sameOrderId, photoUrl = "https://example.com/1.jpg")
        val photo2 = createPhoto(orderId = sameOrderId, photoUrl = "https://example.com/2.jpg")
        val photo3 = createPhoto(orderId = sameOrderId, photoUrl = "https://example.com/3.jpg")

        assertEquals(sameOrderId, photo1.orderId)
        assertEquals(sameOrderId, photo2.orderId)
        assertEquals(sameOrderId, photo3.orderId)
    }

    @Test
    fun `deve ter timestamp de upload`() {
        val specificTime = Instant.parse("2026-04-28T10:00:00Z")
        val photo = createPhoto(uploadedAt = specificTime)
        assertEquals(specificTime, photo.uploadedAt)
    }

    @Test
    fun `deve aceitar descriptions diversas`() {
        val descriptions = listOf(
            "Corte realizado",
            "Aplicação de coloração",
            "Finalização",
            null
        )

        descriptions.forEach { desc ->
            val photo = createPhoto(description = desc)
            assertEquals(desc, photo.description)
        }
    }

    private fun createPhoto(
        orderId: UUID = this.orderId,
        photoUrl: String = "https://example.com/photo.jpg",
        description: String? = "Descrição do processo",
        uploadedAt: Instant = now
    ) = ProcessPhoto(
        id = UUID.randomUUID(),
        orderId = orderId,
        photoUrl = photoUrl,
        description = description,
        uploadedAt = uploadedAt
    )
}
