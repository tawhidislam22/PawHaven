# PawHaven Backend API

## Overview
This is the backend REST API for the PawHaven pet adoption platform. Built with Spring Boot 3.5.6, it provides comprehensive endpoints for managing users, pets, shelters, adoptions, feedback, notifications, accessories, reports, payments, and babysitting services.

## Technology Stack
- **Framework**: Spring Boot 3.5.6
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA (Hibernate 6.6.29)
- **Java Version**: 25
- **Build Tool**: Maven
- **API Documentation**: REST endpoints with JSON responses

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/pawhaven/backend/
│   │   │   ├── config/          # Configuration classes
│   │   │   │   └── WebConfig.java
│   │   │   ├── controller/      # REST Controllers (10)
│   │   │   │   ├── UserController.java
│   │   │   │   ├── PetController.java
│   │   │   │   ├── ShelterController.java
│   │   │   │   ├── AdoptionApplicationController.java
│   │   │   │   ├── FeedbackController.java
│   │   │   │   ├── NotificationController.java
│   │   │   │   ├── AccessoryController.java
│   │   │   │   ├── ReportController.java
│   │   │   │   ├── PaymentController.java
│   │   │   │   └── BabysittingController.java
│   │   │   ├── model/           # Entity Models (10 + 6 enums)
│   │   │   │   ├── User.java
│   │   │   │   ├── Pet.java
│   │   │   │   ├── Shelter.java
│   │   │   │   ├── AdoptionApplication.java
│   │   │   │   ├── Feedback.java
│   │   │   │   ├── Notification.java
│   │   │   │   ├── Accessory.java
│   │   │   │   ├── Report.java
│   │   │   │   ├── Payment.java
│   │   │   │   ├── Babysitting.java
│   │   │   │   ├── UserRole.java
│   │   │   │   ├── Gender.java
│   │   │   │   ├── ApplicationStatus.java
│   │   │   │   ├── ReportStatus.java
│   │   │   │   ├── PaymentStatus.java
│   │   │   │   └── BabysittingStatus.java
│   │   │   ├── repository/      # Data Access Layer (10)
│   │   │   │   └── [10 JPA Repositories]
│   │   │   └── service/         # Business Logic Layer (10)
│   │   │       └── [10 Services]
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
├── database_setup.sql
└── pom.xml
```

## Database Setup

### 1. Create Database
Run the SQL script to create the database and tables:
```bash
mysql -u root -p < database_setup.sql
```

Or manually in MySQL:
```sql
CREATE DATABASE IF NOT EXISTS pawhaven;
USE pawhaven;
-- Then run the rest of the script
```

### 2. Configure Database Connection
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pawhaven
spring.datasource.username=root
spring.datasource.password=your_password
```

## Running the Application

### Using Maven Wrapper (Recommended)
```bash
# On Windows
cd backend
mvnw.cmd clean install
mvnw.cmd spring-boot:run

# On Linux/Mac
./mvnw clean install
./mvnw spring-boot:run
```

### Using Maven Directly
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The API will start on **http://localhost:8080**

## API Endpoints

### Base URL
```
http://localhost:8080/api
```

### User Management (`/api/users`)
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `GET /users/email/{email}` - Get user by email
- `GET /users/active` - Get active users
- `GET /users/role/{role}` - Get users by role
- `GET /users/search?name={name}` - Search users by name
- `GET /users/recent` - Get recent users
- `GET /users/exists/{email}` - Check if email exists
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `PUT /users/{id}/activate` - Activate user
- `PUT /users/{id}/deactivate` - Deactivate user
- `DELETE /users/{id}` - Delete user

### Pet Management (`/api/pets`)
- `GET /pets` - Get all pets
- `GET /pets/{id}` - Get pet by ID
- `GET /pets/available` - Get available pets
- `GET /pets/recent` - Get recent available pets
- `GET /pets/species/{species}` - Get pets by species
- `GET /pets/species/{species}/available` - Get available pets by species
- `GET /pets/search/name?name={name}` - Search pets by name
- `GET /pets/search/breed?breed={breed}` - Search pets by breed
- `GET /pets/shelter/{shelterId}` - Get pets by shelter
- `GET /pets/age?minAge={min}&maxAge={max}` - Get pets by age range
- `POST /pets` - Create new pet
- `PUT /pets/{id}` - Update pet
- `PUT /pets/{id}/adopt` - Mark pet as adopted
- `PUT /pets/{id}/available` - Mark pet as available
- `DELETE /pets/{id}` - Delete pet

### Shelter Management (`/api/shelters`)
- `GET /shelters` - Get all shelters
- `GET /shelters/{id}` - Get shelter by ID
- `GET /shelters/active` - Get active shelters
- `GET /shelters/city/{city}` - Get shelters by city
- `GET /shelters/search?name={name}` - Search shelters by name
- `POST /shelters` - Create new shelter
- `PUT /shelters/{id}` - Update shelter
- `DELETE /shelters/{id}` - Delete shelter

### Adoption Applications (`/api/adoption-applications`)
- `GET /adoption-applications` - Get all applications
- `GET /adoption-applications/{id}` - Get application by ID
- `GET /adoption-applications/user/{userId}` - Get applications by user
- `GET /adoption-applications/pet/{petId}` - Get applications by pet
- `GET /adoption-applications/status/{status}` - Get applications by status
- `GET /adoption-applications/recent` - Get recent applications
- `POST /adoption-applications` - Create new application
- `PUT /adoption-applications/{id}` - Update application
- `PUT /adoption-applications/{id}/status` - Update application status
- `DELETE /adoption-applications/{id}` - Delete application

### Feedback & Reviews (`/api/feedback`)
- `GET /feedback` - Get all feedback
- `GET /feedback/{id}` - Get feedback by ID
- `GET /feedback/visible` - Get visible feedback
- `GET /feedback/user/{userId}` - Get feedback by user
- `GET /feedback/rating/{rating}` - Get feedback by rating
- `GET /feedback/average-rating` - Get average rating
- `POST /feedback` - Create new feedback
- `PUT /feedback/{id}` - Update feedback
- `PUT /feedback/{id}/toggle-visibility` - Toggle feedback visibility
- `DELETE /feedback/{id}` - Delete feedback

### Notifications (`/api/notifications`)
- `GET /notifications/user/{userId}` - Get user notifications
- `GET /notifications/user/{userId}/unread` - Get unread notifications
- `GET /notifications/user/{userId}/unread/count` - Count unread notifications
- `POST /notifications` - Create notification
- `PUT /notifications/{id}/read` - Mark as read
- `PUT /notifications/user/{userId}/read-all` - Mark all as read
- `DELETE /notifications/{id}` - Delete notification

### Accessories/Products (`/api/accessories`)
- `GET /accessories` - Get all accessories
- `GET /accessories/{id}` - Get accessory by ID
- `GET /accessories/active` - Get active accessories
- `GET /accessories/in-stock` - Get in-stock items
- `GET /accessories/type/{type}` - Get accessories by type
- `GET /accessories/search/name?name={name}` - Search by name
- `GET /accessories/price-range?minPrice={min}&maxPrice={max}` - Filter by price
- `POST /accessories` - Create new accessory
- `PUT /accessories/{id}` - Update accessory
- `PUT /accessories/{id}/stock` - Update stock quantity
- `DELETE /accessories/{id}` - Delete accessory

### Lost/Found Reports (`/api/reports`)
- `GET /reports` - Get all reports
- `GET /reports/{id}` - Get report by ID
- `GET /reports/pending` - Get pending reports
- `GET /reports/user/{userId}` - Get reports by user
- `GET /reports/status/{status}` - Get reports by status
- `GET /reports/type/{type}` - Get reports by type (LOST/FOUND)
- `POST /reports` - Create new report
- `PUT /reports/{id}` - Update report
- `PUT /reports/{id}/status` - Update report status
- `DELETE /reports/{id}` - Delete report

### Payments (`/api/payments`)
- `GET /payments` - Get all payments
- `GET /payments/{id}` - Get payment by ID
- `GET /payments/transaction/{tranId}` - Get payment by transaction ID
- `GET /payments/user/{userId}` - Get payments by user
- `GET /payments/status/{status}` - Get payments by status
- `GET /payments/total/status/{status}` - Get total amount by status
- `POST /payments` - Create payment
- `POST /payments/process` - Process payment
- `PUT /payments/transaction/{tranId}/complete` - Complete payment
- `PUT /payments/transaction/{tranId}/refund` - Refund payment
- `DELETE /payments/{id}` - Delete payment

### Pet Babysitting (`/api/babysitting`)
- `GET /babysitting` - Get all bookings
- `GET /babysitting/{id}` - Get booking by ID
- `GET /babysitting/upcoming` - Get upcoming services
- `GET /babysitting/user/{userId}` - Get bookings by user
- `GET /babysitting/pet/{petId}` - Get bookings by pet
- `GET /babysitting/status/{status}` - Get bookings by status
- `POST /babysitting` - Create new booking
- `PUT /babysitting/{id}` - Update booking
- `PUT /babysitting/{id}/start` - Start service
- `PUT /babysitting/{id}/complete` - Complete service
- `PUT /babysitting/{id}/cancel` - Cancel service
- `DELETE /babysitting/{id}` - Delete booking

## Response Format

### Success Response
```json
{
  "id": 1,
  "name": "Max",
  "species": "Dog",
  ...
}
```

### Error Response
```json
{
  "timestamp": "2025-10-07T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Pet not found with id: 123"
}
```

## CORS Configuration
The API is configured to accept requests from:
- Frontend: `http://localhost:5173`

To modify CORS settings, edit `WebConfig.java`

## Development

### Adding New Entity
1. Create entity class in `model/` package
2. Create repository interface in `repository/` package
3. Create service class in `service/` package
4. Create controller in `controller/` package
5. Update `database_setup.sql` if needed

### Testing API Endpoints
Use tools like:
- **Postman**: Import endpoints and test
- **cURL**: Command-line testing
- **Browser**: For GET requests
- **Frontend**: React app at localhost:5173

### Example cURL Commands
```bash
# Get all pets
curl http://localhost:8080/api/pets

# Create new user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"USER"}'

# Update pet
curl -X PUT http://localhost:8080/api/pets/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Max","species":"Dog","available":true}'
```

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 8080
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

### Database Connection Issues
1. Check MySQL is running
2. Verify database exists: `SHOW DATABASES;`
3. Check credentials in `application.properties`
4. Ensure MySQL port 3306 is accessible

### Build Errors
```bash
# Clean and rebuild
mvnw clean install -U

# Skip tests if needed
mvnw clean install -DskipTests
```

## Features
✅ Complete CRUD operations for all entities  
✅ Custom query methods in repositories  
✅ Business logic in service layer  
✅ RESTful API design  
✅ CORS enabled for frontend  
✅ MySQL database with relationships  
✅ Validation annotations  
✅ Timestamp tracking (created/updated)  
✅ Enum types for status fields  
✅ Transaction management  

## Future Enhancements
- [ ] Spring Security & JWT authentication
- [ ] Role-based access control (RBAC)
- [ ] File upload for images
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## License
This project is part of the PawHaven DBMS project.

## Contact
For issues or questions, please contact the development team.
