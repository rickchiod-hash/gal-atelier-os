package com.galatelier.adapter.input.web

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.mock.web.MockMultipartFile
import java.util.UUID

class ProcessPhotoControllerUnitTest {
    private val controller = ProcessPhotoController()

    @Test
    fun `upload and list should persist process photo in memory`() {
        val orderId = UUID.randomUUID()
        val photo = MockMultipartFile("photo", "wig.jpg", "image/jpeg", "img".toByteArray())

        controller.uploadPhoto(orderId, photo, "antes")
        val result = controller.listPhotos(orderId)

        assertEquals(1, result.size)
        assertEquals("antes", result.first().description)
    }
}
