package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    
    // Find donations by donor
    List<Donation> findByDonorId(Long donorId);
    
    // Find donations by shelter
    List<Donation> findByShelterId(Long shelterId);
    
    // Find donations by payment status
    List<Donation> findByPaymentStatus(String paymentStatus);
    
    // Find donations within date range
    List<Donation> findByDonationDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find donations by amount range
    List<Donation> findByAmountBetween(BigDecimal minAmount, BigDecimal maxAmount);
    
    // Find successful donations
    List<Donation> findByPaymentStatusOrderByDonationDateDesc(String paymentStatus);
    
    // Custom query to calculate total donations by shelter
    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.shelter.id = :shelterId AND d.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalDonationsByShelter(Long shelterId);
    
    // Find recent donations
    @Query("SELECT d FROM Donation d WHERE d.donationDate >= :since ORDER BY d.donationDate DESC")
    List<Donation> findRecentDonations(LocalDateTime since);
}