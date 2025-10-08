package com.pawhaven.backend.service;

import com.pawhaven.backend.model.AdoptionApplication;
import com.pawhaven.backend.model.ApplicationStatus;
import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.AdoptionApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdoptionApplicationService {
    
    @Autowired
    private AdoptionApplicationRepository adoptionApplicationRepository;
    
    @Autowired
    private PetService petService;
    
    // Create or update application
    public AdoptionApplication saveApplication(AdoptionApplication application) {
        return adoptionApplicationRepository.save(application);
    }
    
    // Get application by ID
    public Optional<AdoptionApplication> getApplicationById(Long id) {
        return adoptionApplicationRepository.findById(id);
    }
    
    // Get all applications
    public List<AdoptionApplication> getAllApplications() {
        return adoptionApplicationRepository.findAll();
    }
    
    // Get applications by user
    public List<AdoptionApplication> getApplicationsByUser(User user) {
        return adoptionApplicationRepository.findByUser(user);
    }
    
    // Get applications by pet
    public List<AdoptionApplication> getApplicationsByPet(Pet pet) {
        return adoptionApplicationRepository.findByPet(pet);
    }
    
    // Get applications by status
    public List<AdoptionApplication> getApplicationsByStatus(ApplicationStatus status) {
        return adoptionApplicationRepository.findByStatus(status);
    }
    
    // Get applications by user and status
    public List<AdoptionApplication> getApplicationsByUserAndStatus(User user, ApplicationStatus status) {
        return adoptionApplicationRepository.findByUserAndStatus(user, status);
    }
    
    // Get recent applications
    public List<AdoptionApplication> getRecentApplications() {
        return adoptionApplicationRepository.findRecentApplications();
    }
    
    // Count applications by status
    public long countApplicationsByStatus(ApplicationStatus status) {
        return adoptionApplicationRepository.countByStatus(status);
    }
    
    // Check if user has pending application for pet
    public boolean hasPendingApplication(User user, Pet pet) {
        return adoptionApplicationRepository.existsByUserAndPetAndStatus(user, pet, ApplicationStatus.PENDING);
    }
    
    // Update application status
    public AdoptionApplication updateApplicationStatus(Long id, ApplicationStatus status, String adminNotes) {
        AdoptionApplication application = adoptionApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
        
        application.setStatus(status);
        application.setAdminNotes(adminNotes);
        application.setReviewedDate(LocalDateTime.now());
        
        // If approved, mark pet as adopted
        if (status == ApplicationStatus.APPROVED) {
            petService.markPetAsAdopted(application.getPet().getId());
        }
        
        return adoptionApplicationRepository.save(application);
    }
    
    // Update application
    public AdoptionApplication updateApplication(Long id, AdoptionApplication applicationDetails) {
        AdoptionApplication application = adoptionApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
        
        application.setApplicationReason(applicationDetails.getApplicationReason());
        application.setLivingSituation(applicationDetails.getLivingSituation());
        application.setHasOtherPets(applicationDetails.getHasOtherPets());
        application.setExperienceWithPets(applicationDetails.getExperienceWithPets());
        
        return adoptionApplicationRepository.save(application);
    }
    
    // Delete application
    public void deleteApplication(Long id) {
        adoptionApplicationRepository.deleteById(id);
    }
}
