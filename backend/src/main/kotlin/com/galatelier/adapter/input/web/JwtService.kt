package com.galatelier.adapter.input.web

import com.galatelier.adapter.output.persistence.entity.UserEntity
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.util.Date
import javax.crypto.SecretKey

@Service
class JwtService {

    private val secretKey: SecretKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256)

    fun generateToken(user: UserEntity): AuthResponse {
        val now = Date()
        val expiration = Date(now.time + 86400000) // 24 hours

        val token = Jwts.builder()
            .subject(user.id.toString())
            .claim("email", user.email)
            .claim("name", user.name)
            .claim("role", user.role.name)
            .issuedAt(now)
            .expiration(expiration)
            .signWith(secretKey)
            .compact()

        return AuthResponse(
            token = token,
            userId = user.id.toString(),
            email = user.email,
            name = user.name,
            role = user.role.name
        )
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getUserId(token: String): String? {
        return try {
            val claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .payload
            claims.subject
        } catch (e: Exception) {
            null
        }
    }

    fun getAuthentication(token: String): UsernamePasswordAuthenticationToken? {
        return try {
            val claims: Claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .payload

            val userId = claims.subject
            val email = claims.get("email", String::class.java)
            val role = claims.get("role", String::class.java)

            val authorities = listOf(SimpleGrantedAuthority("ROLE_$role"))
            UsernamePasswordAuthenticationToken(userId, null, authorities)
        } catch (e: Exception) {
            null
        }
    }
}