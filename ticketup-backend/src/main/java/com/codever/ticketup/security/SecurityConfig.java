package com.codever.ticketup.security;


import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private final UserDetailsService userDetailsService;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return  http.cors(withDefaults()).csrf(customizer->customizer.disable()).
                authorizeHttpRequests(request->request
                        .requestMatchers("/ticketup/organizators/login", "/ticketup/organizators/register", "/ticketup/events/list/{id}",
                                "/ticketup/participants/create", "/ticketup/tickets/create", "/ticketup/tickets/list/{id}", "ticketup/participants/list/{id}",
                                "/ticketup/tickets/sendEmail", "/ticketup/auth/verify-email", "/ticketup/participants/delete/{id}", "/ticketup/tickets/delete/{id}", "ticketup/organizators/list/{id}")
                        .permitAll().anyRequest().authenticated())
                .httpBasic(withDefaults())
                .sessionManagement(session->session.sessionCreationPolicy(STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
