package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event title is required")
    @Size(min = 5, max = 200, message = "Event title must be between 5 and 200 characters")
    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @NotBlank(message = "Event description is required")
    @Size(min = 20, max = 2000, message = "Event description must be between 20 and 2000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Event type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private EventType eventType;

    @NotNull(message = "Start date and time is required")
    @Column(name = "start_date_time", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @NotBlank(message = "Location is required")
    @Size(max = 500, message = "Location cannot exceed 500 characters")
    @Column(name = "location", nullable = false, length = 500)
    private String location;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id")
    private User organizer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private Shelter hostShelter;

    @Column(name = "max_attendees")
    @Min(value = 1, message = "Maximum attendees must be at least 1")
    private Integer maxAttendees;

    @Column(name = "current_attendees")
    @Min(value = 0, message = "Current attendees cannot be negative")
    private Integer currentAttendees = 0;

    @Column(name = "registration_required")
    private Boolean registrationRequired = false;

    @Column(name = "registration_deadline")
    private LocalDateTime registrationDeadline;

    @Column(name = "entry_fee")
    @DecimalMin(value = "0.0", message = "Entry fee cannot be negative")
    private Double entryFee = 0.0;

    @Column(name = "contact_email", length = 255)
    @Email(message = "Invalid email format")
    private String contactEmail;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @ElementCollection
    @CollectionTable(name = "event_images", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "image_url")
    private java.util.List<String> imageUrls;

    @Column(name = "special_instructions", length = 1000)
    private String specialInstructions;

    @Column(name = "age_restriction")
    private String ageRestriction;

    @Column(name = "pet_friendly")
    private Boolean petFriendly = false;

    @Column(name = "wheelchair_accessible")
    private Boolean wheelchairAccessible = true;

    @Column(name = "parking_available")
    private Boolean parkingAvailable = true;

    @NotNull(message = "Event status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EventStatus status = EventStatus.SCHEDULED;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_virtual")
    private Boolean isVirtual = false;

    @Column(name = "virtual_meeting_link", length = 500)
    private String virtualMeetingLink;

    @Column(name = "cancelled_reason", length = 500)
    private String cancelledReason;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Event() {}

    public Event(String title, String description, EventType eventType, 
                LocalDateTime startDateTime, String location) {
        this.title = title;
        this.description = description;
        this.eventType = eventType;
        this.startDateTime = startDateTime;
        this.location = location;
        this.status = EventStatus.SCHEDULED;
        this.currentAttendees = 0;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }

    public LocalDateTime getStartDateTime() { return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }

    public LocalDateTime getEndDateTime() { return endDateTime; }
    public void setEndDateTime(LocalDateTime endDateTime) { this.endDateTime = endDateTime; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

    public Shelter getHostShelter() { return hostShelter; }
    public void setHostShelter(Shelter hostShelter) { this.hostShelter = hostShelter; }

    public Integer getMaxAttendees() { return maxAttendees; }
    public void setMaxAttendees(Integer maxAttendees) { this.maxAttendees = maxAttendees; }

    public Integer getCurrentAttendees() { return currentAttendees; }
    public void setCurrentAttendees(Integer currentAttendees) { this.currentAttendees = currentAttendees; }

    public Boolean getRegistrationRequired() { return registrationRequired; }
    public void setRegistrationRequired(Boolean registrationRequired) { this.registrationRequired = registrationRequired; }

    public LocalDateTime getRegistrationDeadline() { return registrationDeadline; }
    public void setRegistrationDeadline(LocalDateTime registrationDeadline) { this.registrationDeadline = registrationDeadline; }

    public Double getEntryFee() { return entryFee; }
    public void setEntryFee(Double entryFee) { this.entryFee = entryFee; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public java.util.List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(java.util.List<String> imageUrls) { this.imageUrls = imageUrls; }

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public String getAgeRestriction() { return ageRestriction; }
    public void setAgeRestriction(String ageRestriction) { this.ageRestriction = ageRestriction; }

    public Boolean getPetFriendly() { return petFriendly; }
    public void setPetFriendly(Boolean petFriendly) { this.petFriendly = petFriendly; }

    public Boolean getWheelchairAccessible() { return wheelchairAccessible; }
    public void setWheelchairAccessible(Boolean wheelchairAccessible) { this.wheelchairAccessible = wheelchairAccessible; }

    public Boolean getParkingAvailable() { return parkingAvailable; }
    public void setParkingAvailable(Boolean parkingAvailable) { this.parkingAvailable = parkingAvailable; }

    public EventStatus getStatus() { return status; }
    public void setStatus(EventStatus status) { this.status = status; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public Boolean getIsVirtual() { return isVirtual; }
    public void setIsVirtual(Boolean isVirtual) { this.isVirtual = isVirtual; }

    public String getVirtualMeetingLink() { return virtualMeetingLink; }
    public void setVirtualMeetingLink(String virtualMeetingLink) { this.virtualMeetingLink = virtualMeetingLink; }

    public String getCancelledReason() { return cancelledReason; }
    public void setCancelledReason(String cancelledReason) { this.cancelledReason = cancelledReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum EventType {
        ADOPTION_EVENT, FUNDRAISER, VOLUNTEER_TRAINING, EDUCATION_WORKSHOP, 
        PET_SHOW, VACCINATION_CLINIC, SPAY_NEUTER_CLINIC, COMMUNITY_OUTREACH, 
        MEET_AND_GREET, CHARITY_RUN, BAKE_SALE, AUCTION, OTHER
    }

    public enum EventStatus {
        SCHEDULED, CANCELLED, COMPLETED, POSTPONED, IN_PROGRESS
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", eventType=" + eventType +
                ", startDateTime=" + startDateTime +
                ", location='" + location + '\'' +
                ", status=" + status +
                '}';
    }
}