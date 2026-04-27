package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.WhatsAppTemplateEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface WhatsAppTemplateRepository : JpaRepository<WhatsAppTemplateEntity, UUID> {
    fun findByTemplateId(templateId: String): WhatsAppTemplateEntity?
    fun findByTemplateType(type: com.galatelier.adapter.output.persistence.entity.TemplateType): List<WhatsAppTemplateEntity>
    fun findByActiveTrue(): List<WhatsAppTemplateEntity>
}
