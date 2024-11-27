package com.codever.ticketup.service;


import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Getter
@Setter
public class OrganizatorService {

    private final OrganizatorRepository organizatorRepository;

    private final JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final AuthenticationManager authenticationManager;

    public void register(@NotNull Organizator organizator) {

        if(organizatorRepository.findByEmail(organizator.getEmail()) != null) {
           throw new RuntimeException("Email already in use");
        }
        organizator.setPasswordHash(encoder.encode(organizator.getPasswordHash()));

        organizatorRepository.save(organizator);
    }

    public String login(String email, String password) {
        Organizator organizator = organizatorRepository.findByEmail(email);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        if (organizator != null && authentication.isAuthenticated()) {
            return jwtService.generateToken(organizator.getEmail(), organizator.getId());
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
        if(organizatorRepository.findByEmail(email) == null) {
            throw new RuntimeException("Organizator not found");
        }

        return organizatorRepository.findByEmail(email);

    }

    public Organizator updateOrganizator(Organizator organizator) {
        return organizatorRepository.findById(organizator.getId()).map(
                organizator1 -> {
                    organizator1.setId(organizator.getId());
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
