package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    // Find favorites by user
    List<Favorite> findByUserId(Long userId);
    
    // Find favorites by pet
    List<Favorite> findByPetId(Long petId);
    
    // Find specific favorite by user and pet
    Optional<Favorite> findByUserIdAndPetId(Long userId, Long petId);
    
    // Check if pet is favorited by user
    boolean existsByUserIdAndPetId(Long userId, Long petId);
    
    // Find favorites ordered by creation date
    List<Favorite> findByUserIdOrderByFavoritedAtDesc(Long userId);
    
    // Count favorites for a pet
    Long countByPetId(Long petId);
    
    // Custom query to find most favorited pets
    @Query("SELECT f.pet.id, COUNT(f) as count FROM Favorite f GROUP BY f.pet.id ORDER BY count DESC")
    List<Object[]> findMostFavoritedPets();
}