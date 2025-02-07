package com.codever.ticketup.dto.organizator;

import com.codever.ticketup.model.Event;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizatorDto {
    private String name;
    private String surname;
    private String organizationName;
    private String email;
    private String profilePicture;
    private List<Event> events;
}
