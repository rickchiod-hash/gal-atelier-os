package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.AppointmentEntity
import com.galatelier.adapter.output.persistence.entity.AppointmentStatus as EntityAppointmentStatus
import com.galatelier.adapter.output.persistence.repository.AppointmentRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/appointments")
class AppointmentsController(
    private val appointmentRepository: AppointmentRepository
) {

    @GetMapping
    fun list(): List<AppointmentResponse> = appointmentRepository.findAll()
        .sortedBy { it.date }
        .map { it.toResponse() }

    @GetMapping("/today")
    fun today(): List<AppointmentResponse> {
        val today = LocalDate.now()
        return appointmentRepository.findAll()
            .filter { it.date == today }
            .map { it.toResponse() }
    }

    @GetMapping("/upcoming")
    fun upcoming(): List<AppointmentResponse> {
        val today = LocalDate.now()
        return appointmentRepository.findAll()
            .filter { it.date >= today && it.status == EntityAppointmentStatus.SCHEDULED }
            .sortedBy { it.date }
            .map { it.toResponse() }
    }

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<AppointmentResponse> =
        appointmentRepository.findAll()
            .filter { it.customerId.toString() == customerId }
            .sortedBy { it.date }
            .map { it.toResponse() }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): AppointmentResponse? = 
        appointmentRepository.findById(UUID.fromString(id)).orElse(null)?.toResponse()

    @PostMapping
    fun create(@RequestBody request: CreateAppointmentRequest): AppointmentResponse {
        val appointment = AppointmentEntity(
            customerId = UUID.fromString(request.customerId),
            customerName = request.customerName,
            serviceType = request.serviceType,
            date = LocalDate.parse(request.date),
            time = request.time,
            duration = request.duration,
            status = EntityAppointmentStatus.SCHEDULED,
            notes = request.notes,
            price = request.price.toBigDecimal()
        )
        return appointmentRepository.save(appointment).toResponse()
    }

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateAppointmentStatusRequest): AppointmentResponse? {
        val existing = appointmentRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityAppointmentStatus.valueOf(request.status),
            updatedAt = LocalDateTime.now()
        )
        return appointmentRepository.save(updated).toResponse()
    }

    @GetMapping("/summary")
    fun summary(): Map<String, Any> {
        val today = LocalDate.now()
        val appointments = appointmentRepository.findAll()
        return mapOf(
            "totalToday" to appointments.count { it.date == today },
            "totalUpcoming" to appointments.count { it.date >= today && it.status == EntityAppointmentStatus.SCHEDULED },
            "totalCompleted" to appointments.count { it.status == EntityAppointmentStatus.COMPLETED },
            "totalCancelled" to appointments.count { it.status == EntityAppointmentStatus.CANCELLED },
            "byStatus" to mapOf(
                "SCHEDULED" to appointments.count { it.status == EntityAppointmentStatus.SCHEDULED },
                "COMPLETED" to appointments.count { it.status == EntityAppointmentStatus.COMPLETED },
                "CANCELLED" to appointments.count { it.status == EntityAppointmentStatus.CANCELLED },
                "NO_SHOW" to appointments.count { it.status == EntityAppointmentStatus.NO_SHOW }
            )
        )
    }

    @PostMapping("/{id}/complete")
    fun complete(@PathVariable id: String): AppointmentResponse? {
        val existing = appointmentRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityAppointmentStatus.COMPLETED,
            updatedAt = LocalDateTime.now()
        )
        return appointmentRepository.save(updated).toResponse()
    }

    @PostMapping("/{id}/cancel")
    fun cancel(@PathVariable id: String): AppointmentResponse? {
        val existing = appointmentRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            status = EntityAppointmentStatus.CANCELLED,
            updatedAt = LocalDateTime.now()
        )
        return appointmentRepository.save(updated).toResponse()
    }
}

fun AppointmentEntity.toResponse() = AppointmentResponse(
    id = id.toString(),
    customerId = customerId.toString(),
    customerName = customerName,
    serviceType = serviceType,
    date = date.toString(),
    time = time,
    duration = duration,
    status = status,
    notes = notes ?: "",
    price = price.toDouble(),
    createdAt = createdAt.toLocalDate().toString()
)

data class AppointmentResponse(
    val id: String,
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val date: String,
    val time: String,
    val duration: Int,
    val status: EntityAppointmentStatus,
    val notes: String,
    val price: Double,
    val createdAt: String
)

data class CreateAppointmentRequest(
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val date: String,
    val time: String,
    val duration: Int = 60,
    val notes: String? = null,
    val price: Double = 0.0
)

data class UpdateAppointmentStatusRequest(
    val status: String
)