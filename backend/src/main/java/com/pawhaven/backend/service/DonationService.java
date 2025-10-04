package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Donation;
import com.pawhaven.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DonationService {
    
    @Autowired
    private DonationRepository donationRepository;
    
    // Create or update donation
    public Donation saveDonation(Donation donation) {
        return donationRepository.save(donation);
    }
    
    // Get all donations
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }
    
    // Get donation by ID
    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }
    
    // Update donation
    public Donation updateDonation(Long id, Donation donationDetails) {
        Optional<Donation> optionalDonation = donationRepository.findById(id);
        if (optionalDonation.isPresent()) {
            Donation donation = optionalDonation.get();
            donation.setAmount(donationDetails.getAmount());
            donation.setPaymentMethod(donationDetails.getPaymentMethod());
            donation.setPaymentStatus(donationDetails.getPaymentStatus());
            donation.setMessage(donationDetails.getMessage());
            donation.setIsAnonymous(donationDetails.getIsAnonymous());
            return donationRepository.save(donation);
        }
        return null;
    }
    
    // Delete donation
    public boolean deleteDonation(Long id) {
        if (donationRepository.existsById(id)) {
            donationRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get donations by donor
    public List<Donation> getDonationsByDonor(Long donorId) {
        return donationRepository.findByDonorId(donorId);
    }
    
    // Get donations by shelter
    public List<Donation> getDonationsByShelter(Long shelterId) {
        return donationRepository.findByShelterId(shelterId);
    }
    
    // Get donations by payment status
    public List<Donation> getDonationsByPaymentStatus(String paymentStatus) {
        return donationRepository.findByPaymentStatusOrderByDonationDateDesc(paymentStatus);
    }
    
    // Get successful donations
    public List<Donation> getSuccessfulDonations() {
        return donationRepository.findByPaymentStatusOrderByDonationDateDesc("COMPLETED");
    }
    
    // Get total donations by shelter
    public BigDecimal getTotalDonationsByShelter(Long shelterId) {
        BigDecimal total = donationRepository.getTotalDonationsByShelter(shelterId);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    // Get recent donations
    public List<Donation> getRecentDonations(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return donationRepository.findRecentDonations(since);
    }
    
    // Update donation status
    public Donation updateDonationStatus(Long id, Donation.PaymentStatus paymentStatus) {
        Optional<Donation> optionalDonation = donationRepository.findById(id);
        if (optionalDonation.isPresent()) {
            Donation donation = optionalDonation.get();
            donation.setPaymentStatus(paymentStatus);
            return donationRepository.save(donation);
        }
        return null;
    }
}