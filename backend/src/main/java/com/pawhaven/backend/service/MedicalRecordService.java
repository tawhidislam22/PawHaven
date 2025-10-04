package com.pawhaven.backend.service;

import com.pawhaven.backend.model.MedicalRecord;
import com.pawhaven.backend.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {
    
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;
    
    // Create or update medical record
    public MedicalRecord saveMedicalRecord(MedicalRecord medicalRecord) {
        if (medicalRecord.getRecordDate() == null) {
            medicalRecord.setRecordDate(LocalDate.now());
        }
        return medicalRecordRepository.save(medicalRecord);
    }
    
    // Get all medical records
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }
    
    // Get medical record by ID
    public Optional<MedicalRecord> getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id);
    }
    
    // Update medical record
    public MedicalRecord updateMedicalRecord(Long id, MedicalRecord recordDetails) {
        Optional<MedicalRecord> optionalRecord = medicalRecordRepository.findById(id);
        if (optionalRecord.isPresent()) {
            MedicalRecord record = optionalRecord.get();
            record.setRecordType(recordDetails.getRecordType());
            record.setDescription(recordDetails.getDescription());
            record.setVeterinarianName(recordDetails.getVeterinarianName());
            record.setMedicationPrescribed(recordDetails.getMedicationPrescribed());
            record.setNotes(recordDetails.getNotes());
            record.setFollowUpDate(recordDetails.getFollowUpDate());
            record.setTreatmentStatus(recordDetails.getTreatmentStatus());
            return medicalRecordRepository.save(record);
        }
        return null;
    }
    
    // Delete medical record
    public boolean deleteMedicalRecord(Long id) {
        if (medicalRecordRepository.existsById(id)) {
            medicalRecordRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get medical records by pet
    public List<MedicalRecord> getMedicalRecordsByPet(Long petId) {
        return medicalRecordRepository.findByPetIdOrderByRecordDateDesc(petId);
    }
    
    // Get medical records by veterinarian
    public List<MedicalRecord> getMedicalRecordsByVeterinarian(String veterinarian) {
        return medicalRecordRepository.findByVeterinarianContainingIgnoreCase(veterinarian);
    }
    
    // Get medical records by type
    public List<MedicalRecord> getMedicalRecordsByType(String recordType) {
        return medicalRecordRepository.findByRecordType(recordType);
    }
    
    // Get recent medical records
    public List<MedicalRecord> getRecentMedicalRecords(int days) {
        LocalDate since = LocalDate.now().minusDays(days);
        return medicalRecordRepository.findRecentRecords(since);
    }
    
    // Get vaccination records for a pet
    public List<MedicalRecord> getVaccinationRecords(Long petId) {
        return medicalRecordRepository.findByRecordTypeAndPetId("VACCINATION", petId);
    }
    
    // Search medical records by treatment
    public List<MedicalRecord> searchMedicalRecordsByTreatment(String treatment) {
        return medicalRecordRepository.findByTreatmentContainingIgnoreCase(treatment);
    }
}