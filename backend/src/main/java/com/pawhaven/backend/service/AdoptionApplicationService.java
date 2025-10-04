package com.pawhaven.backend.service;

import com.pawhaven.backend.model.AdoptionApplication;
import com.pawhaven.backend.repository.AdoptionApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionApplicationService {
    
    @Autowired
    private AdoptionApplicationRepository adoptionApplicationRepository;
    
    // Create or update application
    public AdoptionApplication saveApplication(AdoptionApplication application) {
        return adoptionApplicationRepository.save(application);
    }
    
    // Get all applications
    public List<AdoptionApplication> getAllApplications() {
        return adoptionApplicationRepository.findAll();
    }
    
    // Get application by ID
    public Optional<AdoptionApplication> getApplicationById(Long id) {
        return adoptionApplicationRepository.findById(id);
    }
    
    // Update application
    public AdoptionApplication updateApplication(Long id, AdoptionApplication applicationDetails) {
        Optional<AdoptionApplication> optionalApplication = adoptionApplicationRepository.findById(id);
        if (optionalApplication.isPresent()) {
            AdoptionApplication application = optionalApplication.get();
            application.setStatus(applicationDetails.getStatus());
            application.setReasonForAdoption(applicationDetails.getReasonForAdoption());
            application.setHousingType(applicationDetails.getHousingType());
            application.setExperienceLevel(applicationDetails.getExperienceLevel());
            application.setAdminNotes(applicationDetails.getAdminNotes());
            return adoptionApplicationRepository.save(application);
        }
        return null;
    }
    
    // Delete application
    public boolean deleteApplication(Long id) {
        if (adoptionApplicationRepository.existsById(id)) {
            adoptionApplicationRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get applications by user
    public List<AdoptionApplication> getApplicationsByUser(Long userId) {
        return adoptionApplicationRepository.findByUserId(userId);
    }
    
    // Get applications by pet
    public List<AdoptionApplication> getApplicationsByPet(Long petId) {
        return adoptionApplicationRepository.findByPetId(petId);
    }
    
    // Get applications by status
    public List<AdoptionApplication> getApplicationsByStatus(String status) {
        return adoptionApplicationRepository.findByStatusOrderByApplicationDateDesc(status);
    }
    
    // Get pending applications
    public List<AdoptionApplication> getPendingApplications() {
        return adoptionApplicationRepository.findByStatusOrderByApplicationDateDesc("PENDING");
    }
    
    // Get recent applications
    public List<AdoptionApplication> getRecentApplications(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return adoptionApplicationRepository.findRecentApplications(since);
    }
    
    // Update application status
    public AdoptionApplication updateApplicationStatus(Long id, AdoptionApplication.ApplicationStatus status) {
        Optional<AdoptionApplication> optionalApplication = adoptionApplicationRepository.findById(id);
        if (optionalApplication.isPresent()) {
            AdoptionApplication application = optionalApplication.get();
            application.setStatus(status);
            return adoptionApplicationRepository.save(application);
        }
        return null;
    }
}