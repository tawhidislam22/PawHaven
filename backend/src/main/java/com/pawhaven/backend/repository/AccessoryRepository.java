package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Accessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
    
    // Find active accessories
    List<Accessory> findByIsActiveTrue();
    
    // Find accessories by type
    List<Accessory> findByType(String type);
    
    // Find active accessories by type
    List<Accessory> findByTypeAndIsActiveTrue(String type);
    
    // Find accessories by name containing
    List<Accessory> findByNameContainingIgnoreCase(String name);
    
    // Find accessories by brand
    List<Accessory> findByBrandContainingIgnoreCase(String brand);
    
    // Find accessories by price range
    @Query("SELECT a FROM Accessory a WHERE a.price BETWEEN :minPrice AND :maxPrice AND a.isActive = true")
    List<Accessory> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find in-stock accessories
    @Query("SELECT a FROM Accessory a WHERE a.quantity > 0 AND a.isActive = true")
    List<Accessory> findInStock();
    
    // Find recent accessories
    @Query("SELECT a FROM Accessory a WHERE a.isActive = true ORDER BY a.createdAt DESC")
    List<Accessory> findRecentAccessories();
}
