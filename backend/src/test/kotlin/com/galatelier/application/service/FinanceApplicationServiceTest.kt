package com.galatelier.application.service

import com.galatelier.application.port.input.FinanceSummary
import com.galatelier.application.port.output.AppointmentRepositoryPort
import com.galatelier.application.port.output.CustomerRepositoryPort
import com.galatelier.application.port.output.OrderRepositoryPort
import com.galatelier.application.port.output.OrderSummary
import com.galatelier.domain.model.Money
import com.galatelier.domain.model.OrderStatus
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDateTime
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class FinanceApplicationServiceTest {

    private lateinit var orderRepository: OrderRepositoryPort
    private lateinit var appointmentRepository: AppointmentRepositoryPort
    private lateinit var customerRepository: CustomerRepositoryPort
    private lateinit var financeService: FinanceApplicationService

    @BeforeEach
    fun setup() {
        orderRepository = Mockito.mock(OrderRepositoryPort::class.java)
        appointmentRepository = Mockito.mock(AppointmentRepositoryPort::class.java)
        customerRepository = Mockito.mock(CustomerRepositoryPort::class.java)
        financeService = FinanceApplicationService(orderRepository, appointmentRepository, customerRepository)
    }

    @Test
    fun deve_retornar_summary_vazio_quando_nao_ha_dados() {
        // Arrange
        `when`(orderRepository.findAll()).thenReturn(emptyList())
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(Money.ZERO, summary.totalRevenue)
        assertEquals(0, summary.totalCustomers)
        assertEquals(0.0, summary.conversionRate)
    }

    @Test
    fun deve_calcular_revenue_de_ordens_pagas() {
        // Arrange
        val paidOrder = OrderSummary(
            id = UUID.randomUUID(),
            price = BigDecimal("1500.00"),
            status = OrderStatus.PRODUCTION,
            depositPaid = BigDecimal.ZERO,
            paymentStatus = "PAID",
            createdAt = Instant.now()
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(paidOrder))
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(Money.of(BigDecimal("1500.00")), summary.totalRevenue)
    }

    @Test
    fun deve_calcular_pending_de_ordens_pendentes() {
        // Arrange
        val pendingOrder = OrderSummary(
            id = UUID.randomUUID(),
            price = BigDecimal("2000.00"),
            status = OrderStatus.QUOTED,
            depositPaid = BigDecimal.ZERO,
            paymentStatus = "PENDING",
            createdAt = Instant.now()
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(pendingOrder))
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(Money.of(BigDecimal("2000.00")), summary.pendingPayment)
    }

    @Test
    fun deve_calcular_deposit_pago() {
        // Arrange
        val orderWithDeposit = OrderSummary(
            id = UUID.randomUUID(),
            price = BigDecimal("3000.00"),
            status = OrderStatus.PRODUCTION,
            depositPaid = BigDecimal("500.00"),
            paymentStatus = "PENDING",
            createdAt = Instant.now()
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(orderWithDeposit))
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(Money.of(BigDecimal("500.00")), summary.totalDeposit)
    }

    @Test
    fun deve_calcular_conversion_rate() {
        // Arrange
        val orders = listOf(
            OrderSummary(
                id = UUID.randomUUID(),
                price = BigDecimal("1000.00"),
                status = OrderStatus.DELIVERED,
                depositPaid = BigDecimal.ZERO,
                paymentStatus = "PAID",
                createdAt = Instant.now()
            ),
            OrderSummary(
                id = UUID.randomUUID(),
                price = BigDecimal("1000.00"),
                status = OrderStatus.LEAD,
                depositPaid = BigDecimal.ZERO,
                paymentStatus = "PENDING",
                createdAt = Instant.now()
            )
        )
        `when`(orderRepository.findAll()).thenReturn(orders)
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(50.0, summary.conversionRate)
    }

    @Test
    fun deve_calcular_active_orders_em_producao() {
        // Arrange
        val productionOrder = OrderSummary(
            id = UUID.randomUUID(),
            price = BigDecimal("4000.00"),
            status = OrderStatus.PRODUCTION,
            depositPaid = BigDecimal.ZERO,
            paymentStatus = "PAID",
            createdAt = Instant.now()
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(productionOrder))
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(1, summary.activeOrders)
    }

    @Test
    fun deve_calcular_total_de_customers() {
        // Arrange
        `when`(orderRepository.findAll()).thenReturn(emptyList())
        `when`(appointmentRepository.findAll()).thenReturn(emptyList())
        `when`(customerRepository.findAll()).thenReturn(emptyList())

        // Act
        val summary = financeService.getSummary()

        // Assert
        assertNotNull(summary)
        assertEquals(0, summary.totalCustomers)
    }
}