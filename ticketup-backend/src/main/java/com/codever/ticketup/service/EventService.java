package com.codever.ticketup.service;

import com.codever.ticketup.model.Event;
import com.codever.ticketup.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with id " + id + " not found"));
    }

    public Event updateEvent(Event event) {
        return eventRepository.findById(event.getId()).map(
                event1 -> {
                    event1.setName(event.getName());
                    event1.setDescription(event.getDescription());
                    event1.setLocation(event.getLocation());
                    event1.setStartDate(event.getStartDate());

                    return eventRepository.save(event1);
                }
        ).orElseThrow(() -> new RuntimeException("Event with id " + event.getId() + " not found"));
    }

    public void deleteEvent(UUID id) {

        Optional<Event> optionalEvent = eventRepository.findById(id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();

            // Update the status of the event
            event.setEventStatus("PASİF");

            // Save the updated event
            eventRepository.save(event);
        } else {
            throw new EntityNotFoundException("Event with ID " + id + " not found.");
        }
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getEventsByOrganizerId(UUID id) {
       return eventRepository.findByOrganizatorId(id);
    }
}
