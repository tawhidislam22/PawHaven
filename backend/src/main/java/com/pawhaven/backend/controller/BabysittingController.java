package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.Babysitting;
import com.pawhaven.backend.model.BabysittingStatus;
import com.pawhaven.backend.service.BabysittingService;
import com.pawhaven.backend.service.PetService;
import com.pawhaven.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/babysitting")
@CrossOrigin(origins = "http://localhost:5173")
public class BabysittingController {
    
    @Autowired
    private BabysittingService babysittingService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PetService petService;
    
    // Get all babysitting
    @GetMapping
    public ResponseEntity<List<Babysitting>> getAllBabysitting() {
        return ResponseEntity.ok(babysittingService.getAllBabysitting());
    }
    
    // Get upcoming services
    @GetMapping("/upcoming")
    public ResponseEntity<List<Babysitting>> getUpcomingServices() {
        return ResponseEntity.ok(babysittingService.getUpcomingServices());
    }
    
    // Get recent bookings
    @GetMapping("/recent")
    public ResponseEntity<List<Babysitting>> getRecentBookings() {
        return ResponseEntity.ok(babysittingService.getRecentBookings());
    }
    
    // Get babysitting by ID
    @GetMapping("/{id}")
    public ResponseEntity<Babysitting> getBabysittingById(@PathVariable Long id) {
        return babysittingService.getBabysittingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get babysitting by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Babysitting>> getBabysittingByUser(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(babysittingService.getBabysittingByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get babysitting by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<Babysitting>> getBabysittingByPet(@PathVariable Long petId) {
        return petService.getPetById(petId)
                .map(pet -> ResponseEntity.ok(babysittingService.getBabysittingByPet(pet)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get babysitting by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Babysitting>> getBabysittingByStatus(@PathVariable BabysittingStatus status) {
        return ResponseEntity.ok(babysittingService.getBabysittingByStatus(status));
    }
    
    // Get babysitting by user and status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Babysitting>> getBabysittingByUserAndStatus(
            @PathVariable Long userId,
            @PathVariable BabysittingStatus status) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(babysittingService.getBabysittingByUserAndStatus(user, status)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Get babysitting by service date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Babysitting>> getBabysittingByServiceDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(babysittingService.getBabysittingByServiceDate(date));
    }
    
    // Get babysitting by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Babysitting>> getBabysittingByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(babysittingService.getBabysittingByDateRange(startDate, endDate));
    }
    
    // Count babysitting by status
    @GetMapping("/count/status/{status}")
    public ResponseEntity<Long> countBabysittingByStatus(@PathVariable BabysittingStatus status) {
        return ResponseEntity.ok(babysittingService.countBabysittingByStatus(status));
    }
    
    // Create babysitting
    @PostMapping
    public ResponseEntity<Babysitting> createBabysitting(@RequestBody Babysitting babysitting) {
        Babysitting savedBabysitting = babysittingService.saveBabysitting(babysitting);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBabysitting);
    }
    
    // Update babysitting
    @PutMapping("/{id}")
    public ResponseEntity<Babysitting> updateBabysitting(@PathVariable Long id, @RequestBody Babysitting babysitting) {
        try {
            Babysitting updatedBabysitting = babysittingService.updateBabysitting(id, babysitting);
            return ResponseEntity.ok(updatedBabysitting);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update babysitting status
    @PutMapping("/{id}/status")
    public ResponseEntity<Babysitting> updateBabysittingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            BabysittingStatus status = BabysittingStatus.valueOf(statusUpdate.get("status"));
            Babysitting updatedBabysitting = babysittingService.updateBabysittingStatus(id, status);
            return ResponseEntity.ok(updatedBabysitting);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Start service
    @PutMapping("/{id}/start")
    public ResponseEntity<Babysitting> startService(@PathVariable Long id) {
        try {
            Babysitting babysitting = babysittingService.startService(id);
            return ResponseEntity.ok(babysitting);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Complete service
    @PutMapping("/{id}/complete")
    public ResponseEntity<Babysitting> completeService(@PathVariable Long id, @RequestBody Map<String, String> notes) {
        try {
            String caretakerNotes = notes.get("caretakerNotes");
            Babysitting babysitting = babysittingService.completeService(id, caretakerNotes);
            return ResponseEntity.ok(babysitting);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Cancel service
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Babysitting> cancelService(@PathVariable Long id) {
        try {
            Babysitting babysitting = babysittingService.cancelService(id);
            return ResponseEntity.ok(babysitting);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Delete babysitting
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBabysitting(@PathVariable Long id) {
        babysittingService.deleteBabysitting(id);
        return ResponseEntity.noContent().build();
    }
}
