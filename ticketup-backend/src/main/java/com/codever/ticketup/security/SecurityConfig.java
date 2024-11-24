package com.codever.ticketup.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF korumasını devre dışı bırakma
                .authorizeRequests()
                .requestMatchers("/ticketup/organizators/register", "/ticketup/organizators/login", "/ticketup/organizators/delete/**",
                        "ticketup/organizators/list").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic(httpBasic -> httpBasic.disable()) // Basic auth özelliğini devre dışı bırakma
                .formLogin(formLogin -> formLogin.disable()); // Form tabanlı kimlik doğrulamayı devre dışı bırakma
        return http.build();
    }
}
