package com.codever.ticketup.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "question_text")
    private String questionText;

    @Column(name = "question_type")
    private String questionType;
}
