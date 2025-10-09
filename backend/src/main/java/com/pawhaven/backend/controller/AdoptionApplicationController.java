package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.AdoptionApplication;
import com.pawhaven.backend.model.ApplicationStatus;
import com.pawhaven.backend.service.AdoptionApplicationService;
import com.pawhaven.backend.service.PetService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adoption-applications")
@CrossOrigin(origins = "http://localhost:5173")
public class AdoptionApplicationController {
    
    @Autowired
    private AdoptionApplicationService adoptionApplicationService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PetService petService;
    
    // Get all applications
    @GetMapping
    public ResponseEntity<List<AdoptionApplication>> getAllApplications() {
        return ResponseEntity.ok(adoptionApplicationService.getAllApplications());
    }
    
    // Get recent applications
    @GetMapping("/recent")
    public ResponseEntity<List<AdoptionApplication>> getRecentApplications() {
        return ResponseEntity.ok(adoptionApplicationService.getRecentApplications());
    }
    
    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionApplication> getApplicationById(@PathVariable Long id) {
        return adoptionApplicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get applications by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(adoptionApplicationService.getApplicationsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get applications by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByPet(@PathVariable Long petId) {
        return petService.getPetById(petId)
                .map(pet -> ResponseEntity.ok(adoptionApplicationService.getApplicationsByPet(pet)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get applications by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByStatus(@PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(adoptionApplicationService.getApplicationsByStatus(status));
    }
    
    // Get applications by user and status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByUserAndStatus(
            @PathVariable Long userId,
            @PathVariable ApplicationStatus status) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(adoptionApplicationService.getApplicationsByUserAndStatus(user, status)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Count applications by status
    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countApplicationsByStatus(@PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(adoptionApplicationService.countApplicationsByStatus(status));
    }
    
    // Check if user has pending application for pet
    @GetMapping("/check/user/{userId}/pet/{petId}")
    public ResponseEntity<Boolean> hasPendingApplication(@PathVariable Long userId, @PathVariable Long petId) {
        return userService.getUserById(userId)
                .flatMap(user -> petService.getPetById(petId)
                        .map(pet -> ResponseEntity.ok(adoptionApplicationService.hasPendingApplication(user, pet))))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Create application
    @PostMapping
    public ResponseEntity<?> createApplication(@RequestBody Map<String, Object> applicationData) {
        try {
            System.out.println("Received application data: " + applicationData);
            
            // Extract IDs from the request
            Long userIdTemp = null;
            Long petIdTemp = null;
            
            // Handle user ID (can be nested object or direct ID)
            Object userObj = applicationData.get("user");
            System.out.println("User object: " + userObj);
            if (userObj instanceof Map) {
                Object userIdObj = ((Map<?, ?>) userObj).get("id");
                System.out.println("User ID from map: " + userIdObj);
                userIdTemp = userIdObj instanceof Number ? ((Number) userIdObj).longValue() : null;
            } else if (userObj instanceof Number) {
                userIdTemp = ((Number) userObj).longValue();
            }
            
            // Handle pet ID (can be nested object or direct ID)
            Object petObj = applicationData.get("pet");
            System.out.println("Pet object: " + petObj);
            if (petObj instanceof Map) {
                Object petIdObj = ((Map<?, ?>) petObj).get("id");
                System.out.println("Pet ID from map: " + petIdObj);
                petIdTemp = petIdObj instanceof Number ? ((Number) petIdObj).longValue() : null;
            } else if (petObj instanceof Number) {
                petIdTemp = ((Number) petObj).longValue();
            }
            
            // Make final for use in lambdas
            final Long userId = userIdTemp;
            final Long petId = petIdTemp;
            
            System.out.println("Extracted userId: " + userId + ", petId: " + petId);
            
            if (userId == null || petId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User ID or Pet ID is missing"));
            }
            
            // Fetch full User and Pet objects
            var user = userService.getUserById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            var pet = petService.getPetById(petId)
                    .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + petId));
            
            System.out.println("Found user: " + user.getName() + ", pet: " + pet.getName());
            
            // Create new application
            AdoptionApplication application = new AdoptionApplication();
            application.setUser(user);
            application.setPet(pet);
            application.setApplicationReason((String) applicationData.get("applicationReason"));
            application.setLivingSituation((String) applicationData.get("livingSituation"));
            application.setHasOtherPets((Boolean) applicationData.get("hasOtherPets"));
            application.setExperienceWithPets((String) applicationData.get("experienceWithPets"));
            
            // Set status
            String statusStr = (String) applicationData.get("status");
            ApplicationStatus status = statusStr != null ? ApplicationStatus.valueOf(statusStr) : ApplicationStatus.PENDING;
            application.setStatus(status);
            
            System.out.println("Saving application...");
            AdoptionApplication savedApplication = adoptionApplicationService.saveApplication(application);
            System.out.println("Application saved successfully with ID: " + savedApplication.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
        } catch (Exception e) {
            System.err.println("Error creating application: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Update application
    @PutMapping("/{id}")
    public ResponseEntity<AdoptionApplication> updateApplication(
            @PathVariable Long id,
            @RequestBody AdoptionApplication application) {
        try {
            AdoptionApplication updatedApplication = adoptionApplicationService.updateApplication(id, application);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update application status
    @PutMapping("/{id}/status")
    public ResponseEntity<AdoptionApplication> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            ApplicationStatus status = ApplicationStatus.valueOf(statusUpdate.get("status"));
            String adminNotes = statusUpdate.get("adminNotes");
            AdoptionApplication updatedApplication = adoptionApplicationService.updateApplicationStatus(id, status, adminNotes);
            return ResponseEntity.ok(updatedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        adoptionApplicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
