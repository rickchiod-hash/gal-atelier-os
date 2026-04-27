-- V2__add_campaigns_table.sql
-- Gal Atelier OS - Campaigns Table

CREATE TABLE campaigns (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent INTEGER DEFAULT 0,
    discount_value DECIMAL(12,2) DEFAULT 0,
    valid_until DATE,
    status VARCHAR(30) DEFAULT 'DRAFT',
    target_audience VARCHAR(50) DEFAULT 'ALL',
    send_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_valid_until ON campaigns(valid_until);
