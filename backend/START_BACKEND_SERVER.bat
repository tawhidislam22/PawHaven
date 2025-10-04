@echo off
title PawHaven Backend Server
color 0A

echo.
echo ============================================
echo        🐾 PawHaven Backend Server 🐾
echo ============================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%

if not exist "mvnw.cmd" (
    echo ❌ Error: mvnw.cmd not found!
    echo Please ensure you're running this from the backend directory.
    pause
    exit /b 1
)

echo 🚀 Starting Spring Boot application...
echo This may take a few minutes on first run...
echo.
echo ✅ Server will be available at: http://localhost:8080
echo ✅ API endpoints will be at: http://localhost:8080/api/
echo.
echo 📌 Press Ctrl+C to stop the server
echo.

call mvnw.cmd spring-boot:run

pause