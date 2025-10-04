package com.pawhaven.backend.repository;

import com.pawhaven.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by name
    Optional<User> findByName(String name);
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find user by name or email
    Optional<User> findByNameOrEmail(String name, String email);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Find users by role
    List<User> findByRole(User.Role role);
    
    // Find users by name (case insensitive search)
    List<User> findByNameContainingIgnoreCase(String name);
    
    // Check if user is active (for future enhancement)
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.id IS NOT NULL")
    Optional<User> findActiveUserByEmail(@Param("email") String email);
}