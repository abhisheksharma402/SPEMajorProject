package com.spe.project.travelguide.main.Agency;


import com.spe.project.travelguide.main.Itinerary.ItineraryItemEntity;
import com.spe.project.travelguide.main.Itinerary.ItineraryService;
import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Package.PackageRepository;
import com.spe.project.travelguide.main.dto.requests.*;
import com.spe.project.travelguide.main.dto.response.AgencyAuthenticationResponse;
import com.spe.project.travelguide.main.dto.response.AuthenticationResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agency")
@RequiredArgsConstructor
@Tag(name="Agency")
public class AgencyController {

    private final PackageRepository packageRepository;
    private final ItineraryService itineraryService;
    private final AgencyService agencyService;

    @PostMapping("/makePackage")
    ResponseEntity<PackageEntity> makePackage(@RequestBody PackageEntity packageEntity){
        if (packageEntity.getItinerary() != null) {
            for (ItineraryItemEntity itineraryItemEntity : packageEntity.getItinerary()) {
                itineraryItemEntity.setPackageEntity(packageEntity);
            }
        }
        packageRepository.save(packageEntity);

        return ResponseEntity.ok(packageEntity);
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
