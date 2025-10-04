package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    // Create or update pet
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }
    
    // Get all pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    // Get pet by ID
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    // Update pet
    public Pet updatePet(Long id, Pet petDetails) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            pet.setName(petDetails.getName());
            pet.setPetType(petDetails.getPetType());
            pet.setBreed(petDetails.getBreed());
            pet.setAge(petDetails.getAge());
            pet.setGender(petDetails.getGender());
            pet.setSize(petDetails.getSize());
            // Color information is handled by breed and description
            pet.setDescription(petDetails.getDescription());
            pet.setAdoptionStatus(petDetails.getAdoptionStatus());
            pet.setImageUrls(petDetails.getImageUrls());
            pet.setShelter(petDetails.getShelter());
            return petRepository.save(pet);
        }
        return null;
    }
    
    // Delete pet
    public boolean deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get pets by adoption status
    public List<Pet> getPetsByAdoptionStatus(String status) {
        return petRepository.findByAdoptionStatus(status);
    }
    
    // Get available pets
    public List<Pet> getAvailablePets() {
        return petRepository.findAvailablePets();
    }
    
    // Get pets by shelter
    public List<Pet> getPetsByShelter(Long shelterId) {
        return petRepository.findByShelterId(shelterId);
    }
    
    // Search pets by name
    public List<Pet> searchPetsByName(String name) {
        return petRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get pets by species
    public List<Pet> getPetsBySpecies(String species) {
        return petRepository.findBySpecies(species);
    }
    
    // Get pets by breed
    public List<Pet> getPetsByBreed(String breed) {
        return petRepository.findByBreedContainingIgnoreCase(breed);
    }
    
    // Get pets by age range
    public List<Pet> getPetsByAgeRange(Integer minAge, Integer maxAge) {
        return petRepository.findByAgeBetween(minAge, maxAge);
    }
}