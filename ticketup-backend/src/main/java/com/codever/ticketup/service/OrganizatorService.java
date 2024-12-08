package com.codever.ticketup.service;


import com.codever.ticketup.dto.organizator.OrganizatorDto;
import com.codever.ticketup.dto.organizator.OrganizatorDtoIU;
import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import com.codever.ticketup.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Getter
@Setter
public class OrganizatorService {

    private final OrganizatorRepository organizatorRepository;

    private final JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final AuthenticationManager authenticationManager;

    public void register(@NotNull OrganizatorDtoIU organizatorDtoIU) {
        if(organizatorRepository.findByEmail(organizatorDtoIU.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        Organizator organizator = new Organizator();
        BeanUtils.copyProperties(organizatorDtoIU, organizator);
        organizator.setPasswordHash(encoder.encode(organizatorDtoIU.getPasswordHash()));
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

    public List<OrganizatorDto> getAllOrganizators() {
        List<Organizator> organizators = organizatorRepository.findAll();

        return organizators.stream().map(organizator -> {
            OrganizatorDto organizatorDto = new OrganizatorDto();
            BeanUtils.copyProperties(organizator, organizatorDto);
            return organizatorDto;
        }).collect(Collectors.toList());
    }

    public OrganizatorDto getOrganizatorById(UUID id) {
        Organizator organizator = organizatorRepository.getOrganizatorsById(id);
        if(organizator == null) {
            throw new RuntimeException("Organizator not found");
        }
        OrganizatorDto organizatorDto = new OrganizatorDto();
        BeanUtils.copyProperties(organizator, organizatorDto);
        return organizatorDto;
    }

    public OrganizatorDto getOrganizatorByEmail(String email) {
        if(organizatorRepository.findByEmail(email) == null) {
            throw new RuntimeException("Organizator not found");
        }
        Organizator organizator = organizatorRepository.findByEmail(email);
        OrganizatorDto organizatorDto = new OrganizatorDto();
        BeanUtils.copyProperties(organizator, organizatorDto);
        return organizatorDto;
    }


    //TODO: Change this method with DTO
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
