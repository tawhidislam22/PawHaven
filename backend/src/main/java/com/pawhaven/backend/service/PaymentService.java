package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Payment;
import com.pawhaven.backend.model.PaymentStatus;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    // Create or update payment
    public Payment savePayment(Payment payment) {
        // Generate unique transaction ID if not set
        if (payment.getTranId() == null || payment.getTranId().isEmpty()) {
            payment.setTranId(generateTransactionId());
        }
        return paymentRepository.save(payment);
    }
    
    // Get payment by ID
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
    
    // Get payment by transaction ID
    public Optional<Payment> getPaymentByTranId(String tranId) {
        return paymentRepository.findByTranId(tranId);
    }
    
    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    // Get payments by user
    public List<Payment> getPaymentsByUser(User user) {
        return paymentRepository.findByUser(user);
    }
    
    // Get payments by user ordered by date
    public List<Payment> getPaymentsByUserOrderedByDate(User user) {
        return paymentRepository.findByUserOrderByDateDesc(user);
    }
    
    // Get payments by status
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }
    
    // Get payments by user and status
    public List<Payment> getPaymentsByUserAndStatus(User user, PaymentStatus status) {
        return paymentRepository.findByUserAndStatus(user, status);
    }
    
    // Get payments by purpose
    public List<Payment> getPaymentsByPurpose(String purpose) {
        return paymentRepository.findByPurpose(purpose);
    }
    
    // Get recent payments
    public List<Payment> getRecentPayments() {
        return paymentRepository.findRecentPayments();
    }
    
    // Get total amount by status
    public Double getTotalAmountByStatus(PaymentStatus status) {
        Double total = paymentRepository.getTotalAmountByStatus(status);
        return total != null ? total : 0.0;
    }
    
    // Update payment
    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        
        payment.setAmount(paymentDetails.getAmount());
        payment.setPurpose(paymentDetails.getPurpose());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setCurrency(paymentDetails.getCurrency());
        payment.setNotes(paymentDetails.getNotes());
        
        return paymentRepository.save(payment);
    }
    
    // Update payment status
    public Payment updatePaymentStatus(Long id, PaymentStatus status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    
    // Process payment
    public Payment processPayment(Payment payment) {
        // Set initial status as PENDING
        payment.setStatus(PaymentStatus.PENDING);
        
        // Generate transaction ID
        payment.setTranId(generateTransactionId());
        
        // Save payment
        Payment savedPayment = paymentRepository.save(payment);
        
        // Here you would integrate with actual payment gateway
        // For now, we'll just mark it as completed
        // In real scenario, this would be async and updated via webhook
        
        return savedPayment;
    }
    
    // Complete payment
    public Payment completePayment(String tranId) {
        Payment payment = paymentRepository.findByTranId(tranId)
                .orElseThrow(() -> new RuntimeException("Payment not found with transaction ID: " + tranId));
        payment.setStatus(PaymentStatus.COMPLETED);
        return paymentRepository.save(payment);
    }
    
    // Fail payment
    public Payment failPayment(String tranId) {
        Payment payment = paymentRepository.findByTranId(tranId)
                .orElseThrow(() -> new RuntimeException("Payment not found with transaction ID: " + tranId));
        payment.setStatus(PaymentStatus.FAILED);
        return paymentRepository.save(payment);
    }
    
    // Refund payment
    public Payment refundPayment(String tranId) {
        Payment payment = paymentRepository.findByTranId(tranId)
                .orElseThrow(() -> new RuntimeException("Payment not found with transaction ID: " + tranId));
        
        if (payment.getStatus() != PaymentStatus.COMPLETED) {
            throw new RuntimeException("Only completed payments can be refunded");
        }
        
        payment.setStatus(PaymentStatus.REFUNDED);
        return paymentRepository.save(payment);
    }
    
    // Delete payment
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
    
    // Generate unique transaction ID
    private String generateTransactionId() {
        return "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
