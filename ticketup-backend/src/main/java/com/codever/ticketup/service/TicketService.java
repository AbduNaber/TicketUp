package com.codever.ticketup.service;

import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.repository.TicketRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class TicketService {

    private final TicketRepository ticketRepository;

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(UUID id){
        return ticketRepository.findById(id).get();
    }

    public Ticket updateTicket(Ticket ticket){
        return ticketRepository.findById(ticket.getId()).map(
                ticket1 -> {
                    ticket1.setId(ticket.getId());
                    ticket1.setEventId(ticket.getEventId());
                    ticket1.setParticipantId(ticket.getParticipantId());
                    return ticketRepository.save(ticket1);
                }
        ).orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticket.getId()));
    }
    public void deleteTicketById(UUID id){
        ticketRepository.deleteById(id);
    }

    public UUID addTicket(Ticket ticket){
        ticketRepository.save(ticket);
        return ticket.getId();
    }

}
