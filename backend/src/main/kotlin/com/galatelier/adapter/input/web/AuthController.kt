package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.UserEntity
import com.galatelier.adapter.output.persistence.entity.UserRole
import com.galatelier.adapter.output.persistence.repository.UserRepository
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.util.UUID

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val jwtService: JwtService
) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): AuthResponse {
        val existing = userRepository.findByEmail(request.email)
        if (existing != null) {
            return jwtService.generateToken(existing)
        }
        val user = UserEntity(
            email = request.email,
            passwordHash = request.password,
            name = request.name,
            role = UserRole.CLIENT
        )
        val saved = userRepository.save(user)
        return jwtService.generateToken(saved)
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): AuthResponse? {
        val user = userRepository.findByEmail(request.email) ?: return null
        if (user.passwordHash != request.password) {
            return null
        }
        return jwtService.generateToken(user)
    }

    @PostMapping("/google")
    fun googleAuth(@RequestBody request: GoogleAuthRequest): AuthResponse {
        var user = userRepository.findByGoogleId(request.googleId)
        if (user == null) {
            user = userRepository.findByEmail(request.email)
            if (user != null) {
                user = user.copy(googleId = request.googleId, updatedAt = LocalDateTime.now())
            } else {
                user = UserEntity(
                    email = request.email,
                    name = request.name,
                    passwordHash = "GOOGLE_${request.googleId}",
                    googleId = request.googleId,
                    role = UserRole.CLIENT
                )
            }
            userRepository.save(user)
        }
        return jwtService.generateToken(user)
    }
}

data class RegisterRequest(
    val email: String,
    val password: String,
    val name: String
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class GoogleAuthRequest(
    val email: String,
    val name: String,
    val googleId: String
)

data class AuthResponse(
    val token: String,
    val type: String = "Bearer",
    val userId: String,
    val email: String,
    val name: String,
    val role: String
)