-- V1__initial_schema.sql
-- Gal Atelier OS - H2 Database Schema (for testing)

CREATE TABLE customers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255),
    total_spent DECIMAL(12,2) DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    favorite_service VARCHAR(100),
    last_order_date DATE,
    tier VARCHAR(20) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    service_type VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'LEAD',
    deposit_paid DECIMAL(12,2) DEFAULT 0,
    payment_status VARCHAR(30) DEFAULT 'PENDING',
    timeline VARCHAR(1000) DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id UUID PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 5,
    location VARCHAR(20),
    supplier VARCHAR(100),
    last_restocked DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    service_type VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(5) NOT NULL,
    duration INTEGER DEFAULT 60,
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    notes VARCHAR(1000),
    price DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotes (
    id UUID PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_whatsapp VARCHAR(20) NOT NULL,
    service_type VARCHAR(100),
    hair_length VARCHAR(20),
    hair_color VARCHAR(50),
    density VARCHAR(20),
    recommended_price DECIMAL(12,2),
    deadline_days INTEGER,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leads (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    source VARCHAR(50),
    interest VARCHAR(100),
    budget VARCHAR(50),
    next_action VARCHAR(100),
    stage VARCHAR(30) DEFAULT 'NEW_LEAD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_inventory_category ON inventory(category);
CREATE INDEX idx_customers_tier ON customers(tier);