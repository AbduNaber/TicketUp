package com.codever.ticketup.repository;

import com.codever.ticketup.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, UUID> {
    Participant findByEventIdAndEmail(UUID eventId, String email);
    Participant findByEventIdAndPhone(UUID eventId, String phone);
}
