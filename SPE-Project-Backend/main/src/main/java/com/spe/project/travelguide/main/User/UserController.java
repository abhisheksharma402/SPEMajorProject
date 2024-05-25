package com.spe.project.travelguide.main.User;

import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Package.PackageRepository;
import com.spe.project.travelguide.main.dto.requests.UserActivationRequest;
import com.spe.project.travelguide.main.dto.response.AuthenticationResponse;
import com.spe.project.travelguide.main.dto.requests.AuthenticationRequest;
import com.spe.project.travelguide.main.dto.requests.RegistrationRequest;
import com.spe.project.travelguide.main.dto.response.GetPackageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name="User")
public class UserController {

    private final UserService userService;
    private final PackageRepository packageRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        userService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest authenticationRequest){
        return ResponseEntity.ok(userService.authenticate(authenticationRequest));
    }

    @PostMapping("/activate-account")
    public void confirm(@RequestBody @Valid UserActivationRequest userActivationRequest) throws MessagingException {
        userService.activateAccount(userActivationRequest);
    }

    @GetMapping("/hello")
    public void sayHello(){
        System.out.println("Hello from a secured endpoint!");
    }


    @GetMapping("/packages")
    public ResponseEntity<List<GetPackageResponse>> getPackages(@RequestParam @Valid String destination){
        List<PackageEntity> packageEntityList = packageRepository.findByDestination(destination);

        List<GetPackageResponse> response = new ArrayList<>();

        for(var packageEntity: packageEntityList){
            var getPackageResp = GetPackageResponse.builder()
                    .description(packageEntity.getDescription())
                    .id(packageEntity.getId())
                    .name(packageEntity.getName())
                    .destination(packageEntity.getDestination())
                    .price(packageEntity.getPrice())
                    .placesToVisit(packageEntity.getPlacesToVisit())
                    .numberOfDays(packageEntity.getNumberOfDays())
                    .numberOfNights(packageEntity.getNumberOfNights())
                    .agency(packageEntity.getAgency())
                    .agent(packageEntity.getAgent())
                    .itinerary(packageEntity.getItinerary())
                    .build();
            response.add(getPackageResp);
        }

        return ResponseEntity.ok(response);

    }



}
