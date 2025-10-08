package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Feedback;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    // Find feedbacks by user
    List<Feedback> findByUser(User user);
    
    // Find visible feedbacks
    List<Feedback> findByIsVisibleTrue();
    
    // Find feedbacks by rating
    List<Feedback> findByRating(Integer rating);
    
    // Find visible feedbacks ordered by date
    @Query("SELECT f FROM Feedback f WHERE f.isVisible = true ORDER BY f.date DESC")
    List<Feedback> findVisibleFeedbacksOrderedByDate();
    
    // Custom query to calculate average rating
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.isVisible = true")
    Double getAverageRating();
    
    // Custom query to count feedbacks by rating
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.rating = :rating AND f.isVisible = true")
    long countByRating(@Param("rating") Integer rating);
    
    // Find recent feedbacks
    @Query("SELECT f FROM Feedback f ORDER BY f.date DESC")
    List<Feedback> findRecentFeedbacks();
}
