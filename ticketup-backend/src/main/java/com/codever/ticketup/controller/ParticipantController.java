package com.codever.ticketup.controller;

import com.codever.ticketup.model.Participant;
import com.codever.ticketup.service.ParticipantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/participants")
public class ParticipantController {

    private final ParticipantService participantService;

    @GetMapping(path = "/list")
    public List<Participant> getParticipants() {
        return participantService.getAllParticipants();
    }

    @GetMapping(path = "/list/{id}")
    public Participant getParticipantById(@PathVariable(name = "id") UUID id) {
        return participantService.getPartipantById(id);
    }

    @GetMapping(path="/event/{id}")
    public List<Participant> getParticipantsByEvent(@PathVariable(name = "id") UUID id) {
        return participantService.getParticipantByEvent(id);
    }

    @PutMapping(path = "/update")
    public void updateParticipant(@RequestBody Participant participant) {
        participantService.updateParticipant(participant);
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> createParticipant(@RequestBody Participant participant) {
        try{
            UUID participantID = participantService.add(participant);
            return ResponseEntity.ok(participantID);
        }catch (IllegalArgumentException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteParticipant(@PathVariable(name = "id") UUID id) {
        participantService.deleteParticipant(id);
    }
}
