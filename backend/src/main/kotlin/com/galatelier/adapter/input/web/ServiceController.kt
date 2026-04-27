package com.galatelier.adapter.input.web

import com.galatelier.domain.model.BriefingType
import com.galatelier.domain.model.ServiceCatalog
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ServiceController {
    @GetMapping("/services")
    fun services(): List<ServiceResponse> =
        ServiceCatalog.getAll().map { it.toResponse() }
}

data class ServiceResponse(
    val id: String,
    val type: BriefingType,
    val label: String,
    val description: String,
    val basePriceMin: Double,
    val basePriceMax: Double,
    val estimatedDays: Int,
    val materials: List<String>
)

private fun com.galatelier.domain.model.ServiceCatalogItem.toResponse(): ServiceResponse =
    ServiceResponse(
        id = id,
        type = briefingType,
        label = label,
        description = description,
        basePriceMin = basePriceMin,
        basePriceMax = basePriceMax,
        estimatedDays = estimatedDays,
        materials = materials
    )