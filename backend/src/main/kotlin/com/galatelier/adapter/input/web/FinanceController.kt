package com.galatelier.adapter.input.web

import com.galatelier.application.port.input.FinanceUseCase
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/finance")
class FinanceController(
    private val financeUseCase: FinanceUseCase
) {

    @GetMapping("/summary")
    fun summary(): FinanceResponse {
        val result = financeUseCase.getSummary()
        return FinanceResponse(
            totalRevenue = result.totalRevenue.plain().toDouble(),
            pendingPayment = result.pendingPayment.plain().toDouble(),
            totalDeposit = result.totalDeposit.plain().toDouble(),
            completedServices = result.completedServices.plain().toDouble(),
            totalCustomers = result.totalCustomers,
            activeOrders = result.activeOrders,
            leadsThisMonth = result.leadsThisMonth,
            conversionRate = result.conversionRate
        )
    }
}

data class FinanceResponse(
    val totalRevenue: Double,
    val pendingPayment: Double,
    val totalDeposit: Double,
    val completedServices: Double,
    val totalCustomers: Int,
    val activeOrders: Int,
    val leadsThisMonth: Int,
    val conversionRate: Double
)