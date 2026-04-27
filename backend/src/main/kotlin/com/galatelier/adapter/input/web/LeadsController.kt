package com.galatelier.adapter.input.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/leads")
class LeadsController {

    private val leads = mutableListOf(
        LeadResponse(
            id = "1",
            name = "Juliana Costa",
            whatsapp = "5511988884444",
            source = "Instagram",
            interest = "Lace Front 13x4",
            budget = "R$ 1.500 - R$ 2.000",
            nextAction = "Enviar orçamento",
            stage = LeadStage.QUOTE_SENT,
            createdAt = Instant.now().minusSeconds(86400 * 2).toString()
        ),
        LeadResponse(
            id = "2",
            name = "Patrícia Lima",
            whatsapp = "5511977775555",
            source = "Indicação",
            interest = "Full Lace",
            budget = "R$ 2.500 - R$ 3.500",
            nextAction = "Diagnóstico",
            stage = LeadStage.DIAGNOSIS,
            createdAt = Instant.now().minusSeconds(86400).toString()
        ),
        LeadResponse(
            id = "3",
            name = "Amanda Souza",
            whatsapp = "5511966663333",
            source = "TikTok",
            interest = "Glueless Wig",
            budget = "R$ 800 - R$ 1.200",
            nextAction = "Follow-up 24h",
            stage = LeadStage.CONTACT_STARTED,
            createdAt = Instant.now().toString()
        ),
        LeadResponse(
            id = "4",
            name = "Fernanda Alves",
            whatsapp = "5511955552222",
            source = "Google",
            interest = "Manutenção",
            budget = "R$ 300 - R$ 500",
            nextAction = "Confirmar agendamento",
            stage = LeadStage.NEW_LEAD,
            createdAt = Instant.now().toString()
        ),
        LeadResponse(
            id = "5",
            name = "Beatriz Santos",
            whatsapp = "5511944441111",
            source = "WhatsApp",
            interest = "Wig Customizada",
            budget = "R$ 1.000 - R$ 1.800",
            nextAction = "Aguardando resposta",
            stage = LeadStage.NEGOTIATION,
            createdAt = Instant.now().minusSeconds(86400 * 3).toString()
        ),
        LeadResponse(
            id = "6",
            name = "Carolina Mello",
            whatsapp = "5511933337777",
            source = "Indicação VIP",
            interest = "360 Lace",
            budget = "R$ 3.000 - R$ 4.500",
            nextAction = "Confirmar sinal",
            stage = LeadStage.AWAITING_PAYMENT,
            createdAt = Instant.now().minusSeconds(86400 * 5).toString()
        )
    )

    @GetMapping
    fun list(): List<LeadResponse> = leads.sortedByDescending { it.createdAt }

    @PostMapping
    fun create(@RequestBody request: CreateLeadRequest): LeadResponse {
        val lead = LeadResponse(
            id = UUID.randomUUID().toString(),
            name = request.name,
            whatsapp = request.whatsapp,
            source = request.source ?: "Manual",
            interest = request.interest ?: "A definir",
            budget = request.budget ?: "A definir",
            nextAction = "Primeiro contato",
            stage = LeadStage.NEW_LEAD,
            createdAt = Instant.now().toString()
        )
        leads.add(0, lead)
        return lead
    }

    @PatchMapping("/{id}/stage")
    fun updateStage(@PathVariable id: String, @RequestBody request: UpdateStageRequest): LeadResponse? {
        val index = leads.indexOfFirst { it.id == id }
        if (index == -1) return null
        val updated = leads[index].copy(
            stage = LeadStage.valueOf(request.stage),
            nextAction = request.nextAction ?: leads[index].nextAction
        )
        leads[index] = updated
        return updated
    }
}

data class LeadResponse(
    val id: String,
    val name: String,
    val whatsapp: String,
    val source: String,
    val interest: String,
    val budget: String,
    val nextAction: String,
    val stage: LeadStage,
    val createdAt: String
)

enum class LeadStage {
    NEW_LEAD,
    CONTACT_STARTED,
    DIAGNOSIS,
    RECOMMENDATION_SENT,
    QUOTE_SENT,
    NEGOTIATION,
    AWAITING_PAYMENT,
    DEPOSIT_PAID,
    ORDER_CREATED,
    LOST,
    REACTIVATE_LATER
}

data class CreateLeadRequest(
    val name: String,
    val whatsapp: String,
    val source: String? = null,
    val interest: String? = null,
    val budget: String? = null
)

data class UpdateStageRequest(
    val stage: String,
    val nextAction: String? = null
)