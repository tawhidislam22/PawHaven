package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Favorite;
import com.pawhaven.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {
    
    @Autowired
    private FavoriteService favoriteService;
    
    // CREATE - Add to favorites
    @PostMapping
    public ResponseEntity<Favorite> createFavorite(@Valid @RequestBody Favorite favorite) {
        try {
            Favorite savedFavorite = favoriteService.saveFavorite(favorite);
            return new ResponseEntity<>(savedFavorite, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all favorites
    @GetMapping
    public ResponseEntity<List<Favorite>> getAllFavorites() {
        try {
            List<Favorite> favorites = favoriteService.getAllFavorites();
            if (favorites.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(favorites, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get favorite by ID
    @GetMapping("/{id}")
    public ResponseEntity<Favorite> getFavoriteById(@PathVariable Long id) {
        try {
            Optional<Favorite> favorite = favoriteService.getFavoriteById(id);
            if (favorite.isPresent()) {
                return new ResponseEntity<>(favorite.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Remove from favorites
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFavorite(@PathVariable Long id) {
        try {
            boolean deleted = favoriteService.deleteFavorite(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get favorites by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Favorite>> getFavoritesByUser(@PathVariable Long userId) {
        try {
            List<Favorite> favorites = favoriteService.getFavoritesByUser(userId);
            return new ResponseEntity<>(favorites, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get favorites by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<Favorite>> getFavoritesByPet(@PathVariable Long petId) {
        try {
            List<Favorite> favorites = favoriteService.getFavoritesByPet(petId);
            return new ResponseEntity<>(favorites, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UTILITY - Check if pet is favorited by user
    @GetMapping("/check")
    public ResponseEntity<Boolean> isPetFavoritedByUser(@RequestParam Long userId, @RequestParam Long petId) {
        try {
            boolean isFavorited = favoriteService.isPetFavoritedByUser(userId, petId);
            return new ResponseEntity<>(isFavorited, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UTILITY - Toggle favorite
    @PostMapping("/toggle")
    public ResponseEntity<Favorite> toggleFavorite(@RequestParam Long userId, @RequestParam Long petId) {
        try {
            Favorite result = favoriteService.toggleFavorite(userId, petId);
            if (result == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Favorite removed
            } else {
                return new ResponseEntity<>(result, HttpStatus.CREATED); // Favorite added
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // ANALYTICS - Get favorite count for pet
    @GetMapping("/pet/{petId}/count")
    public ResponseEntity<Long> getFavoriteCountByPet(@PathVariable Long petId) {
        try {
            Long count = favoriteService.getFavoriteCountByPet(petId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // ANALYTICS - Get most favorited pets
    @GetMapping("/most-favorited")
    public ResponseEntity<List<Object[]>> getMostFavoritedPets() {
        try {
            List<Object[]> result = favoriteService.getMostFavoritedPets();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}