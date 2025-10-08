package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    // Find available pets
    List<Pet> findByAvailableTrue();
    
    // Find pets by species
    List<Pet> findBySpecies(String species);
    
    // Find pets by species and available status
    List<Pet> findBySpeciesAndAvailableTrue(String species);
    
    // Find pets by breed
    List<Pet> findByBreedContainingIgnoreCase(String breed);
    
    // Find pets by shelter
    List<Pet> findByShelter(Shelter shelter);
    
    // Find available pets by shelter
    List<Pet> findByShelterAndAvailableTrue(Shelter shelter);
    
    // Find pets by name containing
    List<Pet> findByNameContainingIgnoreCase(String name);
    
    // Custom query to find recently added available pets
    @Query("SELECT p FROM Pet p WHERE p.available = true ORDER BY p.createdAt DESC")
    List<Pet> findRecentAvailablePets();
    
    // Custom query to count available pets by species
    @Query("SELECT COUNT(p) FROM Pet p WHERE p.species = :species AND p.available = true")
    long countAvailableBySpecies(@Param("species") String species);
    
    // Custom query to find pets by age range
    @Query("SELECT p FROM Pet p WHERE p.age BETWEEN :minAge AND :maxAge AND p.available = true")
    List<Pet> findByAgeRange(@Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge);
}
