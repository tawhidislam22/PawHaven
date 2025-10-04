package com.pawhaven.backend.service;

import com.pawhaven.backend.model.Event;
import com.pawhaven.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    // Create or update event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }
    
    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    // Get event by ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    
    // Update event
    public Event updateEvent(Long id, Event eventDetails) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setTitle(eventDetails.getTitle());
            event.setDescription(eventDetails.getDescription());
            event.setEventType(eventDetails.getEventType());
            event.setStartDateTime(eventDetails.getStartDateTime());
            event.setLocation(eventDetails.getLocation());
            event.setMaxAttendees(eventDetails.getMaxAttendees());
            event.setRegistrationRequired(eventDetails.getRegistrationRequired());
            event.setContactEmail(eventDetails.getContactEmail());
            event.setContactPhone(eventDetails.getContactPhone());
            return eventRepository.save(event);
        }
        return null;
    }
    
    // Delete event
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get events by shelter
    public List<Event> getEventsByShelter(Long shelterId) {
        return eventRepository.findByShelterIdAndEventDateTimeAfterOrderByEventDateTimeAsc(shelterId, LocalDateTime.now());
    }
    
    // Get upcoming events
    public List<Event> getUpcomingEvents() {
        return eventRepository.findByEventDateTimeAfterOrderByEventDateTimeAsc(LocalDateTime.now());
    }
    
    // Get past events
    public List<Event> getPastEvents() {
        return eventRepository.findByEventDateTimeBeforeOrderByEventDateTimeDesc(LocalDateTime.now());
    }
    
    // Get events by type
    public List<Event> getEventsByType(String eventType) {
        return eventRepository.findByEventType(eventType);
    }
    
    // Search events by title
    public List<Event> searchEventsByTitle(String title) {
        return eventRepository.findByTitleContainingIgnoreCase(title);
    }
    
    // Search events by location
    public List<Event> searchEventsByLocation(String location) {
        return eventRepository.findByLocationContainingIgnoreCase(location);
    }
    
    // Get events this week
    public List<Event> getEventsThisWeek() {
        LocalDateTime startOfWeek = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfWeek = startOfWeek.plusDays(7);
        return eventRepository.findEventsThisWeek(startOfWeek, endOfWeek);
    }
    
    // Get events within date range
    public List<Event> getEventsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return eventRepository.findByEventDateTimeBetween(startDate, endDate);
    }
}