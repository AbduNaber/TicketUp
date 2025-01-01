package com.codever.ticketup.dto.organizator;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizatorDtoIU {

    private String name;
    private String surname;
    private String organizationName;
    private String email;
    private String passwordHash;
    private String profilePicture;
}
