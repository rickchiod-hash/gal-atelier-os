package com.galatelier.application.port.input

import com.galatelier.domain.model.Money

data class FinanceSummary(
    val totalRevenue: Money,
    val pendingPayment: Money,
    val totalDeposit: Money,
    val completedServices: Money,
    val totalCustomers: Int,
    val activeOrders: Int,
    val leadsThisMonth: Int,
    val conversionRate: Double
)

interface FinanceUseCase {
    fun getSummary(): FinanceSummary
}
