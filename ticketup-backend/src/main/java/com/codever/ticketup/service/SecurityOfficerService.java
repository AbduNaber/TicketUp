package com.codever.ticketup.service;

import com.codever.ticketup.model.SecurityOfficer;
import com.codever.ticketup.repository.SecurityOfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SecurityOfficerService {

    private final SecurityOfficerRepository securityOfficerRepository;

    @Autowired
    public SecurityOfficerService(SecurityOfficerRepository securityOfficerRepository) {
        this.securityOfficerRepository = securityOfficerRepository;
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

}
