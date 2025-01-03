package com.codever.ticketup.controller;

import java.io.IOException; // Doğru olan IOException

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("ticketup/files")
public class FileUploadController {
    private static final String UPLOAD_DIR = "/home/ticketup/TicketUp/ticketup-ui/public/db_images/";
    private static final String UPLOAD_PROFILE_DIR = "/home/ticketup/TicketUp/ticketup-ui/public/db_images/";



    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);

            if(!Files.exists(Paths.get(UPLOAD_DIR))) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/db_images/" + fileName;
            return ResponseEntity.ok().body("{\"url\": \"" + fileUrl + "\"}");
        }catch (IOException e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Dosya yüklenirken hata oluştu.\"}");
        }
    }

    @PostMapping("/upload-pp")
    public ResponseEntity<?> uploadProfilePhoto(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_PROFILE_DIR + fileName);

            if(!Files.exists(Paths.get(UPLOAD_PROFILE_DIR))) {
                Files.createDirectories(Paths.get(UPLOAD_PROFILE_DIR));
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/db_pp_images/" + fileName;
            return ResponseEntity.ok().body("{\"url\": \"" + fileUrl + "\"}");
        }catch (IOException e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Dosya yüklenirken hata oluştu.\"}");
        }
    }
}
