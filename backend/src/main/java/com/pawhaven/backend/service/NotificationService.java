package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Notification;
import com.pawhaven.backend.model.User;
import com.pawhaven.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    // Create or update notification
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
    
    // Get notification by ID
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }
    
    // Get all notifications
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
    
    // Get notifications by user
    public List<Notification> getNotificationsByUser(User user) {
        return notificationRepository.findByUser(user);
    }
    
    // Get unread notifications by user
    public List<Notification> getUnreadNotificationsByUser(User user) {
        return notificationRepository.findByUserAndIsReadFalse(user);
    }
    
    // Get notifications by user ordered by date
    public List<Notification> getNotificationsByUserOrderedByDate(User user) {
        return notificationRepository.findByUserOrderByDateDesc(user);
    }
    
    // Get notifications by type
    public List<Notification> getNotificationsByType(String type) {
        return notificationRepository.findByType(type);
    }
    
    // Get unread notifications by user and type
    public List<Notification> getUnreadNotificationsByUserAndType(User user, String type) {
        return notificationRepository.findByUserAndTypeAndIsReadFalse(user, type);
    }
    
    // Count unread notifications by user
    public long countUnreadNotificationsByUser(User user) {
        return notificationRepository.countUnreadByUser(user);
    }
    
    // Get recent unread notifications by user
    public List<Notification> getRecentUnreadNotificationsByUser(User user) {
        return notificationRepository.findRecentUnreadByUser(user);
    }
    
    // Mark notification as read
    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + id));
        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }
    
    // Mark notification as unread
    public Notification markAsUnread(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + id));
        notification.setIsRead(false);
        return notificationRepository.save(notification);
    }
    
    // Mark all notifications as read for user
    public void markAllAsReadForUser(User user) {
        List<Notification> notifications = notificationRepository.findByUserAndIsReadFalse(user);
        notifications.forEach(notification -> notification.setIsRead(true));
        notificationRepository.saveAll(notifications);
    }
    
    // Delete notification
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
    
    // Delete all notifications for user
    public void deleteAllForUser(User user) {
        List<Notification> notifications = notificationRepository.findByUser(user);
        notificationRepository.deleteAll(notifications);
    }
}
