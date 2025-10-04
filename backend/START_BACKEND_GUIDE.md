# 🚀 How to Start PawHaven Backend Server

## Quick Start Guide

### Method 1: Using Windows Batch Script (Recommended)
1. Navigate to the backend directory: `C:\Documents\DBMS PROJECT\PawHaven\backend\`
2. Double-click on `start-backend.bat`
3. Wait for the server to start (you'll see "Started BackendApplication" message)
4. Server will be running on `http://localhost:8080`

### Method 2: Using Command Line
1. Open Command Prompt or PowerShell
2. Navigate to backend directory:
   ```cmd
   cd "C:\Documents\DBMS PROJECT\PawHaven\backend"
   ```
3. Run the application:
   ```cmd
   mvnw.cmd spring-boot:run
   ```

### Method 3: Using Git Bash/Terminal
1. Open Git Bash or Terminal
2. Navigate to backend directory:
   ```bash
   cd "/c/Documents/DBMS PROJECT/PawHaven/backend"
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

## Troubleshooting

### Common Issues:

#### 1. "mvnw: command not found"
- **Solution**: Make sure you're in the correct backend directory
- **Check**: Run `ls` (Linux/Mac) or `dir` (Windows) to see if `mvnw` or `mvnw.cmd` exists

#### 2. "JAVA_HOME not set"
- **Solution**: Set JAVA_HOME environment variable or use the batch script which handles this

#### 3. "Port 8080 already in use"
- **Solution**: Stop any other applications using port 8080 or change the port in `application.properties`

#### 4. Database Connection Issues
- **Check**: Ensure MySQL is running on port 3306
- **Check**: Database `pawhaven_db` exists
- **Check**: Username/password in `application.properties` are correct

### Verify Server is Running

1. **Check Console Output**: Look for "Started BackendApplication" message
2. **Test API**: Open browser and go to `http://localhost:8080/api/users`
3. **Check Logs**: Look for any error messages in the console

### Success Indicators
When the server starts successfully, you should see:
```
2024-10-02 12:30:45.123  INFO --- [  restartedMain] c.p.backend.BackendApplication  : Started BackendApplication in 5.234 seconds (JVM running for 6.789)
```

## Next Steps

After the backend is running:
1. Test user registration using the frontend React app
2. Use the test page: `frontend/user-registration-test.html`
3. Check database for created users

## Database Setup

If you haven't set up the database yet:
1. Install MySQL
2. Create database: `CREATE DATABASE pawhaven_db;`
3. Run the table creation script: `backend/database_tables_creation.sql`
4. Update `application.properties` with your database credentials

## API Endpoints

Once running, these endpoints will be available:
- `POST /api/users/register` - User registration
- `GET /api/users` - Get all users
- `GET /api/pets` - Get all pets
- And many more... (see COMPLETE_API_DOCUMENTATION.md)

Happy coding! 🐾