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
@RequestMapping("/api/customers")
class CustomerController {

    private val customers = mutableListOf(
        CustomerResponse(
            id = "1",
            name = "Juliana Costa",
            whatsapp = "5511988884444",
            email = "juliana@email.com",
            totalSpent = 3500.0,
            ordersCount = 3,
            favoriteService = "Lace Front",
            lastOrderDate = "2026-04-15",
            tier = CustomerTier.GOLD,
            createdAt = "2025-08-10"
        ),
        CustomerResponse(
            id = "2",
            name = "Patrícia Lima",
            whatsapp = "5511977775555",
            email = "patricia@email.com",
            totalSpent = 5200.0,
            ordersCount = 5,
            favoriteService = "Full Lace",
            lastOrderDate = "2026-04-20",
            tier = CustomerTier.PLATINUM,
            createdAt = "2025-03-22"
        ),
        CustomerResponse(
            id = "3",
            name = "Amanda Souza",
            whatsapp = "5511966663333",
            email = "amanda@email.com",
            totalSpent = 1200.0,
            ordersCount = 1,
            favoriteService = "Glueless Wig",
            lastOrderDate = "2026-04-25",
            tier = CustomerTier.SILVER,
            createdAt = "2026-01-15"
        ),
        CustomerResponse(
            id = "4",
            name = "Fernanda Alves",
            whatsapp = "5511955552222",
            email = "fernanda@email.com",
            totalSpent = 850.0,
            ordersCount = 2,
            favoriteService = "Manutenção",
            lastOrderDate = "2026-04-10",
            tier = CustomerTier.BRONZE,
            createdAt = "2025-11-08"
        ),
        CustomerResponse(
            id = "5",
            name = "Beatriz Santos",
            whatsapp = "5511944441111",
            email = "beatriz@email.com",
            totalSpent = 2800.0,
            ordersCount = 2,
            favoriteService = "Wig Customizada",
            lastOrderDate = "2026-04-18",
            tier = CustomerTier.GOLD,
            createdAt = "2025-09-30"
        )
    )

    @GetMapping
    fun list(): List<CustomerResponse> = customers.sortedByDescending { it.totalSpent }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): CustomerResponse? = customers.find { it.id == id }

    @PostMapping
    fun create(@RequestBody request: CreateCustomerRequest): CustomerResponse {
        val customer = CustomerResponse(
            id = UUID.randomUUID().toString(),
            name = request.name,
            whatsapp = request.whatsapp,
            email = request.email ?: "",
            totalSpent = 0.0,
            ordersCount = 0,
            favoriteService = "-",
            lastOrderDate = "-",
            tier = CustomerTier.NEW,
            createdAt = Instant.now().toString().take(10)
        )
        customers.add(0, customer)
        return customer
    }

    @PatchMapping("/{id}")
    fun update(@PathVariable id: String, @RequestBody request: UpdateCustomerRequest): CustomerResponse? {
        val index = customers.indexOfFirst { it.id == id }
        if (index == -1) return null
        val current = customers[index]
        val updated = current.copy(
            name = request.name ?: current.name,
            whatsapp = request.whatsapp ?: current.whatsapp,
            email = request.email ?: current.email
        )
        customers[index] = updated
        return updated
    }
}

data class CustomerResponse(
    val id: String,
    val name: String,
    val whatsapp: String,
    val email: String,
    val totalSpent: Double,
    val ordersCount: Int,
    val favoriteService: String,
    val lastOrderDate: String,
    val tier: CustomerTier,
    val createdAt: String
)

enum class CustomerTier {
    NEW,
    BRONZE,
    SILVER,
    GOLD,
    PLATINUM,
    VIP
}

data class CreateCustomerRequest(
    val name: String,
    val whatsapp: String,
    val email: String? = null
)

data class UpdateCustomerRequest(
    val name: String? = null,
    val whatsapp: String? = null,
    val email: String? = null
)