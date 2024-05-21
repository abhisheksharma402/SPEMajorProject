package com.spe.project.travelguide.main.Itinerary;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ItineraryRepository extends JpaRepository<ItineraryItemEntity, Integer> {
}
