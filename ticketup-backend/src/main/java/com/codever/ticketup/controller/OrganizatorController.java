package com.codever.ticketup.controller;

import com.codever.ticketup.dto.LoginRequestDto;
import com.codever.ticketup.dto.organizator.OrganizatorDto;
import com.codever.ticketup.dto.organizator.OrganizatorDtoIU;
import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.service.OrganizatorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/organizators")
public class OrganizatorController {

    private final OrganizatorService organizatorService;

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@RequestBody OrganizatorDtoIU organizatorDtoIU) {
        organizatorService.register(organizatorDtoIU);
        return ResponseEntity.ok("Organizator registered");
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            String token = organizatorService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
            return ResponseEntity.ok(token);
        } catch (RuntimeException ex) {
            // Fırlatılan mesajlara göre uygun HTTP kodu döndür
            if (ex.getMessage().contains("Email is not verified")) {
                return ResponseEntity.status(403).body(ex.getMessage()); // Forbidden
            } else if (ex.getMessage().contains("Invalid email or password")) {
                return ResponseEntity.status(400).body(ex.getMessage()); // Bad Request
            } else {
                return ResponseEntity.status(500).body("An unexpected error occurred."); // Internal Server Error
            }
        }
    }

    @GetMapping(path = "/list")
    public List<OrganizatorDto> getAllOrganizators() {
        List<OrganizatorDto> organizators = organizatorService.getAllOrganizators();
        System.out.println(organizators);
        return organizators;

    }

    @GetMapping(path = "/list/{id}")
    public OrganizatorDto getOrganizatorById(@PathVariable(name = "id") UUID id) {
        return organizatorService.getOrganizatorById(id);
    }

    @GetMapping(path = "/get/email/{email}")
    public OrganizatorDto getOrganizatorByEmail(@PathVariable(name = "email") String id) {
        return organizatorService.getOrganizatorByEmail(id);
    }

    @PutMapping(path = "/update/{id}")
    public OrganizatorDto updateOrganizator(@PathVariable UUID id,@RequestBody OrganizatorDtoIU organizatorDtoIU) {
        return organizatorService.updateOrganizator(id,organizatorDtoIU);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteOrganizator(@PathVariable(name = "id") UUID id) {

        organizatorService.deleteOrganizator(id);
        System.out.println("Delete called");
    }
}
