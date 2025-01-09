package com.codever.ticketup.service;

import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.model.PasswordResetToken;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.repository.PasswordResetTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PasswordResetService {
    private final PasswordResetTokenRepository tokenRepository;
    private final OrganizatorRepository organizatorRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String createPasswordResetToken(String email) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        tokenRepository.save(resetToken);
        return token;
    }

    public boolean validateToken(String token) {
        return tokenRepository.findByToken(token)
                .map(t -> t.getExpiryDate().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    public void updatePassword(String token, String password) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        String email = resetToken.getEmail();
        Organizator organizator = organizatorRepository.findByEmail(email);

        if(organizator == null){
            throw new IllegalArgumentException("Invalid email");
        }

        String hashedPassword = encoder.encode(password);
        organizator.setPasswordHash(hashedPassword);
        organizatorRepository.save(organizator);
    }
}
