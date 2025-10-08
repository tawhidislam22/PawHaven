package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Notification;
import com.pawhaven.backend.service.NotificationService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserService userService;
    
    // Get all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
    
    // Get notification by ID
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get notifications by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.getNotificationsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get unread notifications by user
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotificationsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.getUnreadNotificationsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get notifications by user ordered by date
    @GetMapping("/user/{userId}/ordered")
    public ResponseEntity<List<Notification>> getNotificationsByUserOrderedByDate(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.getNotificationsByUserOrderedByDate(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get recent unread notifications by user
    @GetMapping("/user/{userId}/recent-unread")
    public ResponseEntity<List<Notification>> getRecentUnreadNotificationsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.getRecentUnreadNotificationsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get notifications by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Notification>> getNotificationsByType(@PathVariable String type) {
        return ResponseEntity.ok(notificationService.getNotificationsByType(type));
    }
    
    // Get unread notifications by user and type
    @GetMapping("/user/{userId}/type/{type}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotificationsByUserAndType(
            @PathVariable Long userId,
            @PathVariable String type) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.getUnreadNotificationsByUserAndType(user, type)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Count unread notifications by user
    @GetMapping("/user/{userId}/unread/count")
    public ResponseEntity<Long> countUnreadNotificationsByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(notificationService.countUnreadNotificationsByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Create notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = notificationService.saveNotification(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedNotification);
    }
    
    // Mark notification as read
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        try {
            Notification notification = notificationService.markAsRead(id);
            return ResponseEntity.ok(notification);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Mark notification as unread
    @PutMapping("/{id}/unread")
    public ResponseEntity<Notification> markAsUnread(@PathVariable Long id) {
        try {
            Notification notification = notificationService.markAsUnread(id);
            return ResponseEntity.ok(notification);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Mark all notifications as read for user
    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<Void> markAllAsReadForUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> {
                    notificationService.markAllAsReadForUser(user);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete notification
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
    
    // Delete all notifications for user
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteAllForUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> {
                    notificationService.deleteAllForUser(user);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
