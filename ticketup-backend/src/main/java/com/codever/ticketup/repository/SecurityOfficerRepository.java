package com.codever.ticketup.repository;

import com.codever.ticketup.model.SecurityOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SecurityOfficerRepository extends JpaRepository<SecurityOfficer, UUID> {

        Optional<List<SecurityOfficer>> findByOrganizatorId(UUID organizatorId);
        Optional<SecurityOfficer> findByEmail(String email);
}
