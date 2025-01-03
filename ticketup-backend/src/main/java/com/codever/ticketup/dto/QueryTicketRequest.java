package com.codever.ticketup.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class QueryTicketRequest {
    private UUID ticketId;
    private String participantEmail;
    private String participantPhone;
}
