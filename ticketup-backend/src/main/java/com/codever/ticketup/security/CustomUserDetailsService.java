package com.codever.ticketup.security;

import com.codever.ticketup.exception.OrganizatorNotFoundException;
import com.codever.ticketup.model.Organizator;
import com.codever.ticketup.model.OrganizatorPrincipal;
import com.codever.ticketup.repository.OrganizatorRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;




@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final OrganizatorRepository organizatorRepository;

    public UserDetails loadUserByUsername(String email) throws OrganizatorNotFoundException{
        Organizator organizator = organizatorRepository.findByEmail(email);
        if(organizator == null){
            System.out.println("Organizator not found");
            throw new OrganizatorNotFoundException(email);
        }

        return new OrganizatorPrincipal(organizator);
    }


}
