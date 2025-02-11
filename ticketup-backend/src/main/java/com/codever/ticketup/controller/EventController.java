package com.codever.ticketup.controller;


import com.codever.ticketup.dto.event.EventDtoIU;
import com.codever.ticketup.dto.event.EventDto;
import com.codever.ticketup.model.Event;
import com.codever.ticketup.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/events")
public class EventController {

    private final EventService eventService;

    @GetMapping(path = "/list")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping(path = "/list/{id}")
    public Event getEventById(@PathVariable UUID id) {
        return eventService.getEventById(id);
    }

    @GetMapping(path = "/list-organizer-events/{id}")
    public List<Event> getEventsByOrganizerId(@PathVariable UUID id) {
        return eventService.getEventsByOrganizerId(id);
    }

    @GetMapping(path = "/get-information/{id}")
    public ResponseEntity<EventDto> getEventWithOrganizatorInfo(@PathVariable UUID id) {
        try {
            EventDto eventDto = eventService.getEventWithOrganizerInfo(id);
            return ResponseEntity.ok(eventDto);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping(path = "/update")
    public Event updateEvent(@RequestBody Event event) {
        return eventService.updateEvent(event);
    }

    @PostMapping(path = "/create")
    public Event createEvent(@RequestBody EventDtoIU eventDtoIU) {
        return eventService.createEvent(eventDtoIU);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteEvent(@PathVariable UUID id) {
        eventService.deleteEvent(id);
    }

    @PostMapping(path = "/activate/{id}")
    public void activateEvent(@PathVariable UUID id) {

        eventService.activateEvent(id);
    }
}
