package com.spe.project.travelguide.main.dto.requests;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AgentActivationRequest {

    private String email;
    private String activationToken;
//    @Override
//    public String toString()
}
