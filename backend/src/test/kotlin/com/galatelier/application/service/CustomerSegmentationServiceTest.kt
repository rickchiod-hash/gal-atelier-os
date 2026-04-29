package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import java.math.BigDecimal
import java.util.UUID
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class CustomerSegmentationServiceTest {

    private lateinit var customerRepository: CustomerRepository
    private lateinit var segmentationService: CustomerSegmentationService

    @BeforeEach
    fun setup() {
        customerRepository = Mockito.mock(CustomerRepository::class.java)
        segmentationService = CustomerSegmentationService(customerRepository)
    }

    @Test
    fun testCategorizeAsVipGoldWhenTotalSpentGreaterThanOrEqualTo3000() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Cliente Gold",
            whatsapp = "5511999999999",
            totalSpent = BigDecimal("3500.00"),
            ordersCount = 2
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("VIP_GOLD", segment)
    }

    @Test
    fun testCategorizeAsVipSilverWhenTotalSpentGreaterThanOrEqualTo1500() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Cliente Silver",
            whatsapp = "5511888888888",
            totalSpent = BigDecimal("2000.00"),
            ordersCount = 1
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("VIP_SILVER", segment)
    }

    @Test
    fun testCategorizeAsRecurringWhenOrdersCountGreaterThanOrEqualTo5() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Cliente Recorrente",
            whatsapp = "5511777777777",
            totalSpent = BigDecimal("1000.00"),
            ordersCount = 6
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("RECURRING", segment)
    }

    @Test
    fun testCategorizeAsActiveWhenOrdersCountGreaterThanOrEqualTo2() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Cliente Ativo",
            whatsapp = "5511666666666",
            totalSpent = BigDecimal("800.00"),
            ordersCount = 3
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("ACTIVE", segment)
    }

    @Test
    fun testCategorizeAsNewWhenOrdersCountEquals1() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Cliente Novo",
            whatsapp = "5511555555555",
            totalSpent = BigDecimal("500.00"),
            ordersCount = 1
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("NEW", segment)
    }

    @Test
    fun `deve categorizar como LEAD quando sem pedidos`() {
        // Arrange
        val customer = CustomerEntity(
            id = UUID.randomUUID(),
            name = "Lead",
            whatsapp = "5511444444444",
            totalSpent = BigDecimal.ZERO,
            ordersCount = 0
        )

        // Act
        val segment = segmentationService.categorizeCustomer(customer)

        // Assert
        assertEquals("LEAD", segment)
    }

    @Test
    fun testReturnSegmentsForAllCustomers() {
        // Arrange
        val customers = listOf(
            CustomerEntity(id = UUID.randomUUID(), name = "Gold", whatsapp = "5511", totalSpent = BigDecimal("5000.00"), ordersCount = 3),
            CustomerEntity(id = UUID.randomUUID(), name = "Silver", whatsapp = "5512", totalSpent = BigDecimal("2000.00"), ordersCount = 1),
            CustomerEntity(id = UUID.randomUUID(), name = "New", whatsapp = "5513", totalSpent = BigDecimal.ZERO, ordersCount = 0)
        )
        `when`(customerRepository.findAll()).thenReturn(customers)

        // Act
        val segments = segmentationService.getAllWithSegments()

        // Assert
        assertNotNull(segments)
        assertEquals(3, segments.size)
        assertTrue(segments.any { it.segment == "VIP_GOLD" })
        assertTrue(segments.any { it.segment == "VIP_SILVER" })
        assertTrue(segments.any { it.segment == "LEAD" })
    }

    @Test
    fun `deve filtrar por segmento especifico`() {
        // Arrange
        val customers = listOf(
            CustomerEntity(id = UUID.randomUUID(), name = "Gold", whatsapp = "5511", totalSpent = BigDecimal("5000.00"), ordersCount = 3),
            CustomerEntity(id = UUID.randomUUID(), name = "Silver", whatsapp = "5512", totalSpent = BigDecimal("2000.00"), ordersCount = 1)
        )
        `when`(customerRepository.findAll()).thenReturn(customers)

        // Act
        val vipCustomers = segmentationService.getBySegment("VIP_GOLD")

        // Assert
        assertNotNull(vipCustomers)
        assertEquals(1, vipCustomers.size)
        assertEquals("VIP_GOLD", vipCustomers[0].segment)
    }
}