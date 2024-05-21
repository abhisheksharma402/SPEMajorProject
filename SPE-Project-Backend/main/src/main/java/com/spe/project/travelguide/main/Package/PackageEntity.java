package com.spe.project.travelguide.main.Package;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spe.project.travelguide.main.Agency.AgencyEntity;
import com.spe.project.travelguide.main.Agent.AgentEntity;
import com.spe.project.travelguide.main.Itinerary.ItineraryItemEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="package")
public class PackageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private int numberOfDays;

    @Column(nullable=false)
    private double price;

    @Column(nullable = false)
    private int numberOfNights;

    @Column(nullable = false)
    private String placesToVisit;

    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "packageEntity", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "itinerary-package")
    private List<ItineraryItemEntity> itinerary;

    @ManyToOne
    @JoinColumn(name="agency_id")
    @JsonBackReference(value="agency-package")
    private AgencyEntity agency;

    @ManyToOne
    @JoinColumn(name="agent_id")
    @JsonBackReference(value = "agent-package")
    private AgentEntity agent;

}
