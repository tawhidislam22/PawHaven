package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Accessory;
import com.pawhaven.backend.service.AccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accessories")
@CrossOrigin(origins = "http://localhost:5173")
public class AccessoryController {
    
    @Autowired
    private AccessoryService accessoryService;
    
    // Get all accessories
    @GetMapping
    public ResponseEntity<List<Accessory>> getAllAccessories() {
        return ResponseEntity.ok(accessoryService.getAllAccessories());
    }
    
    // Get active accessories
    @GetMapping("/active")
    public ResponseEntity<List<Accessory>> getActiveAccessories() {
        return ResponseEntity.ok(accessoryService.getActiveAccessories());
    }
    
    // Get accessories in stock
    @GetMapping("/in-stock")
    public ResponseEntity<List<Accessory>> getAccessoriesInStock() {
        return ResponseEntity.ok(accessoryService.getAccessoriesInStock());
    }
    
    // Get recent accessories
    @GetMapping("/recent")
    public ResponseEntity<List<Accessory>> getRecentAccessories() {
        return ResponseEntity.ok(accessoryService.getRecentAccessories());
    }
    
    // Get accessory by ID
    @GetMapping("/{id}")
    public ResponseEntity<Accessory> getAccessoryById(@PathVariable Long id) {
        return accessoryService.getAccessoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get accessories by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Accessory>> getAccessoriesByType(@PathVariable String type) {
        return ResponseEntity.ok(accessoryService.getAccessoriesByType(type));
    }
    
    // Get active accessories by type
    @GetMapping("/type/{type}/active")
    public ResponseEntity<List<Accessory>> getActiveAccessoriesByType(@PathVariable String type) {
        return ResponseEntity.ok(accessoryService.getActiveAccessoriesByType(type));
    }
    
    // Search accessories by name
    @GetMapping("/search/name")
    public ResponseEntity<List<Accessory>> searchAccessoriesByName(@RequestParam String name) {
        return ResponseEntity.ok(accessoryService.searchAccessoriesByName(name));
    }
    
    // Search accessories by brand
    @GetMapping("/search/brand")
    public ResponseEntity<List<Accessory>> searchAccessoriesByBrand(@RequestParam String brand) {
        return ResponseEntity.ok(accessoryService.searchAccessoriesByBrand(brand));
    }
    
    // Get accessories by price range
    @GetMapping("/price-range")
    public ResponseEntity<List<Accessory>> getAccessoriesByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        return ResponseEntity.ok(accessoryService.getAccessoriesByPriceRange(minPrice, maxPrice));
    }
    
    // Create accessory
    @PostMapping
    public ResponseEntity<Accessory> createAccessory(@RequestBody Accessory accessory) {
        Accessory savedAccessory = accessoryService.saveAccessory(accessory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccessory);
    }
    
    // Update accessory
    @PutMapping("/{id}")
    public ResponseEntity<Accessory> updateAccessory(@PathVariable Long id, @RequestBody Accessory accessory) {
        try {
            Accessory updatedAccessory = accessoryService.updateAccessory(id, accessory);
            return ResponseEntity.ok(updatedAccessory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update stock quantity
    @PutMapping("/{id}/stock")
    public ResponseEntity<Accessory> updateStockQuantity(@PathVariable Long id, @RequestBody Map<String, Integer> stock) {
        try {
            Integer quantity = stock.get("quantity");
            Accessory accessory = accessoryService.updateStockQuantity(id, quantity);
            return ResponseEntity.ok(accessory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Decrease stock
    @PutMapping("/{id}/stock/decrease")
    public ResponseEntity<Accessory> decreaseStock(@PathVariable Long id, @RequestBody Map<String, Integer> stock) {
        try {
            Integer quantity = stock.get("quantity");
            Accessory accessory = accessoryService.decreaseStock(id, quantity);
            return ResponseEntity.ok(accessory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Increase stock
    @PutMapping("/{id}/stock/increase")
    public ResponseEntity<Accessory> increaseStock(@PathVariable Long id, @RequestBody Map<String, Integer> stock) {
        try {
            Integer quantity = stock.get("quantity");
            Accessory accessory = accessoryService.increaseStock(id, quantity);
            return ResponseEntity.ok(accessory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Activate accessory
    @PutMapping("/{id}/activate")
    public ResponseEntity<Accessory> activateAccessory(@PathVariable Long id) {
        try {
            Accessory accessory = accessoryService.activateAccessory(id);
            return ResponseEntity.ok(accessory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Deactivate accessory
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Accessory> deactivateAccessory(@PathVariable Long id) {
        try {
            Accessory accessory = accessoryService.deactivateAccessory(id);
            return ResponseEntity.ok(accessory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete accessory
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessory(@PathVariable Long id) {
        accessoryService.deleteAccessory(id);
        return ResponseEntity.noContent().build();
    }
}
