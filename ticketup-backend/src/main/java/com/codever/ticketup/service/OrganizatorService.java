package com.codever.ticketup.service;


import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.repository.OrganizatorRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Getter
@Setter
public class OrganizatorService {

    private final OrganizatorRepository organizatorRepository;


    public List<Organizator> getAllOrganizators() {
        return organizatorRepository.findAll();
    }

    public Organizator getOrganizatorById(Long id) {
        return organizatorRepository.getReferenceById(id);
    }
    public Organizator updateOrganizator(Organizator organizator) {
        return organizatorRepository.findById(organizator.getId()).map(
                organizator1 -> {
                    organizator1.setId(organizator.getId());
                    organizator1.setUsername(organizator.getUsername());
                    organizator1.setEmail(organizator.getEmail());
                    organizator1.setPasswordHash(organizator.getPasswordHash());
                    organizator1.setCreatedAt(organizator.getCreatedAt());
                    return organizatorRepository.save(organizator1);

                }
        ).orElseThrow( () -> new RuntimeException(" Organizator not found with id: " + organizator.getId()));
    }

    public void deleteOrganizator(Long id) {
        organizatorRepository.deleteById(id);
    }
    public void addOrganizator(Organizator organizator) {
        organizatorRepository.save(organizator);
    }





}
