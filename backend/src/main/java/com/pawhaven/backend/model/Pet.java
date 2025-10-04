package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "pets")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Pet name is required")
    @Size(min = 1, max = 100, message = "Pet name must be between 1 and 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NotNull(message = "Pet type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "pet_type", nullable = false)
    private PetType petType;

    @NotBlank(message = "Breed is required")
    @Size(max = 100, message = "Breed must not exceed 100 characters")
    @Column(name = "breed", nullable = false, length = 100)
    private String breed;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be negative")
    @Max(value = 50, message = "Age cannot exceed 50 years")
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull(message = "Size is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "size", nullable = false)
    private PetSize size;

    @Column(name = "weight")
    @DecimalMin(value = "0.1", message = "Weight must be positive")
    @DecimalMax(value = "500.0", message = "Weight cannot exceed 500 kg")
    private Double weight;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Adoption status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "adoption_status", nullable = false)
    private AdoptionStatus adoptionStatus = AdoptionStatus.AVAILABLE;

    @ElementCollection
    @CollectionTable(name = "pet_images", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    @Column(name = "vaccination_status")
    private Boolean vaccinationStatus = false;

    @Column(name = "spayed_neutered")
    private Boolean spayedNeutered = false;

    @Column(name = "house_trained")
    private Boolean houseTrained = false;

    @Column(name = "good_with_kids")
    private Boolean goodWithKids = true;

    @Column(name = "good_with_pets")
    private Boolean goodWithPets = true;

    @Column(name = "energy_level")
    @Enumerated(EnumType.STRING)
    private EnergyLevel energyLevel;

    @Column(name = "special_needs")
    @Size(max = 500, message = "Special needs description cannot exceed 500 characters")
    private String specialNeeds;

    @Column(name = "adoption_fee")
    @DecimalMin(value = "0.0", message = "Adoption fee cannot be negative")
    @DecimalMax(value = "10000.0", message = "Adoption fee cannot exceed 10000")
    private Double adoptionFee;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "intake_date")
    private LocalDate intakeDate;

    @Column(name = "location")
    @Size(max = 200, message = "Location cannot exceed 200 characters")
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Pet() {}

    public Pet(String name, PetType petType, String breed, Integer age, Gender gender, 
               PetSize size, String description) {
        this.name = name;
        this.petType = petType;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.size = size;
        this.description = description;
        this.adoptionStatus = AdoptionStatus.AVAILABLE;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public PetType getPetType() { return petType; }
    public void setPetType(PetType petType) { this.petType = petType; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public PetSize getSize() { return size; }
    public void setSize(PetSize size) { this.size = size; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public AdoptionStatus getAdoptionStatus() { return adoptionStatus; }
    public void setAdoptionStatus(AdoptionStatus adoptionStatus) { this.adoptionStatus = adoptionStatus; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public Boolean getVaccinationStatus() { return vaccinationStatus; }
    public void setVaccinationStatus(Boolean vaccinationStatus) { this.vaccinationStatus = vaccinationStatus; }

    public Boolean getSpayedNeutered() { return spayedNeutered; }
    public void setSpayedNeutered(Boolean spayedNeutered) { this.spayedNeutered = spayedNeutered; }

    public Boolean getHouseTrained() { return houseTrained; }
    public void setHouseTrained(Boolean houseTrained) { this.houseTrained = houseTrained; }

    public Boolean getGoodWithKids() { return goodWithKids; }
    public void setGoodWithKids(Boolean goodWithKids) { this.goodWithKids = goodWithKids; }

    public Boolean getGoodWithPets() { return goodWithPets; }
    public void setGoodWithPets(Boolean goodWithPets) { this.goodWithPets = goodWithPets; }

    public EnergyLevel getEnergyLevel() { return energyLevel; }
    public void setEnergyLevel(EnergyLevel energyLevel) { this.energyLevel = energyLevel; }

    public String getSpecialNeeds() { return specialNeeds; }
    public void setSpecialNeeds(String specialNeeds) { this.specialNeeds = specialNeeds; }

    public Double getAdoptionFee() { return adoptionFee; }
    public void setAdoptionFee(Double adoptionFee) { this.adoptionFee = adoptionFee; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public LocalDate getIntakeDate() { return intakeDate; }
    public void setIntakeDate(LocalDate intakeDate) { this.intakeDate = intakeDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Shelter getShelter() { return shelter; }
    public void setShelter(Shelter shelter) { this.shelter = shelter; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum PetType {
        DOG, CAT, BIRD, RABBIT, HAMSTER, GUINEA_PIG, FISH, REPTILE, OTHER
    }

    public enum Gender {
        MALE, FEMALE, UNKNOWN
    }

    public enum PetSize {
        SMALL, MEDIUM, LARGE, EXTRA_LARGE
    }

    public enum AdoptionStatus {
        AVAILABLE, PENDING, ADOPTED, ON_HOLD, NOT_AVAILABLE
    }

    public enum EnergyLevel {
        LOW, MODERATE, HIGH, VERY_HIGH
    }

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", petType=" + petType +
                ", breed='" + breed + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", adoptionStatus=" + adoptionStatus +
                '}';
    }
}