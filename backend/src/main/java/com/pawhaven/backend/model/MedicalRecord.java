package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "medical_records")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @NotNull(message = "Record type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "record_type", nullable = false)
    private RecordType recordType;

    @NotNull(message = "Record date is required")
    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    @NotBlank(message = "Description is required")
    @Size(min = 5, max = 1000, message = "Description must be between 5 and 1000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "veterinarian_name", length = 200)
    private String veterinarianName;

    @Column(name = "clinic_name", length = 200)
    private String clinicName;

    @Column(name = "medication_prescribed", length = 500)
    private String medicationPrescribed;

    @Column(name = "dosage_instructions", length = 500)
    private String dosageInstructions;

    @Column(name = "follow_up_required")
    private Boolean followUpRequired = false;

    @Column(name = "follow_up_date")
    private LocalDate followUpDate;

    @Column(name = "cost")
    @DecimalMin(value = "0.0", message = "Cost cannot be negative")
    private Double cost;

    @Column(name = "weight_at_visit")
    @DecimalMin(value = "0.1", message = "Weight must be positive")
    private Double weightAtVisit;

    @Column(name = "temperature")
    private Double temperature;

    @NotNull(message = "Treatment status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "treatment_status", nullable = false)
    private TreatmentStatus treatmentStatus = TreatmentStatus.COMPLETED;

    @Column(name = "notes", length = 1000)
    private String notes;

    @ElementCollection
    @CollectionTable(name = "medical_record_attachments", joinColumns = @JoinColumn(name = "medical_record_id"))
    @Column(name = "attachment_url")
    private java.util.List<String> attachmentUrls;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public MedicalRecord() {}

    public MedicalRecord(Pet pet, RecordType recordType, LocalDate recordDate, String description) {
        this.pet = pet;
        this.recordType = recordType;
        this.recordDate = recordDate;
        this.description = description;
        this.treatmentStatus = TreatmentStatus.COMPLETED;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public RecordType getRecordType() { return recordType; }
    public void setRecordType(RecordType recordType) { this.recordType = recordType; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getVeterinarianName() { return veterinarianName; }
    public void setVeterinarianName(String veterinarianName) { this.veterinarianName = veterinarianName; }

    public String getClinicName() { return clinicName; }
    public void setClinicName(String clinicName) { this.clinicName = clinicName; }

    public String getMedicationPrescribed() { return medicationPrescribed; }
    public void setMedicationPrescribed(String medicationPrescribed) { this.medicationPrescribed = medicationPrescribed; }

    public String getDosageInstructions() { return dosageInstructions; }
    public void setDosageInstructions(String dosageInstructions) { this.dosageInstructions = dosageInstructions; }

    public Boolean getFollowUpRequired() { return followUpRequired; }
    public void setFollowUpRequired(Boolean followUpRequired) { this.followUpRequired = followUpRequired; }

    public LocalDate getFollowUpDate() { return followUpDate; }
    public void setFollowUpDate(LocalDate followUpDate) { this.followUpDate = followUpDate; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public Double getWeightAtVisit() { return weightAtVisit; }
    public void setWeightAtVisit(Double weightAtVisit) { this.weightAtVisit = weightAtVisit; }

    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }

    public TreatmentStatus getTreatmentStatus() { return treatmentStatus; }
    public void setTreatmentStatus(TreatmentStatus treatmentStatus) { this.treatmentStatus = treatmentStatus; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public java.util.List<String> getAttachmentUrls() { return attachmentUrls; }
    public void setAttachmentUrls(java.util.List<String> attachmentUrls) { this.attachmentUrls = attachmentUrls; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum RecordType {
        VACCINATION, CHECKUP, SURGERY, DENTAL, EMERGENCY, ILLNESS, INJURY, 
        SPAY_NEUTER, MICROCHIP, MEDICATION, BEHAVIORAL, OTHER
    }

    public enum TreatmentStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, FOLLOW_UP_NEEDED
    }

    @Override
    public String toString() {
        return "MedicalRecord{" +
                "id=" + id +
                ", pet=" + (pet != null ? pet.getName() : null) +
                ", recordType=" + recordType +
                ", recordDate=" + recordDate +
                ", treatmentStatus=" + treatmentStatus +
                '}';
    }
}