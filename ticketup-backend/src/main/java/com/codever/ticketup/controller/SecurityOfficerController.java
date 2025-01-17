package com.codever.ticketup.controller;

import com.codever.ticketup.model.Event;
import com.codever.ticketup.service.EventService;
import com.codever.ticketup.service.SecurityOfficerService;
import com.codever.ticketup.model.SecurityOfficer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("ticketup/security-officers")
public class SecurityOfficerController {

    private final SecurityOfficerService securityOfficerService;
    private final EventService eventService;

    @Autowired
    public SecurityOfficerController(SecurityOfficerService securityOfficerService, EventService eventService) {
        this.securityOfficerService = securityOfficerService;
        this.eventService = eventService;
    }

    // Get all Security Officers
    @GetMapping
    public ResponseEntity<List<SecurityOfficer>> getAllSecurityOfficers() {
        List<SecurityOfficer> officers = securityOfficerService.findAll();
        return ResponseEntity.ok(officers);
    }
    @GetMapping("login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        Optional<SecurityOfficer> user = securityOfficerService.findByEmail(email);

        if (user.isPresent() && password.equals(user.get().getPassword())) {
            SecurityOfficer officer = user.get();

            // Yanıt verisini bir Map içinde döndür
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("officerId", officer.getId());
            response.put("eventId", officer.getEvent() != null ? officer.getEvent().getId() : null);

            return ResponseEntity.ok(response);
        } else {
            // Hatalı giriş durumunda yanıt
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Invalid email or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
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

    @PutMapping("/{officerId}/assign-event/{eventId}")
    public ResponseEntity<SecurityOfficer> assignEventToOfficer(
            @PathVariable UUID officerId,
            @PathVariable UUID eventId) {
        Optional<SecurityOfficer> officer = securityOfficerService.findById(officerId);
        Optional<Event> event = eventService.getEventRepository().findById(eventId);

        if (officer.isPresent() && event.isPresent()) {
            SecurityOfficer updatedOfficer = officer.get();
            updatedOfficer.setEvent(event.get()); // Event nesnesini atayın
            securityOfficerService.save(updatedOfficer);
            return ResponseEntity.ok(updatedOfficer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/assigned-event/{officerId}")
    public ResponseEntity<Event> getAssignedEvent(@PathVariable UUID officerId) {
        Optional<SecurityOfficer> officer = securityOfficerService.findById(officerId);
        if (officer.isPresent() && officer.get().getEvent() != null) {
            return ResponseEntity.ok(officer.get().getEvent());
        }
        return ResponseEntity.notFound().build();
    }


}
