package com.spe.project.travelguide.main.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AgentAuthenticationResponse {
    private String token;
}
