package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Accessory;
import com.pawhaven.backend.service.AccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accessories")
@CrossOrigin(origins = "*")
public class AccessoryController {
    
    @Autowired
    private AccessoryService accessoryService;
    
    // CREATE - Add new accessory
    @PostMapping
    public ResponseEntity<Accessory> createAccessory(@Valid @RequestBody Accessory accessory) {
        try {
            Accessory savedAccessory = accessoryService.saveAccessory(accessory);
            return new ResponseEntity<>(savedAccessory, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all accessories
    @GetMapping
    public ResponseEntity<List<Accessory>> getAllAccessories() {
        try {
            List<Accessory> accessories = accessoryService.getAllAccessories();
            if (accessories.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get accessory by ID
    @GetMapping("/{id}")
    public ResponseEntity<Accessory> getAccessoryById(@PathVariable Long id) {
        try {
            Optional<Accessory> accessory = accessoryService.getAccessoryById(id);
            if (accessory.isPresent()) {
                return new ResponseEntity<>(accessory.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update accessory
    @PutMapping("/{id}")
    public ResponseEntity<Accessory> updateAccessory(@PathVariable Long id, @Valid @RequestBody Accessory accessory) {
        try {
            Accessory updatedAccessory = accessoryService.updateAccessory(id, accessory);
            if (updatedAccessory != null) {
                return new ResponseEntity<>(updatedAccessory, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete accessory
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAccessory(@PathVariable Long id) {
        try {
            boolean deleted = accessoryService.deleteAccessory(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get accessories by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Accessory>> getAccessoriesByCategory(@PathVariable String category) {
        try {
            List<Accessory> accessories = accessoryService.getAccessoriesByCategory(category);
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Search accessories by name
    @GetMapping("/search")
    public ResponseEntity<List<Accessory>> searchAccessoriesByName(@RequestParam String name) {
        try {
            List<Accessory> accessories = accessoryService.searchAccessoriesByName(name);
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get available accessories
    @GetMapping("/available")
    public ResponseEntity<List<Accessory>> getAvailableAccessories() {
        try {
            List<Accessory> accessories = accessoryService.getAvailableAccessories();
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get accessories by brand
    @GetMapping("/brand")
    public ResponseEntity<List<Accessory>> getAccessoriesByBrand(@RequestParam String brand) {
        try {
            List<Accessory> accessories = accessoryService.getAccessoriesByBrand(brand);
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get accessories by price range
    @GetMapping("/price-range")
    public ResponseEntity<List<Accessory>> getAccessoriesByPriceRange(@RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        try {
            List<Accessory> accessories = accessoryService.getAccessoriesByPriceRange(minPrice, maxPrice);
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get popular accessories
    @GetMapping("/popular")
    public ResponseEntity<List<Accessory>> getPopularAccessories() {
        try {
            List<Accessory> accessories = accessoryService.getPopularAccessories();
            return new ResponseEntity<>(accessories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Accessory> updateStock(@PathVariable Long id, @RequestParam Integer stock) {
        try {
            Accessory updatedAccessory = accessoryService.updateStock(id, stock);
            if (updatedAccessory != null) {
                return new ResponseEntity<>(updatedAccessory, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}