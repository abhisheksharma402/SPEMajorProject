package com.spe.project.travelguide.main.dto.response;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationResponse {

    private String email;
    private String firstName;
    private String lastName;

}
