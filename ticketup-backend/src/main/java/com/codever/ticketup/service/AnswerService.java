package com.codever.ticketup.service;


import com.codever.ticketup.model.Answer;
import com.codever.ticketup.repository.AnswerRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Getter
@Setter
public class AnswerService {

    private final AnswerRepository answerRepository;

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Answer getAnswerById(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find answer with id: " + id));
    }

    public Answer updateAnswer(Answer answer) {
        return answerRepository.findById(answer.getId()).map(
                answer1 -> {
                    answer1.setResponseText(answer.getResponseText());
                    answer1.setParticipantId(answer.getParticipantId());
                    answer1.setQuestionId(answer.getQuestionId());
                    return answerRepository.save(answer1);
                }
        ).orElseThrow(() -> new RuntimeException("Could not find answer with id: " + answer.getId()));

    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }
}
