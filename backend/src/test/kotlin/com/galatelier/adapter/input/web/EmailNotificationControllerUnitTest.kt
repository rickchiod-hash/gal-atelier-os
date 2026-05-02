package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.email.MockEmailAdapter
import com.galatelier.adapter.output.email.EmailRecord
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.time.Instant
import java.util.UUID

class EmailNotificationControllerUnitTest {
    private val emailAdapter: MockEmailAdapter = mock()
    private val controller = EmailNotificationController(emailAdapter)

    @Test
    fun `getSentEmails should return mocked records`() {
        whenever(emailAdapter.getSentEmails()).thenReturn(
            listOf(EmailRecord(UUID.randomUUID(), "a@a.com", "Assunto", "Corpo", false, Instant.now()))
        )

        val result = controller.getSentEmails()

        assertEquals(1, result.size)
        assertEquals("a@a.com", result.first().to)
    }
}
