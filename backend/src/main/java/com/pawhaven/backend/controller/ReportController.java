package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Report;
import com.pawhaven.backend.model.ReportStatus;
import com.pawhaven.backend.service.ReportService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {
    
    @Autowired
    private ReportService reportService;
    
    @Autowired
    private UserService userService;
    
    // Get all reports
    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
    
    // Get recent reports
    @GetMapping("/recent")
    public ResponseEntity<List<Report>> getRecentReports() {
        return ResponseEntity.ok(reportService.getRecentReports());
    }
    
    // Get pending reports
    @GetMapping("/pending")
    public ResponseEntity<List<Report>> getPendingReports() {
        return ResponseEntity.ok(reportService.getPendingReports());
    }
    
    // Get report by ID
    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        return reportService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get reports by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Report>> getReportsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(reportService.getReportsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get reports by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Report>> getReportsByStatus(@PathVariable ReportStatus status) {
        return ResponseEntity.ok(reportService.getReportsByStatus(status));
    }
    
    // Get reports by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Report>> getReportsByType(@PathVariable String type) {
        return ResponseEntity.ok(reportService.getReportsByType(type));
    }
    
    // Get reports by type and status
    @GetMapping("/type/{type}/status/{status}")
    public ResponseEntity<List<Report>> getReportsByTypeAndStatus(
            @PathVariable String type,
            @PathVariable ReportStatus status) {
        return ResponseEntity.ok(reportService.getReportsByTypeAndStatus(type, status));
    }
    
    // Count reports by status
    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countReportsByStatus(@PathVariable ReportStatus status) {
        return ResponseEntity.ok(reportService.countReportsByStatus(status));
    }
    
    // Create report
    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        Report savedReport = reportService.saveReport(report);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReport);
    }
    
    // Update report
    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable Long id, @RequestBody Report report) {
        try {
            Report updatedReport = reportService.updateReport(id, report);
            return ResponseEntity.ok(updatedReport);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update report status
    @PutMapping("/{id}/status")
    public ResponseEntity<Report> updateReportStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        try {
            ReportStatus status = ReportStatus.valueOf(statusUpdate.get("status"));
            Report updatedReport = reportService.updateReportStatus(id, status);
            return ResponseEntity.ok(updatedReport);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete report
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
