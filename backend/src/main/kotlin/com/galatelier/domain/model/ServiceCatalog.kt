package com.galatelier.domain.model

data class ServiceCatalogItem(
    val id: String,
    val briefingType: BriefingType,
    val label: String,
    val description: String,
    val basePriceMin: Double,
    val basePriceMax: Double,
    val estimatedDays: Int,
    val materials: List<String>
)

object ServiceCatalog {
    fun getAll(): List<ServiceCatalogItem> = listOf(
        ServiceCatalogItem(
            id = "lace-front",
            briefingType = BriefingType.LACE_FRONT,
            label = "Lace Front",
            description = "Peruca frontal de lace com acabamento natural e linha frontal delicada.",
            basePriceMin = 450.0,
            basePriceMax = 1200.0,
            estimatedDays = 15,
            materials = listOf("Lace frontal", "Cabelo virgem", "TNT", "Elastic lace")
        ),
        ServiceCatalogItem(
            id = "full-lace",
            briefingType = BriefingType.FULL_LACE,
            label = "Full Lace",
            description = "Peruca toda em lace com possibilidade de riscar em qualquer direção.",
            basePriceMin = 800.0,
            basePriceMax = 2000.0,
            estimatedDays = 20,
            materials = listOf("Full lace", "Cabelo virgem", "TNT", "Elastic lace")
        ),
        ServiceCatalogItem(
            id = "wig-custom",
            briefingType = BriefingType.WIG_CUSTOM,
            label = "Wig Customizada",
            description = "Peruca personalizada conforme especificações exactas da cliente.",
            basePriceMin = 600.0,
            basePriceMax = 1800.0,
            estimatedDays = 18,
            materials = listOf("Touca base", "Cabelo virgem", "TNT", "Material personalizado")
        ),
        ServiceCatalogItem(
            id = "maintenance",
            briefingType = BriefingType.MAINTENANCE,
            label = "Manutenção",
            description = "Higienização, reconstructedção e manutenção de peruca existente.",
            basePriceMin = 150.0,
            basePriceMax = 400.0,
            estimatedDays = 5,
            materials = listOf("Produtos de limpeza", "Condicionador", "TNT")
        ),
        ServiceCatalogItem(
            id = "shoe-customization",
            briefingType = BriefingType.SHOE_CUSTOMIZATION,
            label = "Customização de Sapato",
            description = "Aplicação de/wig em sapato para eventos ou uso pessoal.",
            basePriceMin = 300.0,
            basePriceMax = 600.0,
            estimatedDays = 10,
            materials = listOf("Material decorativo", "Cola especial", "Acessórios")
        )
    )

    fun getByType(type: BriefingType): ServiceCatalogItem? =
        getAll().find { it.briefingType == type }
}