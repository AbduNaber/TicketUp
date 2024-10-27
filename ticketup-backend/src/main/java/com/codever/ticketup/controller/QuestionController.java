package com.codever.ticketup.controller;

import com.codever.ticketup.model.Question;
import com.codever.ticketup.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/questions")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping(path = "/list")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping(path = "/list/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    @PutMapping(path = "/update")
    public Question updateQuestion(@RequestBody Question question) {
        return questionService.updateQuestion(question);
    }

    @PostMapping(path = "/create")
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
