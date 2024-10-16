package com.codever.ticketup.model;

import jakarta.persistence.*;
import jdk.jfr.Event;
import lombok.*;


import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "participants")
public class Participant {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
