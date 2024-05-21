package com.spe.project.travelguide.main.dto.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AgencyRegistrationRequest {
    @NotEmpty(message = "Name is mandatory")
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotEmpty(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @NotEmpty(message = "Password is mandatory")
    @NotBlank(message = "Password is mandatory")
    private String password;

    @NotEmpty(message = "Phone Number is mandatory")
    @NotBlank(message = "Phone Number is mandatory")
    private Long phoneNumber;

    @NotEmpty(message = "Address is mandatory")
    @NotBlank(message = "Address is mandatory")
    private String address;

    @NotEmpty(message = "License Number is mandatory")
    @NotBlank(message = "License Number is mandatory")
    private String licenseNumber;

    @NotEmpty(message = "Email Domain is mandatory")
    @NotBlank(message = "Email Domain is mandatory")
    private String emailDomain;

}
