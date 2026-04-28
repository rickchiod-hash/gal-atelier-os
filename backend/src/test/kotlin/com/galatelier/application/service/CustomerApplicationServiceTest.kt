package com.galatelier.application.service

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import com.galatelier.adapter.output.persistence.entity.CustomerResponse
import com.galatelier.adapter.output.persistence.entity.CustomerTier
import com.galatelier.application.port.input.CreateCustomerRequest
import com.galatelier.application.port.input.CustomerUseCase
import com.galatelier.application.port.input.UpdateCustomerRequest
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.data.domain.*

class CustomerApplicationServiceTest {

    @Test
    fun `list returns customers sorted by totalSpent descending`() {
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        repo.save(CustomerEntity(name = "Ana", whatsapp = "11999999999", totalSpent = 100.0))
        repo.save(CustomerEntity(name = "Bruno", whatsapp = "11988888888", totalSpent = 500.0))
        repo.save(CustomerEntity(name = "Carla", whatsapp = "11977777777", totalSpent = 300.0))

        val result = service.list()

        assertEquals(3, result.size)
        assertEquals("Bruno", result[0].name)
        assertEquals("Carla", result[1].name)
        assertEquals("Ana", result[2].name)
    }

    @Test
    fun `get returns null for non-existent customer`() {
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        val result = service.get("00000000-0000-0000-0000-000000000000")

        assertNull(result)
    }

    @Test
    fun `get returns customer for valid id`() {
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        val customer = repo.save(CustomerEntity(name = "Maria", whatsapp = "11999999999"))

        val result = service.get(customer.id.toString())

        assertNotNull(result)
        assertEquals("Maria", result!!.name)
        assertEquals("11999999999", result.whatsapp)
        assertEquals(CustomerTier.NEW, result.tier)
    }

    @Test
    fun `create saves and returns customer response`() {
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        val request = CreateCustomerRequest(
            name = "João",
            whatsapp = "11912345678",
            email = "joao@email.com"
        )

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
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        val customer = repo.save(CustomerEntity(name = "Ana", whatsapp = "11999999999"))

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
        val repo = FakeCustomerRepository()
        val service = CustomerApplicationService(repo)

        val result = service.update(
            id = "00000000-0000-0000-0000-000000000000",
            request = UpdateCustomerRequest(name = "Test")
        )

        assertNull(result)
    }
}

// Fake implementation for testing (does not depend on Spring)
private class FakeCustomerRepository : org.springframework.data.repository.CrudRepository<CustomerEntity, java.util.UUID> {
    private val customers = mutableListOf<CustomerEntity>()

    override fun save(entity: CustomerEntity): CustomerEntity {
        if (entity.id == null) {
            val newId = java.util.UUID.randomUUID()
            val newCustomer = entity.copy(id = newId)
            customers.add(newCustomer)
            return newCustomer
        }
        customers.removeIf { it.id == entity.id }
        customers.add(entity)
        return entity
    }

    override fun findById(id: java.util.UUID): java.util.Optional<CustomerEntity> =
        java.util.Optional.ofNullable(customers.find { it.id == id })

    override fun findAll(): List<CustomerEntity> = customers.toList()

    override fun deleteById(id: java.util.UUID) { customers.removeIf { it.id == id } }
    override fun delete(entity: CustomerEntity) { customers.remove(entity) }
    override fun deleteAll(entities: MutableIterable<CustomerEntity>) {}
    override fun deleteAll() { customers.clear() }
    override fun existsById(id: java.util.UUID): Boolean = customers.any { it.id == id }
    override fun <S : CustomerEntity?> saveAll(entities: MutableIterable<S>): MutableIterable<S> = entities
    override fun findAllById(ids: MutableIterable<java.util.UUID>): MutableIterable<CustomerEntity> = mutableListOf()
    override fun count(): Long = customers.size.toLong()
    override fun <S : CustomerEntity?> findAll(example: org.springframework.data.domain.Example<S>): MutableIterable<S> = mutableListOf()
    override fun <S : CustomerEntity?> findOne(example: org.springframework.data.domain.Example<S>): java.util.Optional<S> = java.util.Optional.empty()
    override fun findAll(sort: Sort): MutableIterable<CustomerEntity> = customers
    override fun findAll(pageable: Pageable): Page<CustomerEntity> = PageImpl(customers)
}
