package com.codever.ticketup.repository;


import com.codever.ticketup.model.Organizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizatorRepository extends JpaRepository<Organizator, UUID> {
    Organizator findByEmail(String email);

    Organizator getOrganizatorsById(UUID id);
}
