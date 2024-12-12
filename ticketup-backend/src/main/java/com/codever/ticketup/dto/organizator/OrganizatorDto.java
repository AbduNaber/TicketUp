package com.codever.ticketup.dto.organizator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizatorDto {
    private String name;
    private String surname;
    private String organizationName;
    private String email;
}