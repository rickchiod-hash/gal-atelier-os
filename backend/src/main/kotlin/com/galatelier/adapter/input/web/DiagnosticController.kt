package com.galatelier.adapter.input.web

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/diagnostics")
class DiagnosticController {

    @PostMapping("/recommendation")
    fun recommend(@RequestBody request: DiagnosticRequest): DiagnosticResponse {
        val wigType = when {
            request.experience == "NONE" && request.frequencyOfUse == "DAILY" ->
                "Glueless Wig 13x4 - Ideal para uso diário sem cola"
            request.experience == "BEGINNER" ->
                "Lace Front - Acabamento natural com menos manutenção"
            request.frequencyOfUse == "OCCASIONAL" ->
                "Headband Wig - Praticidade para uso ocasional"
            request.desiredStyle == "UPSTYLE" || request.desiredStyle == "PONYTAIL" ->
                "360 Lace - Versatilidade para penteados altos"
            request.desiredLength?.toIntOrNull()?.let { it > 18 } == true ->
                "Full Lace - Máximo realismo em qualquer direção"
            else ->
                "Lace Front - Equilíbrio entre naturalidade e praticidade"
        }

        val density = when {
            request.skinTone?.uppercase()?.contains("ESCURO") == true -> "150-180%"
            request.skinTone?.uppercase()?.contains("CLARO") == true -> "130-150%"
            else -> "150%"
        }

        val priceRange = when {
            request.budget?.toDoubleOrNull()?.let { it > 2000 } == true -> "R$ 1.500 - R$ 4.000"
            request.budget?.toDoubleOrNull()?.let { it > 1000 } == true -> "R$ 800 - R$ 2.500"
            request.budget?.toDoubleOrNull()?.let { it > 500 } == true -> "R$ 450 - R$ 1.200"
            else -> "R$ 200 - R$ 500"
        }

        val services = mutableListOf("Instalação profissional", "Manutenção mensal")
        if (request.frequencyOfUse == "DAILY") {
            services.add("Higienização profunda bimensal")
        }
        if (request.desiredStyle == "BLUNT_CUT") {
            services.add("Corte reto personalizado")
        }

        val accessories = mutableListOf("Wig grip", "Barra de segurança")
        if (density.contains("180")) {
            accessories.add("Pinças de fixação extras")
        }

        val experience = request.experience ?: "iniciante"
        val frequency = request.frequencyOfUse ?: "ocasional"
        val budgetStr = priceRange

        return DiagnosticResponse(
            recommendedWigType = wigType,
            recommendedDensity = density,
            recommendedLace = when {
                request.desiredStyle == "BLUNT_CUT" -> "HD Lace 13x4"
                request.frequencyOfUse == "DAILY" -> "Swiss Lace"
                else -> "French Lace"
            },
            priceRange = priceRange,
            recommendedServices = services,
            recommendedAccessories = accessories,
            explanation = "Baseado no seu perfil de $experience com frequência $frequency e orçamento de $budgetStr, recomendamos: $wigType"
        )
    }
}

data class DiagnosticRequest(
    val usageGoal: String? = null,
    val experience: String? = null,
    val desiredStyle: String? = null,
    val restrictions: String? = null,
    val skinTone: String? = null,
    val desiredColor: String? = null,
    val desiredLength: String? = null,
    val desiredTexture: String? = null,
    val frequencyOfUse: String? = null,
    val budget: String? = null
)

data class DiagnosticResponse(
    val recommendedWigType: String,
    val recommendedDensity: String,
    val recommendedLace: String,
    val priceRange: String,
    val recommendedServices: List<String>,
    val recommendedAccessories: List<String>,
    val explanation: String
)