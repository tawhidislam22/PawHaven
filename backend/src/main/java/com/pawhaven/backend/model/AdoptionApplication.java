package com.pawhaven.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_applications")
public class AdoptionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "a_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "u_id", nullable = false)
    @JsonIgnoreProperties({"password", "adoptionApplications", "payments", "feedbacks", "notifications", "reports", "babysittings"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id", referencedColumnName = "p_id", nullable = false)
    @JsonIgnoreProperties({"adoptionApplications", "babysittings", "shelter"})
    private Pet pet;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "application_reason", columnDefinition = "TEXT")
    private String applicationReason;

    @Column(name = "living_situation", length = 200)
    private String livingSituation;

    @Column(name = "has_other_pets")
    private Boolean hasOtherPets;

    @Column(name = "experience_with_pets", columnDefinition = "TEXT")
    private String experienceWithPets;

    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    @CreationTimestamp
    @Column(name = "submission_date", nullable = false, updatable = false)
    private LocalDateTime submissionDate;

    @Column(name = "reviewed_date")
    private LocalDateTime reviewedDate;

    // Constructors
    public AdoptionApplication() {
    }

    public AdoptionApplication(User user, Pet pet, ApplicationStatus status) {
        this.user = user;
        this.pet = pet;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public String getApplicationReason() {
        return applicationReason;
    }

    public void setApplicationReason(String applicationReason) {
        this.applicationReason = applicationReason;
    }

    public String getLivingSituation() {
        return livingSituation;
    }

    public void setLivingSituation(String livingSituation) {
        this.livingSituation = livingSituation;
    }

    public Boolean getHasOtherPets() {
        return hasOtherPets;
    }

    public void setHasOtherPets(Boolean hasOtherPets) {
        this.hasOtherPets = hasOtherPets;
    }

    public String getExperienceWithPets() {
        return experienceWithPets;
    }

    public void setExperienceWithPets(String experienceWithPets) {
        this.experienceWithPets = experienceWithPets;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public LocalDateTime getReviewedDate() {
        return reviewedDate;
    }

    public void setReviewedDate(LocalDateTime reviewedDate) {
        this.reviewedDate = reviewedDate;
    }

    @Override
    public String toString() {
        return "AdoptionApplication{" +
                "id=" + id +
                ", status=" + status +
                ", submissionDate=" + submissionDate +
                '}';
    }
}
