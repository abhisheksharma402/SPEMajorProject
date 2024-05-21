package com.spe.project.travelguide.main.Agency;

import com.spe.project.travelguide.main.Security.JwtService;
import com.spe.project.travelguide.main.User.UserEntity;
import com.spe.project.travelguide.main.dto.requests.AgencyActivationRequest;
import com.spe.project.travelguide.main.dto.requests.AgencyAuthenticationRequest;
import com.spe.project.travelguide.main.dto.requests.AgencyRegistrationRequest;
import com.spe.project.travelguide.main.dto.requests.UserActivationRequest;
import com.spe.project.travelguide.main.dto.response.AgencyAuthenticationResponse;
import com.spe.project.travelguide.main.email.EmailService;
import com.spe.project.travelguide.main.email.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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
public class AgencyService {

    private final PasswordEncoder passwordEncoder;
    private final AgencyRepository agencyRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(@Valid AgencyRegistrationRequest request) throws MessagingException {
        var user = AgencyEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .licenseNumber(request.getLicenseNumber())
                .emailDomain(request.getEmailDomain())
                .isVerified(false)
                .build();

        agencyRepository.save(user);
        sendEmailValidation(user);
    }


    public AgencyAuthenticationResponse authenticate(@Valid AgencyAuthenticationRequest agencyAuthenticationRequest) {

        System.out.println("hello");

        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        agencyAuthenticationRequest.getEmail(),
                        agencyAuthenticationRequest.getPassword()
                )
        );

        System.out.println("auth: "+auth);

        var claims = new HashMap<String, Object>();

        var agency = ((AgencyEntity)auth.getPrincipal());

        System.out.println(agency);

        claims.put("fullName", agency.getName());
        var jwtToken = jwtService.generateToken(claims, agency);

        return AgencyAuthenticationResponse.builder().token(jwtToken).build();

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

    private String generateAndSaveActivationToken(AgencyEntity agencyEntity) {
        String generatedToken = generateActivationCode(6);
        agencyEntity.setActivationToken(generatedToken);
        agencyEntity.setTokenCreationTime(LocalDateTime.now());
        agencyRepository.save(agencyEntity);
        return generatedToken;
    }

    private void sendEmailValidation(AgencyEntity agency) throws MessagingException {

        var newToken = generateAndSaveActivationToken(agency);
        // send email
        emailService.sendEmail(
                agency.getEmail(),
                agency.getName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Travel Guide Account Activation"
        );
    }

//    @Transactional
    public void activateAccount(AgencyActivationRequest agencyActivationRequest) throws MessagingException {
        String email = agencyActivationRequest.getEmail();
        String activationToken = agencyActivationRequest.getActivationToken();
        AgencyEntity agency = agencyRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("Agency not found"));

        if(!Objects.equals(activationToken, agency.getActivationToken())){
            throw new RuntimeException("Invalid Token!");
        }

        if(Duration.between(agency.getTokenCreationTime(), LocalDateTime.now()).getSeconds() > 5*60){
            sendEmailValidation(agency);
            throw new RuntimeException("Activation Token has expired. A new token has been sent to the same email address");
        }


        agency.setIsVerified(true);
        agency.setVerifiedAt(LocalDateTime.now());
        agencyRepository.save(agency);

    }



}
