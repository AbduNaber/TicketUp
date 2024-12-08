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
        String token = organizatorService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        System.out.println("Login called");
        return ResponseEntity.ok(token);
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

    @PutMapping(path = "/update")
    public Organizator updateOrganizator(@RequestBody Organizator organizator) {
        return organizatorService.updateOrganizator(organizator);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteOrganizator(@PathVariable(name = "id") UUID id) {

        organizatorService.deleteOrganizator(id);
        System.out.println("Delete called");
    }
}
