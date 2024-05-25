package com.spe.project.travelguide.main.dto.response;


import com.spe.project.travelguide.main.Agency.AgencyEntity;
import com.spe.project.travelguide.main.Agent.AgentEntity;
import com.spe.project.travelguide.main.Itinerary.ItineraryItemEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GetPackageResponse {

    private Integer id;

    private String name;

    private String destination;

    private int numberOfDays;

    private double price;

    private int numberOfNights;

    private String placesToVisit;

    private String description;

    private List<ItineraryItemEntity> itinerary;

    private AgencyEntity agency;

    private AgentEntity agent;

}
