@echo off
echo Creating PawHaven database...
echo.
echo Please enter your MySQL root password when prompted
echo.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS pawhaven; USE pawhaven; SHOW TABLES;"

echo.
echo Database created successfully!
echo Now you can start the backend with: mvnw spring-boot:run
pause
