package com.spe.project.travelguide.main.Security;

import com.spe.project.travelguide.main.Agency.AgencyEntity;
import com.spe.project.travelguide.main.Agency.AgencyRepository;
import com.spe.project.travelguide.main.Agent.AgentEntity;
import com.spe.project.travelguide.main.Agent.AgentRepository;
import com.spe.project.travelguide.main.User.UserEntity;
import com.spe.project.travelguide.main.User.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private final AgentRepository agentRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<AgencyEntity> agencyOptional = agencyRepository.findByEmail(userEmail);
        if (agencyOptional.isPresent()) {
            return agencyOptional.get();
        }

        Optional<AgentEntity> agentOptional = agentRepository.findByEmail(userEmail);
        if (agentOptional.isPresent()) {
            return agentOptional.get();
        }

        Optional<UserEntity> userOptional = userRepository.findByEmail(userEmail);
        // No user found with the given email
        return userOptional.orElse(null);

    }

}
