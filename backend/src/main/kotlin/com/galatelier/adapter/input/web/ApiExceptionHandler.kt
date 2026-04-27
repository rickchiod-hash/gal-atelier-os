package com.galatelier.adapter.input.web

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.Instant

@RestControllerAdvice
class ApiExceptionHandler {
    private val log = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(IllegalArgumentException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun illegalArgument(ex: IllegalArgumentException): ErrorResponse {
        log.warn("Bad request: {}", ex.message)
        return ErrorResponse(
            timestamp = Instant.now().toString(),
            status = 400,
            error = "Bad Request",
            message = ex.message ?: "Invalid request"
        )
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun validation(ex: MethodArgumentNotValidException): ErrorResponse {
        val message = ex.bindingResult.fieldErrors.joinToString("; ") {
            "${it.field}: ${it.defaultMessage}"
        }
        log.warn("Validation error: {}", message)
        return ErrorResponse(
            timestamp = Instant.now().toString(),
            status = 400,
            error = "Validation Error",
            message = message
        )
    }

    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun unexpected(ex: Exception): ErrorResponse {
        log.error("Unexpected error", ex)
        return ErrorResponse(
            timestamp = Instant.now().toString(),
            status = 500,
            error = "Internal Server Error",
            message = "Erro interno. Consulte os logs com traceId."
        )
    }
}

data class ErrorResponse(
    val timestamp: String,
    val status: Int,
    val error: String,
    val message: String
)
