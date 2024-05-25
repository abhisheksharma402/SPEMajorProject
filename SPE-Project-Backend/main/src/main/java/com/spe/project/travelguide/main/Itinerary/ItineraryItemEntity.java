package com.spe.project.travelguide.main.Itinerary;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.spe.project.travelguide.main.Package.PackageEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "itinerary_item")
public class ItineraryItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime dateTime;

    private String description;

    @ManyToOne
    @JoinColumn(name = "package_id")
    @JsonBackReference
    private PackageEntity packageEntity;

}
