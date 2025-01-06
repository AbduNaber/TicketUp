package com.codever.ticketup.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithAttachment(String toEmail, String subject, String body, File attachment) throws MessagingException, IOException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body, true);
        helper.addAttachment(attachment.getName(), attachment);

        mailSender.send(mimeMessage);
    }

    public void sendVerificationEmail(String recipientEmail, String token) {
        String verificationUrl = "http://localhost:3000/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Verification Email");
        message.setText("Click the link to verify your email: " + verificationUrl);
        mailSender.send(message);
    }

    public void sendMessageFromUser(String toEmail, String subject, String body, String userEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("info.ticketup@gmail.com");
        message.setReplyTo(userEmail);
        mailSender.send(message);
    }


}
