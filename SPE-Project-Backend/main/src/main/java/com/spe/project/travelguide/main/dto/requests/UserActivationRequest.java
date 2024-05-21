package com.spe.project.travelguide.main.dto.requests;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserActivationRequest {

    private String email;
    private String activationToken;

}
