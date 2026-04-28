package com.galatelier.adapter.output.persistence

import com.galatelier.adapter.output.persistence.entity.AppointmentEntity
import com.galatelier.adapter.output.persistence.repository.AppointmentRepository
import com.galatelier.application.port.output.AppointmentRepositoryPort
import com.galatelier.application.port.output.AppointmentSummary
import java.time.Instant
import java.util.UUID
import org.springframework.stereotype.Component
import java.time.ZoneOffset

@Component
class AppointmentRepositoryAdapter(
    private val appointmentRepository: AppointmentRepository
) : AppointmentRepositoryPort {

    override fun findAll(): List<AppointmentSummary> =
        appointmentRepository.findAll().map { it.toSummary() }

    private fun AppointmentEntity.toSummary() = AppointmentSummary(
        id = id,
        status = status.name,
        price = price,
        createdAt = createdAt.toInstant(ZoneOffset.UTC)
    )
}
