package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    
    // Find medical records by pet
    List<MedicalRecord> findByPetId(Long petId);
    
    // Find medical records by veterinarian
    List<MedicalRecord> findByVeterinarianContainingIgnoreCase(String veterinarian);
    
    // Find medical records by record type
    List<MedicalRecord> findByRecordType(String recordType);
    
    // Find medical records within date range
    List<MedicalRecord> findByRecordDateBetween(LocalDate startDate, LocalDate endDate);
    
    // Find medical records by pet ordered by date
    List<MedicalRecord> findByPetIdOrderByRecordDateDesc(Long petId);
    
    // Find recent medical records
    @Query("SELECT m FROM MedicalRecord m WHERE m.recordDate >= :since ORDER BY m.recordDate DESC")
    List<MedicalRecord> findRecentRecords(LocalDate since);
    
    // Find medical records by treatment containing
    List<MedicalRecord> findByTreatmentContainingIgnoreCase(String treatment);
    
    // Find vaccination records
    List<MedicalRecord> findByRecordTypeAndPetId(String recordType, Long petId);
}