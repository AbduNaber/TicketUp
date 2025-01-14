package com.codever.ticketup.controller;

import com.codever.ticketup.model.Participant;
import com.codever.ticketup.service.SecurityOfficerService;
import com.codever.ticketup.model.Event;
import com.codever.ticketup.model.SecurityOfficer;
import com.codever.ticketup.model.Ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

   
    @GetMapping("/ticket/{id}")
    public ResponseEntity<Map<String, Object>> getTicketInfo(@PathVariable UUID id) {
    Optional<Ticket> ticketOptional = securityOfficerService.getTicket(id);
    Optional<Event> eventOptional = securityOfficerService.getEvent(id);   
    Optional<Participant> participantOptional = securityOfficerService.getParticipant(id);
    if (ticketOptional.isPresent()) {
        Ticket ticket = ticketOptional.get();
        Event event = eventOptional.get();
        Participant participant = participantOptional.get();
        Map<String, Object> response = new HashMap<>();
        response.put("ticketId", ticket.getId());
        response.put("eventDate", event.getStartDate());
        response.put("eventTime", event.getStartTime());
        response.put("eventName", event.getName());
        response.put("eventLocation", event.getLocation());
        response.put("participantName", participant.getName());
        response.put("participantSurname", participant.getSurname());
        response.put("participantEmail", participant.getEmail());
        response.put("participantPhone", participant.getPhone());
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}


    
}
