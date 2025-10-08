package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.service.PetService;
import com.pawhaven.backend.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    @Autowired
    private ShelterService shelterService;
    
    // Get all pets
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }
    
    // Get available pets
    @GetMapping("/available")
    public ResponseEntity<List<Pet>> getAvailablePets() {
        return ResponseEntity.ok(petService.getAvailablePets());
    }
    
    // Get recent available pets
    @GetMapping("/recent")
    public ResponseEntity<List<Pet>> getRecentAvailablePets() {
        return ResponseEntity.ok(petService.getRecentAvailablePets());
    }
    
    // Get pet by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get pets by species
    @GetMapping("/species/{species}")
    public ResponseEntity<List<Pet>> getPetsBySpecies(@PathVariable String species) {
        return ResponseEntity.ok(petService.getPetsBySpecies(species));
    }
    
    // Get available pets by species
    @GetMapping("/species/{species}/available")
    public ResponseEntity<List<Pet>> getAvailablePetsBySpecies(@PathVariable String species) {
        return ResponseEntity.ok(petService.getAvailablePetsBySpecies(species));
    }
    
    // Search pets by name
    @GetMapping("/search/name")
    public ResponseEntity<List<Pet>> searchPetsByName(@RequestParam String name) {
        return ResponseEntity.ok(petService.searchPetsByName(name));
    }
    
    // Search pets by breed
    @GetMapping("/search/breed")
    public ResponseEntity<List<Pet>> searchPetsByBreed(@RequestParam String breed) {
        return ResponseEntity.ok(petService.searchPetsByBreed(breed));
    }
    
    // Get pets by shelter
    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<Pet>> getPetsByShelter(@PathVariable Long shelterId) {
        return shelterService.getShelterById(shelterId)
                .map(shelter -> ResponseEntity.ok(petService.getPetsByShelter(shelter)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get available pets by shelter
    @GetMapping("/shelter/{shelterId}/available")
    public ResponseEntity<List<Pet>> getAvailablePetsByShelter(@PathVariable Long shelterId) {
        return shelterService.getShelterById(shelterId)
                .map(shelter -> ResponseEntity.ok(petService.getAvailablePetsByShelter(shelter)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get pets by age range
    @GetMapping("/age")
    public ResponseEntity<List<Pet>> getPetsByAgeRange(@RequestParam Integer minAge, @RequestParam Integer maxAge) {
        return ResponseEntity.ok(petService.getPetsByAgeRange(minAge, maxAge));
    }
    
    // Count available pets by species
    @GetMapping("/count/species/{species}")
    public ResponseEntity<Long> countAvailablePetsBySpecies(@PathVariable String species) {
        return ResponseEntity.ok(petService.countAvailablePetsBySpecies(species));
    }
    
    // Create pet
    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        Pet savedPet = petService.savePet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
    }
    
    // Update pet
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        try {
            Pet updatedPet = petService.updatePet(id, pet);
            return ResponseEntity.ok(updatedPet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Mark pet as adopted
    @PutMapping("/{id}/adopt")
    public ResponseEntity<Pet> markPetAsAdopted(@PathVariable Long id) {
        try {
            Pet pet = petService.markPetAsAdopted(id);
            return ResponseEntity.ok(pet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Mark pet as available
    @PutMapping("/{id}/available")
    public ResponseEntity<Pet> markPetAsAvailable(@PathVariable Long id) {
        try {
            Pet pet = petService.markPetAsAvailable(id);
            return ResponseEntity.ok(pet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete pet
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }
}
