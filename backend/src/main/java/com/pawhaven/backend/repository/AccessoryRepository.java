package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Accessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
    
    // Find accessories by category
    List<Accessory> findByCategory(String category);
    
    // Find accessories by name containing
    List<Accessory> findByNameContainingIgnoreCase(String name);
    
    // Find accessories by price range
    List<Accessory> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find active accessories
    List<Accessory> findByIsActiveTrue();
    
    // Find accessories by brand
    List<Accessory> findByBrandContainingIgnoreCase(String brand);
    
    // Find active accessories ordered by price
    List<Accessory> findByIsActiveTrueOrderByPriceAsc();
    
    // Find accessories by category and active status
    List<Accessory> findByCategoryAndIsActiveTrue(String category);
    
    // Custom query to find popular accessories
    @Query("SELECT a FROM Accessory a WHERE a.isActive = true ORDER BY a.id DESC")
    List<Accessory> findPopularAccessories();
}