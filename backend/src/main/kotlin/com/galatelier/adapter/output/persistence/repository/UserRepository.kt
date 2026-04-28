package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface UserRepository : JpaRepository<UserEntity, UUID> {
    fun findByEmail(email: String): UserEntity?
    fun findByGoogleId(googleId: String): UserEntity?
}