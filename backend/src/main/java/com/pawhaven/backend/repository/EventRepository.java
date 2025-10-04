package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    // Find events by shelter
    List<Event> findByShelterId(Long shelterId);
    
    // Find events by event type
    List<Event> findByEventType(String eventType);
    
    // Find events within date range
    List<Event> findByEventDateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find upcoming events
    List<Event> findByEventDateTimeAfterOrderByEventDateTimeAsc(LocalDateTime currentDateTime);
    
    // Find past events
    List<Event> findByEventDateTimeBeforeOrderByEventDateTimeDesc(LocalDateTime currentDateTime);
    
    // Find events by title containing
    List<Event> findByTitleContainingIgnoreCase(String title);
    
    // Find events by location containing
    List<Event> findByLocationContainingIgnoreCase(String location);
    
    // Find events by shelter and upcoming
    List<Event> findByShelterIdAndEventDateTimeAfterOrderByEventDateTimeAsc(Long shelterId, LocalDateTime currentDateTime);
    
    // Custom query to find events this week
    @Query("SELECT e FROM Event e WHERE e.eventDateTime BETWEEN :startOfWeek AND :endOfWeek ORDER BY e.eventDateTime ASC")
    List<Event> findEventsThisWeek(LocalDateTime startOfWeek, LocalDateTime endOfWeek);
}