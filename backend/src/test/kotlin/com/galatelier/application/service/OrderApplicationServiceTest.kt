package com.galatelier.application.service

import com.galatelier.adapter.input.web.OrderResponse
import com.galatelier.adapter.output.persistence.entity.OrderEntity
import com.galatelier.adapter.output.persistence.entity.OrderStatus as EntityOrderStatus
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import com.galatelier.application.port.input.CreateOrderRequest
import com.galatelier.application.port.input.OrderUseCase
import com.galatelier.application.port.input.UpdateOrderStatusRequest
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import java.math.BigDecimal
import java.util.Optional
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class OrderApplicationServiceTest {

    private lateinit var orderRepository: OrderRepository
    private lateinit var orderService: OrderUseCase

    @BeforeEach
    fun setup() {
        orderRepository = Mockito.mock(OrderRepository::class.java)
        orderService = OrderApplicationService(orderRepository)
    }

    @Test
    fun `deve criar ordem com sucesso`() {
        // Arrange
        val request = CreateOrderRequest(
            customerId = "123e4567-e89b-12d3-a456-426614174000",
            customerName = "Cliente Teste",
            serviceType = "Glueless Wig",
            price = 1500.00
        )

        val savedOrder = OrderEntity(
            id = UUID.randomUUID(),
            customerId = UUID.fromString(request.customerId),
            customerName = request.customerName,
            serviceType = request.serviceType,
            price = request.price.toBigDecimal(),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        `when`(orderRepository.save(any())).thenReturn(savedOrder)

        // Act
        val response = orderService.create(request)

        // Assert
        assertNotNull(response)
        assertEquals("Cliente Teste", response.customerName)
        assertEquals("Glueless Wig", response.serviceType)
        // Verificar price com escala 2
        assertEquals(0, BigDecimal("1500.00").compareTo(response.price))
        assertEquals(EntityOrderStatus.LEAD.name, response.status)
    }

    @Test
    fun `deve listar ordens`() {
        // Arrange
        val order1 = OrderEntity(
            id = UUID.randomUUID(),
            customerId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000"),
            customerName = "Cliente 1",
            serviceType = "Glueless Wig",
            price = BigDecimal("1500.00"),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        val order2 = OrderEntity(
            id = UUID.randomUUID(),
            customerId = UUID.fromString("123e4567-e89b-12d3-a456-426614174001"),
            customerName = "Cliente 2",
            serviceType = "Lace Front",
            price = BigDecimal("2500.00"),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(order1, order2))

        // Act
        val responses = orderService.list()

        // Assert
        assertEquals(2, responses.size)
        assertTrue(responses.all { it.customerName.isNotBlank() })
    }

    @Test
    fun `deve listar ordens por cliente`() {
        // Arrange
        val customerId = "123e4567-e89b-12d3-a456-426614174000"
        val order1 = OrderEntity(
            id = UUID.randomUUID(),
            customerId = UUID.fromString(customerId),
            customerName = "Cliente Teste",
            serviceType = "Glueless Wig",
            price = BigDecimal("1500.00"),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        val order2 = OrderEntity(
            id = UUID.randomUUID(),
            customerId = UUID.fromString("123e4567-e89b-12d3-a456-426614174002"),
            customerName = "Outro Cliente",
            serviceType = "Lace Front",
            price = BigDecimal("2500.00"),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        `when`(orderRepository.findAll()).thenReturn(listOf(order1, order2))

        // Act
        val responses = orderService.listByCustomer(customerId)

        // Assert
        assertEquals(1, responses.size)
        assertEquals(customerId, responses[0].customerId.toString())
        assertEquals("Cliente Teste", responses[0].customerName)
    }

    @Test
    fun `deve atualizar status da ordem`() {
        // Arrange
        val orderId = UUID.randomUUID()
        val existingOrder = OrderEntity(
            id = orderId,
            customerId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000"),
            customerName = "Cliente Teste",
            serviceType = "Glueless Wig",
            price = BigDecimal("1500.00"),
            status = EntityOrderStatus.LEAD,
            paymentStatus = "PENDING"
        )
        `when`(orderRepository.findById(orderId)).thenReturn(Optional.of(existingOrder))
        `when`(orderRepository.save(any())).thenAnswer { it.getArgument(0) }

        val updateRequest = UpdateOrderStatusRequest(
            status = "PAID",
            paymentStatus = "PAID",
            depositPaid = 750.00
        )

        // Act
        val updateResponse = orderService.updateStatus(orderId.toString(), updateRequest)

        // Assert
        assertNotNull(updateResponse)
        assertEquals("PAID", updateResponse.status)
        assertEquals("PAID", updateResponse.paymentStatus)
        // Verificar depositPaid com escala 2
        assertEquals(0, BigDecimal("750.00").compareTo(updateResponse.depositPaid))
    }

    @Test
    fun `deve retornar null ao buscar ordem inexistente`() {
        // Arrange
        val nonExistentId = UUID.randomUUID()
        `when`(orderRepository.findById(nonExistentId)).thenReturn(Optional.empty())

        // Act
        val response = orderService.get(nonExistentId.toString())

        // Assert
        assertNull(response)
    }

    @Test
    fun `deve retornar lista vazia quando não há ordens`() {
        // Arrange
        `when`(orderRepository.findAll()).thenReturn(emptyList())

        // Act
        val responses = orderService.list()

        // Assert
        assertEquals(0, responses.size)
    }
}