package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Report;
import com.pawhaven.backend.model.ReportStatus;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReportService {
    
    @Autowired
    private ReportRepository reportRepository;
    
    // Create or update report
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }
    
    // Get report by ID
    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }
    
    // Get all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
    
    // Get reports by user
    public List<Report> getReportsByUser(User user) {
        return reportRepository.findByUser(user);
    }
    
    // Get reports by status
    public List<Report> getReportsByStatus(ReportStatus status) {
        return reportRepository.findByStatus(status);
    }
    
    // Get reports by type
    public List<Report> getReportsByType(String type) {
        return reportRepository.findByType(type);
    }
    
    // Get reports by type and status
    public List<Report> getReportsByTypeAndStatus(String type, ReportStatus status) {
        return reportRepository.findByTypeAndStatus(type, status);
    }
    
    // Get recent reports
    public List<Report> getRecentReports() {
        return reportRepository.findRecentReports();
    }
    
    // Get pending reports
    public List<Report> getPendingReports() {
        return reportRepository.findPendingReports();
    }
    
    // Count reports by status
    public long countReportsByStatus(ReportStatus status) {
        return reportRepository.countByStatus(status);
    }
    
    // Update report
    public Report updateReport(Long id, Report reportDetails) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
        
        report.setType(reportDetails.getType());
        report.setLocation(reportDetails.getLocation());
        report.setDescription(reportDetails.getDescription());
        report.setContactInfo(reportDetails.getContactInfo());
        report.setImage(reportDetails.getImage());
        
        return reportRepository.save(report);
    }
    
    // Update report status
    public Report updateReportStatus(Long id, ReportStatus status) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
        
        report.setStatus(status);
        
        // If resolved or closed, set resolved date
        if (status == ReportStatus.RESOLVED || status == ReportStatus.CLOSED) {
            report.setResolvedAt(LocalDateTime.now());
        }
        
        return reportRepository.save(report);
    }
    
    // Delete report
    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
}
