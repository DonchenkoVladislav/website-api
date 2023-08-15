package bookingvkaliningrade.booking.controllers;

import bookingvkaliningrade.booking.dto.Place;
import bookingvkaliningrade.booking.repo.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class LandingController {

    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/")
    public String getLanding() {
        return "landing";
    }

    @GetMapping("/places")
    public @ResponseBody List<Place> getPlaces() {
        return placeRepository.getAllPlaseList();
    }

}
