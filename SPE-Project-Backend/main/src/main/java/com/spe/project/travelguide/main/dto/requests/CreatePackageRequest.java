package com.spe.project.travelguide.main.dto.requests;

import com.spe.project.travelguide.main.Itinerary.ItineraryItemEntity;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class CreatePackageRequest {
    private String name;

    private String destination;

    private int numberOfDays;

    private double price;

    private int numberOfNights;

    private String placesToVisit;

    private String packageDescription;

    private String agencyEmail;

    private String agentEmail;

    private List<ItineraryItemEntity> itinerary;

}
