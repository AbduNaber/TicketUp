package com.codever.ticketup.service;


import com.codever.ticketup.model.Participant;
import com.codever.ticketup.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class ParticipantService {
    private final ParticipantRepository participantRepository;

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Participant getPartipantById(UUID id) {
        return participantRepository.findById(id).orElse(null);
    }
     public Participant updateParticipant(Participant participant) {
        return participantRepository.findById(participant.getId()).map(
                participant1 -> {
                    participant1.setId(participant.getId());
                    return participantRepository.save(participant1);
                }
        ).orElseThrow(() -> new RuntimeException("Participant not found with id: " + participant.getId()));
     }
     public void deleteParticipant(UUID id) {
        participantRepository.deleteById(id);
     }
     public UUID add(Participant participant) {

        participantRepository.save(participant);
        return participant.getId();
     }

}
