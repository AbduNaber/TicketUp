package com.codever.ticketup.security;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(@NotNull CorsRegistry registry) {
        registry.addMapping("/**")                  // Tüm endpoint'lere izin verir
                .allowedOrigins("http://46.101.166.170:5173")       // Frontend URL'si
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // İzin verilen HTTP metotları

        registry.addMapping("/ticketup/security-officers/ticket/**") // Match the specific API path
                .allowedOrigins("*")                    // Open to all origins
                .allowedMethods("GET")                  // Allow GET requests only
                .allowedHeaders("*")                    // Allow all headers
                .allowCredentials(false);               // No credentials for public access
    }
}
