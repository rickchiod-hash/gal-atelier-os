-- V3__add_process_photos.sql
-- Gal Atelier OS - Process Photos for Orders

CREATE TABLE process_photos (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    photo_url VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_process_photos_order ON process_photos(order_id);
