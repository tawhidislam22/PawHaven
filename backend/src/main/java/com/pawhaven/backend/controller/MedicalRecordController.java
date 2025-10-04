package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.MedicalRecord;
import com.pawhaven.backend.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {
    
    @Autowired
    private MedicalRecordService medicalRecordService;
    
    // CREATE - Add new medical record
    @PostMapping
    public ResponseEntity<MedicalRecord> createMedicalRecord(@Valid @RequestBody MedicalRecord medicalRecord) {
        try {
            MedicalRecord savedRecord = medicalRecordService.saveMedicalRecord(medicalRecord);
            return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get all medical records
    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {
        try {
            List<MedicalRecord> records = medicalRecordService.getAllMedicalRecords();
            if (records.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // READ - Get medical record by ID
    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(@PathVariable Long id) {
        try {
            Optional<MedicalRecord> record = medicalRecordService.getMedicalRecordById(id);
            if (record.isPresent()) {
                return new ResponseEntity<>(record.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // UPDATE - Update medical record
    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(@PathVariable Long id, @Valid @RequestBody MedicalRecord medicalRecord) {
        try {
            MedicalRecord updatedRecord = medicalRecordService.updateMedicalRecord(id, medicalRecord);
            if (updatedRecord != null) {
                return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE - Delete medical record
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMedicalRecord(@PathVariable Long id) {
        try {
            boolean deleted = medicalRecordService.deleteMedicalRecord(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get medical records by pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecordsByPet(@PathVariable Long petId) {
        try {
            List<MedicalRecord> records = medicalRecordService.getMedicalRecordsByPet(petId);
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get medical records by veterinarian
    @GetMapping("/veterinarian")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecordsByVeterinarian(@RequestParam String veterinarian) {
        try {
            List<MedicalRecord> records = medicalRecordService.getMedicalRecordsByVeterinarian(veterinarian);
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get medical records by type
    @GetMapping("/type/{recordType}")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecordsByType(@PathVariable String recordType) {
        try {
            List<MedicalRecord> records = medicalRecordService.getMedicalRecordsByType(recordType);
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get vaccination records for pet
    @GetMapping("/pet/{petId}/vaccinations")
    public ResponseEntity<List<MedicalRecord>> getVaccinationRecords(@PathVariable Long petId) {
        try {
            List<MedicalRecord> records = medicalRecordService.getVaccinationRecords(petId);
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // SEARCH - Get recent medical records
    @GetMapping("/recent")
    public ResponseEntity<List<MedicalRecord>> getRecentMedicalRecords(@RequestParam(defaultValue = "30") int days) {
        try {
            List<MedicalRecord> records = medicalRecordService.getRecentMedicalRecords(days);
            return new ResponseEntity<>(records, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}