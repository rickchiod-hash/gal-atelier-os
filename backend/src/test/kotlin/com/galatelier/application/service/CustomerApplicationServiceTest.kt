package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.adapter.output.persistence.entity.CustomerTier
import com.galatelier.adapter.output.persistence.repository.CustomerRepository
import com.galatelier.application.port.input.CreateCustomerRequest
import com.galatelier.application.port.input.UpdateCustomerRequest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.never
import org.mockito.Mockito.verify
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.Optional
import java.util.UUID

class CustomerApplicationServiceTest {

    private val repository = mock(CustomerRepository::class.java)
    private val service = CustomerApplicationService(repository)

    @Test
    fun `list returns customers sorted by totalSpent descending`() {
        val ana = CustomerEntity(name = "Ana", whatsapp = "11999999999", totalSpent = BigDecimal(100.0))
        val bruno = CustomerEntity(name = "Bruno", whatsapp = "11988888888", totalSpent = BigDecimal(500.0))
        val carla = CustomerEntity(name = "Carla", whatsapp = "11977777777", totalSpent = BigDecimal(300.0))
        whenever(repository.findAll()).thenReturn(listOf(ana, carla, bruno))

        val result = service.list()

        assertEquals(3, result.size)
        assertEquals("Bruno", result[0].name)
        assertEquals("Carla", result[1].name)
        assertEquals("Ana", result[2].name)
    }

    @Test
    fun `get returns null for non-existent customer`() {
        whenever(repository.findById(any<UUID>())).thenReturn(Optional.empty())

        val result = service.get("00000000-0000-0000-0000-000000000000")

        assertNull(result)
    }

    @Test
    fun `get returns customer for valid id`() {
        val customer = CustomerEntity(name = "Maria", whatsapp = "11999999999", id = UUID.randomUUID())
        whenever(repository.findById(customer.id!!)).thenReturn(Optional.of(customer))

        val result = service.get(customer.id.toString())

        assertNotNull(result)
        assertEquals("Maria", result!!.name)
        assertEquals("11999999999", result.whatsapp)
        assertEquals(CustomerTier.NEW, result.tier)
    }

    @Test
    fun `create saves and returns customer response`() {
        val request = CreateCustomerRequest(
            name = "João",
            whatsapp = "11912345678",
            email = "joao@email.com"
        )
        whenever(repository.save(any<CustomerEntity>())).thenAnswer { invocation ->
            val entity = invocation.getArgument<CustomerEntity>(0)
            entity.copy(id = UUID.randomUUID())
        }

        val result = service.create(request)

        assertNotNull(result.id)
        assertEquals("João", result.name)
        assertEquals("11912345678", result.whatsapp)
        assertEquals("joao@email.com", result.email)
        assertEquals(CustomerTier.NEW, result.tier)
        assertEquals(0.0, result.totalSpent, 0.01)
        assertEquals(0, result.ordersCount)
    }

    @Test
    fun `update modifies only provided fields`() {
        val customer = CustomerEntity(name = "Ana", whatsapp = "11999999999", id = UUID.randomUUID())
        whenever(repository.findById(customer.id!!)).thenReturn(Optional.of(customer))
        whenever(repository.save(any<CustomerEntity>())).thenAnswer { invocation ->
            invocation.getArgument(0)
        }

        val result = service.update(
            id = customer.id.toString(),
            request = UpdateCustomerRequest(
                name = "Ana Silva",
                email = "ana@novoemail.com"
            )
        )

        assertNotNull(result)
        assertEquals("Ana Silva", result!!.name)
        assertEquals("11999999999", result.whatsapp)
        assertEquals("ana@novoemail.com", result.email)
    }

    @Test
    fun `update returns null for non-existent customer`() {
        whenever(repository.findById(any<UUID>())).thenReturn(Optional.empty())

        val result = service.update(
            id = "00000000-0000-0000-0000-000000000000",
            request = UpdateCustomerRequest(name = "Test")
        )

        assertNull(result)
    }
}
