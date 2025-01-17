package com.codever.ticketup.service;

import com.codever.ticketup.model.Event;
import com.codever.ticketup.model.Participant;
import com.codever.ticketup.model.SecurityOfficer;
import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.repository.SecurityOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SecurityOfficerService {

    private final SecurityOfficerRepository securityOfficerRepository;
    private final TicketService ticketService;
    private final EventService eventService;
    private final ParticipantService participantService;

    @Autowired
    public SecurityOfficerService(SecurityOfficerRepository securityOfficerRepository, TicketService ticketService, EventService eventService, ParticipantService participantService) {
        this.securityOfficerRepository = securityOfficerRepository;
        this.ticketService = ticketService;
        this.eventService = eventService;
        this.participantService = participantService;
    }

    // Find all Security Officers
    public List<SecurityOfficer> findAll() {
        return securityOfficerRepository.findAll();
    }

    // Find Security Officer by ID
    public Optional<SecurityOfficer> findById(UUID id) {
        return securityOfficerRepository.findById(id);
    }
    public Optional<List<SecurityOfficer>> findByOrganizatorId(UUID organizatorId) {
        return securityOfficerRepository.findByOrganizatorId(organizatorId);
    }

    public  Optional<SecurityOfficer> findByEmail(String email) {
        return securityOfficerRepository.findByEmail(email);
    }
    // Save a Security Officer (Create or Update)
    public SecurityOfficer save(SecurityOfficer securityOfficer) {
        return securityOfficerRepository.save(securityOfficer);
    }

    // Delete a Security Officer by ID
    public void deleteById(UUID id) {
        securityOfficerRepository.deleteById(id);
    }

    // Check if a Security Officer exists by ID
    public boolean existsById(UUID id) {
        return securityOfficerRepository.existsById(id);
    }

    public List<SecurityOfficer> findByEventId(UUID eventId) {
        return securityOfficerRepository.findByEventId(eventId);
    }

    public Optional<Ticket> getTicket(UUID ticketId) {
        return Optional.of(ticketService.getTicketById(ticketId));
    }

    public Optional<Event> getEvent(UUID eventId) {
        return Optional.of(eventService.getEventById(eventId));
    }
    public Optional<Participant> getParticipant(UUID participantId) {
        return Optional.of(participantService.getPartipantById(participantId));
    }
}


