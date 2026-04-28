package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.CustomerEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface CustomerRepository : JpaRepository<CustomerEntity, UUID> {
    fun findByWhatsapp(whatsapp: String): CustomerEntity?
}
