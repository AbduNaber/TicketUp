package com.codever.ticketup.service;

import com.codever.ticketup.model.OrganizatorMessage;
import com.codever.ticketup.repository.OrganizatorMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrganizatorMessageService {

    @Autowired
    private OrganizatorMessageRepository repository;

    public OrganizatorMessage saveMessage(OrganizatorMessage message) {
        return repository.save(message);
    }

    public OrganizatorMessage getMessageById(UUID id) {
        return repository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Message not found with ID: " + id));
    }

    public List<OrganizatorMessage> getMessageByOrganizatorId(UUID id) {
        List<OrganizatorMessage> messages = repository.findByOrganizatorId(id);

        if (messages.isEmpty()) {
            throw new IllegalArgumentException("Message not found with ID: " + id);
        }
        return repository.findByOrganizatorId(id);
    }


    public List<OrganizatorMessage> getAllMessages() {
        return repository.findAll();
    }

    public OrganizatorMessage updateMessage(UUID id, OrganizatorMessage updatedMessage) {
        OrganizatorMessage existingMessage = getMessageById(id);
        existingMessage.setName(updatedMessage.getName());
        existingMessage.setSurname(updatedMessage.getSurname());
        existingMessage.setEmail(updatedMessage.getEmail());
        existingMessage.setMassage(updatedMessage.getMassage());
        return repository.save(existingMessage);
    }

    public void deleteMessage(UUID id) {
        repository.deleteById(id);
    }

    public boolean isDuplicateMessage(OrganizatorMessage message) {
        return repository.existsByNameAndSurnameAndEmailAndMassage(
                message.getName(),
                message.getSurname(),
                message.getEmail(),
                message.getMassage()
        );
    }

}
