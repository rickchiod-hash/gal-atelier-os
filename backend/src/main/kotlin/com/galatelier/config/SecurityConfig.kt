package com.galatelier.config

import com.galatelier.adapter.input.web.JwtService
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.filter.OncePerRequestFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtService: JwtService
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authorizeHttpRequests {
                it.requestMatchers("/api/auth/**", "/api/health", "/actuator/**").permitAll()
                .anyRequest().authenticated()
            }
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    fun jwtAuthFilter(): OncePerRequestFilter {
        return object : OncePerRequestFilter() {
            override fun doFilterInternal(
                request: HttpServletRequest,
                response: HttpServletResponse,
                filterChain: FilterChain
            ) {
                val authHeader = request.getHeader("Authorization")
                if (authHeader?.startsWith("Bearer ") == true) {
                    val token = authHeader.substring(7)
                    if (jwtService.validateToken(token)) {
                        val auth = jwtService.getAuthentication(token)
                        if (auth != null) {
                            org.springframework.security.core.context.SecurityContextHolder.getContext().authentication = auth
                        }
                    }
                }
                filterChain.doFilter(request, response)
            }
        }
    }
}