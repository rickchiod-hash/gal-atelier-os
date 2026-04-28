package com.galatelier.domain.model

import java.time.Instant
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class ReviewTest {

    private val orderId = UUID.randomUUID()
    private val customerId = UUID.randomUUID()
    private val now = Instant.now()

    @Test
    fun `deve criar review valida com 5 estrelas`() {
        val review = Review(
            id = UUID.randomUUID(),
            orderId = orderId,
            customerId = customerId,
            rating = 5,
            comment = "Excelente serviço!",
            photoUrl = "https://example.com/photo.jpg",
            beforePhotoUrl = "https://example.com/before.jpg",
            afterPhotoUrl = "https://example.com/after.jpg",
            approved = false,
            createdAt = now
        )

        assertEquals(5, review.rating)
        assertEquals("Excelente serviço!", review.comment)
        assertFalse(review.approved)
    }

    @Test
    fun `deve criar review com rating 1`() {
        val review = Review(
            id = UUID.randomUUID(),
            orderId = orderId,
            customerId = customerId,
            rating = 1,
            comment = "Péssimo",
            photoUrl = null,
            beforePhotoUrl = null,
            afterPhotoUrl = null,
            approved = false,
            createdAt = now
        )

        assertEquals(1, review.rating)
    }

    @Test
    fun `deve aceitar rating 3`() {
        val review = createReview(rating = 3)
        assertEquals(3, review.rating)
    }

    @Test
    fun `deve criar review aprovada`() {
        val review = createReview(approved = true)
        assertTrue(review.approved)
    }

    @Test
    fun `deve criar review nao aprovada`() {
        val review = createReview(approved = false)
        assertFalse(review.approved)
    }

    @Test
    fun `deve aceitar comment nulo`() {
        val review = createReview(comment = null)
        assertEquals(null, review.comment)
    }

    @Test
    fun `deve aceitar photoUrl nulo`() {
        val review = createReview(photoUrl = null)
        assertEquals(null, review.photoUrl)
    }

    @Test
    fun `deve aceitar beforePhotoUrl nulo`() {
        val review = createReview(beforePhotoUrl = null)
        assertEquals(null, review.beforePhotoUrl)
    }

    @Test
    fun `deve aceitar afterPhotoUrl nulo`() {
        val review = createReview(afterPhotoUrl = null)
        assertEquals(null, review.afterPhotoUrl)
    }

    @Test
    fun `deve aceitar URLs validas`() {
        val review = createReview(
            photoUrl = "https://example.com/photo.jpg",
            beforePhotoUrl = "https://example.com/before.jpg",
            afterPhotoUrl = "https://example.com/after.jpg"
        )
        assertTrue(review.photoUrl?.startsWith("https://") == true)
        assertTrue(review.beforePhotoUrl?.startsWith("https://") == true)
        assertTrue(review.afterPhotoUrl?.startsWith("https://") == true)
    }

    private fun createReview(
        rating: Int = 5,
        comment: String? = "Comentário",
        photoUrl: String? = "https://example.com/photo.jpg",
        beforePhotoUrl: String? = "https://example.com/before.jpg",
        afterPhotoUrl: String? = "https://example.com/after.jpg",
        approved: Boolean = false
    ) = Review(
        id = UUID.randomUUID(),
        orderId = orderId,
        customerId = customerId,
        rating = rating,
        comment = comment,
        photoUrl = photoUrl,
        beforePhotoUrl = beforePhotoUrl,
        afterPhotoUrl = afterPhotoUrl,
        approved = approved,
        createdAt = now
    )
}
