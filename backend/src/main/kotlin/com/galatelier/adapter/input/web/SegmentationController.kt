package com.galatelier.adapter.input.web

import com.galatelier.application.service.CustomerSegmentationService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/segmentation")
class SegmentationController(
    private val segmentationService: CustomerSegmentationService
) {
    @GetMapping("/customers")
    fun getAllWithSegments(): List<CustomerSegmentResponse> =
        segmentationService.getAllWithSegments()

    @GetMapping("/by-segment/{segment}")
    fun getBySegment(@PathVariable segment: String): List<CustomerSegmentResponse> =
        segmentationService.getBySegment(segment)

    @GetMapping("/segments")
    fun getAvailableSegments(): Map<String, String> =
        mapOf(
            "VIP_GOLD" to "Clientes com gasto total >= R$ 3.000",
            "VIP_SILVER" to "Clientes com gasto total >= R$ 1.500",
            "RECURRING" to "Clientes com 5+ pedidos",
            "ACTIVE" to "Clientes com 2-4 pedidos",
            "NEW" to "Clientes com 1 pedido",
            "LEAD" to "Leads sem pedidos"
        )
}
