package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Accessory;
import com.pawhaven.backend.repository.AccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccessoryService {
    
    @Autowired
    private AccessoryRepository accessoryRepository;
    
    // Create or update accessory
    public Accessory saveAccessory(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }
    
    // Get all accessories
    public List<Accessory> getAllAccessories() {
        return accessoryRepository.findAll();
    }
    
    // Get accessory by ID
    public Optional<Accessory> getAccessoryById(Long id) {
        return accessoryRepository.findById(id);
    }
    
    // Update accessory
    public Accessory updateAccessory(Long id, Accessory accessoryDetails) {
        Optional<Accessory> optionalAccessory = accessoryRepository.findById(id);
        if (optionalAccessory.isPresent()) {
            Accessory accessory = optionalAccessory.get();
            accessory.setName(accessoryDetails.getName());
            accessory.setDescription(accessoryDetails.getDescription());
            accessory.setCategory(accessoryDetails.getCategory());
            accessory.setPrice(accessoryDetails.getPrice());
            accessory.setBrand(accessoryDetails.getBrand());
            accessory.setImageUrls(accessoryDetails.getImageUrls());
            accessory.setStockQuantity(accessoryDetails.getStockQuantity());
            return accessoryRepository.save(accessory);
        }
        return null;
    }
    
    // Delete accessory
    public boolean deleteAccessory(Long id) {
        if (accessoryRepository.existsById(id)) {
            accessoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get accessories by category
    public List<Accessory> getAccessoriesByCategory(String category) {
        return accessoryRepository.findByCategoryAndIsActiveTrue(category);
    }
    
    // Search accessories by name
    public List<Accessory> searchAccessoriesByName(String name) {
        return accessoryRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get accessories by price range
    public List<Accessory> getAccessoriesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return accessoryRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    // Get available accessories (active and in stock)
    public List<Accessory> getAvailableAccessories() {
        return accessoryRepository.findByIsActiveTrue()
                .stream()
                .filter(accessory -> accessory.getStockQuantity() > 0)
                .sorted((a1, a2) -> a1.getPrice().compareTo(a2.getPrice()))
                .collect(Collectors.toList());
    }
    
    // Get accessories by brand
    public List<Accessory> getAccessoriesByBrand(String brand) {
        return accessoryRepository.findByBrandContainingIgnoreCase(brand);
    }
    
    // Get popular accessories
    public List<Accessory> getPopularAccessories() {
        return accessoryRepository.findPopularAccessories();
    }
    
    // Update stock
    public Accessory updateStock(Long id, Integer newStock) {
        Optional<Accessory> optionalAccessory = accessoryRepository.findById(id);
        if (optionalAccessory.isPresent()) {
            Accessory accessory = optionalAccessory.get();
            accessory.setStockQuantity(newStock);
            return accessoryRepository.save(accessory);
        }
        return null;
    }
}