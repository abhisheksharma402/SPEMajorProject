package com.spe.project.travelguide.main.Agency;


import com.spe.project.travelguide.main.Agent.AgentEntity;
import com.spe.project.travelguide.main.Agent.AgentRepository;
import com.spe.project.travelguide.main.Itinerary.ItineraryItemEntity;
import com.spe.project.travelguide.main.Itinerary.ItineraryService;
import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Package.PackageRepository;
import com.spe.project.travelguide.main.dto.requests.*;
import com.spe.project.travelguide.main.dto.response.AgencyAuthenticationResponse;
import com.spe.project.travelguide.main.dto.response.AuthenticationResponse;
import com.spe.project.travelguide.main.dto.response.GetAgentsResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agency")
@RequiredArgsConstructor
@Tag(name="Agency")
public class AgencyController {

    private final PackageRepository packageRepository;
    private final ItineraryService itineraryService;
    private final AgencyService agencyService;
    private final AgencyRepository agencyRepository;
    private final AgentRepository agentRepository;

    @PostMapping("/makePackage")
    ResponseEntity<PackageEntity> makePackage(@RequestBody CreatePackageRequest request) throws MessagingException{
        String agentEmail = request.getAgentEmail();
        String agencyEmail = request.getAgencyEmail();

        AgencyEntity agencyEntity = agencyRepository.findByEmail(agencyEmail).orElseThrow(()->new RuntimeException("agency not found!"));
        AgentEntity agentEntity = agentRepository.findByEmail(agentEmail).orElseThrow(()->new RuntimeException("Agent not found!"));
        var packageEntity = PackageEntity.builder()
                .name(request.getName())
                .description(request.getPackageDescription())
                .numberOfDays(request.getNumberOfDays())
                .placesToVisit(request.getPlacesToVisit())
                .numberOfNights(request.getNumberOfNights())
                .destination(request.getDestination())
                .itinerary(request.getItinerary())
                .price(request.getPrice())
                .agency(agencyEntity)
                .agent(agentEntity)
                .build();

        if (packageEntity.getItinerary() != null) {
            for (ItineraryItemEntity itineraryItemEntity : packageEntity.getItinerary()) {
                itineraryItemEntity.setPackageEntity(packageEntity);
            }
        }

        packageRepository.save(packageEntity);

        return ResponseEntity.ok(packageEntity);
    }

    @GetMapping("/agents")
    List<GetAgentsResponse> getAgents(@RequestParam String agencyEmail){
//        String agencyEmail = request.getEmail();
        System.out.println(agencyEmail);
        Optional<AgencyEntity> agencyEntity = agencyRepository.findByEmail(agencyEmail);

        System.out.println(agencyEntity);

        List<AgentEntity> agentEntityList = agencyEntity.get().getAgents();

        List<GetAgentsResponse> getAgentsResponseList = new ArrayList<GetAgentsResponse>();

        for(var agentEntity: agentEntityList){
            var agentEntityResp = GetAgentsResponse.builder()
                    .name(agentEntity.getName())
                    .phoneNumber(agentEntity.getPhoneNumber())
                    .email(agentEntity.getEmail())
                    .build();

            getAgentsResponseList.add(agentEntityResp);
        }

        return getAgentsResponseList;

    }


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid AgencyRegistrationRequest request) throws MessagingException {
        agencyService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AgencyAuthenticationResponse> authenticate(@RequestBody @Valid AgencyAuthenticationRequest authenticationRequest){

        return ResponseEntity.ok(agencyService.authenticate(authenticationRequest));

    }

    @PostMapping("/activate-account")
    public void confirm(@RequestBody @Valid AgencyActivationRequest agencyActivationRequest) throws MessagingException {
        agencyService.activateAccount(agencyActivationRequest);
    }


    @GetMapping("/hello")
    public void sayHello(){
        System.out.println("Hello from a secured endpoint!");
    }


}
