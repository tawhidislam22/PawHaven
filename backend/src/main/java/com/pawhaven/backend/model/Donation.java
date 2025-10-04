package com.pawhaven.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "donations")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id")
    private User donor;

    @Column(name = "donor_name", length = 200)
    private String donorName;

    @Column(name = "donor_email", length = 255)
    @Email(message = "Invalid email format")
    private String donorEmail;

    @NotNull(message = "Donation amount is required")
    @DecimalMin(value = "1.00", message = "Donation amount must be at least $1.00")
    @DecimalMax(value = "100000.00", message = "Donation amount cannot exceed $100,000")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Donation type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "donation_type", nullable = false)
    private DonationType donationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    private Pet dedicatedToPet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private Shelter dedicatedToShelter;

    @NotNull(message = "Payment method is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(name = "transaction_id", length = 100, unique = true)
    private String transactionId;

    @NotNull(message = "Payment status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "is_recurring")
    private Boolean isRecurring = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "recurring_frequency")
    private RecurringFrequency recurringFrequency;

    @Column(name = "is_anonymous")
    private Boolean isAnonymous = false;

    @Column(name = "message", length = 1000)
    private String message;

    @Column(name = "tax_deductible")
    private Boolean taxDeductible = true;

    @Column(name = "receipt_sent")
    private Boolean receiptSent = false;

    @Column(name = "receipt_sent_at")
    private LocalDateTime receiptSentAt;

    @Column(name = "campaign_source", length = 100)
    private String campaignSource;

    @Column(name = "in_memory_of", length = 200)
    private String inMemoryOf;

    @Column(name = "in_honor_of", length = 200)
    private String inHonorOf;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @Column(name = "refunded_at")
    private LocalDateTime refundedAt;

    @Column(name = "refund_reason", length = 500)
    private String refundReason;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Donation() {}

    public Donation(BigDecimal amount, DonationType donationType, PaymentMethod paymentMethod) {
        this.amount = amount;
        this.donationType = donationType;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = PaymentStatus.PENDING;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getDonor() { return donor; }
    public void setDonor(User donor) { this.donor = donor; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getDonorEmail() { return donorEmail; }
    public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public DonationType getDonationType() { return donationType; }
    public void setDonationType(DonationType donationType) { this.donationType = donationType; }

    public Pet getDedicatedToPet() { return dedicatedToPet; }
    public void setDedicatedToPet(Pet dedicatedToPet) { this.dedicatedToPet = dedicatedToPet; }

    public Shelter getDedicatedToShelter() { return dedicatedToShelter; }
    public void setDedicatedToShelter(Shelter dedicatedToShelter) { this.dedicatedToShelter = dedicatedToShelter; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }

    public Boolean getIsRecurring() { return isRecurring; }
    public void setIsRecurring(Boolean isRecurring) { this.isRecurring = isRecurring; }

    public RecurringFrequency getRecurringFrequency() { return recurringFrequency; }
    public void setRecurringFrequency(RecurringFrequency recurringFrequency) { this.recurringFrequency = recurringFrequency; }

    public Boolean getIsAnonymous() { return isAnonymous; }
    public void setIsAnonymous(Boolean isAnonymous) { this.isAnonymous = isAnonymous; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getTaxDeductible() { return taxDeductible; }
    public void setTaxDeductible(Boolean taxDeductible) { this.taxDeductible = taxDeductible; }

    public Boolean getReceiptSent() { return receiptSent; }
    public void setReceiptSent(Boolean receiptSent) { this.receiptSent = receiptSent; }

    public LocalDateTime getReceiptSentAt() { return receiptSentAt; }
    public void setReceiptSentAt(LocalDateTime receiptSentAt) { this.receiptSentAt = receiptSentAt; }

    public String getCampaignSource() { return campaignSource; }
    public void setCampaignSource(String campaignSource) { this.campaignSource = campaignSource; }

    public String getInMemoryOf() { return inMemoryOf; }
    public void setInMemoryOf(String inMemoryOf) { this.inMemoryOf = inMemoryOf; }

    public String getInHonorOf() { return inHonorOf; }
    public void setInHonorOf(String inHonorOf) { this.inHonorOf = inHonorOf; }

    public LocalDateTime getProcessedAt() { return processedAt; }
    public void setProcessedAt(LocalDateTime processedAt) { this.processedAt = processedAt; }

    public LocalDateTime getRefundedAt() { return refundedAt; }
    public void setRefundedAt(LocalDateTime refundedAt) { this.refundedAt = refundedAt; }

    public String getRefundReason() { return refundReason; }
    public void setRefundReason(String refundReason) { this.refundReason = refundReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enums
    public enum DonationType {
        GENERAL, MEDICAL_CARE, FOOD_SUPPLIES, SHELTER_MAINTENANCE, 
        EMERGENCY_FUND, SPAY_NEUTER_PROGRAM, EDUCATION, TRANSPORT
    }

    public enum PaymentMethod {
        CREDIT_CARD, DEBIT_CARD, PAYPAL, BANK_TRANSFER, CHECK, CASH, CRYPTOCURRENCY
    }

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, CANCELLED, REFUNDED, PARTIALLY_REFUNDED
    }

    public enum RecurringFrequency {
        WEEKLY, MONTHLY, QUARTERLY, SEMI_ANNUALLY, ANNUALLY
    }

    @Override
    public String toString() {
        return "Donation{" +
                "id=" + id +
                ", amount=" + amount +
                ", donationType=" + donationType +
                ", paymentStatus=" + paymentStatus +
                ", isAnonymous=" + isAnonymous +
                ", createdAt=" + createdAt +
                '}';
    }
}