package com.codever.ticketup.controller;

import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.service.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/tickets")
public class TicketController {

    private final TicketService ticketService;

    @GetMapping(path = "/list")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping(path = "/list/{id}")
    public Ticket getTicketById(@PathVariable UUID id) {
        return ticketService.getTicketById(id);
    }

    @PutMapping(path = "/update")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    @PostMapping(path = "/create")
    public UUID createTicket(@RequestBody Ticket ticket) {
        System.out.println("Event ID: " + ticket.getEventId());
        System.out.println("Participant ID: " + ticket.getParticipantId());
        return ticketService.addTicket(ticket);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteTicket(@PathVariable UUID id) {
        ticketService.deleteTicketById(id);
    }

}
