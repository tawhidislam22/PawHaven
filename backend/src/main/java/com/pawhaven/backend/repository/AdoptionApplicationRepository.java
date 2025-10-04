package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
    
    // Find applications by user
    List<AdoptionApplication> findByUserId(Long userId);
    
    // Find applications by pet
    List<AdoptionApplication> findByPetId(Long petId);
    
    // Find applications by status
    List<AdoptionApplication> findByStatus(String status);
    
    // Find pending applications
    List<AdoptionApplication> findByStatusOrderByApplicationDateDesc(String status);
    
    // Find applications within date range
    List<AdoptionApplication> findByApplicationDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find applications by user and status
    List<AdoptionApplication> findByUserIdAndStatus(Long userId, String status);
    
    // Custom query to find recent applications
    @Query("SELECT a FROM AdoptionApplication a WHERE a.applicationDate >= :since ORDER BY a.applicationDate DESC")
    List<AdoptionApplication> findRecentApplications(LocalDateTime since);
}