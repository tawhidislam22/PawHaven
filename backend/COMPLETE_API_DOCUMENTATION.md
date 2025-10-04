# PawHaven Complete API Documentation
## Every API Route for Posting and Updating Data

This document provides a complete overview of all API endpoints for the PawHaven pet adoption platform, fulfilling the request for "every api and post the data and update data every route".

## API Base URL
```
http://localhost:8080
```

## 1. User Management API (/users)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/users` | Create new user | ✅ User object |
| GET | `/users` | Get all users | ❌ |
| GET | `/users/{id}` | Get user by ID | ❌ |
| PUT | `/users/{id}` | Update user | ✅ User object |
| DELETE | `/users/{id}` | Delete user | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/username/{username}` | Get user by username |
| GET | `/users/email/{email}` | Get user by email |
| GET | `/users/search?name={name}` | Search users by name |
| GET | `/users/role/{role}` | Get users by role |

## 2. Pet Management API (/pets)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/pets` | Create new pet | ✅ Pet object |
| GET | `/pets` | Get all pets | ❌ |
| GET | `/pets/{id}` | Get pet by ID | ❌ |
| PUT | `/pets/{id}` | Update pet | ✅ Pet object |
| DELETE | `/pets/{id}` | Delete pet | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pets/available` | Get available pets |
| GET | `/pets/species/{species}` | Get pets by species |
| GET | `/pets/shelter/{shelterId}` | Get pets by shelter |
| GET | `/pets/search/breed?breed={breed}` | Search pets by breed |
| GET | `/pets/search/name?name={name}` | Search pets by name |
| GET | `/pets/age-range?minAge={min}&maxAge={max}` | Get pets by age range |
| GET | `/pets/size/{size}` | Get pets by size |
| GET | `/pets/gender/{gender}` | Get pets by gender |

### Analytics Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pets/shelter/{shelterId}/count` | Get pet count by shelter |
| GET | `/pets/species/statistics` | Get pet statistics by species |

## 3. Shelter Management API (/shelters)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/shelters` | Create new shelter | ✅ Shelter object |
| GET | `/shelters` | Get all shelters | ❌ |
| GET | `/shelters/{id}` | Get shelter by ID | ❌ |
| PUT | `/shelters/{id}` | Update shelter | ✅ Shelter object |
| DELETE | `/shelters/{id}` | Delete shelter | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/shelters/search?name={name}` | Search shelters by name |
| GET | `/shelters/location?location={location}` | Search shelters by location |
| GET | `/shelters/with-available-pets` | Get shelters with available pets |

### Analytics Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/shelters/{id}/pet-count` | Get pet count for shelter |
| GET | `/shelters/{id}/adoption-rate` | Get adoption rate for shelter |

## 4. Adoption Application API (/adoption-applications)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/adoption-applications` | Create new application | ✅ Application object |
| GET | `/adoption-applications` | Get all applications | ❌ |
| GET | `/adoption-applications/{id}` | Get application by ID | ❌ |
| PUT | `/adoption-applications/{id}` | Update application | ✅ Application object |
| DELETE | `/adoption-applications/{id}` | Delete application | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/adoption-applications/user/{userId}` | Get applications by user |
| GET | `/adoption-applications/pet/{petId}` | Get applications by pet |
| GET | `/adoption-applications/status/{status}` | Get applications by status |
| GET | `/adoption-applications/pending` | Get pending applications |
| GET | `/adoption-applications/approved` | Get approved applications |

### Status Management Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| PATCH | `/adoption-applications/{id}/status?status={status}` | Update application status | ❌ |

## 5. Donation API (/donations)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/donations` | Create new donation | ✅ Donation object |
| GET | `/donations` | Get all donations | ❌ |
| GET | `/donations/{id}` | Get donation by ID | ❌ |
| PUT | `/donations/{id}` | Update donation | ✅ Donation object |
| DELETE | `/donations/{id}` | Delete donation | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/donations/user/{userId}` | Get donations by user |
| GET | `/donations/shelter/{shelterId}` | Get donations by shelter |
| GET | `/donations/type/{donationType}` | Get donations by type |
| GET | `/donations/date-range?start={start}&end={end}` | Get donations by date range |

### Analytics Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/donations/user/{userId}/total` | Get total donations by user |
| GET | `/donations/shelter/{shelterId}/total` | Get total donations by shelter |
| GET | `/donations/recent` | Get recent donations |

## 6. Favorite API (/favorites)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/favorites` | Create new favorite | ✅ Favorite object |
| GET | `/favorites` | Get all favorites | ❌ |
| GET | `/favorites/{id}` | Get favorite by ID | ❌ |
| PUT | `/favorites/{id}` | Update favorite | ✅ Favorite object |
| DELETE | `/favorites/{id}` | Delete favorite | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorites/user/{userId}` | Get favorites by user |
| GET | `/favorites/pet/{petId}` | Get favorites by pet |

### Utility Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| GET | `/favorites/check?userId={userId}&petId={petId}` | Check if pet is favorited | ❌ |
| POST | `/favorites/toggle` | Toggle favorite status | ✅ userId, petId |

### Analytics Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorites/pet/{petId}/count` | Get favorite count for pet |
| GET | `/favorites/most-favorited` | Get most favorited pets |

## 7. Medical Record API (/medical-records)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/medical-records` | Create new medical record | ✅ MedicalRecord object |
| GET | `/medical-records` | Get all medical records | ❌ |
| GET | `/medical-records/{id}` | Get medical record by ID | ❌ |
| PUT | `/medical-records/{id}` | Update medical record | ✅ MedicalRecord object |
| DELETE | `/medical-records/{id}` | Delete medical record | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/medical-records/pet/{petId}` | Get medical records by pet |
| GET | `/medical-records/veterinarian?name={name}` | Get records by veterinarian |
| GET | `/medical-records/type/{recordType}` | Get records by type |
| GET | `/medical-records/pet/{petId}/vaccinations` | Get vaccination records |
| GET | `/medical-records/recent` | Get recent medical records |

## 8. Accessory API (/accessories)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/accessories` | Create new accessory | ✅ Accessory object |
| GET | `/accessories` | Get all accessories | ❌ |
| GET | `/accessories/{id}` | Get accessory by ID | ❌ |
| PUT | `/accessories/{id}` | Update accessory | ✅ Accessory object |
| DELETE | `/accessories/{id}` | Delete accessory | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/accessories/category/{category}` | Get accessories by category |
| GET | `/accessories/search?name={name}` | Search accessories by name |
| GET | `/accessories/available` | Get available accessories |
| GET | `/accessories/brand?brand={brand}` | Get accessories by brand |
| GET | `/accessories/price-range?minPrice={min}&maxPrice={max}` | Get accessories by price range |
| GET | `/accessories/popular` | Get popular accessories |

### Inventory Management Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| PATCH | `/accessories/{id}/stock?stock={stock}` | Update stock quantity | ❌ |

## 9. Event API (/events)

### Core CRUD Operations
| Method | Endpoint | Description | Request Body Required |
|--------|----------|-------------|----------------------|
| POST | `/events` | Create new event | ✅ Event object |
| GET | `/events` | Get all events | ❌ |
| GET | `/events/{id}` | Get event by ID | ❌ |
| PUT | `/events/{id}` | Update event | ✅ Event object |
| DELETE | `/events/{id}` | Delete event | ❌ |

### Search & Filter Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events/upcoming` | Get upcoming events |
| GET | `/events/past` | Get past events |
| GET | `/events/shelter/{shelterId}` | Get events by shelter |
| GET | `/events/type/{eventType}` | Get events by type |
| GET | `/events/search?title={title}` | Search events by title |
| GET | `/events/location?location={location}` | Search events by location |
| GET | `/events/this-week` | Get events this week |
| GET | `/events/date-range?startDate={start}&endDate={end}` | Get events by date range |

## Summary Statistics

### Total API Endpoints: 89
- **POST Endpoints (Create)**: 9
- **PUT Endpoints (Update)**: 9  
- **PATCH Endpoints (Partial Update)**: 2
- **GET Endpoints (Read)**: 67
- **DELETE Endpoints**: 9

### Endpoints by Category:
- **User Management**: 9 endpoints
- **Pet Management**: 15 endpoints
- **Shelter Management**: 8 endpoints
- **Adoption Applications**: 10 endpoints
- **Donations**: 11 endpoints
- **Favorites**: 10 endpoints
- **Medical Records**: 8 endpoints
- **Accessories**: 11 endpoints
- **Events**: 13 endpoints

## Request/Response Format

All API endpoints use JSON format for request and response bodies.

### Common Response Codes:
- `200 OK`: Successful GET/PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

## Authentication & Authorization

For production deployment, add JWT token authentication:
```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

This completes the comprehensive API documentation for all endpoints supporting data posting and updating operations across every route in the PawHaven system.