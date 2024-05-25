package com.spe.project.travelguide.main.User;

import com.spe.project.travelguide.main.Package.PackageEntity;
import com.spe.project.travelguide.main.Package.PackageRepository;
import com.spe.project.travelguide.main.Security.JwtService;
import com.spe.project.travelguide.main.dto.requests.AuthenticationRequest;
import com.spe.project.travelguide.main.dto.response.AuthenticationResponse;
import org.junit.jupiter.api.Test;
import com.spe.project.travelguide.main.dto.requests.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PackageRepository packageRepository;

    @Test
    @WithMockUser
    void register() throws Exception{
        RegistrationRequest registrationRequest = new RegistrationRequest();
        registrationRequest.setEmail("test@example.com");
        registrationRequest.setFirstName("test");
        registrationRequest.setLastName("example");
        registrationRequest.setPassword("1234");

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("test@example.com");
        userEntity.setFirstName("test");
        userEntity.setLastName("example");

        when(userService.register(registrationRequest)).thenReturn(userEntity);

        mockMvc.perform(post("/user/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf()) // Add CSRF token
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"firstName\":\"test\", \"lastName\": \"example\", \"password\":\"1234\",\"email\":\"test@example.com\"}"))
                .andExpect(status().isAccepted());
    }


    @Test
    @WithMockUser
    void authenticate() throws Exception {

        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        when(userService.authenticate(any(AuthenticationRequest.class))).thenReturn(authenticationResponse);

        mockMvc.perform(post("/user/login")
                        .with(SecurityMockMvcRequestPostProcessors.csrf()) // Add CSRF token
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test@example.com\",\"password\":\"password\"}"))
                .andExpect(status().isOk());

    }
//
//    @Test
//    void confirm() {
//    }
//
    @Test
    @WithMockUser
    void sayHello() throws Exception {
        mockMvc.perform(get("/user/hello").with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk());
    }
//
    @Test
    @WithMockUser
    void getPackages() throws Exception {
        PackageEntity packageEntity = new PackageEntity();
        packageEntity.setId(30);
        packageEntity.setName("Test Package");
        packageEntity.setDestination("port blair");

        when(packageRepository.findByDestination(any(String.class))).thenReturn(List.of(packageEntity));

        mockMvc.perform(get("/user/packages")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("destination", "port blair"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Package"));
    }
}