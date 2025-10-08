-- PawHaven Database Creation Script
-- This script creates all tables based on the ERD

-- Create database
CREATE DATABASE IF NOT EXISTS pawhaven;
USE pawhaven;

-- Drop tables if they exist (in reverse order due to foreign keys)
DROP TABLE IF EXISTS babysitting;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS accessories;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS feedbacks;
DROP TABLE IF EXISTS adoption_applications;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS shelters;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    u_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL DEFAULT 'USER',
    phone VARCHAR(20),
    address VARCHAR(500),
    profile_image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Shelters Table
CREATE TABLE shelters (
    s_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    contact_number VARCHAR(20),
    email VARCHAR(150),
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zip_code VARCHAR(20),
    website VARCHAR(200),
    description TEXT,
    capacity INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Pets Table
CREATE TABLE pets (
    p_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    gender ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL,
    age INT,
    color VARCHAR(50),
    size VARCHAR(20),
    weight DOUBLE,
    description TEXT,
    health_status VARCHAR(100),
    vaccination_status VARCHAR(100),
    image VARCHAR(500),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    adoption_fee DOUBLE,
    shelter_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (shelter_id) REFERENCES shelters(s_id) ON DELETE SET NULL,
    INDEX idx_species (species),
    INDEX idx_breed (breed),
    INDEX idx_available (available),
    INDEX idx_shelter (shelter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Adoption Applications Table
CREATE TABLE adoption_applications (
    a_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW') NOT NULL DEFAULT 'PENDING',
    application_reason TEXT,
    living_situation VARCHAR(200),
    has_other_pets BOOLEAN,
    experience_with_pets TEXT,
    admin_notes TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(p_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_pet (pet_id),
    INDEX idx_status (status),
    INDEX idx_submission_date (submission_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Feedbacks Table
CREATE TABLE feedbacks (
    f_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_visible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_rating (rating),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Notifications Table
CREATE TABLE notifications (
    n_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Accessories Table
CREATE TABLE accessories (
    acc_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL CHECK (price > 0),
    quantity INT NOT NULL CHECK (quantity >= 0),
    description TEXT,
    image VARCHAR(500),
    brand VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Reports Table
CREATE TABLE reports (
    r_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(200),
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'PENDING',
    description TEXT,
    contact_info VARCHAR(200),
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Payments Table
CREATE TABLE payments (
    pay_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DOUBLE NOT NULL CHECK (amount > 0),
    purpose VARCHAR(100) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tran_id VARCHAR(100) UNIQUE,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    currency VARCHAR(10) DEFAULT 'USD',
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_tran_id (tran_id),
    INDEX idx_status (status),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Babysitting Table
CREATE TABLE babysitting (
    b_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    service_date DATE NOT NULL,
    duration INT NOT NULL CHECK (duration >= 1),
    status ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    service_fee DOUBLE,
    special_instructions TEXT,
    caretaker_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(u_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(p_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_pet (pet_id),
    INDEX idx_service_date (service_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert some sample data
-- Sample Users
INSERT INTO users (name, email, password, role, phone, address) VALUES
('John Doe', 'john@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'USER', '1234567890', '123 Main St, City, State'),
('Admin User', 'admin@pawhaven.com', '$2a$10$abcdefghijklmnopqrstuv', 'ADMIN', '0987654321', '456 Admin Ave, City, State'),
('Jane Smith', 'jane@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'MODERATOR', '5555555555', '789 Park Lane, City, State');

-- Sample Shelters
INSERT INTO shelters (name, contact_number, email, address, city, state, country, capacity) VALUES
('Happy Paws Shelter', '555-0100', 'info@happypaws.com', '100 Shelter Road', 'Springfield', 'IL', 'USA', 50),
('Pet Haven Rescue', '555-0200', 'contact@pethaven.org', '200 Care Street', 'Riverside', 'CA', 'USA', 75);

-- Sample Pets
INSERT INTO pets (name, species, breed, gender, age, color, size, description, health_status, vaccination_status, available, adoption_fee, shelter_id) VALUES
('Max', 'Dog', 'Golden Retriever', 'MALE', 3, 'Golden', 'Large', 'Friendly and energetic dog', 'Healthy', 'Up to date', TRUE, 250.00, 1),
('Bella', 'Cat', 'Persian', 'FEMALE', 2, 'White', 'Medium', 'Calm and affectionate cat', 'Healthy', 'Up to date', TRUE, 150.00, 1),
('Charlie', 'Dog', 'Beagle', 'MALE', 4, 'Brown/White', 'Medium', 'Playful and loyal', 'Healthy', 'Up to date', TRUE, 200.00, 2);

-- Sample Accessories
INSERT INTO accessories (name, type, price, quantity, description, brand) VALUES
('Premium Dog Food (25lb)', 'Food', 49.99, 100, 'High-quality nutrition for dogs', 'PawNutrition'),
('Cat Scratching Post', 'Toy', 29.99, 50, 'Durable scratching post for cats', 'FelineFun'),
('Pet Carrier', 'Accessory', 39.99, 30, 'Comfortable travel carrier', 'PetGo');

COMMIT;

-- End of script
