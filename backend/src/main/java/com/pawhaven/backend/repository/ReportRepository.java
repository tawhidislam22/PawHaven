package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Report;
import com.pawhaven.backend.model.ReportStatus;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    
    // Find reports by user
    List<Report> findByUser(User user);
    
    // Find reports by status
    List<Report> findByStatus(ReportStatus status);
    
    // Find reports by type
    List<Report> findByType(String type);
    
    // Find reports by type and status
    List<Report> findByTypeAndStatus(String type, ReportStatus status);
    
    // Find recent reports
    @Query("SELECT r FROM Report r ORDER BY r.createdAt DESC")
    List<Report> findRecentReports();
    
    // Count reports by status
    @Query("SELECT COUNT(r) FROM Report r WHERE r.status = :status")
    long countByStatus(@Param("status") ReportStatus status);
    
    // Find pending reports
    @Query("SELECT r FROM Report r WHERE r.status = 'PENDING' ORDER BY r.createdAt DESC")
    List<Report> findPendingReports();
}
