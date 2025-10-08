package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
@CrossOrigin(origins = "http://localhost:5173")
public class ShelterController {
    
    @Autowired
    private ShelterService shelterService;
    
    // Get all shelters
    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {
        return ResponseEntity.ok(shelterService.getAllShelters());
    }
    
    // Get active shelters
    @GetMapping("/active")
    public ResponseEntity<List<Shelter>> getActiveShelters() {
        return ResponseEntity.ok(shelterService.getActiveShelters());
    }
    
    // Get shelter by ID
    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(@PathVariable Long id) {
        return shelterService.getShelterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get shelter by name
    @GetMapping("/name/{name}")
    public ResponseEntity<Shelter> getShelterByName(@PathVariable String name) {
        return shelterService.getShelterByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Search shelters by name
    @GetMapping("/search")
    public ResponseEntity<List<Shelter>> searchSheltersByName(@RequestParam String name) {
        return ResponseEntity.ok(shelterService.searchSheltersByName(name));
    }
    
    // Get shelters by city
    @GetMapping("/city/{city}")
    public ResponseEntity<List<Shelter>> getSheltersByCity(@PathVariable String city) {
        return ResponseEntity.ok(shelterService.getSheltersByCity(city));
    }
    
    // Get active shelters by city
    @GetMapping("/city/{city}/active")
    public ResponseEntity<List<Shelter>> getActiveSheltersByCity(@PathVariable String city) {
        return ResponseEntity.ok(shelterService.getActiveSheltersByCity(city));
    }
    
    // Get shelters by state
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Shelter>> getSheltersByState(@PathVariable String state) {
        return ResponseEntity.ok(shelterService.getSheltersByState(state));
    }
    
    // Get shelter by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Shelter> getShelterByEmail(@PathVariable String email) {
        return shelterService.getShelterByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get shelters by minimum capacity
    @GetMapping("/capacity")
    public ResponseEntity<List<Shelter>> getSheltersByMinCapacity(@RequestParam Integer minCapacity) {
        return ResponseEntity.ok(shelterService.getSheltersByMinCapacity(minCapacity));
    }
    
    // Get total capacity
    @GetMapping("/total-capacity")
    public ResponseEntity<Long> getTotalCapacity() {
        return ResponseEntity.ok(shelterService.getTotalCapacity());
    }
    
    // Create shelter
    @PostMapping
    public ResponseEntity<Shelter> createShelter(@RequestBody Shelter shelter) {
        Shelter savedShelter = shelterService.saveShelter(shelter);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedShelter);
    }
    
    // Update shelter
    @PutMapping("/{id}")
    public ResponseEntity<Shelter> updateShelter(@PathVariable Long id, @RequestBody Shelter shelter) {
        try {
            Shelter updatedShelter = shelterService.updateShelter(id, shelter);
            return ResponseEntity.ok(updatedShelter);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Activate shelter
    @PutMapping("/{id}/activate")
    public ResponseEntity<Shelter> activateShelter(@PathVariable Long id) {
        try {
            Shelter shelter = shelterService.activateShelter(id);
            return ResponseEntity.ok(shelter);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Deactivate shelter
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Shelter> deactivateShelter(@PathVariable Long id) {
        try {
            Shelter shelter = shelterService.deactivateShelter(id);
            return ResponseEntity.ok(shelter);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete shelter
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelter(@PathVariable Long id) {
        shelterService.deleteShelter(id);
        return ResponseEntity.noContent().build();
    }
}
