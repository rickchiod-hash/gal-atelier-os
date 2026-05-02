package com.galatelier.adapter.input.web

import com.galatelier.application.service.CustomerSegmentationService
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock

class SegmentationControllerUnitTest {
    private val service: CustomerSegmentationService = mock()
    private val controller = SegmentationController(service)

    @Test
    fun `getAvailableSegments should expose VIP and LEAD keys`() {
        val result = controller.getAvailableSegments()

        assertTrue(result.containsKey("VIP_GOLD"))
        assertTrue(result.containsKey("LEAD"))
    }
}
