package com.spe.project.travelguide.main.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetAgentsResponse {
    private String name;
    private String email;
    private String phoneNumber;
}
