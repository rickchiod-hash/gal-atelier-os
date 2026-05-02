package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import com.galatelier.adapter.output.persistence.repository.OrderRepository
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever

class CustomerPortalControllerUnitTest {
    private val customerRepository: CustomerRepository = mock()
    private val orderRepository: OrderRepository = mock()
    private val controller = CustomerPortalController(customerRepository, orderRepository)

    @Test
    fun `getCustomerArea should return found false when customer does not exist`() {
        whenever(customerRepository.findByWhatsapp("5511999999999")).thenReturn(null)

        val result = controller.getCustomerArea("5511999999999")

        assertFalse(result.found)
    }
}
