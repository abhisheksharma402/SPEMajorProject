package com.spe.project.travelguide.main.User;

import com.spe.project.travelguide.main.Booking.BookingEntity;
import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Package.PackageRepository;
import com.spe.project.travelguide.main.dto.requests.BuyPackageRequest;
import com.spe.project.travelguide.main.dto.requests.UserActivationRequest;
import com.spe.project.travelguide.main.dto.response.AuthenticationResponse;
import com.spe.project.travelguide.main.dto.requests.AuthenticationRequest;
import com.spe.project.travelguide.main.dto.requests.RegistrationRequest;
import com.spe.project.travelguide.main.dto.response.GetPackageResponse;
import com.spe.project.travelguide.main.dto.response.RegistrationResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name="User")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final PackageRepository packageRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<RegistrationResponse> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        System.out.println(request.getPassword());
        userService.register(request);
        var registrationResponse = RegistrationResponse.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();

        return ResponseEntity.ok(registrationResponse);

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest authenticationRequest){
        logger.info("Login auth: " + authenticationRequest);
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
        System.out.println(destination);
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


//    @PostMapping("/buyPackage")
//    public ResponseEntity<BookingEntity> buyPakcage(@RequestBody @Valid BuyPackageRequest buyPackageRequest){
//
//
//
//    }


}
