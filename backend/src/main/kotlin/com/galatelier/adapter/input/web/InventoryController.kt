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
@RequestMapping("/api/inventory")
class InventoryController {

    private val items = mutableListOf(
        InventoryItem(
            id = "1",
            sku = "LACE-FRONT-13X4-NAT",
            name = "Lace Front 13x4 Natural",
            category = "Lace Front",
            basePrice = 800.0,
            stock = 12,
            minStock = 5,
            location = "A-01-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-15"
        ),
        InventoryItem(
            id = "2",
            sku = "LACE-FRONT-13X4-BLU",
            name = "Lace Front 13x4 Blue Black",
            category = "Lace Front",
            basePrice = 800.0,
            stock = 8,
            minStock = 5,
            location = "A-01-02",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-10"
        ),
        InventoryItem(
            id = "3",
            sku = "FULL-LACE-PREM-NAT",
            name = "Full Lace Premium Natural",
            category = "Full Lace",
            basePrice = 1500.0,
            stock = 4,
            minStock = 3,
            location = "B-02-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-05"
        ),
        InventoryItem(
            id = "4",
            sku = "GLUELESS-WIG-NAT",
            name = "Glueless Wig Natural",
            category = "Glueless",
            basePrice = 450.0,
            stock = 20,
            minStock = 10,
            location = "C-01-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-20"
        ),
        InventoryItem(
            id = "5",
            sku = "CLOSURE-4X4-NAT",
            name = "Closure 4x4 Natural",
            category = "Closure",
            basePrice = 350.0,
            stock = 3,
            minStock = 5,
            location = "D-01-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-01"
        ),
        InventoryItem(
            id = "6",
            sku = "360-LACE-PREM-NAT",
            name = "360 Lace Premium Natural",
            category = "360 Lace",
            basePrice = 1800.0,
            stock = 6,
            minStock = 3,
            location = "B-03-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-12"
        ),
        InventoryItem(
            id = "7",
            sku = "FRONTAL-13X6-NAT",
            name = "Frontal 13x6 Natural",
            category = "Frontal",
            basePrice = 450.0,
            stock = 15,
            minStock = 8,
            location = "D-02-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-18"
        ),
        InventoryItem(
            id = "8",
            sku = "U-PART-WIG-NAT",
            name = "U-Part Wig Natural",
            category = "U-Part",
            basePrice = 600.0,
            stock = 7,
            minStock = 5,
            location = "C-02-01",
            supplier = "Veloura Hair",
            lastRestocked = "2026-04-08"
        ),
        InventoryItem(
            id = "9",
            sku = "BUNDLE-REMY-12IN",
            name = "Bundle Remy 12 inch",
            category = "Bundle",
            basePrice = 180.0,
            stock = 45,
            minStock = 20,
            location = "E-01-01",
            supplier = "Brazilian Hair Co",
            lastRestocked = "2026-04-22"
        ),
        InventoryItem(
            id = "10",
            sku = "ADHESIVE-GLUE-4OZ",
            name = "Adhesive Glue 4oz",
            category = "Supplies",
            basePrice = 45.0,
            stock = 30,
            minStock = 15,
            location = "F-01-01",
            supplier = "Beauty Supply",
            lastRestocked = "2026-04-25"
        )
    )

    @GetMapping
    fun list(): List<InventoryItem> = items.sortedBy { it.category }

    @GetMapping("/low-stock")
    fun lowStock(): List<InventoryItem> =
        items.filter { it.stock <= it.minStock }.sortedBy { it.stock }

    @GetMapping("/category/{category}")
    fun listByCategory(@PathVariable category: String): List<InventoryItem> =
        items.filter { it.category.equals(category, ignoreCase = true) }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): InventoryItem? = items.find { it.id == id }

    @PostMapping
    fun create(@RequestBody request: CreateInventoryRequest): InventoryItem {
        val item = InventoryItem(
            id = UUID.randomUUID().toString(),
            sku = request.sku,
            name = request.name,
            category = request.category,
            basePrice = request.basePrice,
            stock = request.stock,
            minStock = request.minStock,
            location = request.location,
            supplier = request.supplier,
            lastRestocked = Instant.now().toString().take(10)
        )
        items.add(item)
        return item
    }

    @PatchMapping("/{id}/stock")
    fun updateStock(@PathVariable id: String, @RequestBody request: UpdateStockRequest): InventoryItem? {
        val index = items.indexOfFirst { it.id == id }
        if (index == -1) return null
        val current = items[index]
        val updated = current.copy(
            stock = request.stock ?: current.stock,
            lastRestocked = Instant.now().toString().take(10)
        )
        items[index] = updated
        return updated
    }

    @GetMapping("/summary")
    fun summary(): Map<String, Any> = mapOf(
        "totalItems" to items.size,
        "totalStock" to items.sumOf { it.stock },
        "lowStockCount" to items.count { it.stock <= it.minStock },
        "totalValue" to items.sumOf { it.basePrice * it.stock },
        "byCategory" to items.groupBy { it.category }.mapValues { it.value.size }
    )
}

data class InventoryItem(
    val id: String,
    val sku: String,
    val name: String,
    val category: String,
    val basePrice: Double,
    val stock: Int,
    val minStock: Int,
    val location: String,
    val supplier: String,
    val lastRestocked: String
)

data class CreateInventoryRequest(
    val sku: String,
    val name: String,
    val category: String,
    val basePrice: Double,
    val stock: Int,
    val minStock: Int,
    val location: String,
    val supplier: String
)

data class UpdateStockRequest(
    val stock: Int? = null
)