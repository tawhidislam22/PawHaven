package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    // Create or update pet
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }
    
    // Get pet by ID
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    // Get all pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    // Get available pets
    public List<Pet> getAvailablePets() {
        return petRepository.findByAvailableTrue();
    }
    
    // Get pets by species
    public List<Pet> getPetsBySpecies(String species) {
        return petRepository.findBySpecies(species);
    }
    
    // Get available pets by species
    public List<Pet> getAvailablePetsBySpecies(String species) {
        return petRepository.findBySpeciesAndAvailableTrue(species);
    }
    
    // Search pets by breed
    public List<Pet> searchPetsByBreed(String breed) {
        return petRepository.findByBreedContainingIgnoreCase(breed);
    }
    
    // Search pets by name
    public List<Pet> searchPetsByName(String name) {
        return petRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get pets by shelter
    public List<Pet> getPetsByShelter(Shelter shelter) {
        return petRepository.findByShelter(shelter);
    }
    
    // Get available pets by shelter
    public List<Pet> getAvailablePetsByShelter(Shelter shelter) {
        return petRepository.findByShelterAndAvailableTrue(shelter);
    }
    
    // Get pets by age range
    public List<Pet> getPetsByAgeRange(Integer minAge, Integer maxAge) {
        return petRepository.findByAgeRange(minAge, maxAge);
    }
    
    // Get recent available pets
    public List<Pet> getRecentAvailablePets() {
        return petRepository.findRecentAvailablePets();
    }
    
    // Count available pets by species
    public long countAvailablePetsBySpecies(String species) {
        return petRepository.countAvailableBySpecies(species);
    }
    
    // Update pet
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        
        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setBreed(petDetails.getBreed());
        pet.setGender(petDetails.getGender());
        pet.setAge(petDetails.getAge());
        pet.setColor(petDetails.getColor());
        pet.setSize(petDetails.getSize());
        pet.setWeight(petDetails.getWeight());
        pet.setDescription(petDetails.getDescription());
        pet.setHealthStatus(petDetails.getHealthStatus());
        pet.setVaccinationStatus(petDetails.getVaccinationStatus());
        pet.setImage(petDetails.getImage());
        pet.setAvailable(petDetails.getAvailable());
        pet.setAdoptionFee(petDetails.getAdoptionFee());
        pet.setShelter(petDetails.getShelter());
        
        return petRepository.save(pet);
    }
    
    // Mark pet as adopted
    public Pet markPetAsAdopted(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        pet.setAvailable(false);
        return petRepository.save(pet);
    }
    
    // Mark pet as available
    public Pet markPetAsAvailable(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        pet.setAvailable(true);
        return petRepository.save(pet);
    }
    
    // Delete pet
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
