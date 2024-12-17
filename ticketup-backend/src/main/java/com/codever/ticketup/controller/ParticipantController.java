package com.codever.ticketup.controller;

import com.codever.ticketup.model.Participant;
import com.codever.ticketup.service.ParticipantService;
import lombok.AllArgsConstructor;
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

    @PutMapping(path = "/update")
    public void updateParticipant(@RequestBody Participant participant) {
        participantService.updateParticipant(participant);
    }

    @PostMapping(path = "/create")
    public UUID createParticipant(@RequestBody Participant participant) {
        return participantService.add(participant);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteParticipant(@PathVariable(name = "id") UUID id) {
        participantService.deleteParticipant(id);
    }
}
