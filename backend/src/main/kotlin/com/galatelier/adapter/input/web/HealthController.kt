package com.galatelier.adapter.input.web

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@RestController
@RequestMapping("/api/health")
class HealthController {
    @GetMapping
    fun health(): Map<String, Any> =
        mapOf(
            "status" to "ok",
            "service" to "gal-atelier-backend",
            "architecture" to "hexagonal",
            "version" to "v5",
            "timestamp" to Instant.now().toString()
        )
}
