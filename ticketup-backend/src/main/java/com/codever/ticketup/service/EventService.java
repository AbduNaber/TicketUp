package com.codever.ticketup.service;

import com.codever.ticketup.dto.event.EventDtoIU;
import com.codever.ticketup.dto.event.EventDto;
import com.codever.ticketup.model.Event;
import com.codever.ticketup.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;
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

    public EventDto getEventWithOrganizerInfo(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event with id " + id + " not found"));
        EventDto eventDto = new EventDto();
        BeanUtils.copyProperties(event, eventDto);
        eventDto.setOrganizatorName(event.getOrganizator().getName());
        eventDto.setOrganizatorSurname(event.getOrganizator().getSurname());
        eventDto.setOrganizatorEmail(event.getOrganizator().getEmail());
        eventDto.setOrganizatorCompany(event.getOrganizator().getOrganizationName());
        eventDto.setOrganizatorProfilePicture(event.getOrganizator().getProfilePicture());
        return eventDto;
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



            if(Objects.equals(event.getEventStatus(), "PASİF")){

                eventRepository.delete(event);
                return;
            }
            else{

                event.setEventStatus("PASİF");
            }

            // Save the updated event
            eventRepository.save(event);
        } else {
            throw new EntityNotFoundException("Event with ID " + id + " not found.");
        }
    }

    public Event createEvent(EventDtoIU eventDtoIU) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDtoIU, event);
        return eventRepository.save(event);
    }

    public List<Event> getEventsByOrganizerId(UUID id) {
       return eventRepository.findByOrganizatorId(id);
    }

    public void activateEvent(UUID id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setEventStatus("AKTİF");
            eventRepository.save(event);
        }
        else{
            throw new EntityNotFoundException("Event with ID " + id + " not found.");
        }
    }



}
