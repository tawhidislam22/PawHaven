@echo off
echo Starting PawHaven Backend Server...
echo.

cd /d "C:\Documents\DBMS PROJECT\PawHaven\backend"

echo Current directory: %CD%
echo.

if not exist "mvnw.cmd" (
    echo Error: mvnw.cmd not found in current directory
    echo Please ensure you are in the correct backend directory
    pause
    exit /b 1
)

echo Building and starting Spring Boot application...
echo This may take a few minutes on first run...
echo.

call mvnw.cmd clean spring-boot:run

pause