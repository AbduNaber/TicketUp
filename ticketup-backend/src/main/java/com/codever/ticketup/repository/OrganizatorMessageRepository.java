package com.codever.ticketup.repository;

import com.codever.ticketup.model.OrganizatorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizatorMessageRepository extends JpaRepository<OrganizatorMessage, UUID> {


    Optional<OrganizatorMessage> findByEmail(String email);

    List<OrganizatorMessage> findByOrganizatorId(UUID id);

    List<OrganizatorMessage> findByName(String name);

    // Find messages by both name and surname
    List<OrganizatorMessage> findByNameAndSurname(String name, String surname);

    // Find messages by name or surname
    List<OrganizatorMessage> findByNameOrSurname(String name, String surname);

    // Find messages containing a keyword in the email
    List<OrganizatorMessage> findByEmailContaining(String keyword);

    // Find all messages sorted by name
    List<OrganizatorMessage> findAllByOrderByNameAsc();

    // Count messages by a specific email
    long countByEmail(String email);

    // Delete all messages by a specific name
    void deleteByName(String name);

    boolean existsByNameAndSurnameAndEmailAndMassage(String name, String surname, String email, String massage);

}
