package com.codever.ticketup.dto.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private UUID id;
    private UUID organizatorId;
    private String name;
    private String location;
    private String description;
    private Date startDate;
    private Date endDate;
    private Double latitude;
    private Double longitude;
    private LocalTime startTime;
    private LocalTime endTime;
    private String imgUrl;
    private String eventType;
    private String eventStatus;
    private String organizatorName;
    private String organizatorSurname;
    private String organizatorEmail;
    private String organizatorCompany;
    private String organizatorProfilePicture;
}
