-- ============================================
-- Aakash Aqua Tech - Database Schema
-- Compatible with MySQL 5.7+ / 8.0+
-- ============================================

CREATE DATABASE IF NOT EXISTS `aakashaquatech` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `aakashaquatech`;

-- Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products Table
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `capacity` VARCHAR(100),
    `description` TEXT,
    `specifications` JSON,
    `applications` TEXT,
    `image_url` VARCHAR(500),
    `is_featured` TINYINT(1) DEFAULT 0,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_cat` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Services Table
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `short_desc` TEXT,
    `full_desc` TEXT,
    `icon` VARCHAR(100),
    `features` JSON,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Customer Inquiries & Quote Requests
CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150),
    `phone` VARCHAR(30) NOT NULL,
    `service_type` VARCHAR(100),
    `water_source` VARCHAR(100),
    `daily_requirement` VARCHAR(100),
    `message` TEXT,
    `status` ENUM('new', 'contacted', 'quoted', 'closed') DEFAULT 'new',
    `ip_address` VARCHAR(45),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
    `key_name` VARCHAR(100) PRIMARY KEY,
    `key_value` TEXT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data
INSERT IGNORE INTO `categories` (`id`, `slug`, `name`, `description`) VALUES
(1, 'industrial-ro', 'Industrial RO Plants', 'Heavy-duty reverse osmosis systems for factories, manufacturing, and pharma.'),
(2, 'commercial-ro', 'Commercial RO Plants', 'RO systems for offices, schools, hospitals, hotels, and apartments.'),
(3, 'water-softeners', 'Water Softeners', 'Ion-exchange water softeners for hard water removal and boiler feed.'),
(4, 'dm-plants', 'DM / Demineralization Plants', 'Demineralized high-purity water systems for laboratories and battery manufacturing.'),
(5, 'stp-etp', 'Sewage & Effluent Treatment (STP/ETP)', 'Zero liquid discharge and environmental compliance wastewater plants.'),
(6, 'spares-accessories', 'Spares & Consumables', 'Dow Filmtec membranes, pressure vessels, multiport valves, and media.');
