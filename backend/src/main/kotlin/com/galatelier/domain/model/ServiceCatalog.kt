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
            id = "glueless",
            briefingType = BriefingType.GLUE_LESS,
            label = "Glueless Wig",
            description = "Instalação sem cola - fixação com ajustadores elásticos para maior conforto e segurança.",
            basePriceMin = 450.0,
            basePriceMax = 1200.0,
            estimatedDays = 10,
            materials = listOf("Tela glueless", "Cabelo virgem", "Ajustadores", "Barras internas")
        ),
        ServiceCatalogItem(
            id = "lace-front",
            briefingType = BriefingType.LACE_FRONT,
            label = "Lace Front",
            description = "Peruca frontal de lace com acabamento natural e linha frontal delicada.",
            basePriceMin = 800.0,
            basePriceMax = 2500.0,
            estimatedDays = 15,
            materials = listOf("Lace frontal", "Cabelo virgem", "TNT", "Elastic lace")
        ),
        ServiceCatalogItem(
            id = "full-lace",
            briefingType = BriefingType.FULL_LACE,
            label = "Full Lace",
            description = "Peruca toda em lace com possibilidade de riscar em qualquer direção.",
            basePriceMin = 1200.0,
            basePriceMax = 4000.0,
            estimatedDays = 20,
            materials = listOf("Full lace", "Cabelo virgem", "TNT", "Elastic lace")
        ),
        ServiceCatalogItem(
            id = "closure",
            briefingType = BriefingType.CLOSURE,
            label = "Closure",
            description = "Fechamento frontal para completar instalação com naturalidade.",
            basePriceMin = 600.0,
            basePriceMax = 1500.0,
            estimatedDays = 7,
            materials = listOf("Closure", "Cabelo", "Cola")
        ),
        ServiceCatalogItem(
            id = "360-lace",
            briefingType = BriefingType.LACE_360,
            label = "360 Lace",
            description = "Peruca com lace ao redor - ideal para rabo de cavalo e penteados altos.",
            basePriceMin = 1500.0,
            basePriceMax = 4500.0,
            estimatedDays = 18,
            materials = listOf("360 lace", "Cabelo virgem", "TNT")
        ),
        ServiceCatalogItem(
            id = "u-part",
            briefingType = BriefingType.U_PART,
            label = "U-Part Wig",
            description = "Parte frontal em formato U - mistura de wig completo com tracks.",
            basePriceMin = 700.0,
            basePriceMax = 1800.0,
            estimatedDays = 12,
            materials = listOf("U-part", "Cabelo", "Tracks")
        ),
        ServiceCatalogItem(
            id = "wig-custom",
            briefingType = BriefingType.WIG_CUSTOM,
            label = "Wig Customizada",
            description = "Wig personalizada conforme especificações exatas da cliente.",
            basePriceMin = 600.0,
            basePriceMax = 1800.0,
            estimatedDays = 18,
            materials = listOf("Touca base", "Cabelo virgem", "TNT", "Material personalizado")
        ),
        ServiceCatalogItem(
            id = "maintenance",
            briefingType = BriefingType.MAINTENANCE,
            label = "Manutenção",
            description = "Higienização, reconstrução e manutenção de peruca existente.",
            basePriceMin = 200.0,
            basePriceMax = 500.0,
            estimatedDays = 5,
            materials = listOf("Produtos de limpeza", "Condicionador", "TNT")
        ),
        ServiceCatalogItem(
            id = "higienizacao",
            briefingType = BriefingType.HIGIENIZACAO,
            label = "Higienização Profunda",
            description = "Limpeza e hidratação com produtos profissionais.",
            basePriceMin = 80.0,
            basePriceMax = 200.0,
            estimatedDays = 1,
            materials = listOf("Shampoo neutro", "Condicionador", "Máscara")
        ),
        ServiceCatalogItem(
            id = "customizacao-sapato",
            briefingType = BriefingType.SHOE_CUSTOMIZATION,
            label = "Customização de Sapato",
            description = "Personalização artesanal com strass e pedrarias.",
            basePriceMin = 150.0,
            basePriceMax = 600.0,
            estimatedDays = 7,
            materials = listOf("Material decorativo", "Cola especial", "Acessórios")
        )
    )

    fun getByType(type: BriefingType): ServiceCatalogItem? =
        getAll().find { it.briefingType == type }
}