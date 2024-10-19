package com.codever.ticketup.service;

import com.codever.ticketup.model.Event;
import com.codever.ticketup.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with id " + id + " not found"));
    }

    public Event updateEvent(Long id, Event event) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with id " + id + " not found"));

        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setLocation(event.getLocation());
        existingEvent.setEventDate(event.getEventDate());
        return eventRepository.save(existingEvent);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
}
