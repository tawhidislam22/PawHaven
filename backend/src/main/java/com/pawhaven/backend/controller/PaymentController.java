package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Payment;
import com.pawhaven.backend.model.PaymentStatus;
import com.pawhaven.backend.service.PaymentService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private UserService userService;
    
    // Get all payments
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
    
    // Get recent payments
    @GetMapping("/recent")
    public ResponseEntity<List<Payment>> getRecentPayments() {
        return ResponseEntity.ok(paymentService.getRecentPayments());
    }
    
    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get payment by transaction ID
    @GetMapping("/transaction/{tranId}")
    public ResponseEntity<Payment> getPaymentByTranId(@PathVariable String tranId) {
        return paymentService.getPaymentByTranId(tranId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get payments by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getPaymentsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(paymentService.getPaymentsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get payments by user ordered by date
    @GetMapping("/user/{userId}/ordered")
    public ResponseEntity<List<Payment>> getPaymentsByUserOrderedByDate(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(paymentService.getPaymentsByUserOrderedByDate(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get payments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
    }
    
    // Get payments by user and status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Payment>> getPaymentsByUserAndStatus(
            @PathVariable Long userId,
            @PathVariable PaymentStatus status) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(paymentService.getPaymentsByUserAndStatus(user, status)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get payments by purpose
    @GetMapping("/purpose/{purpose}")
    public ResponseEntity<List<Payment>> getPaymentsByPurpose(@PathVariable String purpose) {
        return ResponseEntity.ok(paymentService.getPaymentsByPurpose(purpose));
    }
    
    // Get total amount by status
    @GetMapping("/total/status/{status}")
    public ResponseEntity<Double> getTotalAmountByStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(paymentService.getTotalAmountByStatus(status));
    }
    
    // Create payment
    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> paymentData) {
        try {
            System.out.println("Received payment data: " + paymentData);

            // Extract user ID
            final Long userId;
            Object userObj = paymentData.get("user");
            if (userObj instanceof Map) {
                Object userIdObj = ((Map<?, ?>) userObj).get("id");
                userId = userIdObj instanceof Number ? ((Number) userIdObj).longValue() : null;
            } else if (userObj instanceof Number) {
                userId = ((Number) userObj).longValue();
            } else {
                userId = null;
            }

            if (userId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User ID is required"));
            }

            // Fetch full User entity
            var user = userService.getUserById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

            System.out.println("Found user: " + user.getName());

            // Create new payment
            Payment payment = new Payment();
            payment.setUser(user);
            
            // Handle amount - could be Integer or Double from JSON
            Object amountObj = paymentData.get("amount");
            Double amount = amountObj instanceof Number ? ((Number) amountObj).doubleValue() : null;
            payment.setAmount(amount);
            
            payment.setPurpose((String) paymentData.get("purpose"));
            payment.setTranId((String) paymentData.get("tranId"));
            payment.setPaymentMethod((String) paymentData.get("paymentMethod"));
            payment.setCurrency((String) paymentData.get("currency"));
            payment.setNotes((String) paymentData.get("notes"));

            // Set status
            String statusStr = (String) paymentData.get("status");
            PaymentStatus status = statusStr != null ? PaymentStatus.valueOf(statusStr) : PaymentStatus.PENDING;
            payment.setStatus(status);

            System.out.println("Saving payment...");
            Payment savedPayment = paymentService.savePayment(payment);
            System.out.println("Payment saved successfully with ID: " + savedPayment.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
        } catch (Exception e) {
            System.err.println("Error creating payment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Process payment
    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        Payment processedPayment = paymentService.processPayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(processedPayment);
    }
    
    // Update payment
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        try {
            Payment updatedPayment = paymentService.updatePayment(id, payment);
            return ResponseEntity.ok(updatedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update payment status
    @PutMapping("/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        try {
            PaymentStatus status = PaymentStatus.valueOf(statusUpdate.get("status"));
            Payment updatedPayment = paymentService.updatePaymentStatus(id, status);
            return ResponseEntity.ok(updatedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Complete payment
    @PutMapping("/transaction/{tranId}/complete")
    public ResponseEntity<Payment> completePayment(@PathVariable String tranId) {
        try {
            Payment payment = paymentService.completePayment(tranId);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Fail payment
    @PutMapping("/transaction/{tranId}/fail")
    public ResponseEntity<Payment> failPayment(@PathVariable String tranId) {
        try {
            Payment payment = paymentService.failPayment(tranId);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Refund payment
    @PutMapping("/transaction/{tranId}/refund")
    public ResponseEntity<Payment> refundPayment(@PathVariable String tranId) {
        try {
            Payment payment = paymentService.refundPayment(tranId);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Delete payment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
