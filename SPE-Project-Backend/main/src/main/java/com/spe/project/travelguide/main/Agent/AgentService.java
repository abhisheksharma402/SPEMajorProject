package com.spe.project.travelguide.main.Agent;

import com.spe.project.travelguide.main.Agency.AgencyEntity;
import com.spe.project.travelguide.main.Agency.AgencyRepository;
import com.spe.project.travelguide.main.Agent.AgentRepository;
import com.spe.project.travelguide.main.Security.JwtService;
import com.spe.project.travelguide.main.dto.requests.*;
import com.spe.project.travelguide.main.dto.response.AgencyAuthenticationResponse;
import com.spe.project.travelguide.main.dto.response.AgentAuthenticationResponse;
import com.spe.project.travelguide.main.email.EmailService;
import com.spe.project.travelguide.main.email.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AgentService {

    private final PasswordEncoder passwordEncoder;
    private final AgentRepository agentRepository;
    private final AgencyRepository agencyRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;


    public void register(@Valid AgentRegistrationRequest request) throws MessagingException {
        String agencyEmail = request.getAgencyEmail();

        AgencyEntity agencyEntity = agencyRepository.findByEmail(agencyEmail).orElseThrow(()->new RuntimeException("Agency not found!"));

        var agent = AgentEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .isVerified(false)
                .agency(agencyEntity)
                .build();

        agentRepository.save(agent);
        sendEmailValidation(agent);
    }

    public AgentAuthenticationResponse authenticate(@Valid AgentAuthenticationRequest agentAuthenticationRequest) {

        System.out.println("hello");

        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        agentAuthenticationRequest.getEmail(),
                        agentAuthenticationRequest.getPassword()
                )
        );

        System.out.println("auth: "+auth);

        var claims = new HashMap<String, Object>();

        var agent = ((AgentEntity)auth.getPrincipal());

        System.out.println(agent);

        claims.put("fullName", agent.getName());
        var jwtToken = jwtService.generateToken(claims, agent);

        return AgentAuthenticationResponse.builder().token(jwtToken).build();

    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for(int i=0;i<length;i++){
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();

    }


    private String generateAndSaveActivationToken(AgentEntity agentEntity) {
        String generatedToken = generateActivationCode(6);
        agentEntity.setActivationToken(generatedToken);
        agentEntity.setTokenCreationTime(LocalDateTime.now());
        System.out.println("saving agent after updating token and creation time");
        System.out.println(agentEntity);
        System.out.println(agentEntity.getId());
        agentRepository.save(agentEntity);
        return generatedToken;
    }

    private void sendEmailValidation(AgentEntity agent) throws MessagingException {

        var newToken = generateAndSaveActivationToken(agent);
        // send email
        emailService.sendEmail(
                agent.getEmail(),
                agent.getName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Travel Guide Account Activation"
        );

    }

//    @Transactional
    public void activateAccount(AgentActivationRequest agentActivationRequest) throws MessagingException {
        String email = agentActivationRequest.getEmail();
        String activationToken = agentActivationRequest.getActivationToken();
        AgentEntity agent = agentRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("Agent not found"));

        if(!Objects.equals(activationToken, agent.getActivationToken())){
            throw new RuntimeException("Invalid Token!");
        }

        if(Duration.between(agent.getTokenCreationTime(), LocalDateTime.now()).getSeconds() > 5*60){
            sendEmailValidation(agent);
            throw new RuntimeException("Activation Token has expired. A new token has been sent to the same email address");
        }


        agent.setIsVerified(true);
        agent.setVerifiedAt(LocalDateTime.now());
        agentRepository.save(agent);

    }



}
