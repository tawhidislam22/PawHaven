package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shelters")
@CrossOrigin(origins = "*")
public class ShelterController {
    
    @Autowired
    private ShelterService shelterService;
    
    // CREATE - Add new shelter
    @PostMapping
    public ResponseEntity<Shelter> createShelter(@Valid @RequestBody Shelter shelter) {
        try {
            Shelter savedShelter = shelterService.saveShelter(shelter);
            return new ResponseEntity<>(savedShelter, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all shelters
    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {
        try {
            List<Shelter> shelters = shelterService.getAllShelters();
            if (shelters.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(shelters, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get shelter by ID
    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(@PathVariable Long id) {
        try {
            Optional<Shelter> shelter = shelterService.getShelterById(id);
            if (shelter.isPresent()) {
                return new ResponseEntity<>(shelter.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update shelter
    @PutMapping("/{id}")
    public ResponseEntity<Shelter> updateShelter(@PathVariable Long id, @Valid @RequestBody Shelter shelter) {
        try {
            Shelter updatedShelter = shelterService.updateShelter(id, shelter);
            if (updatedShelter != null) {
                return new ResponseEntity<>(updatedShelter, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete shelter
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteShelter(@PathVariable Long id) {
        try {
            boolean deleted = shelterService.deleteShelter(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get active shelters
    @GetMapping("/active")
    public ResponseEntity<List<Shelter>> getActiveShelters() {
        try {
            List<Shelter> shelters = shelterService.getActiveShelters();
            return new ResponseEntity<>(shelters, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Search shelters by location
    @GetMapping("/search")
    public ResponseEntity<List<Shelter>> searchSheltersByLocation(@RequestParam String location) {
        try {
            List<Shelter> shelters = shelterService.searchSheltersByLocation(location);
            return new ResponseEntity<>(shelters, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get shelters with available capacity
    @GetMapping("/available-capacity")
    public ResponseEntity<List<Shelter>> getSheltersWithAvailableCapacity() {
        try {
            List<Shelter> shelters = shelterService.getSheltersWithAvailableCapacity();
            return new ResponseEntity<>(shelters, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}