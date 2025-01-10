package com.codever.ticketup.controller;

import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.service.EmailService;
import com.codever.ticketup.service.OrganizatorService;
import com.codever.ticketup.service.PasswordResetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/auth")
public class AuthController {

    private final OrganizatorRepository organizatorRepository;
    private final PasswordResetService passwordResetService;
    private final EmailService emailService;

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

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String token = passwordResetService.createPasswordResetToken(email);
        emailService.sendPasswordResetEmail(email, token);
        return ResponseEntity.ok("Your password reset link has been sent to your email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String newPassword = requestBody.get("newPassword");
        if(passwordResetService.validateToken(token)) {
            passwordResetService.updatePassword(token, newPassword);
            return ResponseEntity.ok("Your password updated successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
    }


}
