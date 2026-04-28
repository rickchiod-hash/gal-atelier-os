-- V5__add_customer_name_to_appointments.sql
-- Gal Atelier OS - Add customer_name column to appointments table

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255) DEFAULT '';
