package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Babysitting;
import com.pawhaven.backend.model.BabysittingStatus;
import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.BabysittingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BabysittingService {
    
    @Autowired
    private BabysittingRepository babysittingRepository;
    
    // Create or update babysitting
    public Babysitting saveBabysitting(Babysitting babysitting) {
        return babysittingRepository.save(babysitting);
    }
    
    // Get babysitting by ID
    public Optional<Babysitting> getBabysittingById(Long id) {
        return babysittingRepository.findById(id);
    }
    
    // Get all babysitting
    public List<Babysitting> getAllBabysitting() {
        return babysittingRepository.findAll();
    }
    
    // Get babysitting by user
    public List<Babysitting> getBabysittingByUser(User user) {
        return babysittingRepository.findByUser(user);
    }
    
    // Get babysitting by pet
    public List<Babysitting> getBabysittingByPet(Pet pet) {
        return babysittingRepository.findByPet(pet);
    }
    
    // Get babysitting by status
    public List<Babysitting> getBabysittingByStatus(BabysittingStatus status) {
        return babysittingRepository.findByStatus(status);
    }
    
    // Get babysitting by user and status
    public List<Babysitting> getBabysittingByUserAndStatus(User user, BabysittingStatus status) {
        return babysittingRepository.findByUserAndStatus(user, status);
    }
    
    // Get babysitting by service date
    public List<Babysitting> getBabysittingByServiceDate(LocalDate serviceDate) {
        return babysittingRepository.findByServiceDate(serviceDate);
    }
    
    // Get upcoming services
    public List<Babysitting> getUpcomingServices() {
        return babysittingRepository.findUpcomingServices(LocalDate.now());
    }
    
    // Get babysitting by date range
    public List<Babysitting> getBabysittingByDateRange(LocalDate startDate, LocalDate endDate) {
        return babysittingRepository.findByDateRange(startDate, endDate);
    }
    
    // Get recent bookings
    public List<Babysitting> getRecentBookings() {
        return babysittingRepository.findRecentBookings();
    }
    
    // Count babysitting by status
    public long countBabysittingByStatus(BabysittingStatus status) {
        return babysittingRepository.countByStatus(status);
    }
    
    // Update babysitting
    public Babysitting updateBabysitting(Long id, Babysitting babysittingDetails) {
        Babysitting babysitting = babysittingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Babysitting not found with id: " + id));
        
        babysitting.setServiceDate(babysittingDetails.getServiceDate());
        babysitting.setDuration(babysittingDetails.getDuration());
        babysitting.setServiceFee(babysittingDetails.getServiceFee());
        babysitting.setSpecialInstructions(babysittingDetails.getSpecialInstructions());
        babysitting.setCaretakerNotes(babysittingDetails.getCaretakerNotes());
        
        return babysittingRepository.save(babysitting);
    }
    
    // Update babysitting status
    public Babysitting updateBabysittingStatus(Long id, BabysittingStatus status) {
        Babysitting babysitting = babysittingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Babysitting not found with id: " + id));
        babysitting.setStatus(status);
        return babysittingRepository.save(babysitting);
    }
    
    // Start babysitting service
    public Babysitting startService(Long id) {
        Babysitting babysitting = babysittingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Babysitting not found with id: " + id));
        
        if (babysitting.getStatus() != BabysittingStatus.SCHEDULED) {
            throw new RuntimeException("Only scheduled services can be started");
        }
        
        babysitting.setStatus(BabysittingStatus.IN_PROGRESS);
        return babysittingRepository.save(babysitting);
    }
    
    // Complete babysitting service
    public Babysitting completeService(Long id, String caretakerNotes) {
        Babysitting babysitting = babysittingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Babysitting not found with id: " + id));
        
        if (babysitting.getStatus() != BabysittingStatus.IN_PROGRESS) {
            throw new RuntimeException("Only in-progress services can be completed");
        }
        
        babysitting.setStatus(BabysittingStatus.COMPLETED);
        babysitting.setCaretakerNotes(caretakerNotes);
        return babysittingRepository.save(babysitting);
    }
    
    // Cancel babysitting service
    public Babysitting cancelService(Long id) {
        Babysitting babysitting = babysittingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Babysitting not found with id: " + id));
        
        if (babysitting.getStatus() == BabysittingStatus.COMPLETED) {
            throw new RuntimeException("Completed services cannot be cancelled");
        }
        
        babysitting.setStatus(BabysittingStatus.CANCELLED);
        return babysittingRepository.save(babysitting);
    }
    
    // Delete babysitting
    public void deleteBabysitting(Long id) {
        babysittingRepository.deleteById(id);
    }
}
