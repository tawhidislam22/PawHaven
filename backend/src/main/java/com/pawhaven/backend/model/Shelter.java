package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "shelters")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Shelter name is required")
    @Size(min = 2, max = 200, message = "Shelter name must be between 2 and 200 characters")
    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    @Column(name = "address", nullable = false, length = 500)
    private String address;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State cannot exceed 100 characters")
    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "\\d{5}(-\\d{4})?", message = "Invalid ZIP code format")
    @Column(name = "zip_code", nullable = false, length = 10)
    private String zipCode;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Size(max = 255, message = "Website URL cannot exceed 255 characters")
    @Column(name = "website_url", length = 255)
    private String websiteUrl;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Shelter type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "shelter_type", nullable = false)
    private ShelterType shelterType;

    @Column(name = "capacity")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 10000, message = "Capacity cannot exceed 10000")
    private Integer capacity;

    @Column(name = "current_occupancy")
    @Min(value = 0, message = "Current occupancy cannot be negative")
    private Integer currentOccupancy = 0;

    @Column(name = "is_no_kill")
    private Boolean isNoKill = false;

    @Column(name = "license_number", length = 100)
    private String licenseNumber;

    @ElementCollection
    @CollectionTable(name = "shelter_services", joinColumns = @JoinColumn(name = "shelter_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "service")
    private List<ShelterService> services;

    @Column(name = "operating_hours", length = 500)
    private String operatingHours;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pet> pets;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Shelter() {}

    public Shelter(String name, String address, String city, String state, String zipCode, 
                   String phoneNumber, String email, ShelterType shelterType) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.shelterType = shelterType;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ShelterType getShelterType() { return shelterType; }
    public void setShelterType(ShelterType shelterType) { this.shelterType = shelterType; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Integer getCurrentOccupancy() { return currentOccupancy; }
    public void setCurrentOccupancy(Integer currentOccupancy) { this.currentOccupancy = currentOccupancy; }

    public Boolean getIsNoKill() { return isNoKill; }
    public void setIsNoKill(Boolean isNoKill) { this.isNoKill = isNoKill; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public List<ShelterService> getServices() { return services; }
    public void setServices(List<ShelterService> services) { this.services = services; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public List<Pet> getPets() { return pets; }
    public void setPets(List<Pet> pets) { this.pets = pets; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum ShelterType {
        MUNICIPAL, NON_PROFIT, PRIVATE, RESCUE_GROUP, FOSTER_NETWORK
    }

    public enum ShelterService {
        ADOPTION, FOSTERING, VETERINARY_CARE, SPAY_NEUTER, VACCINATION, 
        MICROCHIPPING, GROOMING, TRAINING, BOARDING, EMERGENCY_CARE, 
        EDUCATION, VOLUNTEER_PROGRAMS, DONATION_ACCEPTANCE
    }

    @Override
    public String toString() {
        return "Shelter{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", shelterType=" + shelterType +
                ", capacity=" + capacity +
                ", currentOccupancy=" + currentOccupancy +
                '}';
    }
}