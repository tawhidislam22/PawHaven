package com.pawhaven.backend.controller;

import com.pawhaven.backend.model.User;
import com.pawhaven.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Configure this for your frontend URL in production
public class UserController {

    @Autowired
    private UserService userService;

    // POST - Register new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            // Remove password from response for security
            createdUser.setPassword(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "User registered successfully",
                "user", createdUser
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Registration failed: " + e.getMessage()
            ));
        }
    }

    // GET - Get all users
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            // Remove passwords from response
            users.forEach(user -> user.setPassword(null));
            return ResponseEntity.ok(Map.of(
                "success", true,
                "users", users,
                "count", users.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to retrieve users: " + e.getMessage()
            ));
        }
    }

    // GET - Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            Optional<User> user = userService.getUserById(id);
            if (user.isPresent()) {
                User foundUser = user.get();
                foundUser.setPassword(null); // Remove password from response
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", foundUser
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to retrieve user: " + e.getMessage()
            ));
        }
    }

    // GET - Get user by name
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getUserByName(@PathVariable String name) {
        try {
            Optional<User> user = userService.getUserByName(name);
            if (user.isPresent()) {
                User foundUser = user.get();
                foundUser.setPassword(null); // Remove password from response
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", foundUser
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to retrieve user: " + e.getMessage()
            ));
        }
    }

    // GET - Search users by name
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String name) {
        try {
            List<User> users = userService.searchUsersByName(name);
            users.forEach(user -> user.setPassword(null));
            return ResponseEntity.ok(Map.of(
                "success", true,
                "users", users,
                "count", users.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Search failed: " + e.getMessage()
            ));
        }
    }

    // GET - Get users by role
    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable String role) {
        try {
            User.Role userRole = User.Role.valueOf(role.toUpperCase());
            List<User> users = userService.getUsersByRole(userRole);
            users.forEach(user -> user.setPassword(null));
            return ResponseEntity.ok(Map.of(
                "success", true,
                "users", users,
                "count", users.size()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid role: " + role
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to retrieve users: " + e.getMessage()
            ));
        }
    }

    // PUT - Update user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            updatedUser.setPassword(null); // Remove password from response
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User updated successfully",
                "user", updatedUser
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Update failed: " + e.getMessage()
            ));
        }
    }

    // DELETE - Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User deleted successfully"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Delete failed: " + e.getMessage()
            ));
        }
    }

    // POST - User login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        try {
            String usernameOrEmail = loginRequest.get("username");
            String password = loginRequest.get("password");

            if (usernameOrEmail == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Username/email and password are required"
                ));
            }

            Optional<User> user = userService.authenticateUser(usernameOrEmail, password);
            if (user.isPresent()) {
                User authenticatedUser = user.get();
                authenticatedUser.setPassword(null); // Remove password from response
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login successful",
                    "user", authenticatedUser
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Invalid credentials"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Login failed: " + e.getMessage()
            ));
        }
    }
}