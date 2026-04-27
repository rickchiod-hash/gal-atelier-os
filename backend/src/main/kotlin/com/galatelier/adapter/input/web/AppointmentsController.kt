package com.galatelier.adapter.input.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/appointments")
class AppointmentsController {

    private val appointments = mutableListOf(
        AppointmentResponse(
            id = "1",
            customerId = "1",
            customerName = "Juliana Costa",
            serviceType = "Manutenção",
            date = "2026-04-28",
            time = "14:00",
            duration = 60,
            status = AppointmentStatus.SCHEDULED,
            notes = "Higienização + repositionamento",
            price = 250.0,
            createdAt = "2026-04-25"
        ),
        AppointmentResponse(
            id = "2",
            customerId = "2",
            customerName = "Patrícia Lima",
            serviceType = "Prova",
            date = "2026-04-29",
            time = "10:00",
            duration = 45,
            status = AppointmentStatus.SCHEDULED,
            notes = "Prova do Full Lace",
            price = 0.0,
            createdAt = "2026-04-26"
        ),
        AppointmentResponse(
            id = "3",
            customerId = "3",
            customerName = "Amanda Souza",
            serviceType = "Instalação",
            date = "2026-04-27",
            time = "15:00",
            duration = 90,
            status = AppointmentStatus.COMPLETED,
            notes = "Instalação Glueless",
            price = 450.0,
            createdAt = "2026-04-20"
        ),
        AppointmentResponse(
            id = "4",
            customerId = "5",
            customerName = "Beatriz Santos",
            serviceType = "Retoque",
            date = "2026-04-30",
            time = "11:00",
            duration = 30,
            status = AppointmentStatus.SCHEDULED,
            notes = "Retoque de baby hair",
            price = 150.0,
            createdAt = "2026-04-27"
        ),
        AppointmentResponse(
            id = "5",
            customerId = "4",
            customerName = "Fernanda Alves",
            serviceType = "Consulta",
            date = "2026-05-02",
            time = "16:00",
            duration = 60,
            status = AppointmentStatus.SCHEDULED,
            notes = "Consulta para novo projeto",
            price = 0.0,
            createdAt = "2026-04-27"
        ),
        AppointmentResponse(
            id = "6",
            customerId = "2",
            customerName = "Patrícia Lima",
            serviceType = "Instalação",
            date = "2026-05-05",
            time = "09:00",
            duration = 120,
            status = AppointmentStatus.SCHEDULED,
            notes = "Instalação 360 Lace",
            price = 600.0,
            createdAt = "2026-04-26"
        )
    )

    @GetMapping
    fun list(): List<AppointmentResponse> = appointments.sortedBy { it.date }

    @GetMapping("/today")
    fun today(): List<AppointmentResponse> {
        val today = Instant.now().toString().take(10)
        return appointments.filter { it.date == today }
    }

    @GetMapping("/upcoming")
    fun upcoming(): List<AppointmentResponse> {
        val today = Instant.now().toString().take(10)
        return appointments.filter { it.date >= today && it.status == AppointmentStatus.SCHEDULED }
            .sortedBy { it.date }
    }

    @GetMapping("/customer/{customerId}")
    fun listByCustomer(@PathVariable customerId: String): List<AppointmentResponse> =
        appointments.filter { it.customerId == customerId }.sortedBy { it.date }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): AppointmentResponse? = appointments.find { it.id == id }

    @PostMapping
    fun create(@RequestBody request: CreateAppointmentRequest): AppointmentResponse {
        val appointment = AppointmentResponse(
            id = UUID.randomUUID().toString(),
            customerId = request.customerId,
            customerName = request.customerName,
            serviceType = request.serviceType,
            date = request.date,
            time = request.time,
            duration = request.duration,
            status = AppointmentStatus.SCHEDULED,
            notes = request.notes ?: "",
            price = request.price,
            createdAt = Instant.now().toString().take(10)
        )
        appointments.add(appointment)
        return appointment
    }

    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: String, @RequestBody request: UpdateAppointmentStatusRequest): AppointmentResponse? {
        val index = appointments.indexOfFirst { it.id == id }
        if (index == -1) return null
        val current = appointments[index]
        val updated = current.copy(status = AppointmentStatus.valueOf(request.status))
        appointments[index] = updated
        return updated
    }

    @GetMapping("/summary")
    fun summary(): Map<String, Any> {
        val today = Instant.now().toString().take(10)
        return mapOf(
            "totalToday" to appointments.count { it.date == today },
            "totalUpcoming" to appointments.count { it.date >= today && it.status == AppointmentStatus.SCHEDULED },
            "totalCompleted" to appointments.count { it.status == AppointmentStatus.COMPLETED },
            "totalCancelled" to appointments.count { it.status == AppointmentStatus.CANCELLED }
        )
    }
}

data class AppointmentResponse(
    val id: String,
    val customerId: String,
    val customerName: String,
    val serviceType: String,
    val date: String,
    val time: String,
    val duration: Int,
    val status: AppointmentStatus,
    val notes: String,
    val price: Double,
    val createdAt: String
)

enum class AppointmentStatus {
    SCHEDULED,
    COMPLETED,
    CANCELLED,
    NO_SHOW
}

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