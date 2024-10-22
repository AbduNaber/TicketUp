package com.codever.ticketup.controller;

import com.codever.ticketup.model.Answer;
import com.codever.ticketup.service.AnswerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/answers")
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping(path = "/list")
    public List<Answer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @GetMapping(path = "/list/{id}")
    public Answer getAnswerById(@PathVariable(name = "id") Long id) {
        return answerService.getAnswerById(id);
    }

    @PutMapping(path = "/update/{id}")
    public Answer updateAnswer(@RequestBody Answer answer, @PathVariable(name = "id") Long id) {
        return answerService.updateAnswer(id,answer);
    }

    @PostMapping(path = "/create")
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.createAnswer(answer);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteAnswer(@PathVariable(name = "id") Long id) {
        answerService.deleteAnswer(id);
    }

}
