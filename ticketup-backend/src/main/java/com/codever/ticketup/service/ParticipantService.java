package com.codever.ticketup.service;


import com.codever.ticketup.model.Participant;
import com.codever.ticketup.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public Participant updateParticipant(UUID id,Participant participant) {
       return participantRepository.findById(id)
               .map(existingParticipant -> {
                   if(!existingParticipant.getEmail().equals(participant.getEmail())) {
                       Participant emailParticipant = participantRepository.findByEventIdAndEmail(participant.getEventId(), participant.getEmail());
                       if(emailParticipant != null && !emailParticipant.getId().equals(id)) {
                           throw new IllegalArgumentException("Participant already exists with email: " + participant.getEmail());
                       }
                   }

                   if(!existingParticipant.getPhone().equals(participant.getPhone())) {
                       Participant phoneParticipant = participantRepository.findByEventIdAndPhone(participant.getEventId(), participant.getPhone());
                       if(phoneParticipant != null && !phoneParticipant.getId().equals(id)) {
                           throw new IllegalArgumentException("Participant already exists with phone: " + participant.getPhone());
                       }
                   }

                   existingParticipant.setName(participant.getName());
                   existingParticipant.setSurname(participant.getSurname());
                   existingParticipant.setEmail(participant.getEmail());
                   existingParticipant.setPhone(participant.getPhone());
                   existingParticipant.setDescription(participant.getDescription());
                   existingParticipant.setFirstTime(participant.isFirstTime());
                   return participantRepository.save(existingParticipant);
               })
               .orElseThrow(() -> new RuntimeException("Participant not found"));
    }


    public List<Participant> getParticipantByEvent(UUID eventId) {
        return participantRepository.findByEventId(eventId);
    }

     public void deleteParticipant(UUID id) {
        participantRepository.deleteById(id);
     }
     public UUID add(Participant participant) {
         Participant emailParticipant = participantRepository.findByEventIdAndEmail(participant.getEventId(), participant.getEmail());
         if (emailParticipant != null) {
             System.out.println("Participant already exists with email: " + participant.getEmail());
             throw new IllegalArgumentException("Participant already exists with email: " + participant.getEmail());
         }

         Participant phoneParticipant = participantRepository.findByEventIdAndPhone(participant.getEventId(), participant.getPhone());
         if (phoneParticipant != null) {
             System.out.println("Participant already exists with phone: " + participant.getPhone());
             throw new IllegalArgumentException("Participant already exists with phone: " + participant.getPhone());
         }

         participantRepository.save(participant);
         return participant.getId();
     }

}
