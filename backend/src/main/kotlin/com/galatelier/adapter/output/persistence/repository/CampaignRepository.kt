package com.galatelier.adapter.output.persistence.repository

import com.galatelier.adapter.output.persistence.entity.CampaignEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface CampaignRepository : JpaRepository<CampaignEntity, UUID>