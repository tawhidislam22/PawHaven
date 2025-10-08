package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Babysitting;
import com.pawhaven.backend.model.BabysittingStatus;
import com.pawhaven.backend.model.Pet;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BabysittingRepository extends JpaRepository<Babysitting, Long> {
    
    // Find babysitting by user
    List<Babysitting> findByUser(User user);
    
    // Find babysitting by pet
    List<Babysitting> findByPet(Pet pet);
    
    // Find babysitting by status
    List<Babysitting> findByStatus(BabysittingStatus status);
    
    // Find babysitting by user and status
    List<Babysitting> findByUserAndStatus(User user, BabysittingStatus status);
    
    // Find babysitting by service date
    List<Babysitting> findByServiceDate(LocalDate serviceDate);
    
    // Find upcoming babysitting services
    @Query("SELECT b FROM Babysitting b WHERE b.serviceDate >= :date AND b.status = 'SCHEDULED' ORDER BY b.serviceDate ASC")
    List<Babysitting> findUpcomingServices(@Param("date") LocalDate date);
    
    // Find babysitting by date range
    @Query("SELECT b FROM Babysitting b WHERE b.serviceDate BETWEEN :startDate AND :endDate")
    List<Babysitting> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // Count babysitting by status
    @Query("SELECT COUNT(b) FROM Babysitting b WHERE b.status = :status")
    long countByStatus(@Param("status") BabysittingStatus status);
    
    // Find recent babysitting bookings
    @Query("SELECT b FROM Babysitting b ORDER BY b.createdAt DESC")
    List<Babysitting> findRecentBookings();
}
