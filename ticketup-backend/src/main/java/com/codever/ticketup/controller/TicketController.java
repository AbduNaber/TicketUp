package com.codever.ticketup.controller;

import com.codever.ticketup.dto.QueryTicketRequest;
import com.codever.ticketup.model.Ticket;
import com.codever.ticketup.service.EmailService;
import com.codever.ticketup.service.TicketService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
// Bu satır test için
// Bu satır test için
// Bu satır test için
@AllArgsConstructor
@RestController
@RequestMapping("ticketup/tickets")
public class TicketController {

    private final TicketService ticketService;
    private final EmailService emailService;


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

    @PostMapping(path = "/sendEmail")
    public String sendTicketEmail(@RequestParam("email") String email,@RequestParam("id") UUID id, @RequestParam("file") MultipartFile file) {
        System.out.println("Email: " + email);
        System.out.println("File: " + file.getOriginalFilename());

        try{
            File tempFile = convertMultipartFileToFile(file);

            emailService.sendEmailWithAttachment(email,id, "Your Ticket", "Please Find Your Ticket Attached", tempFile);
            tempFile.delete();

            return "Email sent successfully";
        }catch (IOException | MessagingException e){
            e.printStackTrace();
            return "Email could not be sent" + e.getMessage();
        }
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convFile = File.createTempFile("ticket", ".pdf");
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }

    @PostMapping("/query")
    public ResponseEntity<?> queryTicket(@RequestBody QueryTicketRequest request) {
        // Biletin olup olmadığını kontrol et
        Ticket ticket = ticketService.getTicketById(request.getTicketId());
        if (ticket != null) {
            // E-posta veya telefon numarası ile kontrol
            boolean isParticipant = ticketService.isParticipantWithEmailOrPhone(
                    request.getParticipantEmail(),
                    request.getParticipantPhone(),
                    ticket.getParticipantId()
            );

            if (isParticipant) {
                return ResponseEntity.ok(ticket); // Eşleşme başarılı
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bilet bulunamadı veya bilgiler eşleşmiyor.");
    }

}
