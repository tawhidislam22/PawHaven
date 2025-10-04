package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_applications")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AdoptionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User applicant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @NotNull(message = "Application status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @NotBlank(message = "Reason for adoption is required")
    @Size(min = 10, max = 1000, message = "Reason must be between 10 and 1000 characters")
    @Column(name = "reason_for_adoption", columnDefinition = "TEXT")
    private String reasonForAdoption;

    @NotNull(message = "Housing type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "housing_type", nullable = false)
    private HousingType housingType;

    @Column(name = "housing_description", length = 500)
    private String housingDescription;

    @Column(name = "has_yard")
    private Boolean hasYard = false;

    @Column(name = "yard_description", length = 300)
    private String yardDescription;

    @Column(name = "has_other_pets")
    private Boolean hasOtherPets = false;

    @Column(name = "other_pets_description", length = 500)
    private String otherPetsDescription;

    @Column(name = "has_children")
    private Boolean hasChildren = false;

    @Column(name = "children_ages", length = 100)
    private String childrenAges;

    @NotNull(message = "Experience level is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level", nullable = false)
    private ExperienceLevel experienceLevel;

    @Column(name = "previous_pet_experience", length = 1000)
    private String previousPetExperience;

    @NotBlank(message = "Veterinarian contact is required")
    @Size(max = 300, message = "Veterinarian contact cannot exceed 300 characters")
    @Column(name = "veterinarian_contact", length = 300)
    private String veterinarianContact;

    @Column(name = "work_schedule", length = 500)
    private String workSchedule;

    @Column(name = "emergency_plan", length = 1000)
    private String emergencyPlan;

    @NotNull(message = "Agreement to terms is required")
    @Column(name = "agrees_to_terms", nullable = false)
    private Boolean agreesToTerms = false;

    @Column(name = "agrees_to_home_visit")
    private Boolean agreesToHomeVisit = false;

    @Column(name = "reference_name_1", length = 100)
    private String referenceName1;

    @Column(name = "reference_phone_1", length = 20)
    private String referencePhone1;

    @Column(name = "reference_name_2", length = 100)
    private String referenceName2;

    @Column(name = "reference_phone_2", length = 20)
    private String referencePhone2;

    @Column(name = "admin_notes", length = 1000)
    private String adminNotes;

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public AdoptionApplication() {}

    public AdoptionApplication(User applicant, Pet pet, String reasonForAdoption, 
                              HousingType housingType, ExperienceLevel experienceLevel) {
        this.applicant = applicant;
        this.pet = pet;
        this.reasonForAdoption = reasonForAdoption;
        this.housingType = housingType;
        this.experienceLevel = experienceLevel;
        this.status = ApplicationStatus.PENDING;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getApplicant() { return applicant; }
    public void setApplicant(User applicant) { this.applicant = applicant; }

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getReasonForAdoption() { return reasonForAdoption; }
    public void setReasonForAdoption(String reasonForAdoption) { this.reasonForAdoption = reasonForAdoption; }

    public HousingType getHousingType() { return housingType; }
    public void setHousingType(HousingType housingType) { this.housingType = housingType; }

    public String getHousingDescription() { return housingDescription; }
    public void setHousingDescription(String housingDescription) { this.housingDescription = housingDescription; }

    public Boolean getHasYard() { return hasYard; }
    public void setHasYard(Boolean hasYard) { this.hasYard = hasYard; }

    public String getYardDescription() { return yardDescription; }
    public void setYardDescription(String yardDescription) { this.yardDescription = yardDescription; }

    public Boolean getHasOtherPets() { return hasOtherPets; }
    public void setHasOtherPets(Boolean hasOtherPets) { this.hasOtherPets = hasOtherPets; }

    public String getOtherPetsDescription() { return otherPetsDescription; }
    public void setOtherPetsDescription(String otherPetsDescription) { this.otherPetsDescription = otherPetsDescription; }

    public Boolean getHasChildren() { return hasChildren; }
    public void setHasChildren(Boolean hasChildren) { this.hasChildren = hasChildren; }

    public String getChildrenAges() { return childrenAges; }
    public void setChildrenAges(String childrenAges) { this.childrenAges = childrenAges; }

    public ExperienceLevel getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(ExperienceLevel experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getPreviousPetExperience() { return previousPetExperience; }
    public void setPreviousPetExperience(String previousPetExperience) { this.previousPetExperience = previousPetExperience; }

    public String getVeterinarianContact() { return veterinarianContact; }
    public void setVeterinarianContact(String veterinarianContact) { this.veterinarianContact = veterinarianContact; }

    public String getWorkSchedule() { return workSchedule; }
    public void setWorkSchedule(String workSchedule) { this.workSchedule = workSchedule; }

    public String getEmergencyPlan() { return emergencyPlan; }
    public void setEmergencyPlan(String emergencyPlan) { this.emergencyPlan = emergencyPlan; }

    public Boolean getAgreesToTerms() { return agreesToTerms; }
    public void setAgreesToTerms(Boolean agreesToTerms) { this.agreesToTerms = agreesToTerms; }

    public Boolean getAgreesToHomeVisit() { return agreesToHomeVisit; }
    public void setAgreesToHomeVisit(Boolean agreesToHomeVisit) { this.agreesToHomeVisit = agreesToHomeVisit; }

    public String getReferenceName1() { return referenceName1; }
    public void setReferenceName1(String referenceName1) { this.referenceName1 = referenceName1; }

    public String getReferencePhone1() { return referencePhone1; }
    public void setReferencePhone1(String referencePhone1) { this.referencePhone1 = referencePhone1; }

    public String getReferenceName2() { return referenceName2; }
    public void setReferenceName2(String referenceName2) { this.referenceName2 = referenceName2; }

    public String getReferencePhone2() { return referencePhone2; }
    public void setReferencePhone2(String referencePhone2) { this.referencePhone2 = referencePhone2; }

    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public User getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(User reviewedBy) { this.reviewedBy = reviewedBy; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum ApplicationStatus {
        PENDING, UNDER_REVIEW, APPROVED, REJECTED, WITHDRAWN, COMPLETED
    }

    public enum HousingType {
        HOUSE, APARTMENT, CONDO, TOWNHOUSE, MOBILE_HOME, FARM, OTHER
    }

    public enum ExperienceLevel {
        FIRST_TIME, BEGINNER, INTERMEDIATE, EXPERIENCED, EXPERT
    }

    @Override
    public String toString() {
        return "AdoptionApplication{" +
                "id=" + id +
                ", applicant=" + (applicant != null ? applicant.getName() : null) +
                ", pet=" + (pet != null ? pet.getName() : null) +
                ", status=" + status +
                ", createdAt=" + createdAt +
                '}';
    }
}