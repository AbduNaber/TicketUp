package com.codever.ticketup.controller;

import com.codever.ticketup.model.Participant;
import com.codever.ticketup.service.ParticipantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/partcipants")
public class ParticipantController {

    private final ParticipantService participantService;

    @GetMapping(path = "/list")
    public List<Participant> getParticipants() {
        return participantService.getAllParticipants();
    }

    @GetMapping(path = "/list/{id}")
    public Participant getParticipantById(@PathVariable(name = "id") Long id) {
        return participantService.getPartipantById(id);
    }

    @PutMapping(path = "/update")
    public void updateParticipant(@RequestBody Participant participant) {
        participantService.updateParticipant(participant);
    }

    @PostMapping(path = "/create")
    public void createParticipant(@RequestBody Participant participant) {
        participantService.add(participant);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteParticipant(@PathVariable(name = "id") Long id) {
        participantService.deleteParticipant(id);
    }
}
