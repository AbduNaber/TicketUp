package com.codever.ticketup.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OrganizatorMessage ")
public class OrganizatorMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name ="email")
    private String email;

    @Column(name = "massage")
    private String massage;

    @Column(name = "organizator_id", columnDefinition = "UUID")
    private UUID organizatorId;

    @Column(name = "isRead")
    private boolean isRead=false;
}
