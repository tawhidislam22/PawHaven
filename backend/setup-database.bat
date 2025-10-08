@echo off
echo Setting up PawHaven database with sample data...
echo.
echo Please enter your MySQL root password when prompted
echo.

mysql -u root -p < database_setup.sql

echo.
echo Database setup complete!
echo Now you can start the backend with: mvnw spring-boot:run
pause
