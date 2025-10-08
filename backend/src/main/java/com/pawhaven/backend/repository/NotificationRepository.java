package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Notification;
import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    // Find notifications by user
    List<Notification> findByUser(User user);
    
    // Find unread notifications by user
    List<Notification> findByUserAndIsReadFalse(User user);
    
    // Find notifications by user ordered by date
    @Query("SELECT n FROM Notification n WHERE n.user = :user ORDER BY n.date DESC")
    List<Notification> findByUserOrderByDateDesc(@Param("user") User user);
    
    // Find notifications by type
    List<Notification> findByType(String type);
    
    // Find unread notifications by user and type
    List<Notification> findByUserAndTypeAndIsReadFalse(User user, String type);
    
    // Count unread notifications by user
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user = :user AND n.isRead = false")
    long countUnreadByUser(@Param("user") User user);
    
    // Find recent unread notifications
    @Query("SELECT n FROM Notification n WHERE n.user = :user AND n.isRead = false ORDER BY n.date DESC")
    List<Notification> findRecentUnreadByUser(@Param("user") User user);
}
