package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.AdoptionApplication;
import com.pawhaven.backend.model.ApplicationStatus;
import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
    
    // Find applications by user
    List<AdoptionApplication> findByUser(User user);
    
    // Find applications by pet
    List<AdoptionApplication> findByPet(Pet pet);
    
    // Find applications by status
    List<AdoptionApplication> findByStatus(ApplicationStatus status);
    
    // Find applications by user and status
    List<AdoptionApplication> findByUserAndStatus(User user, ApplicationStatus status);
    
    // Find applications by pet and status
    List<AdoptionApplication> findByPetAndStatus(Pet pet, ApplicationStatus status);
    
    // Custom query to find recent applications
    @Query("SELECT a FROM AdoptionApplication a ORDER BY a.submissionDate DESC")
    List<AdoptionApplication> findRecentApplications();
    
    // Custom query to count applications by status
    @Query("SELECT COUNT(a) FROM AdoptionApplication a WHERE a.status = :status")
    long countByStatus(@Param("status") ApplicationStatus status);
    
    // Check if user has pending application for a pet
    boolean existsByUserAndPetAndStatus(User user, Pet pet, ApplicationStatus status);
}
