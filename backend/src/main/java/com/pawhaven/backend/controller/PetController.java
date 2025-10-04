package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "*")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    // CREATE - Add new pet
    @PostMapping
    public ResponseEntity<Pet> createPet(@Valid @RequestBody Pet pet) {
        try {
            Pet savedPet = petService.savePet(pet);
            return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all pets
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        try {
            List<Pet> pets = petService.getAllPets();
            if (pets.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get pet by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        try {
            Optional<Pet> pet = petService.getPetById(id);
            if (pet.isPresent()) {
                return new ResponseEntity<>(pet.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update pet
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @Valid @RequestBody Pet pet) {
        try {
            Pet updatedPet = petService.updatePet(id, pet);
            if (updatedPet != null) {
                return new ResponseEntity<>(updatedPet, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete pet
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePet(@PathVariable Long id) {
        try {
            boolean deleted = petService.deletePet(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get available pets
    @GetMapping("/available")
    public ResponseEntity<List<Pet>> getAvailablePets() {
        try {
            List<Pet> pets = petService.getAvailablePets();
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get pets by species
    @GetMapping("/species/{species}")
    public ResponseEntity<List<Pet>> getPetsBySpecies(@PathVariable String species) {
        try {
            List<Pet> pets = petService.getPetsBySpecies(species);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get pets by shelter
    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<Pet>> getPetsByShelter(@PathVariable Long shelterId) {
        try {
            List<Pet> pets = petService.getPetsByShelter(shelterId);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Search pets by name
    @GetMapping("/search")
    public ResponseEntity<List<Pet>> searchPetsByName(@RequestParam String name) {
        try {
            List<Pet> pets = petService.searchPetsByName(name);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get pets by adoption status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Pet>> getPetsByAdoptionStatus(@PathVariable String status) {
        try {
            List<Pet> pets = petService.getPetsByAdoptionStatus(status);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get pets by age range
    @GetMapping("/age")
    public ResponseEntity<List<Pet>> getPetsByAgeRange(@RequestParam Integer minAge, @RequestParam Integer maxAge) {
        try {
            List<Pet> pets = petService.getPetsByAgeRange(minAge, maxAge);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}