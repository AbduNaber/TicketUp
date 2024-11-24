package com.codever.ticketup.service;


import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class OrganizatorService {

    private final OrganizatorRepository organizatorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public void register(@NotNull Organizator organizator) {

        if(organizatorRepository.findByEmail(organizator.getEmail()).isPresent()) {
           throw new RuntimeException("Email already in use");
        }
        organizator.setPasswordHash(passwordEncoder.encode(organizator.getPasswordHash()));

        organizatorRepository.save(organizator);
    }

    public String login(String email, String password) {
        Optional<Organizator> organizator = organizatorRepository.findByEmail(email);
        if (organizator.isPresent() && passwordEncoder.matches(password, organizator.get().getPasswordHash())) {
            return jwtTokenProvider.createToken(email);
        } else {
            throw new RuntimeException("Invalid email or password");
        }

    }

    public List<Organizator> getAllOrganizators() {
        return organizatorRepository.findAll();
    }

    public Organizator getOrganizatorById(UUID id) {
        Organizator organizator = organizatorRepository.getOrganizatorsById(id);
        if(organizator == null) {
            throw new RuntimeException("Organizator not found");
        }
        return organizator;
    }

    public Organizator getOrganizatorByEmail(String email) {
        return organizatorRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No organizator found with email: " + email));
    }

    public Organizator updateOrganizator(Organizator organizator) {
        return organizatorRepository.findById(organizator.getId()).map(
                organizator1 -> {
                    organizator1.setId(organizator.getId());
                    organizator1.setUsername(organizator.getUsername());
                    organizator1.setEmail(organizator.getEmail());
                    organizator1.setPasswordHash(organizator.getPasswordHash());
                    organizator1.setCreatedAt(organizator.getCreatedAt());
                    // todo add new variable in model
                    return organizatorRepository.save(organizator1);

                }
        ).orElseThrow( () -> new RuntimeException(" Organizator not found with id: " + organizator.getId()));
    }

    public void deleteOrganizator(UUID id) {
        organizatorRepository.deleteById(id);
    }






}
