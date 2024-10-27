package com.codever.ticketup.controller;

import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.service.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PutMapping(path = "/update")
    public Ticket updateTicket(@RequestBody Ticket ticket) {
        return ticketService.updateTicket(ticket);
    }

    @PostMapping(path = "/create")
    public void createTicket(@RequestBody Ticket ticket) {
        ticketService.addTicket(ticket);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicketById(id);
    }

}
