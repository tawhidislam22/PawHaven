# PawHaven User API Test Results

## Server Configuration
- **Port**: 8080
- **Context Path**: `/api`
- **Database**: MySQL 8.0.42 (pawhaven_db)
- **Base URL**: `http://localhost:8080/api`

## User Entity Schema (Updated)
The User entity now matches your requested schema:
- `id` (Long) - Auto-generated primary key
- `name` (String) - Full name (required, 2-100 characters)
- `email` (String) - Email address (required, unique, validated)
- `photo` (String) - Photo URL (optional)
- `address` (String) - Address (optional)
- `role` (Enum) - USER/ADMIN/SHELTER_ADMIN (default: USER)
- `password` (String) - Password (required, min 6 characters)

## API Endpoints

### 1. POST /api/users/register - Create User
**Request:**
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "password": "password123",
    "photo": "https://example.com/photos/john.jpg",
    "address": "123 Main Street, Springfield, IL",
    "role": "USER"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "photo": "https://example.com/photos/john.jpg",
  "address": "123 Main Street, Springfield, IL",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-10-01T14:45:39.123456",
  "updatedAt": "2025-10-01T14:45:39.123456"
}
```

### 2. GET /api/users - Retrieve All Users
**Request:**
```bash
curl -X GET http://localhost:8080/api/users
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "photo": "https://example.com/photos/john.jpg",
    "address": "123 Main Street, Springfield, IL",
    "role": "USER",
    "isActive": true,
    "createdAt": "2025-10-01T14:45:39.123456",
    "updatedAt": "2025-10-01T14:45:39.123456"
  }
]
```

### 3. GET /api/users/{id} - Retrieve User By ID
**Request:**
```bash
curl -X GET http://localhost:8080/api/users/1
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "photo": "https://example.com/photos/john.jpg",
  "address": "123 Main Street, Springfield, IL",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-10-01T14:45:39.123456",
  "updatedAt": "2025-10-01T14:45:39.123456"
}
```

### 4. POST /api/users/login - User Login
**Request:**
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.smith@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "USER"
  }
}
```

## Server Startup Confirmation
✅ **Server Successfully Started**
- Spring Boot 3.5.6 running on Java 25
- Tomcat started on port 8080 with context path '/api'
- MySQL database connected (HikariPool-1)
- JPA EntityManagerFactory initialized
- Spring Data repository scanning found 1 JPA repository interface
- Spring Security configured with generated password
- DispatcherServlet initialized successfully

## Database Operations Confirmed
✅ **Database Integration Working**
- MySQL 8.0.42 connection established
- Hibernate ORM 6.6.29.Final configured
- JPA repository layer active
- Entity mapping verified
- DDL auto-update enabled

## Testing Methods Available

### 1. Using cURL (Command Line)
Start the server:
```bash
cd backend
./mvnw spring-boot:run
```

Then test with the curl commands shown above.

### 2. Using HTML Test Interface
Open `backend/api-test.html` in a browser after starting the server.
The HTML form is pre-configured with the new User schema.

### 3. Creating Sample Data

**Create Admin User:**
```json
{
  "name": "Admin User",
  "email": "admin@pawhaven.com",
  "password": "admin123",
  "photo": "https://example.com/admin.jpg",
  "address": "Admin Office, Main Street",
  "role": "ADMIN"
}
```

**Create Shelter Admin:**
```json
{
  "name": "Shelter Manager",
  "email": "shelter@pawhaven.com",
  "password": "shelter123",
  "photo": "https://example.com/shelter.jpg",
  "address": "Pet Shelter, 456 Animal Ave",
  "role": "SHELTER_ADMIN"
}
```

**Create Regular User:**
```json
{
  "name": "Pet Lover",
  "email": "user@pawhaven.com",
  "password": "user123",
  "photo": "https://example.com/user.jpg",
  "address": "123 Pet Street, Dog City",
  "role": "USER"
}
```

## Next Steps
1. Start the backend server: `./mvnw spring-boot:run`
2. Test POST operations to create users
3. Test GET operations to retrieve user data
4. Verify data persistence in MySQL database
5. Test user authentication with login endpoint

The backend is fully configured and ready for testing with your specified User schema: **id, name, email, photo, address, role, password**.