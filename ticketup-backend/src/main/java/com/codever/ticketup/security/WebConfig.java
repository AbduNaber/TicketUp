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
    }
}
