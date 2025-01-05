package com.codever.ticketup.controller;

import com.codever.ticketup.model.OrganizatorMessage;
import com.codever.ticketup.service.OrganizatorMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ticketup/organizator-messages")
public class OrganizatorMessageController {

    @Autowired
    private OrganizatorMessageService service;

    @PostMapping
    public ResponseEntity<?> createMessage(@RequestBody OrganizatorMessage message) {
        // Check if a message with the same details exists
        boolean isDuplicate = service.isDuplicateMessage(message);
        if (isDuplicate) {
            throw new RuntimeException("A message with the same details already exists.");
        }


        // Save the new message if no duplicate is found
        OrganizatorMessage savedMessage = service.saveMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganizatorMessage> getMessageById(@PathVariable UUID id) {
        OrganizatorMessage message = service.getMessageById(id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/list")
    public ResponseEntity<List<OrganizatorMessage>> getAllMessages() {
        List<OrganizatorMessage> messages = service.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrganizatorMessage> updateMessage(
            @PathVariable UUID id, @RequestBody OrganizatorMessage updatedMessage) {
        OrganizatorMessage message = service.updateMessage(id, updatedMessage);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
