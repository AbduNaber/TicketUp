package com.codever.ticketup.dto.participant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDtoIU {
    private UUID eventId;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String description;
    private boolean isFirstTime;
}
