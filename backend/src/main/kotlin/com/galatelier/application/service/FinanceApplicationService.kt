package com.galatelier.application.service

import com.galatelier.application.port.input.FinanceSummary
import org.springframework.stereotype.Service
import com.galatelier.application.port.input.FinanceUseCase
import com.galatelier.domain.model.Money
import com.galatelier.domain.model.OrderStatus
import com.galatelier.application.port.output.OrderRepositoryPort
import com.galatelier.application.port.output.AppointmentRepositoryPort
import com.galatelier.application.port.output.CustomerRepositoryPort
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.ZoneId
import java.math.BigDecimal

@Service
class FinanceApplicationService(
    private val orderRepository: OrderRepositoryPort,
    private val appointmentRepository: AppointmentRepositoryPort,
    private val customerRepository: CustomerRepositoryPort
) : FinanceUseCase {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun getSummary(): FinanceSummary {
        val orders = orderRepository.findAll()
        val appointments = appointmentRepository.findAll()
        val customers = customerRepository.findAll()

        val today = LocalDate.now()
        val monthStart = today.withDayOfMonth(1)
        val zone = ZoneId.systemDefault()

        val revenue = orders
            .filter { it.paymentStatus.contains("PAID") || it.paymentStatus == "FULL_PAID" }
            .fold(Money.ZERO) { acc, order -> acc + Money.of(order.price) }

        val pending = orders
            .filter { it.paymentStatus == "PENDING" || it.paymentStatus == "AWAITING" }
            .fold(Money.ZERO) { acc, order -> acc + Money.of(order.price) }

        val deposit = orders
            .filter { it.depositPaid > BigDecimal.ZERO }
            .fold(Money.ZERO) { acc, order -> acc + Money.of(order.depositPaid) }

        val completedServices = appointments
            .filter { it.status == "COMPLETED" }
            .fold(Money.ZERO) { acc, appointment -> acc + Money.of(appointment.price) }

        val activeOrders = orders.count {
            it.status in listOf(OrderStatus.PRODUCTION, OrderStatus.READY)
        }

        val leadsThisMonth = orders.count {
            val localDate = it.createdAt.atZone(zone).toLocalDate()
            !localDate.isBefore(monthStart)
        }

        val delivered = orders.count { it.status == OrderStatus.DELIVERED }
        val conversionRate = if (orders.isNotEmpty()) {
            (delivered.toDouble() / orders.size.toDouble()) * 100
        } else 0.0

        log.info("Finance summary generated: revenue={} pending={} deposit={}", revenue, pending, deposit)

        return FinanceSummary(
            totalRevenue = revenue,
            pendingPayment = pending,
            totalDeposit = deposit,
            completedServices = completedServices,
            totalCustomers = customers.size,
            activeOrders = activeOrders,
            leadsThisMonth = leadsThisMonth,
            conversionRate = conversionRate
        )
    }
}
