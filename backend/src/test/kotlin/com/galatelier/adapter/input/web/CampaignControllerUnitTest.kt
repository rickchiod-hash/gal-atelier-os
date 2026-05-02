package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.CampaignEntity
import com.galatelier.adapter.output.persistence.repository.CampaignRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.time.LocalDateTime

class CampaignControllerUnitTest {
    private val repository: CampaignRepository = mock()
    private val controller = CampaignController(repository)

    @Test
    fun `list should return mapped response`() {
        whenever(repository.findAll()).thenReturn(
            listOf(
                CampaignEntity(name = "Campanha A", createdAt = LocalDateTime.now())
            )
        )

        val result = controller.list()

        assertEquals(1, result.size)
        assertEquals("Campanha A", result.first().name)
    }
}
