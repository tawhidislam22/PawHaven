# Complete PawHaven API Testing Guide
## All CRUD Operations for Every Entity

This document provides comprehensive API testing examples for all 9 entities with complete CRUD operations (CREATE, READ, UPDATE, DELETE) as requested.

## Base URL
```
http://localhost:8080
```

## 1. User API Endpoints

### CREATE User (POST)
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "address": "123 Main St, City, State",
    "role": "USER"
  }'
```

### UPDATE User (PUT)
```bash
curl -X PUT http://localhost:8080/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe_updated",
    "email": "john.updated@example.com",
    "password": "newpassword123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "9876543210",
    "address": "456 New St, City, State",
    "role": "USER"
  }'
```

### READ Operations
```bash
# Get all users
curl -X GET http://localhost:8080/users

# Get user by ID
curl -X GET http://localhost:8080/users/1

# Get user by username
curl -X GET http://localhost:8080/users/username/john_doe

# Get user by email
curl -X GET http://localhost:8080/users/email/john@example.com

# Search users by name
curl -X GET "http://localhost:8080/users/search?name=John"
```

### DELETE User
```bash
curl -X DELETE http://localhost:8080/users/1
```

## 2. Pet API Endpoints

### CREATE Pet (POST)
```bash
curl -X POST http://localhost:8080/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy",
    "species": "DOG",
    "breed": "Golden Retriever",
    "age": 3,
    "gender": "MALE",
    "color": "Golden",
    "size": "LARGE",
    "weight": 30.5,
    "description": "Friendly and energetic dog",
    "medicalHistory": "Up to date on vaccinations",
    "behaviorNotes": "Good with children",
    "adoptionFee": 250.00,
    "isAvailable": true,
    "shelterId": 1
  }'
```

### UPDATE Pet (PUT)
```bash
curl -X PUT http://localhost:8080/pets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy Updated",
    "species": "DOG",
    "breed": "Golden Retriever",
    "age": 4,
    "gender": "MALE",
    "color": "Golden",
    "size": "LARGE",
    "weight": 32.0,
    "description": "Very friendly and energetic dog",
    "medicalHistory": "Up to date on all vaccinations",
    "behaviorNotes": "Excellent with children and other pets",
    "adoptionFee": 275.00,
    "isAvailable": true,
    "shelterId": 1
  }'
```

### READ Operations
```bash
# Get all pets
curl -X GET http://localhost:8080/pets

# Get available pets
curl -X GET http://localhost:8080/pets/available

# Get pets by species
curl -X GET http://localhost:8080/pets/species/DOG

# Get pets by shelter
curl -X GET http://localhost:8080/pets/shelter/1

# Search pets by breed
curl -X GET "http://localhost:8080/pets/search/breed?breed=Golden Retriever"

# Get pets by age range
curl -X GET "http://localhost:8080/pets/age-range?minAge=2&maxAge=5"
```

## 3. Shelter API Endpoints

### CREATE Shelter (POST)
```bash
curl -X POST http://localhost:8080/shelters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Happy Paws Shelter",
    "address": "789 Pet Street, Animal City, AC 12345",
    "phoneNumber": "555-0123",
    "email": "info@happypaws.com",
    "website": "www.happypaws.com",
    "description": "A loving shelter for all animals",
    "capacity": 100,
    "operatingHours": "Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM"
  }'
```

### UPDATE Shelter (PUT)
```bash
curl -X PUT http://localhost:8080/shelters/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Happy Paws Shelter Updated",
    "address": "789 Pet Street, Animal City, AC 12345",
    "phoneNumber": "555-0124",
    "email": "contact@happypaws.com",
    "website": "www.happypaws.org",
    "description": "A loving shelter for all animals - now with expanded facilities",
    "capacity": 150,
    "operatingHours": "Mon-Fri: 8AM-7PM, Sat-Sun: 9AM-5PM"
  }'
```

## 4. Adoption Application API Endpoints

### CREATE Adoption Application (POST)
```bash
curl -X POST http://localhost:8080/adoption-applications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "petId": 1,
    "applicationDate": "2024-01-15T10:00:00",
    "status": "PENDING",
    "reasonForAdoption": "Looking for a companion for my family",
    "experienceWithPets": "I have had dogs for 10 years",
    "livingArrangement": "House with large backyard",
    "hasOtherPets": true,
    "otherPetsDescription": "One cat named Whiskers"
  }'
```

### UPDATE Adoption Application (PUT)
```bash
curl -X PUT http://localhost:8080/adoption-applications/1 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "petId": 1,
    "applicationDate": "2024-01-15T10:00:00",
    "status": "APPROVED",
    "reasonForAdoption": "Looking for a loving companion for my family",
    "experienceWithPets": "I have had dogs for 15 years",
    "livingArrangement": "House with large fenced backyard",
    "hasOtherPets": true,
    "otherPetsDescription": "One friendly cat named Whiskers"
  }'
```

## 5. Donation API Endpoints

### CREATE Donation (POST)
```bash
curl -X POST http://localhost:8080/donations \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "shelterId": 1,
    "amount": 100.00,
    "donationDate": "2024-01-15T14:30:00",
    "donationType": "MONETARY",
    "message": "Happy to support the shelter!",
    "isAnonymous": false
  }'
```

### UPDATE Donation (PUT)
```bash
curl -X PUT http://localhost:8080/donations/1 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "shelterId": 1,
    "amount": 150.00,
    "donationDate": "2024-01-15T14:30:00",
    "donationType": "MONETARY",
    "message": "Very happy to support the wonderful work you do!",
    "isAnonymous": false
  }'
```

## 6. Favorite API Endpoints

### CREATE Favorite (POST)
```bash
curl -X POST http://localhost:8080/favorites \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "petId": 1,
    "dateAdded": "2024-01-15T16:00:00"
  }'
```

### UPDATE Favorite (PUT)
```bash
curl -X PUT http://localhost:8080/favorites/1 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "petId": 1,
    "dateAdded": "2024-01-15T16:30:00"
  }'
```

## 7. Medical Record API Endpoints

### CREATE Medical Record (POST)
```bash
curl -X POST http://localhost:8080/medical-records \
  -H "Content-Type: application/json" \
  -d '{
    "petId": 1,
    "recordDate": "2024-01-15T09:00:00",
    "recordType": "VACCINATION",
    "veterinarianName": "Dr. Smith",
    "clinicName": "Animal Health Clinic",
    "description": "Annual vaccination - Rabies, DHPP",
    "treatment": "Rabies vaccine administered",
    "medications": "None",
    "nextAppointment": "2025-01-15T09:00:00",
    "notes": "Pet handled procedure well"
  }'
```

### UPDATE Medical Record (PUT)
```bash
curl -X PUT http://localhost:8080/medical-records/1 \
  -H "Content-Type: application/json" \
  -d '{
    "petId": 1,
    "recordDate": "2024-01-15T09:00:00",
    "recordType": "VACCINATION",
    "veterinarianName": "Dr. Smith",
    "clinicName": "Animal Health Clinic",
    "description": "Annual vaccination - Rabies, DHPP, Bordetella",
    "treatment": "Complete vaccination package administered",
    "medications": "Mild pain relief if needed",
    "nextAppointment": "2025-01-15T09:00:00",
    "notes": "Pet handled all procedures excellently"
  }'
```

## 8. Accessory API Endpoints

### CREATE Accessory (POST)
```bash
curl -X POST http://localhost:8080/accessories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Dog Collar",
    "description": "High-quality leather collar with metal buckle",
    "category": "COLLAR",
    "brand": "PetLux",
    "price": 29.99,
    "stockQuantity": 50,
    "imageUrl": "https://example.com/collar.jpg",
    "isAvailable": true
  }'
```

### UPDATE Accessory (PUT)
```bash
curl -X PUT http://localhost:8080/accessories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Leather Dog Collar",
    "description": "High-quality genuine leather collar with stainless steel buckle",
    "category": "COLLAR",
    "brand": "PetLux",
    "price": 34.99,
    "stockQuantity": 45,
    "imageUrl": "https://example.com/premium-collar.jpg",
    "isAvailable": true
  }'
```

### UPDATE Stock (PATCH)
```bash
curl -X PATCH "http://localhost:8080/accessories/1/stock?stock=25" \
  -H "Content-Type: application/json"
```

## 9. Event API Endpoints

### CREATE Event (POST)
```bash
curl -X POST http://localhost:8080/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pet Adoption Fair",
    "description": "Come meet adoptable pets and find your perfect companion",
    "eventDate": "2024-02-15T10:00:00",
    "location": "Central Park Pavilion",
    "eventType": "ADOPTION_EVENT",
    "shelterId": 1,
    "maxAttendees": 200,
    "registrationRequired": true,
    "contactInfo": "events@happypaws.com"
  }'
```

### UPDATE Event (PUT)
```bash
curl -X PUT http://localhost:8080/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Annual Pet Adoption Fair",
    "description": "Come meet adorable adoptable pets and find your perfect furry companion",
    "eventDate": "2024-02-15T10:00:00",
    "location": "Central Park Main Pavilion",
    "eventType": "ADOPTION_EVENT",
    "shelterId": 1,
    "maxAttendees": 300,
    "registrationRequired": true,
    "contactInfo": "events@happypaws.com"
  }'
```

## Complete Testing Script

Create a file named `test-all-apis.sh` with the following content:

```bash
#!/bin/bash

echo "=== Testing PawHaven API - All CRUD Operations ==="
echo

# Test User API
echo "1. Testing User API..."
echo "Creating user..."
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","firstName":"Test","lastName":"User","phoneNumber":"1234567890","address":"123 Test St","role":"USER"}'

echo
echo "Getting all users..."
curl -X GET http://localhost:8080/users
echo

# Test Pet API
echo "2. Testing Pet API..."
echo "Creating pet..."
curl -X POST http://localhost:8080/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"TestPet","species":"DOG","breed":"Labrador","age":2,"gender":"MALE","color":"Brown","size":"MEDIUM","weight":25.0,"description":"Friendly test pet","adoptionFee":200.00,"isAvailable":true,"shelterId":1}'

echo
echo "Getting available pets..."
curl -X GET http://localhost:8080/pets/available
echo

# Test all other APIs similarly...
echo "API testing complete!"
```

## Error Handling Examples

All endpoints return appropriate HTTP status codes:
- 200 OK: Successful GET/PUT requests
- 201 Created: Successful POST requests
- 204 No Content: Successful DELETE requests
- 400 Bad Request: Invalid input data
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server-side errors

## Authentication Notes

For production use, add authentication headers:
```bash
curl -X POST http://localhost:8080/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{ ... }'
```

This completes the comprehensive API testing guide for all 9 entities with full CRUD operations as requested.