# PawHaven Backend Entities Documentation

## 📋 Complete Entity Overview

This document outlines all the backend entities for the PawHaven pet adoption platform. These entities form the complete data model for a comprehensive pet adoption and management system.

## 🏗️ Entity Architecture

### Core Entities

#### 1. **User** (`users` table)
**Purpose**: Manages all system users including adopters, volunteers, staff, and administrators.

**Key Features**:
- Complete user authentication and authorization
- Role-based access control (USER, ADMIN, MODERATOR)
- Password encryption with BCrypt
- Profile management with contact information
- Account activation and timestamps

**Relationships**:
- One-to-many with AdoptionApplication (as applicant)
- One-to-many with Donation (as donor)
- One-to-many with Favorite (user favorites)
- One-to-many with MedicalRecord (created by)
- One-to-many with Event (as organizer)

---

#### 2. **Pet** (`pets` table)
**Purpose**: Central entity for all pets available for adoption.

**Key Features**:
- Comprehensive pet information (name, breed, age, description)
- Multiple pet types (DOG, CAT, BIRD, RABBIT, etc.)
- Health and behavioral characteristics
- Adoption status tracking
- Multiple image support
- Location and shelter association

**Relationships**:
- Many-to-one with Shelter
- One-to-many with AdoptionApplication
- One-to-many with Donation (dedicated donations)
- One-to-many with Favorite
- One-to-many with MedicalRecord

---

#### 3. **Shelter** (`shelters` table)
**Purpose**: Manages animal shelters, rescue organizations, and foster networks.

**Key Features**:
- Complete shelter information and contact details
- Capacity and occupancy tracking
- Service offerings (adoption, veterinary care, etc.)
- Verification and licensing status
- Operating hours and location details

**Relationships**:
- One-to-many with Pet (shelter pets)
- One-to-many with Donation (dedicated to shelter)
- One-to-many with Event (host shelter)
- One-to-many with Accessory (beneficiary shelter)

---

#### 4. **AdoptionApplication** (`adoption_applications` table)
**Purpose**: Manages the complete adoption application process.

**Key Features**:
- Comprehensive adoption questionnaire
- Housing situation assessment
- Pet experience evaluation
- Reference checking system
- Application status workflow
- Administrative review process

**Relationships**:
- Many-to-one with User (applicant)
- Many-to-one with Pet (applied for)
- Many-to-one with User (reviewed by)

---

### Supporting Entities

#### 5. **Donation** (`donations` table)
**Purpose**: Handles monetary donations to support shelter operations and pet care.

**Key Features**:
- Flexible donation types (general, medical care, food supplies)
- Multiple payment methods support
- Recurring donation capabilities
- Anonymous donation options
- Tax-deductible receipt management
- Memorial and honor donations

**Relationships**:
- Many-to-one with User (donor)
- Many-to-one with Pet (dedicated to specific pet)
- Many-to-one with Shelter (dedicated to shelter)

---

#### 6. **Favorite** (`favorites` table)
**Purpose**: Allows users to save and track favorite pets.

**Key Features**:
- Simple user-pet favoriting system
- Personal notes for each favorite
- Notification preferences
- Unique constraint to prevent duplicates

**Relationships**:
- Many-to-one with User
- Many-to-one with Pet

---

#### 7. **MedicalRecord** (`medical_records` table)
**Purpose**: Comprehensive medical history tracking for pets.

**Key Features**:
- Complete medical record types (vaccination, surgery, checkup)
- Veterinarian and clinic information
- Medication and treatment tracking
- Follow-up scheduling
- Cost tracking and attachments
- Treatment status workflow

**Relationships**:
- Many-to-one with Pet
- Many-to-one with User (created by)

---

#### 8. **Accessory** (`accessories` table)
**Purpose**: E-commerce functionality for pet accessories and supplies.

**Key Features**:
- Complete product catalog management
- Inventory tracking with stock quantities
- Multiple images and product variants
- Rating and review system
- Shelter donation integration
- Sale and promotion support

**Relationships**:
- Many-to-one with Shelter (beneficiary)

---

#### 9. **Event** (`events` table)
**Purpose**: Community events, adoption fairs, and educational workshops.

**Key Features**:
- Comprehensive event management
- Multiple event types (adoption events, fundraisers, education)
- Registration and attendance tracking
- Virtual event support
- Contact and location management
- Event status workflow

**Relationships**:
- Many-to-one with User (organizer)
- Many-to-one with Shelter (host)

---

## 🔐 Security & Validation Features

### Data Validation
- **Input Validation**: All entities use Jakarta validation annotations
- **Size Constraints**: Appropriate field length limits
- **Format Validation**: Email, phone number, and pattern validation
- **Business Logic Validation**: Custom validation rules

### Security Measures
- **Password Encryption**: BCrypt hashing for user passwords
- **Sensitive Data Protection**: Passwords excluded from API responses
- **Access Control**: Role-based permissions
- **Data Integrity**: Foreign key constraints and unique constraints

### Audit Trail
- **Timestamps**: Created and updated timestamps on all entities
- **User Tracking**: Track who created/modified records where applicable
- **Status History**: Comprehensive status tracking for applications and events

---

## 🗄️ Database Schema Features

### Relationship Mapping
- **JPA Annotations**: Proper entity relationships with fetch strategies
- **Cascade Operations**: Appropriate cascade rules for data integrity
- **Lazy Loading**: Optimized data fetching to improve performance

### Index Strategy
- **Primary Keys**: Auto-generated IDs for all entities
- **Unique Constraints**: Email uniqueness, SKU uniqueness, etc.
- **Composite Indexes**: User-pet favorites, medical records by pet

### Data Types
- **Enums**: Type-safe enumeration for categories and statuses
- **Decimal Precision**: Proper decimal handling for monetary values
- **Date/Time**: LocalDateTime and LocalDate for temporal data
- **Collections**: Element collections for multi-valued attributes

---

## 🚀 Scalability & Performance

### Entity Design Patterns
- **Lazy Loading**: Relationships loaded on-demand
- **JSON Ignore**: Hibernate proxy ignoring for JSON serialization
- **Optimized Queries**: Efficient relationship mapping

### Data Modeling Best Practices
- **Normalization**: Proper database normalization
- **Flexible Enums**: Extensible enumeration values
- **Soft Deletes**: Active/inactive flags instead of hard deletes
- **Audit Fields**: Comprehensive tracking fields

---

## 📊 Business Logic Integration

### Workflow Support
- **Status Management**: Application and event status workflows
- **Approval Processes**: Administrative review capabilities
- **Notification Integration**: Ready for notification system integration

### Reporting Capabilities
- **Analytics Ready**: Structured data for reporting
- **Financial Tracking**: Comprehensive donation and payment tracking
- **Operational Metrics**: Shelter capacity, adoption rates, etc.

---

## 💡 Extension Points

### Future Enhancements
- **Messaging System**: Communication between users and shelters
- **Review System**: User reviews for accessories and services
- **Foster Program**: Foster application and management
- **Volunteer Management**: Volunteer scheduling and tracking
- **Transport Coordination**: Pet transport between locations

### Integration Ready
- **Payment Gateways**: Structured for payment processor integration
- **Email Services**: Ready for automated email notifications
- **File Storage**: Image and document storage integration
- **Analytics**: Data structure supports comprehensive analytics

---

This comprehensive entity model provides a robust foundation for a full-featured pet adoption platform, supporting everything from basic pet listings to complex adoption workflows, donation management, and community engagement features.