package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Payment;
import com.pawhaven.backend.model.PaymentStatus;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Find payments by user
    List<Payment> findByUser(User user);
    
    // Find payments by status
    List<Payment> findByStatus(PaymentStatus status);
    
    // Find payment by transaction ID
    Optional<Payment> findByTranId(String tranId);
    
    // Find payments by user and status
    List<Payment> findByUserAndStatus(User user, PaymentStatus status);
    
    // Find payments by purpose
    List<Payment> findByPurpose(String purpose);
    
    // Find recent payments
    @Query("SELECT p FROM Payment p ORDER BY p.date DESC")
    List<Payment> findRecentPayments();
    
    // Calculate total amount by status
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = :status")
    Double getTotalAmountByStatus(@Param("status") PaymentStatus status);
    
    // Find payments by user ordered by date
    @Query("SELECT p FROM Payment p WHERE p.user = :user ORDER BY p.date DESC")
    List<Payment> findByUserOrderByDateDesc(@Param("user") User user);
}
