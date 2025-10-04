# PawHaven Backend - User Management API

## Overview
We have successfully created a complete Spring Boot backend with MySQL database integration for user management. The system provides comprehensive user registration and data retrieval APIs as requested.

## 🛠️ Technology Stack
- **Spring Boot 3.5.6** - Main framework
- **Java 21** - Programming language  
- **MySQL 8.0.42** - Database
- **JPA/Hibernate** - ORM for database operations
- **Spring Security** - Security and password encoding
- **Maven** - Build and dependency management

## 📊 Database Configuration
- **Database**: `pawhaven_db`
- **URL**: `jdbc:mysql://localhost:3306/pawhaven_db`  
- **Username**: `root`
- **Password**: `root`
- **Table**: `users` (auto-created by JPA)

## 🏗️ Architecture

### 1. Entity Layer (`User.java`)
```java
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank @Size(min = 3, max = 50)
    private String username;
    
    @Email @NotBlank
    private String email;
    
    @NotBlank @Size(min = 6)
    private String password;
    
    @NotBlank
    private String firstName;
    
    @NotBlank  
    private String lastName;
    
    private String phoneNumber;
    private String address;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    public enum Role { USER, ADMIN, MODERATOR }
}
```

### 2. Repository Layer (`UserRepository.java`)
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    List<User> findByRole(User.Role role);
    
    @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findByNameContaining(@Param("name") String name);
}
```

### 3. Service Layer (`UserService.java`)
- User registration with validation
- Password encryption using BCrypt
- Duplicate username/email checking
- User authentication and retrieval
- CRUD operations for user management

### 4. Controller Layer (`UserController.java`)
REST API endpoints with comprehensive error handling and response formatting.

## 🔗 API Endpoints

### POST `/api/users/register` - User Registration
**Request Body:**
```json
{
    "username": "john_doe",
    "email": "john@example.com", 
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "address": "123 Main St, City"
}
```

**Success Response:**
```json
{
    "success": true,
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "1234567890", 
        "address": "123 Main St, City",
        "role": "USER",
        "createdAt": "2024-01-01T10:00:00",
        "updatedAt": "2024-01-01T10:00:00"
    }
}
```

### GET `/api/users` - Get All Users
**Response:**
```json
{
    "success": true,
    "users": [...],
    "count": 10
}
```

### POST `/api/users/login` - User Authentication
**Request Body:**
```json
{
    "username": "john_doe",
    "password": "password123"
}
```

### Additional Endpoints:
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username  
- `GET /api/users/search?name={name}` - Search users by name
- `GET /api/users/role/{role}` - Get users by role
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🔒 Security Features
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Enabled for frontend integration
- **Input Validation**: Bean validation annotations
- **SQL Injection Protection**: JPA prevents SQL injection
- **Duplicate Prevention**: Username and email uniqueness validation

## ✅ Key Features Implemented

### ✅ User Registration (POST API)
- Validates all required fields
- Checks for duplicate username/email
- Encrypts passwords before storage
- Sets default USER role
- Returns success/error responses

### ✅ User Data Retrieval (GET API)  
- Retrieve all users with pagination support
- Get individual users by ID/username
- Search functionality by name
- Filter users by role
- Passwords excluded from responses for security

### ✅ Database Integration
- MySQL connection established
- JPA entities auto-create tables
- Proper relationship mapping
- Transaction management
- Connection pooling with HikariCP

### ✅ Validation & Error Handling
- Field validation (email format, password length, etc.)
- Comprehensive error messages
- HTTP status codes
- Graceful exception handling

## 🚀 Running the Application

1. **Start MySQL**: Ensure MySQL is running with database `pawhaven_db`
2. **Run Application**: 
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
3. **Access**: Server runs on `http://localhost:8080`
4. **Test**: Use the included `api-test.html` file to test endpoints

## 📝 Testing
- **API Test File**: `api-test.html` - Web interface for testing all endpoints
- **Manual Testing**: Use curl or Postman
- **Database Verification**: Check MySQL tables and data

## 🎯 Success Criteria Met
✅ **Backend connected to MySQL database**  
✅ **User registration API (POST)** - Saves data from register page  
✅ **User retrieval API (GET)** - Fetches user data  
✅ **Complete user management system** - CRUD operations  
✅ **Security implementation** - Password encryption, validation  
✅ **Error handling** - Comprehensive error responses  
✅ **Frontend integration ready** - CORS enabled  

The backend is now fully functional and ready to be integrated with your React frontend for the complete PawHaven application!