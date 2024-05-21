package com.spe.project.travelguide.main.Itinerary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;

    @Autowired
    public ItineraryService(ItineraryRepository itineraryRepository){
        this.itineraryRepository = itineraryRepository;
    }


    public void makeItinerary(List<ItineraryItemEntity> itinerary){
        itineraryRepository.saveAll(itinerary);
    }


}
