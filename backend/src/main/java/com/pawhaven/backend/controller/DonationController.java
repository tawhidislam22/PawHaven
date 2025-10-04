package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Donation;
import com.pawhaven.backend.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "*")
public class DonationController {
    
    @Autowired
    private DonationService donationService;
    
    // CREATE - Make new donation
    @PostMapping
    public ResponseEntity<Donation> createDonation(@Valid @RequestBody Donation donation) {
        try {
            Donation savedDonation = donationService.saveDonation(donation);
            return new ResponseEntity<>(savedDonation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all donations
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        try {
            List<Donation> donations = donationService.getAllDonations();
            if (donations.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(donations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get donation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        try {
            Optional<Donation> donation = donationService.getDonationById(id);
            if (donation.isPresent()) {
                return new ResponseEntity<>(donation.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update donation
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @Valid @RequestBody Donation donation) {
        try {
            Donation updatedDonation = donationService.updateDonation(id, donation);
            if (updatedDonation != null) {
                return new ResponseEntity<>(updatedDonation, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update donation status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Donation> updateDonationStatus(@PathVariable Long id, @RequestBody Donation.PaymentStatus status) {
        try {
            Donation updatedDonation = donationService.updateDonationStatus(id, status);
            if (updatedDonation != null) {
                return new ResponseEntity<>(updatedDonation, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete donation
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDonation(@PathVariable Long id) {
        try {
            boolean deleted = donationService.deleteDonation(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get donations by donor
    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Donation>> getDonationsByDonor(@PathVariable Long donorId) {
        try {
            List<Donation> donations = donationService.getDonationsByDonor(donorId);
            return new ResponseEntity<>(donations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get donations by shelter
    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<Donation>> getDonationsByShelter(@PathVariable Long shelterId) {
        try {
            List<Donation> donations = donationService.getDonationsByShelter(shelterId);
            return new ResponseEntity<>(donations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get successful donations
    @GetMapping("/successful")
    public ResponseEntity<List<Donation>> getSuccessfulDonations() {
        try {
            List<Donation> donations = donationService.getSuccessfulDonations();
            return new ResponseEntity<>(donations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // ANALYTICS - Get total donations by shelter
    @GetMapping("/shelter/{shelterId}/total")
    public ResponseEntity<BigDecimal> getTotalDonationsByShelter(@PathVariable Long shelterId) {
        try {
            BigDecimal total = donationService.getTotalDonationsByShelter(shelterId);
            return new ResponseEntity<>(total, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get recent donations
    @GetMapping("/recent")
    public ResponseEntity<List<Donation>> getRecentDonations(@RequestParam(defaultValue = "30") int days) {
        try {
            List<Donation> donations = donationService.getRecentDonations(days);
            return new ResponseEntity<>(donations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}