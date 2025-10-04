# PawHaven Database Table Creation Script
# One table for each entity in the PawHaven system

# This script creates all required tables for the PawHaven pet adoption platform
# Execute this script in your MySQL database

USE pawhaven_db;

-- ===================================================================
-- 1. USERS TABLE - User management and authentication
-- ===================================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    role ENUM('USER', 'ADMIN', 'SHELTER_STAFF') NOT NULL DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    profile_picture_url VARCHAR(500),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_username (username),
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
);

-- ===================================================================
-- 2. SHELTERS TABLE - Animal shelter information
-- ===================================================================
CREATE TABLE IF NOT EXISTS shelters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    description TEXT,
    capacity INT DEFAULT 0,
    operating_hours VARCHAR(200),
    license_number VARCHAR(100),
    established_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    logo_url VARCHAR(500),
    social_media_links JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_shelters_name (name),
    INDEX idx_shelters_active (is_active)
);

-- ===================================================================
-- 3. PETS TABLE - Pet information and adoption details
-- ===================================================================
CREATE TABLE IF NOT EXISTS pets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    pet_type ENUM('DOG', 'CAT', 'BIRD', 'RABBIT', 'HAMSTER', 'GUINEA_PIG', 'FERRET', 'OTHER') NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL,
    size ENUM('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE') NOT NULL,
    weight DECIMAL(5,2),
    color_markings VARCHAR(200),
    description TEXT,
    medical_history TEXT,
    behavior_notes TEXT,
    special_needs TEXT,
    adoption_fee DECIMAL(10,2),
    is_available BOOLEAN DEFAULT TRUE,
    is_spayed_neutered BOOLEAN DEFAULT FALSE,
    is_house_trained BOOLEAN DEFAULT FALSE,
    good_with_kids BOOLEAN DEFAULT NULL,
    good_with_pets BOOLEAN DEFAULT NULL,
    energy_level ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    image_url VARCHAR(500),
    arrival_date DATE,
    shelter_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id) ON DELETE CASCADE,
    INDEX idx_pets_type (pet_type),
    INDEX idx_pets_breed (breed),
    INDEX idx_pets_available (is_available),
    INDEX idx_pets_shelter (shelter_id),
    INDEX idx_pets_age (age),
    INDEX idx_pets_size (size)
);

-- ===================================================================
-- 4. ADOPTION_APPLICATIONS TABLE - Pet adoption applications
-- ===================================================================
CREATE TABLE IF NOT EXISTS adoption_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN') DEFAULT 'PENDING',
    reason_for_adoption TEXT,
    experience_with_pets TEXT,
    living_arrangement TEXT,
    has_other_pets BOOLEAN DEFAULT FALSE,
    other_pets_description TEXT,
    household_members INT DEFAULT 1,
    work_schedule TEXT,
    landlord_approval BOOLEAN DEFAULT NULL,
    veterinarian_reference VARCHAR(200),
    previous_pet_experience TEXT,
    application_notes TEXT,
    reviewed_by BIGINT NULL,
    review_date TIMESTAMP NULL,
    review_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_applications_user (user_id),
    INDEX idx_applications_pet (pet_id),
    INDEX idx_applications_status (status),
    INDEX idx_applications_date (application_date)
);

-- ===================================================================
-- 5. DONATIONS TABLE - Financial and item donations
-- ===================================================================
CREATE TABLE IF NOT EXISTS donations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    shelter_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_type ENUM('MONETARY', 'FOOD', 'SUPPLIES', 'MEDICAL', 'OTHER') DEFAULT 'MONETARY',
    payment_method ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CASH', 'CHECK') DEFAULT 'CREDIT_CARD',
    transaction_id VARCHAR(100),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency ENUM('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY') NULL,
    tax_deductible BOOLEAN DEFAULT TRUE,
    receipt_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id) ON DELETE CASCADE,
    INDEX idx_donations_user (user_id),
    INDEX idx_donations_shelter (shelter_id),
    INDEX idx_donations_type (donation_type),
    INDEX idx_donations_date (donation_date),
    INDEX idx_donations_amount (amount)
);

-- ===================================================================
-- 6. FAVORITES TABLE - User's favorite pets (wishlist)
-- ===================================================================
CREATE TABLE IF NOT EXISTS favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_pet_favorite (user_id, pet_id),
    INDEX idx_favorites_user (user_id),
    INDEX idx_favorites_pet (pet_id),
    INDEX idx_favorites_date (date_added)
);

-- ===================================================================
-- 7. MEDICAL_RECORDS TABLE - Pet medical history and health records
-- ===================================================================
CREATE TABLE IF NOT EXISTS medical_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    record_type ENUM('VACCINATION', 'CHECKUP', 'TREATMENT', 'SURGERY', 'EMERGENCY', 'OTHER') NOT NULL,
    veterinarian_name VARCHAR(100),
    clinic_name VARCHAR(200),
    description TEXT,
    treatment TEXT,
    medications TEXT,
    cost DECIMAL(10,2),
    next_appointment TIMESTAMP NULL,
    notes TEXT,
    document_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    INDEX idx_medical_records_pet (pet_id),
    INDEX idx_medical_records_type (record_type),
    INDEX idx_medical_records_date (record_date),
    INDEX idx_medical_records_vet (veterinarian_name)
);

-- ===================================================================
-- 8. ACCESSORIES TABLE - Pet accessories and products for sale
-- ===================================================================
CREATE TABLE IF NOT EXISTS accessories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category ENUM('TOY', 'FOOD', 'COLLAR', 'LEASH', 'BED', 'CARRIER', 'GROOMING', 'CLOTHING', 'HEALTH', 'OTHER') NOT NULL,
    brand VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    image_url VARCHAR(500),
    weight DECIMAL(8,2),
    dimensions VARCHAR(100),
    material VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(20),
    age_group ENUM('PUPPY', 'ADULT', 'SENIOR', 'ALL_AGES') DEFAULT 'ALL_AGES',
    pet_type ENUM('DOG', 'CAT', 'BIRD', 'RABBIT', 'HAMSTER', 'GUINEA_PIG', 'FERRET', 'ALL_PETS') DEFAULT 'ALL_PETS',
    is_available BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_accessories_category (category),
    INDEX idx_accessories_brand (brand),
    INDEX idx_accessories_price (price),
    INDEX idx_accessories_available (is_available),
    INDEX idx_accessories_pet_type (pet_type),
    INDEX idx_accessories_featured (featured)
);

-- ===================================================================
-- 9. EVENTS TABLE - Shelter events and activities
-- ===================================================================
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP,
    location VARCHAR(300),
    event_type ENUM('ADOPTION_EVENT', 'FUNDRAISER', 'EDUCATION', 'VOLUNTEER', 'MEDICAL_CLINIC', 'SOCIAL', 'OTHER') NOT NULL,
    shelter_id BIGINT NOT NULL,
    max_attendees INT,
    current_attendees INT DEFAULT 0,
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline TIMESTAMP NULL,
    entry_fee DECIMAL(8,2) DEFAULT 0.00,
    contact_info VARCHAR(200),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    is_cancelled BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_events_shelter (shelter_id),
    INDEX idx_events_type (event_type),
    INDEX idx_events_start_date (start_date_time),
    INDEX idx_events_active (is_active),
    INDEX idx_events_location (location)
);

-- ===================================================================
-- ADDITIONAL UTILITY TABLES
-- ===================================================================

-- Event Registrations (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS event_registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('REGISTERED', 'ATTENDED', 'NO_SHOW', 'CANCELLED') DEFAULT 'REGISTERED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_user_registration (event_id, user_id),
    INDEX idx_event_registrations_event (event_id),
    INDEX idx_event_registrations_user (user_id)
);

-- Pet Images (Multiple images per pet)
CREATE TABLE IF NOT EXISTS pet_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pet_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_title VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
    INDEX idx_pet_images_pet (pet_id),
    INDEX idx_pet_images_primary (is_primary)
);

-- ===================================================================
-- SAMPLE DATA INSERTION
-- ===================================================================

-- Insert sample shelter
INSERT IGNORE INTO shelters (name, address, phone_number, email, website, description, capacity, operating_hours) VALUES
('Happy Paws Shelter', '123 Animal Street, Pet City, PC 12345', '555-0123', 'info@happypaws.com', 'www.happypaws.com', 'A loving shelter dedicated to finding homes for all animals', 100, 'Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM');

-- Insert sample admin user
INSERT IGNORE INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@pawhaven.com', '$2a$10$dXJ3SW6G7P4Rm0yc1EjGVuuNv/7MLFUClPHcrlGZr5VWUYm3aUqg6', 'Admin', 'User', 'ADMIN');

-- Insert sample user
INSERT IGNORE INTO users (username, email, password, first_name, last_name, phone_number, address) VALUES
('johndoe', 'john@example.com', '$2a$10$dXJ3SW6G7P4Rm0yc1EjGVuuNv/7MLFUClPHcrlGZr5VWUYm3aUqg6', 'John', 'Doe', '555-0199', '456 User Lane, Pet City, PC 12346');

-- ===================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ===================================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_pets_shelter_available ON pets(shelter_id, is_available);
CREATE INDEX idx_applications_user_status ON adoption_applications(user_id, status);
CREATE INDEX idx_donations_shelter_date ON donations(shelter_id, donation_date);
CREATE INDEX idx_events_shelter_date ON events(shelter_id, start_date_time);
CREATE INDEX idx_medical_records_pet_date ON medical_records(pet_id, record_date);

-- Full-text search indexes
ALTER TABLE pets ADD FULLTEXT(name, breed, description);
ALTER TABLE shelters ADD FULLTEXT(name, description);
ALTER TABLE events ADD FULLTEXT(title, description);
ALTER TABLE accessories ADD FULLTEXT(name, description);

-- ===================================================================
-- SUMMARY
-- ===================================================================
-- Total Tables Created: 11
-- 1. users - User management and authentication
-- 2. shelters - Animal shelter information  
-- 3. pets - Pet information and adoption details
-- 4. adoption_applications - Pet adoption applications
-- 5. donations - Financial and item donations
-- 6. favorites - User's favorite pets (wishlist)
-- 7. medical_records - Pet medical history and health records
-- 8. accessories - Pet accessories and products for sale
-- 9. events - Shelter events and activities
-- 10. event_registrations - Event attendance tracking
-- 11. pet_images - Multiple images per pet

-- Each table corresponds to one entity in the PawHaven system
-- All foreign key relationships are properly defined
-- Comprehensive indexing for performance optimization
-- Sample data included for testing

SELECT 'PawHaven Database Tables Created Successfully!' AS Status;