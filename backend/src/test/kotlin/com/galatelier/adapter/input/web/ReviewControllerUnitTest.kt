package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.ReviewEntity
import com.galatelier.adapter.output.persistence.repository.ReviewRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.util.UUID

class ReviewControllerUnitTest {
    private val repository: ReviewRepository = mock()
    private val controller = ReviewController(repository)

    @Test
    fun `listApproved should map approved reviews`() {
        whenever(repository.findByApprovedTrue()).thenReturn(
            listOf(
                ReviewEntity(orderId = UUID.randomUUID(), customerId = UUID.randomUUID(), rating = 5, comment = "ótimo", photoUrl = null, beforePhotoUrl = null, afterPhotoUrl = null, approved = true)
            )
        )

        val result = controller.listApproved()

        assertEquals(1, result.size)
        assertEquals(5, result.first().rating)
    }
}
