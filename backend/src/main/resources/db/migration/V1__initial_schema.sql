-- V1__initial_schema.sql
-- Gal Atelier OS - PostgreSQL Schema

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    service_type VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'LEAD',
    deposit_paid DECIMAL(12,2) DEFAULT 0,
    payment_status VARCHAR(30) DEFAULT 'PENDING',
    timeline JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    service_type VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(5) NOT NULL,
    duration INTEGER DEFAULT 60,
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    notes TEXT,
    price DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes table
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx.inventory_category ON inventory(category);
CREATE INDEX idx_customers_tier ON customers(tier);

-- Insert sample data
INSERT INTO customers (id, name, whatsapp, email, total_spent, orders_count, favorite_service, last_order_date, tier) VALUES
('11111111-1111-1111-1111-111111111111', 'Juliana Costa', '5511988884444', 'juliana@email.com', 3500, 3, 'Lace Front', '2026-04-15', 'GOLD'),
('22222222-2222-2222-2222-222222222222', 'Patrícia Lima', '5511977775555', 'patricia@email.com', 5200, 5, 'Full Lace', '2026-04-20', 'PLATINUM'),
('33333333-3333-3333-3333-333333333333', 'Amanda Souza', '5511966663333', 'amanda@email.com', 1200, 1, 'Glueless Wig', '2026-04-25', 'SILVER'),
('44444444-4444-4444-4444-444444444444', 'Fernanda Alves', '5511955552222', 'fernanda@email.com', 850, 2, 'Manutenção', '2026-04-10', 'BRONZE'),
('55555555-5555-5555-5555-555555555555', 'Beatriz Santos', '5511944441111', 'beatriz@email.com', 2800, 2, 'Wig Customizada', '2026-04-18', 'GOLD');

INSERT INTO orders (id, customer_id, service_type, price, status, deposit_paid, payment_status, created_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Lace Front 13x4', 1800, 'PRODUCTION', 900, 'DEPOSIT_PAID', '2026-04-01'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Full Lace Premium', 3200, 'LEAD', 0, 'PENDING', '2026-04-20'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Glueless Wig', 950, 'DELIVERED', 950, 'FULL_PAID', '2026-04-15');

INSERT INTO inventory (id, sku, name, category, base_price, stock, min_stock, location, supplier) VALUES
('11111111-1111-1111-1111-111111111111', 'LACE-FRONT-13X4-NAT', 'Lace Front 13x4 Natural', 'Lace Front', 800, 12, 5, 'A-01-01', 'Veloura Hair'),
('22222222-2222-2222-2222-222222222222', 'LACE-FRONT-13X4-BLU', 'Lace Front 13x4 Blue Black', 'Lace Front', 800, 8, 5, 'A-01-02', 'Veloura Hair'),
('33333333-3333-3333-3333-333333333333', 'FULL-LACE-PREM-NAT', 'Full Lace Premium Natural', 'Full Lace', 1500, 4, 3, 'B-02-01', 'Veloura Hair'),
('44444444-4444-4444-4444-444444444444', 'GLUELESS-WIG-NAT', 'Glueless Wig Natural', 'Glueless', 450, 20, 10, 'C-01-01', 'Veloura Hair'),
('55555555-5555-5555-5555-555555555555', 'CLOSURE-4X4-NAT', 'Closure 4x4 Natural', 'Closure', 350, 3, 5, 'D-01-01', 'Veloura Hair');

INSERT INTO appointments (id, customer_id, service_type, date, time, duration, status, price) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Manutenção', '2026-04-28', '14:00', 60, 'SCHEDULED', 250),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Prova', '2026-04-29', '10:00', 45, 'SCHEDULED', 0),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Instalação', '2026-04-27', '15:00', 90, 'COMPLETED', 450);