package com.codever.ticketup.controller;

import com.codever.ticketup.service.SecurityOfficerService;
import com.codever.ticketup.model.SecurityOfficer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("ticketup/security-officers")
public class SecurityOfficerController {

    private final SecurityOfficerService securityOfficerService;

    @Autowired
    public SecurityOfficerController(SecurityOfficerService securityOfficerService) {
        this.securityOfficerService = securityOfficerService;
    }

    // Get all Security Officers
    @GetMapping
    public ResponseEntity<List<SecurityOfficer>> getAllSecurityOfficers() {
        List<SecurityOfficer> officers = securityOfficerService.findAll();
        return ResponseEntity.ok(officers);
    }
    @GetMapping("login")
    public Boolean login(@RequestParam("email") String email, @RequestParam("password") String password) {

        Optional<SecurityOfficer> user = securityOfficerService.findByEmail(email);


        return user.filter(securityOfficer -> password.equals(securityOfficer.getPassword())).isPresent();


    }

    // Get Security Officer by ID
    @GetMapping("list-organizer-officers/{id}")
    public ResponseEntity<List<SecurityOfficer>> getSecurityOfficerById(@PathVariable UUID id) {
        Optional<List<SecurityOfficer>> officer = securityOfficerService.findByOrganizatorId(id);
        return officer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new Security Officer
    @PostMapping
    public ResponseEntity<SecurityOfficer> createSecurityOfficer(@RequestBody SecurityOfficer securityOfficer) {

        SecurityOfficer createdOfficer = securityOfficerService.save(securityOfficer);
        return ResponseEntity.ok(createdOfficer);
    }

    // Update an existing Security Officer
    @PutMapping("/{id}")
    public ResponseEntity<SecurityOfficer> updateSecurityOfficer(@PathVariable UUID id, @RequestBody SecurityOfficer updatedOfficer) {
        Optional<SecurityOfficer> existingOfficer = securityOfficerService.findById(id);
        if (existingOfficer.isPresent()) {
            updatedOfficer.setId(id);
            SecurityOfficer savedOfficer = securityOfficerService.save(updatedOfficer);
            return ResponseEntity.ok(savedOfficer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Security Officer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSecurityOfficer(@PathVariable UUID id) {
        if (securityOfficerService.existsById(id)) {
            securityOfficerService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
