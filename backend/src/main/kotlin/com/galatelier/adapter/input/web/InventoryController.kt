package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.InventoryEntity
import com.galatelier.adapter.output.persistence.repository.InventoryRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.util.UUID

@RestController
@RequestMapping("/api/inventory")
class InventoryController(
    private val inventoryRepository: InventoryRepository
) {

    @GetMapping
    fun list(): List<InventoryItem> = inventoryRepository.findAll()
        .sortedBy { it.category }
        .map { it.toItem() }

    @GetMapping("/low-stock")
    fun lowStock(): List<InventoryItem> = inventoryRepository.findAll()
        .filter { it.stock <= it.minStock }
        .sortedBy { it.stock }
        .map { it.toItem() }

    @GetMapping("/category/{category}")
    fun listByCategory(@PathVariable category: String): List<InventoryItem> =
        inventoryRepository.findAll()
            .filter { it.category.equals(category, ignoreCase = true) }
            .map { it.toItem() }

    @GetMapping("/{id}")
    fun get(@PathVariable id: String): InventoryItem? = 
        inventoryRepository.findById(UUID.fromString(id)).orElse(null)?.toItem()

    @PostMapping
    fun create(@RequestBody request: CreateInventoryRequest): InventoryItem {
        val item = InventoryEntity(
            sku = request.sku,
            name = request.name,
            category = request.category,
            basePrice = request.basePrice.toBigDecimal(),
            stock = request.stock,
            minStock = request.minStock,
            location = request.location,
            supplier = request.supplier
        )
        return inventoryRepository.save(item).toItem()
    }

    @PatchMapping("/{id}/stock")
    fun updateStock(@PathVariable id: String, @RequestBody request: UpdateStockRequest): InventoryItem? {
        val existing = inventoryRepository.findById(UUID.fromString(id)).orElse(null) ?: return null
        val updated = existing.copy(
            stock = request.stock ?: existing.stock,
            lastRestocked = LocalDate.now(),
            updatedAt = java.time.LocalDateTime.now()
        )
        return inventoryRepository.save(updated).toItem()
    }

    @GetMapping("/summary")
    fun summary(): Map<String, Any> {
        val items = inventoryRepository.findAll()
        return mapOf(
            "totalItems" to items.size,
            "totalStock" to items.sumOf { it.stock },
            "lowStockCount" to items.count { it.stock <= it.minStock },
            "totalValue" to items.sumOf { it.basePrice.toDouble() * it.stock },
            "byCategory" to items.groupBy { it.category }.mapValues { it.value.size }
        )
    }
}

fun InventoryEntity.toItem() = InventoryItem(
    id = id.toString(),
    sku = sku,
    name = name,
    category = category,
    basePrice = basePrice.toDouble(),
    stock = stock,
    minStock = minStock,
    location = location ?: "",
    supplier = supplier ?: "",
    lastRestocked = lastRestocked.toString()
)

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