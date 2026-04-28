package com.galatelier.adapter.input.web

import com.galatelier.domain.model.ProcessPhoto
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping("/api/process-photos")
class ProcessPhotoController {
    private val logger = LoggerFactory.getLogger(javaClass)
    private val storage = mutableMapOf<UUID, MutableList<ProcessPhoto>>()

    @PostMapping("/{orderId}/upload")
    fun uploadPhoto(
        @PathVariable orderId: UUID,
        @RequestParam photo: MultipartFile,
        @RequestParam(required = false) description: String?
    ): ProcessPhotoResponse {
        logger.info("Upload de foto para pedido $orderId")
        val photoUrl = "/uploads/process-photos/${UUID.randomUUID()}-${photo.originalFilename}"
        val processPhoto = ProcessPhoto(
            id = UUID.randomUUID(),
            orderId = orderId,
            photoUrl = photoUrl,
            description = description,
            uploadedAt = Instant.now()
        )
        storage.getOrPut(orderId) { mutableListOf() }.add(processPhoto)
        return processPhoto.toResponse()
    }

    @GetMapping("/{orderId}")
    fun listPhotos(@PathVariable orderId: UUID): List<ProcessPhotoResponse> =
        storage[orderId]?.map { it.toResponse() } ?: emptyList()

    @DeleteMapping("/{photoId}")
    fun deletePhoto(@PathVariable photoId: UUID): Map<String, Boolean> {
        storage.values.forEach { list ->
            list.removeIf { it.id == photoId }
        }
        return mapOf("success" to true)
    }
}

fun ProcessPhoto.toResponse() = ProcessPhotoResponse(
    id = id.toString(),
    orderId = orderId.toString(),
    photoUrl = photoUrl,
    description = description,
    uploadedAt = uploadedAt.toString()
)

data class ProcessPhotoResponse(
    val id: String,
    val orderId: String,
    val photoUrl: String,
    val description: String?,
    val uploadedAt: String
)
