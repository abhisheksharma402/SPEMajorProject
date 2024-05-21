package com.spe.project.travelguide.main.dto.requests;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AgentRegistrationRequest {
    private String name;

    private String phoneNumber;

    private String email;

    private String password;

    private String agencyEmail;

}
