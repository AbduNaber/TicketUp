package com.codever.ticketup.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/pages")
public class PageController {

    final
    @GetMapping("/{pageName}")
    public ResponseEntity<String> getPage(@PathVariable("pageName") String pageName) {
        return ResponseEntity.ok("Content for: " + pageName);
    }


}
