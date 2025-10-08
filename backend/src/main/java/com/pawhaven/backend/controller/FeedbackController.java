package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Feedback;
import com.pawhaven.backend.service.FeedbackService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;
    
    @Autowired
    private UserService userService;
    
    // Get all feedback
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
    
    // Get visible feedback
    @GetMapping("/visible")
    public ResponseEntity<List<Feedback>> getVisibleFeedback() {
        return ResponseEntity.ok(feedbackService.getVisibleFeedback());
    }
    
    // Get visible feedback ordered by date
    @GetMapping("/visible/ordered")
    public ResponseEntity<List<Feedback>> getVisibleFeedbackOrderedByDate() {
        return ResponseEntity.ok(feedbackService.getVisibleFeedbackOrderedByDate());
    }
    
    // Get recent feedback
    @GetMapping("/recent")
    public ResponseEntity<List<Feedback>> getRecentFeedback() {
        return ResponseEntity.ok(feedbackService.getRecentFeedback());
    }
    
    // Get feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get feedback by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbackByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(feedbackService.getFeedbackByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get feedback by rating
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<Feedback>> getFeedbackByRating(@PathVariable Integer rating) {
        return ResponseEntity.ok(feedbackService.getFeedbackByRating(rating));
    }
    
    // Get average rating
    @GetMapping("/average-rating")
    public ResponseEntity<Double> getAverageRating() {
        return ResponseEntity.ok(feedbackService.getAverageRating());
    }
    
    // Count feedback by rating
    @GetMapping("/count/rating/{rating}")
    public ResponseEntity<Long> countFeedbackByRating(@PathVariable Integer rating) {
        return ResponseEntity.ok(feedbackService.countFeedbackByRating(rating));
    }
    
    // Create feedback
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeedback);
    }
    
    // Update feedback
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        try {
            Feedback updatedFeedback = feedbackService.updateFeedback(id, feedback);
            return ResponseEntity.ok(updatedFeedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Toggle visibility
    @PutMapping("/{id}/toggle-visibility")
    public ResponseEntity<Feedback> toggleVisibility(@PathVariable Long id) {
        try {
            Feedback feedback = feedbackService.toggleVisibility(id);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
