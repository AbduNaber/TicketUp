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

import java.time.LocalDateTime;
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

    private final EmailService emailService;

    public void register(@NotNull OrganizatorDtoIU organizatorDtoIU) {
        if(organizatorRepository.findByEmail(organizatorDtoIU.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        Organizator organizator = new Organizator();
        BeanUtils.copyProperties(organizatorDtoIU, organizator);
        organizator.setPasswordHash(encoder.encode(organizatorDtoIU.getPasswordHash()));
        String token = UUID.randomUUID().toString();
        organizator.setVerificationToken(token);
        organizator.setTokenExpiry(LocalDateTime.now().plusHours(24));
        organizator.setVerified(false);
        organizatorRepository.save(organizator);

        emailService.sendVerificationEmail(organizator.getEmail(), token);
        System.out.println("Organizator Registration Successful");



    }

    public String login(String email, String password) {
        Organizator organizator = organizatorRepository.findByEmail(email);

        if(organizator == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if(!organizator.isVerified()){
            throw new RuntimeException("Email is not verified. Please verify your email");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(organizator.getEmail(), organizator.getId());
        }else {
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
    public OrganizatorDto updateOrganizator(UUID id,OrganizatorDtoIU organizatorDtoIU) {
        return organizatorRepository.findById(id)
                .map(existtingOrganizator -> {
                    existtingOrganizator.setName(organizatorDtoIU.getName());
                    existtingOrganizator.setSurname(organizatorDtoIU.getSurname());
                    existtingOrganizator.setOrganizationName(organizatorDtoIU.getOrganizationName());
                    existtingOrganizator.setEmail(organizatorDtoIU.getEmail());
                    if(organizatorDtoIU.getPasswordHash() != null) {
                        existtingOrganizator.setPasswordHash(encoder.encode(organizatorDtoIU.getPasswordHash()));
                    }
                    existtingOrganizator.setProfilePicture(organizatorDtoIU.getProfilePicture());
                    Organizator updated = organizatorRepository.save(existtingOrganizator);
                    return convertToDto(updated);
                })
                .orElseThrow(() ->new RuntimeException("Organizator Not Found With id" + id));
    }

    private OrganizatorDto convertToDto(Organizator organizator) {
        OrganizatorDto organizatorDto = new OrganizatorDto();
        BeanUtils.copyProperties(organizator, organizatorDto);
        return organizatorDto;
    };

    public void deleteOrganizator(UUID id) {
        organizatorRepository.deleteById(id);
    }






}
