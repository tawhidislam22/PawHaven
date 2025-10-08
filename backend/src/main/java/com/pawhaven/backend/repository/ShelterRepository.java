package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    
    // Find active shelters
    List<Shelter> findByIsActiveTrue();
    
    // Find shelter by name
    Optional<Shelter> findByName(String name);
    
    // Find shelters by name containing
    List<Shelter> findByNameContainingIgnoreCase(String name);
    
    // Find shelters by city
    List<Shelter> findByCity(String city);
    
    // Find shelters by city and active status
    List<Shelter> findByCityAndIsActiveTrue(String city);
    
    // Find shelters by state
    List<Shelter> findByState(String state);
    
    // Find shelter by email
    Optional<Shelter> findByEmail(String email);
    
    // Custom query to find shelters with capacity
    @Query("SELECT s FROM Shelter s WHERE s.capacity >= :minCapacity AND s.isActive = true")
    List<Shelter> findByMinCapacity(Integer minCapacity);
    
    // Custom query to count total capacity
    @Query("SELECT SUM(s.capacity) FROM Shelter s WHERE s.isActive = true")
    Long getTotalCapacity();
}
