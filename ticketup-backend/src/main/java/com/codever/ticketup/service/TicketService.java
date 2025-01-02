package com.codever.ticketup.service;

import com.codever.ticketup.model.Participant;
import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.repository.ParticipantRepository;
import com.codever.ticketup.repository.TicketRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ParticipantRepository participantRepository;

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

    public boolean isParticipantWithEmailOrPhone(String email, String phone, UUID participantId) {
        // Participant tablosunda e-posta veya telefon numarası ve ID eşleşmesini kontrol et
        Optional<Participant> participantOpt = participantRepository.findById(participantId);
        return participantOpt.map(participant -> {
            if (email != null && !email.isEmpty()) {
                return participant.getEmail().equalsIgnoreCase(email);
            } else if (phone != null && !phone.isEmpty()) {
                return participant.getPhone().equals(phone); // Telefon eşleşmesi
            }
            return false; // Ne email ne telefon girilmişse eşleşme başarısız
        }).orElse(false);
    }

}
