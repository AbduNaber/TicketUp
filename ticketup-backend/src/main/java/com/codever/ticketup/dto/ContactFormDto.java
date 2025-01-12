package com.codever.ticketup.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactFormDto {
    private String firstName;
    private String lastName;
    private String email;
    private String message;
}
