package com.spe.project.travelguide.main.dto.requests;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyPackageRequest {
    private Integer packageId;
    private Integer userId;
}
