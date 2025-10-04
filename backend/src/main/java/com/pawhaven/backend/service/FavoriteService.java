package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Favorite;
import com.pawhaven.backend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    
    @Autowired
    private FavoriteRepository favoriteRepository;
    
    // Create or update favorite
    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }
    
    // Get all favorites
    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }
    
    // Get favorite by ID
    public Optional<Favorite> getFavoriteById(Long id) {
        return favoriteRepository.findById(id);
    }
    
    // Delete favorite
    public boolean deleteFavorite(Long id) {
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get favorites by user
    public List<Favorite> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserIdOrderByFavoritedAtDesc(userId);
    }
    
    // Get favorites by pet
    public List<Favorite> getFavoritesByPet(Long petId) {
        return favoriteRepository.findByPetId(petId);
    }
    
    // Check if pet is favorited by user
    public boolean isPetFavoritedByUser(Long userId, Long petId) {
        return favoriteRepository.existsByUserIdAndPetId(userId, petId);
    }
    
    // Toggle favorite (add or remove)
    public Favorite toggleFavorite(Long userId, Long petId) {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndPetId(userId, petId);
        if (existingFavorite.isPresent()) {
            favoriteRepository.deleteById(existingFavorite.get().getId());
            return null; // Favorite removed
        } else {
            Favorite newFavorite = new Favorite();
            // Set user and pet - you'll need to fetch them from their repositories
            return favoriteRepository.save(newFavorite);
        }
    }
    
    // Get favorite count for a pet
    public Long getFavoriteCountByPet(Long petId) {
        return favoriteRepository.countByPetId(petId);
    }
    
    // Get most favorited pets
    public List<Object[]> getMostFavoritedPets() {
        return favoriteRepository.findMostFavoritedPets();
    }
}