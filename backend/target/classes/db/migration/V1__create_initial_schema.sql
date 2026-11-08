
-- ============================================
-- CITY CIVIC SERVICE - INITIAL DATABASE SCHEMA
-- MySQL 8
-- ============================================

-- 1. USERS TABLE
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('CITIZEN', 'STAFF', 'ADMIN')
        NOT NULL DEFAULT 'CITIZEN',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. COMPLAINTS TABLE
CREATE TABLE complaints (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    citizen_id BIGINT NOT NULL,
    assigned_staff_id BIGINT,
    category_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT')
        NOT NULL DEFAULT 'MEDIUM',
    status ENUM(
        'SUBMITTED',
        'UNDER_REVIEW',
        'ASSIGNED',
        'IN_PROGRESS',
        'RESOLVED',
        'REJECTED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'SUBMITTED',
    location VARCHAR(255) NOT NULL,
    resolution_notes TEXT,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,

    CONSTRAINT fk_complaint_citizen
        FOREIGN KEY (citizen_id) REFERENCES users(id),

    CONSTRAINT fk_complaint_staff
        FOREIGN KEY (assigned_staff_id) REFERENCES users(id),

    CONSTRAINT fk_complaint_category
        FOREIGN KEY (category_id) REFERENCES categories(id),

    INDEX idx_complaint_citizen (citizen_id),
    INDEX idx_complaint_staff (assigned_staff_id),
    INDEX idx_complaint_status (status),
    INDEX idx_complaint_category (category_id)
);

-- 4. COMPLAINT STATUS HISTORY TABLE
CREATE TABLE complaint_status_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    complaint_id BIGINT NOT NULL,
    changed_by BIGINT NOT NULL,
    previous_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    remarks TEXT,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_history_user
        FOREIGN KEY (changed_by) REFERENCES users(id),

    INDEX idx_history_complaint (complaint_id)
);

-- 5. COMPLAINT ATTACHMENTS TABLE
CREATE TABLE complaint_attachments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    complaint_id BIGINT NOT NULL,
    uploaded_by BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    content_type VARCHAR(100),
    file_size BIGINT,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attachment_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attachment_user
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- 6. FEEDBACK TABLE
CREATE TABLE feedback (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    complaint_id BIGINT NOT NULL UNIQUE,
    citizen_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_feedback_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id),

    CONSTRAINT fk_feedback_citizen
        FOREIGN KEY (citizen_id) REFERENCES users(id),

    CONSTRAINT chk_feedback_rating
        CHECK (rating BETWEEN 1 AND 5)
);
