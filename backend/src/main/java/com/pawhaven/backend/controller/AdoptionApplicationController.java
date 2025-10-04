package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.AdoptionApplication;
import com.pawhaven.backend.service.AdoptionApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/adoption-applications")
@CrossOrigin(origins = "*")
public class AdoptionApplicationController {
    
    @Autowired
    private AdoptionApplicationService adoptionApplicationService;
    
    // CREATE - Submit new adoption application
    @PostMapping
    public ResponseEntity<AdoptionApplication> createApplication(@Valid @RequestBody AdoptionApplication application) {
        try {
            AdoptionApplication savedApplication = adoptionApplicationService.saveApplication(application);
            return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all applications
    @GetMapping
    public ResponseEntity<List<AdoptionApplication>> getAllApplications() {
        try {
            List<AdoptionApplication> applications = adoptionApplicationService.getAllApplications();
            if (applications.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionApplication> getApplicationById(@PathVariable Long id) {
        try {
            Optional<AdoptionApplication> application = adoptionApplicationService.getApplicationById(id);
            if (application.isPresent()) {
                return new ResponseEntity<>(application.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update application
    @PutMapping("/{id}")
    public ResponseEntity<AdoptionApplication> updateApplication(@PathVariable Long id, @Valid @RequestBody AdoptionApplication application) {
        try {
            AdoptionApplication updatedApplication = adoptionApplicationService.updateApplication(id, application);
            if (updatedApplication != null) {
                return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update application status
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdoptionApplication> updateApplicationStatus(@PathVariable Long id, @RequestBody AdoptionApplication.ApplicationStatus status) {
        try {
            AdoptionApplication updatedApplication = adoptionApplicationService.updateApplicationStatus(id, status);
            if (updatedApplication != null) {
                return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete application
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteApplication(@PathVariable Long id) {
        try {
            boolean deleted = adoptionApplicationService.deleteApplication(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get applications by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByUser(@PathVariable Long userId) {
        try {
            List<AdoptionApplication> applications = adoptionApplicationService.getApplicationsByUser(userId);
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get applications by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionApplication>> getApplicationsByPet(@PathVariable Long petId) {
        try {
            List<AdoptionApplication> applications = adoptionApplicationService.getApplicationsByPet(petId);
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get pending applications
    @GetMapping("/pending")
    public ResponseEntity<List<AdoptionApplication>> getPendingApplications() {
        try {
            List<AdoptionApplication> applications = adoptionApplicationService.getPendingApplications();
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get recent applications
    @GetMapping("/recent")
    public ResponseEntity<List<AdoptionApplication>> getRecentApplications(@RequestParam(defaultValue = "7") int days) {
        try {
            List<AdoptionApplication> applications = adoptionApplicationService.getRecentApplications(days);
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}