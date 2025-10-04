package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "accessories")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Accessory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200, message = "Product name must be between 2 and 200 characters")
    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Category is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private AccessoryCategory category;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @DecimalMax(value = "10000.00", message = "Price cannot exceed $10,000")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "sku", unique = true, length = 50)
    private String sku;

    @Column(name = "brand", length = 100)
    private String brand;

    @Column(name = "model", length = 100)
    private String model;

    @ElementCollection
    @CollectionTable(name = "accessory_images", joinColumns = @JoinColumn(name = "accessory_id"))
    @Column(name = "image_url")
    private java.util.List<String> imageUrls;

    @ElementCollection
    @CollectionTable(name = "accessory_sizes", joinColumns = @JoinColumn(name = "accessory_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "size")
    private java.util.List<ProductSize> availableSizes;

    @ElementCollection
    @CollectionTable(name = "accessory_colors", joinColumns = @JoinColumn(name = "accessory_id"))
    @Column(name = "color")
    private java.util.List<String> availableColors;

    @Column(name = "material", length = 200)
    private String material;

    @Column(name = "dimensions", length = 100)
    private String dimensions;

    @Column(name = "weight_grams")
    @Min(value = 1, message = "Weight must be positive")
    private Integer weightGrams;

    @ElementCollection
    @CollectionTable(name = "accessory_pet_types", joinColumns = @JoinColumn(name = "accessory_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "pet_type")
    private java.util.List<Pet.PetType> suitableForPetTypes;

    @Column(name = "age_recommendation", length = 100)
    private String ageRecommendation;

    @Column(name = "care_instructions", length = 1000)
    private String careInstructions;

    @Column(name = "warranty_months")
    @Min(value = 0, message = "Warranty months cannot be negative")
    private Integer warrantyMonths;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_on_sale")
    private Boolean isOnSale = false;

    @Column(name = "sale_price", precision = 10, scale = 2)
    @DecimalMin(value = "0.01", message = "Sale price must be greater than 0")
    private BigDecimal salePrice;

    @Column(name = "rating")
    @DecimalMin(value = "0.0", message = "Rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    private Double rating;

    @Column(name = "review_count")
    @Min(value = 0, message = "Review count cannot be negative")
    private Integer reviewCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private Shelter beneficiaryShelter;

    @Column(name = "donation_percentage")
    @DecimalMin(value = "0.0", message = "Donation percentage cannot be negative")
    @DecimalMax(value = "100.0", message = "Donation percentage cannot exceed 100%")
    private Double donationPercentage;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Accessory() {}

    public Accessory(String name, String description, AccessoryCategory category, BigDecimal price, Integer stockQuantity) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.isActive = true;
        this.isFeatured = false;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public AccessoryCategory getCategory() { return category; }
    public void setCategory(AccessoryCategory category) { this.category = category; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public java.util.List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(java.util.List<String> imageUrls) { this.imageUrls = imageUrls; }

    public java.util.List<ProductSize> getAvailableSizes() { return availableSizes; }
    public void setAvailableSizes(java.util.List<ProductSize> availableSizes) { this.availableSizes = availableSizes; }

    public java.util.List<String> getAvailableColors() { return availableColors; }
    public void setAvailableColors(java.util.List<String> availableColors) { this.availableColors = availableColors; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }

    public Integer getWeightGrams() { return weightGrams; }
    public void setWeightGrams(Integer weightGrams) { this.weightGrams = weightGrams; }

    public java.util.List<Pet.PetType> getSuitableForPetTypes() { return suitableForPetTypes; }
    public void setSuitableForPetTypes(java.util.List<Pet.PetType> suitableForPetTypes) { this.suitableForPetTypes = suitableForPetTypes; }

    public String getAgeRecommendation() { return ageRecommendation; }
    public void setAgeRecommendation(String ageRecommendation) { this.ageRecommendation = ageRecommendation; }

    public String getCareInstructions() { return careInstructions; }
    public void setCareInstructions(String careInstructions) { this.careInstructions = careInstructions; }

    public Integer getWarrantyMonths() { return warrantyMonths; }
    public void setWarrantyMonths(Integer warrantyMonths) { this.warrantyMonths = warrantyMonths; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsOnSale() { return isOnSale; }
    public void setIsOnSale(Boolean isOnSale) { this.isOnSale = isOnSale; }

    public BigDecimal getSalePrice() { return salePrice; }
    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Shelter getBeneficiaryShelter() { return beneficiaryShelter; }
    public void setBeneficiaryShelter(Shelter beneficiaryShelter) { this.beneficiaryShelter = beneficiaryShelter; }

    public Double getDonationPercentage() { return donationPercentage; }
    public void setDonationPercentage(Double donationPercentage) { this.donationPercentage = donationPercentage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum AccessoryCategory {
        FOOD_BOWLS, TOYS, BEDS, COLLARS_LEASHES, CARRIERS, GROOMING, 
        CLOTHING, TRAINING, HEALTH_CARE, CLEANING, FURNITURE, OUTDOOR, OTHER
    }

    public enum ProductSize {
        XS, S, M, L, XL, XXL, ONE_SIZE
    }

    @Override
    public String toString() {
        return "Accessory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", price=" + price +
                ", stockQuantity=" + stockQuantity +
                ", isActive=" + isActive +
                '}';
    }
}