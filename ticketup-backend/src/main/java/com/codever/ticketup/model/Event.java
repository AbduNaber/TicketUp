package com.codever.ticketup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.mail.Part;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "events")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "organizator_id", columnDefinition = "UUID")
    private UUID organizatorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizator_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private Organizator organizator;

    @Column(name = "location")
    private String location;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_date")
    private LocalDateTime createdDate = LocalDateTime.now();

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "event_type")
    private String eventType;

    @Column(name = "event_status")
    private String eventStatus = "AKTİF";

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant> participants = new ArrayList<>();

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", organizatorId=" + organizatorId +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", createdDate=" + createdDate +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", imgUrl='" + imgUrl + '\'' +
                ", eventType='" + eventType + '\'' +
                ", eventStatus='" + eventStatus + '\'' +
                '}';
    }

}
