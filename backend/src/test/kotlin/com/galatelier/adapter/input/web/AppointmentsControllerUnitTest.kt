package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.AppointmentEntity
import com.galatelier.adapter.output.persistence.entity.AppointmentStatus
import com.galatelier.adapter.output.persistence.repository.AppointmentRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import java.time.LocalDate
import java.math.BigDecimal
import java.util.UUID

class AppointmentsControllerUnitTest {
    private val repository: AppointmentRepository = mock()
    private val controller = AppointmentsController(repository)

    @Test
    fun `today should return only today appointments`() {
        val today = LocalDate.now()
        whenever(repository.findAll()).thenReturn(
            listOf(
                AppointmentEntity(customerId = UUID.randomUUID(), serviceType = "Lace", date = today, time = "10:00", price = BigDecimal.TEN),
                AppointmentEntity(customerId = UUID.randomUUID(), serviceType = "Wig", date = today.minusDays(1), time = "11:00", price = BigDecimal.TEN)
            )
        )

        val result = controller.today()

        assertEquals(1, result.size)
        assertEquals(AppointmentStatus.SCHEDULED, result.first().status)
    }
}
