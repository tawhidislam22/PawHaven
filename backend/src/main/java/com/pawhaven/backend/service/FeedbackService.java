package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Feedback;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    // Create or update feedback
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
    
    // Get feedback by ID
    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }
    
    // Get all feedback
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
    
    // Get visible feedback
    public List<Feedback> getVisibleFeedback() {
        return feedbackRepository.findByIsVisibleTrue();
    }
    
    // Get feedback by user
    public List<Feedback> getFeedbackByUser(User user) {
        return feedbackRepository.findByUser(user);
    }
    
    // Get feedback by rating
    public List<Feedback> getFeedbackByRating(Integer rating) {
        return feedbackRepository.findByRating(rating);
    }
    
    // Get visible feedback ordered by date
    public List<Feedback> getVisibleFeedbackOrderedByDate() {
        return feedbackRepository.findVisibleFeedbacksOrderedByDate();
    }
    
    // Get recent feedback
    public List<Feedback> getRecentFeedback() {
        return feedbackRepository.findRecentFeedbacks();
    }
    
    // Get average rating
    public Double getAverageRating() {
        Double avg = feedbackRepository.getAverageRating();
        return avg != null ? avg : 0.0;
    }
    
    // Count feedback by rating
    public long countFeedbackByRating(Integer rating) {
        return feedbackRepository.countByRating(rating);
    }
    
    // Update feedback
    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        
        feedback.setRating(feedbackDetails.getRating());
        feedback.setComments(feedbackDetails.getComments());
        feedback.setIsVisible(feedbackDetails.getIsVisible());
        
        return feedbackRepository.save(feedback);
    }
    
    // Toggle visibility
    public Feedback toggleVisibility(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        feedback.setIsVisible(!feedback.getIsVisible());
        return feedbackRepository.save(feedback);
    }
    
    // Delete feedback
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
