package com.codever.ticketup.controller;

import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.service.OrganizatorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/auth")
public class AuthController {

    private final OrganizatorRepository organizatorRepository;

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        Organizator organizator = organizatorRepository.findByVerificationToken(token);

        if(organizator == null || organizator.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token has expired");
        }

        organizator.setVerified(true);
        organizator.setVerificationToken(null);
        organizatorRepository.save(organizator);

        return ResponseEntity.ok("Email verified successfully");
    }
}
