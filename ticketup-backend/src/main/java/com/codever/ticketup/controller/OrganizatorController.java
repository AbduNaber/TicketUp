package com.codever.ticketup.controller;

import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.service.OrganizatorService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@RestController
@RequestMapping("TicketUp/organizators")
public class OrganizatorController {

    private final OrganizatorService organizatorService;

    @PostMapping(path = "/create")
    public void createOrganizator(@RequestBody Organizator organizator) {
        organizatorService.addOrganizator(organizator);
    }

    @GetMapping(path = "/list")
    public List<Organizator> getAllOrganizators() {
        return organizatorService.getAllOrganizators();
    }

    @GetMapping(path = "/list/{id}")
    public Organizator getOrganizatorById(@PathVariable(name = "id") Long id) {
        return organizatorService.getOrganizatorById(id);
    }

    @PutMapping(path = "/update")
    public Organizator updateOrganizator(@RequestBody Organizator organizator) {
        return organizatorService.updateOrganizator(organizator);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteOrganizator(@PathVariable(name = "id") Long id) {
        organizatorService.deleteOrganizator(id);
    }
}
