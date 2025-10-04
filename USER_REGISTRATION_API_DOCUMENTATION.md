# PawHaven User Registration API Implementation

## Overview
This document outlines the complete implementation of user data posting functionality for the PawHaven pet adoption platform.

## Backend API Endpoint

### POST /api/users/register
**Purpose:** Register a new user in the system

**Endpoint:** `http://localhost:8080/api/users/register`

**Request Method:** POST

**Content-Type:** application/json

### Request Body Structure
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com", 
  "password": "securePassword123",
  "address": "123 Main Street, City, State, ZIP",
  "photo": "https://example.com/profile-photo.jpg",
  "role": "USER"
}
```

### Field Specifications
| Field | Type | Required | Validation | Default | Description |
|-------|------|----------|------------|---------|-------------|
| `name` | String | ✅ Yes | 2-100 chars | - | User's full name |
| `email` | String | ✅ Yes | Valid email, unique | - | User's email address |
| `password` | String | ✅ Yes | Min 6 chars | - | User's password |
| `address` | String | ❌ No | Max 500 chars | Empty string | User's address |
| `photo` | String | ❌ No | Valid URL | Empty string | Profile photo URL |
| `role` | Enum | ❌ No | USER/SHELTER_STAFF/ADMIN | USER | User role |

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": null,
    "address": "123 Main Street, City, State, ZIP",
    "photo": "https://example.com/profile-photo.jpg",
    "role": "USER",
    "isActive": true,
    "createdAt": "2024-10-02T12:30:45.123",
    "updatedAt": "2024-10-02T12:30:45.123"
  }
}
```

### Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Name is required"
}
```

#### 400 Bad Request - Email Already Exists
```json
{
  "success": false,
  "message": "Email already exists"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Registration failed: Database connection error"
}
```

## Frontend Implementation

### API Service Function (services/api.js)
```javascript
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  // ... other user API methods
};
```

### React Component Implementation (Register.jsx)
```javascript
const onSubmit = async (data) => {
  setLoading(true);
  try {
    // Upload profile image if provided
    let photoURL = null;
    if (data.photo && data.photo[0]) {
      photoURL = await uploadImage(data.photo[0]);
    }

    // Prepare user info for backend API
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address || '',
      photo: photoURL || '',
      role: data.role || 'USER',
      isActive: true
    };

    // Save user info to database using userAPI
    console.log('Sending user data:', userInfo);
    const dbResponse = await userAPI.register(userInfo);
    console.log('Backend response:', dbResponse.data);

    if (dbResponse.data && dbResponse.data.success) {
      toast.success(`Welcome to PawHaven, ${dbResponse.data.user.name}! 🐾`);
      reset();
      navigate('/login');
    } else {
      throw new Error(dbResponse.data?.message || 'Registration failed');
    }
  } catch (error) {
    toast.error(error.message || 'Failed to register');
    console.error('Registration error:', error);
  } finally {
    setLoading(false);
  }
};
```

## Testing the Implementation

### Method 1: Using the Test HTML File
1. Open `frontend/user-registration-test.html` in your browser
2. Fill out the registration form
3. Click "Register User"
4. Check the console and result display

### Method 2: Using cURL
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "address": "123 Test Street",
    "photo": "",
    "role": "USER"
  }'
```

### Method 3: Using Postman
1. Create a new POST request
2. URL: `http://localhost:8080/api/users/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Postman Test User",
  "email": "postman@example.com",
  "password": "securepass123",
  "address": "456 Postman Avenue",
  "photo": "https://via.placeholder.com/150",
  "role": "USER"
}
```

## Database Schema

### Users Table Structure
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    photo VARCHAR(500),
    role ENUM('USER', 'SHELTER_STAFF', 'ADMIN') NOT NULL DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Error Handling

### Common Validation Errors
- **Name required:** User must provide a name (2-100 characters)
- **Email invalid:** Email must be valid format and unique
- **Password weak:** Password must be at least 6 characters
- **Address too long:** Address cannot exceed 500 characters

### Network Errors
- **Connection timeout:** Backend server not responding
- **CORS issues:** Cross-origin requests blocked
- **404 Not Found:** Incorrect API endpoint
- **500 Server Error:** Database or server-side issues

## Security Considerations

### Password Handling
- Passwords are hashed using BCrypt before storage
- Original passwords are never returned in API responses
- Password field is set to `null` in success responses

### Input Validation
- Server-side validation using Jakarta Validation annotations
- Client-side validation using React Hook Form
- SQL injection prevention through JPA/Hibernate

### Authentication & Authorization
- JWT tokens for session management
- Role-based access control (USER, SHELTER_STAFF, ADMIN)
- Secure password reset functionality

## Integration Steps

### 1. Start Backend Server
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Verify Database Connection
- Ensure MySQL is running on port 3306
- Database `pawhaven_db` exists
- User table is created (auto-created by Hibernate)

### 3. Test Registration
- Use the test HTML file or React component
- Check browser console for request/response
- Verify user is created in database

### 4. Frontend Integration
- Import `userAPI` from services/api.js
- Use `userAPI.register(userData)` in components
- Handle success/error responses appropriately

## Next Steps

### Additional User Management Features
1. **Email Verification:** Send verification emails after registration
2. **Password Reset:** Implement forgot password functionality
3. **Profile Updates:** Allow users to update their information
4. **Account Deactivation:** Soft delete user accounts
5. **Social Login:** Integrate Google/Facebook authentication

### API Enhancements
1. **Rate Limiting:** Prevent spam registrations
2. **Input Sanitization:** Clean user input data
3. **Audit Logging:** Track user registration events
4. **Batch Operations:** Register multiple users
5. **Data Export:** Export user data for admins

This completes the user data posting implementation for PawHaven! 🐾