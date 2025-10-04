package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    // Find pets by adoption status
    List<Pet> findByAdoptionStatus(String adoptionStatus);
    
    // Find pets by breed
    List<Pet> findByBreedContainingIgnoreCase(String breed);
    
    // Find pets by species
    List<Pet> findBySpecies(String species);
    
    // Find pets by age range
    List<Pet> findByAgeBetween(Integer minAge, Integer maxAge);
    
    // Find pets by shelter
    List<Pet> findByShelterId(Long shelterId);
    
    // Find available pets for adoption
    @Query("SELECT p FROM Pet p WHERE p.adoptionStatus = 'AVAILABLE'")
    List<Pet> findAvailablePets();
    
    // Find pets by name containing
    List<Pet> findByNameContainingIgnoreCase(String name);
    
    // Custom query to find pets with medical records
    @Query("SELECT p FROM Pet p WHERE p.id IN (SELECT m.pet.id FROM MedicalRecord m)")
    List<Pet> findPetsWithMedicalRecords();
}