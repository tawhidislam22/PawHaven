package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    
    // Find shelter by name
    Optional<Shelter> findByName(String name);
    
    // Find shelters by location containing
    List<Shelter> findByLocationContainingIgnoreCase(String location);
    
    // Find shelters with capacity greater than
    List<Shelter> findByCapacityGreaterThan(Integer capacity);
    
    // Find active shelters
    List<Shelter> findByIsActiveTrue();
    
    // Find shelters by phone number
    Optional<Shelter> findByPhoneNumber(String phoneNumber);
    
    // Find shelters by email
    Optional<Shelter> findByEmail(String email);
    
    // Custom query to find shelters with available capacity
    @Query("SELECT s FROM Shelter s WHERE s.capacity > (SELECT COUNT(p) FROM Pet p WHERE p.shelter.id = s.id AND p.adoptionStatus = 'AVAILABLE')")
    List<Shelter> findSheltersWithAvailableCapacity();
}