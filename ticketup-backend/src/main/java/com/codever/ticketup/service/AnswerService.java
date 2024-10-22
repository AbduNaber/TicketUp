package com.codever.ticketup.service;


import com.codever.ticketup.model.Answer;
import com.codever.ticketup.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Answer getAnswerById(Long id) {
        return answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find answer with id: " + id));
    }

    public Answer updateAnswer(Long id, Answer answer) {
        Answer existingAnswer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find answer with id: " + id));

        existingAnswer.setParticipantId(answer.getParticipantId());
        existingAnswer.setQuestionId(answer.getQuestionId());
        existingAnswer.setResponseText(answer.getResponseText());
        return answerRepository.save(existingAnswer);
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(Long id) {
        answerRepository.deleteById(id);
    }
}
