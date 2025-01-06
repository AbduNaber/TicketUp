package com.codever.ticketup.controller;

import com.codever.ticketup.dto.ContactFormDto;
import com.codever.ticketup.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("ticketup/contact")
public class ContactUsController {

    private final EmailService emailService;

    @PostMapping("/send-mail")
    public String sendContactEmail(@RequestBody ContactFormDto contactFormDto){
        String to = "info.ticketup@gmail.com";
        String subject = "Yeni iletişim formu mesajı";
        String userEmail = contactFormDto.getEmail();
        String body = "İsim: " + contactFormDto.getFirstName() + "\n" +
                "Soyisim: " + contactFormDto.getLastName() + "\n" +
                "E-posta: " + contactFormDto.getEmail() + "\n" +
                "Mesaj: " + contactFormDto.getMessage();
        emailService.sendMessageFromUser(to, subject, body, userEmail);
        return "Mesaj Gönderildi";
    }


}
