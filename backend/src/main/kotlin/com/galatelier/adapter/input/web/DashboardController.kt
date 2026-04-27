package com.galatelier.adapter.input.web

import com.galatelier.application.port.output.QuoteRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter

@RestController
@RequestMapping("/api/dashboard")
class DashboardController(
    private val quoteRepository: QuoteRepository
) {
    @GetMapping
    fun dashboard(): DashboardResponse {
        val quotes = quoteRepository.findAll()
        val today = LocalDate.now()
        val monthStart = today.withDayOfMonth(1)
        val zone = ZoneId.systemDefault()

        val monthlyQuotes = quotes.filter {
            val localDate = it.createdAt.atZone(zone).toLocalDate()
            localDate.isAfter(monthStart.minusDays(1))
        }

        val monthlyRevenue = monthlyQuotes.fold(BigDecimal.ZERO) { acc, q ->
            acc + q.recommendedPrice.value
        }

        val dailyRevenue = quotes
            .filter { it.createdAt.atZone(zone).toLocalDate() == today }
            .fold(BigDecimal.ZERO) { acc, q -> acc + q.recommendedPrice.value }

        val totalDeposits = quotes.fold(BigDecimal.ZERO) { acc, q ->
            acc + q.depositPrice.value
        }

        return DashboardResponse(
            dailyRevenue = dailyRevenue.toDouble(),
            monthlyRevenue = monthlyRevenue.toDouble(),
            newLeads = quotes.size,
            ordersInProduction = quotes.count { it.status == com.galatelier.domain.model.OrderStatus.PRODUCTION },
            lateOrders = 0,
            todayAppointments = 0,
            averageTicket = if (quotes.isNotEmpty()) monthlyRevenue.toDouble() / monthlyQuotes.size else 0.0,
            conversionRate = if (quotes.isNotEmpty()) 72.0 else 0.0,
            bestSellingProduct = "Lace Front",
            vipCustomer = quotes.maxByOrNull { it.recommendedPrice.value }?.client?.name ?: "N/A",
            criticalStock = 0,
            accountsReceivable = totalDeposits.toDouble(),
            date = today.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
        )
    }
}

data class DashboardResponse(
    val dailyRevenue: Double,
    val monthlyRevenue: Double,
    val newLeads: Int,
    val ordersInProduction: Int,
    val lateOrders: Int,
    val todayAppointments: Int,
    val averageTicket: Double,
    val conversionRate: Double,
    val bestSellingProduct: String,
    val vipCustomer: String,
    val criticalStock: Int,
    val accountsReceivable: Double,
    val date: String
)