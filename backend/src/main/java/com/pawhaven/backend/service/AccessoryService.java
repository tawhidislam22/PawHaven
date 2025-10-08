package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Accessory;
import com.pawhaven.backend.repository.AccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AccessoryService {
    
    @Autowired
    private AccessoryRepository accessoryRepository;
    
    // Create or update accessory
    public Accessory saveAccessory(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }
    
    // Get accessory by ID
    public Optional<Accessory> getAccessoryById(Long id) {
        return accessoryRepository.findById(id);
    }
    
    // Get all accessories
    public List<Accessory> getAllAccessories() {
        return accessoryRepository.findAll();
    }
    
    // Get active accessories
    public List<Accessory> getActiveAccessories() {
        return accessoryRepository.findByIsActiveTrue();
    }
    
    // Get accessories by type
    public List<Accessory> getAccessoriesByType(String type) {
        return accessoryRepository.findByType(type);
    }
    
    // Get active accessories by type
    public List<Accessory> getActiveAccessoriesByType(String type) {
        return accessoryRepository.findByTypeAndIsActiveTrue(type);
    }
    
    // Search accessories by name
    public List<Accessory> searchAccessoriesByName(String name) {
        return accessoryRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Search accessories by brand
    public List<Accessory> searchAccessoriesByBrand(String brand) {
        return accessoryRepository.findByBrandContainingIgnoreCase(brand);
    }
    
    // Get accessories by price range
    public List<Accessory> getAccessoriesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return accessoryRepository.findByPriceRange(minPrice, maxPrice);
    }
    
    // Get accessories in stock
    public List<Accessory> getAccessoriesInStock() {
        return accessoryRepository.findInStock();
    }
    
    // Get recent accessories
    public List<Accessory> getRecentAccessories() {
        return accessoryRepository.findRecentAccessories();
    }
    
    // Update accessory
    public Accessory updateAccessory(Long id, Accessory accessoryDetails) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        
        accessory.setName(accessoryDetails.getName());
        accessory.setType(accessoryDetails.getType());
        accessory.setPrice(accessoryDetails.getPrice());
        accessory.setQuantity(accessoryDetails.getQuantity());
        accessory.setDescription(accessoryDetails.getDescription());
        accessory.setImage(accessoryDetails.getImage());
        accessory.setBrand(accessoryDetails.getBrand());
        accessory.setIsActive(accessoryDetails.getIsActive());
        
        return accessoryRepository.save(accessory);
    }
    
    // Update stock quantity
    public Accessory updateStockQuantity(Long id, Integer quantity) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        accessory.setQuantity(quantity);
        return accessoryRepository.save(accessory);
    }
    
    // Decrease stock
    public Accessory decreaseStock(Long id, Integer quantity) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        
        int currentQuantity = accessory.getQuantity();
        if (currentQuantity < quantity) {
            throw new RuntimeException("Insufficient stock for accessory: " + accessory.getName());
        }
        
        accessory.setQuantity(currentQuantity - quantity);
        return accessoryRepository.save(accessory);
    }
    
    // Increase stock
    public Accessory increaseStock(Long id, Integer quantity) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        accessory.setQuantity(accessory.getQuantity() + quantity);
        return accessoryRepository.save(accessory);
    }
    
    // Deactivate accessory
    public Accessory deactivateAccessory(Long id) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        accessory.setIsActive(false);
        return accessoryRepository.save(accessory);
    }
    
    // Activate accessory
    public Accessory activateAccessory(Long id) {
        Accessory accessory = accessoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accessory not found with id: " + id));
        accessory.setIsActive(true);
        return accessoryRepository.save(accessory);
    }
    
    // Delete accessory
    public void deleteAccessory(Long id) {
        accessoryRepository.deleteById(id);
    }
}
