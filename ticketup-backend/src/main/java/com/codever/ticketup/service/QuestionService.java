package com.codever.ticketup.service;

import com.codever.ticketup.model.Question;
import com.codever.ticketup.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Getter
@Setter
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question updateQuestion(Question question) {
        return questionRepository.findById(question.getId()).map(
                question1 -> {
                    question1.setQuestionType(question.getQuestionType());
                    question1.setQuestionText(question.getQuestionText());
                    question1.setEventId(question.getEventId());
                    return questionRepository.save(question1);
                }
        ).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

}
