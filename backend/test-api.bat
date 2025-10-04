@echo off
echo PawHaven User API Test Script
echo =============================
echo.

echo Starting backend server...
echo Please wait for the server to start completely before running tests.
echo Look for "Started BackendApplication" in the output.
echo.

cd /d "%~dp0"
start "PawHaven Backend" cmd /k "mvnw spring-boot:run"

echo.
echo Backend server is starting in a new window.
echo Once you see "Started BackendApplication", you can run the tests below:
echo.

echo *** TEST 1: Create a new user ***
echo curl -X POST http://localhost:8080/api/users/register -H "Content-Type: application/json" -d "{'name':'John Smith','email':'john.smith@example.com','password':'password123','photo':'https://example.com/photos/john.jpg','address':'123 Main Street, Springfield, IL','role':'USER'}"
echo.

echo *** TEST 2: Get all users ***
echo curl -X GET http://localhost:8080/api/users
echo.

echo *** TEST 3: Login user ***
echo curl -X POST http://localhost:8080/api/users/login -H "Content-Type: application/json" -d "{'email':'john.smith@example.com','password':'password123'}"
echo.

echo *** To run these tests, copy and paste the commands above into another command prompt ***
echo.

pause