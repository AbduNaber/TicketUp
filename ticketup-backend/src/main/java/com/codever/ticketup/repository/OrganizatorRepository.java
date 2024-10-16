package com.codever.ticketup.repository;


import com.codever.ticketup.model.Organizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizatorRepository extends JpaRepository<Organizator, Long> {
}
