package com.galatelier.config

import com.galatelier.adapter.input.web.JwtService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.mock
import org.mockito.kotlin.never
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

class SecurityConfigUnitTest {

    private val jwtService: JwtService = mock()
    private val securityConfig = SecurityConfig(jwtService)

    @AfterEach
    fun cleanSecurityContext() {
        SecurityContextHolder.clearContext()
    }

    @Test
    fun `jwtAuthFilter should set authentication when token is valid`() {
        val request: HttpServletRequest = mock()
        val response: HttpServletResponse = mock()
        val chain: FilterChain = mock()
        val authentication = UsernamePasswordAuthenticationToken("user-id", null, emptyList())

        whenever(request.getHeader("Authorization")).thenReturn("Bearer valid-token")
        whenever(jwtService.validateToken("valid-token")).thenReturn(true)
        whenever(jwtService.getAuthentication("valid-token")).thenReturn(authentication)

        val filter = securityConfig.jwtAuthFilter()
        filter.doFilter(request, response, chain)

        assertEquals(authentication, SecurityContextHolder.getContext().authentication)
        verify(chain).doFilter(request, response)
    }

    @Test
    fun `jwtAuthFilter should not set authentication when token is invalid`() {
        val request: HttpServletRequest = mock()
        val response: HttpServletResponse = mock()
        val chain: FilterChain = mock()

        whenever(request.getHeader("Authorization")).thenReturn("Bearer invalid-token")
        whenever(jwtService.validateToken("invalid-token")).thenReturn(false)

        val filter = securityConfig.jwtAuthFilter()
        filter.doFilter(request, response, chain)

        assertNull(SecurityContextHolder.getContext().authentication)
        verify(jwtService, never()).getAuthentication(any())
        verify(chain).doFilter(request, response)
    }
}
