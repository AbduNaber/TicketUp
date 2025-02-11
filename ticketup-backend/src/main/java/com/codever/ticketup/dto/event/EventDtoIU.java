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
public class EventDtoIU {
    private String name;
    private UUID organizatorId;
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

    @Override
    public String toString() {
        return "EventCreateDto{" +
                "name='" + name + '\'' +
                ", organizatorId=" + organizatorId +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", imgUrl='" + imgUrl + '\'' +
                ", eventType='" + eventType + '\'' +
                '}';
    }

}
