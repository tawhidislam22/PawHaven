package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShelterService {
    
    @Autowired
    private ShelterRepository shelterRepository;
    
    // Create or update shelter
    public Shelter saveShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }
    
    // Get shelter by ID
    public Optional<Shelter> getShelterById(Long id) {
        return shelterRepository.findById(id);
    }
    
    // Get all shelters
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }
    
    // Get active shelters
    public List<Shelter> getActiveShelters() {
        return shelterRepository.findByIsActiveTrue();
    }
    
    // Get shelter by name
    public Optional<Shelter> getShelterByName(String name) {
        return shelterRepository.findByName(name);
    }
    
    // Search shelters by name
    public List<Shelter> searchSheltersByName(String name) {
        return shelterRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get shelters by city
    public List<Shelter> getSheltersByCity(String city) {
        return shelterRepository.findByCity(city);
    }
    
    // Get active shelters by city
    public List<Shelter> getActiveSheltersByCity(String city) {
        return shelterRepository.findByCityAndIsActiveTrue(city);
    }
    
    // Get shelters by state
    public List<Shelter> getSheltersByState(String state) {
        return shelterRepository.findByState(state);
    }
    
    // Get shelter by email
    public Optional<Shelter> getShelterByEmail(String email) {
        return shelterRepository.findByEmail(email);
    }
    
    // Get shelters by minimum capacity
    public List<Shelter> getSheltersByMinCapacity(Integer minCapacity) {
        return shelterRepository.findByMinCapacity(minCapacity);
    }
    
    // Get total capacity
    public Long getTotalCapacity() {
        return shelterRepository.getTotalCapacity();
    }
    
    // Update shelter
    public Shelter updateShelter(Long id, Shelter shelterDetails) {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelter not found with id: " + id));
        
        shelter.setName(shelterDetails.getName());
        shelter.setContactNumber(shelterDetails.getContactNumber());
        shelter.setEmail(shelterDetails.getEmail());
        shelter.setAddress(shelterDetails.getAddress());
        shelter.setCity(shelterDetails.getCity());
        shelter.setState(shelterDetails.getState());
        shelter.setCountry(shelterDetails.getCountry());
        shelter.setZipCode(shelterDetails.getZipCode());
        shelter.setWebsite(shelterDetails.getWebsite());
        shelter.setDescription(shelterDetails.getDescription());
        shelter.setCapacity(shelterDetails.getCapacity());
        shelter.setIsActive(shelterDetails.getIsActive());
        
        return shelterRepository.save(shelter);
    }
    
    // Deactivate shelter
    public Shelter deactivateShelter(Long id) {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelter not found with id: " + id));
        shelter.setIsActive(false);
        return shelterRepository.save(shelter);
    }
    
    // Activate shelter
    public Shelter activateShelter(Long id) {
        Shelter shelter = shelterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelter not found with id: " + id));
        shelter.setIsActive(true);
        return shelterRepository.save(shelter);
    }
    
    // Delete shelter
    public void deleteShelter(Long id) {
        shelterRepository.deleteById(id);
    }
}
