package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Shelter;
import com.pawhaven.backend.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShelterService {
    
    @Autowired
    private ShelterRepository shelterRepository;
    
    // Create or update shelter
    public Shelter saveShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }
    
    // Get all shelters
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }
    
    // Get shelter by ID
    public Optional<Shelter> getShelterById(Long id) {
        return shelterRepository.findById(id);
    }
    
    // Update shelter
    public Shelter updateShelter(Long id, Shelter shelterDetails) {
        Optional<Shelter> optionalShelter = shelterRepository.findById(id);
        if (optionalShelter.isPresent()) {
            Shelter shelter = optionalShelter.get();
            shelter.setName(shelterDetails.getName());
            shelter.setAddress(shelterDetails.getAddress());
            shelter.setPhoneNumber(shelterDetails.getPhoneNumber());
            shelter.setEmail(shelterDetails.getEmail());
            shelter.setCapacity(shelterDetails.getCapacity());
            shelter.setDescription(shelterDetails.getDescription());
            shelter.setWebsiteUrl(shelterDetails.getWebsiteUrl());
            shelter.setIsActive(shelterDetails.getIsActive());
            return shelterRepository.save(shelter);
        }
        return null;
    }
    
    // Delete shelter
    public boolean deleteShelter(Long id) {
        if (shelterRepository.existsById(id)) {
            shelterRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get shelter by name
    public Optional<Shelter> getShelterByName(String name) {
        return shelterRepository.findByName(name);
    }
    
    // Search shelters by location
    public List<Shelter> searchSheltersByLocation(String location) {
        return shelterRepository.findByLocationContainingIgnoreCase(location);
    }
    
    // Get active shelters
    public List<Shelter> getActiveShelters() {
        return shelterRepository.findByIsActiveTrue();
    }
    
    // Get shelters with available capacity
    public List<Shelter> getSheltersWithAvailableCapacity() {
        return shelterRepository.findSheltersWithAvailableCapacity();
    }
    
    // Get shelter by email
    public Optional<Shelter> getShelterByEmail(String email) {
        return shelterRepository.findByEmail(email);
    }
    
    // Get shelter by phone number
    public Optional<Shelter> getShelterByPhoneNumber(String phoneNumber) {
        return shelterRepository.findByPhoneNumber(phoneNumber);
    }
}