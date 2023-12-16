package bookingvkaliningrade.booking.services;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CatalogPageServise {

    private static final String HOST = "http://localhost:8083";

    public String getServiseCatalogPage(String city, List<String> date, Model page) {
        page.addAttribute("cityByServise", city);
        page.addAttribute("fromByServise", date.get(0));
        page.addAttribute("toByServise", date.get(1));
        page.addAttribute("durationByServise", city);

        return "catalog";
    }

    public ResponseEntity<Object> getEmployees(String city, String date) {

        final String url = String.format(HOST + "/catalog?city=%s&date=%s", city, date);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.POST, null, Object.class);
    }

    public ResponseEntity<Object> getEmployeeMainPhotos(String mainPhotoidList) {

        final String url = String.format(HOST + "/upload-main-photos?mainImageId=%s", mainPhotoidList);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }

    public ResponseEntity<Object> getEmployeeAllPhotoToObject(String apartmentId) {

        final String url = String.format(HOST + "/upload-all-photos-to-object?apartmentId=%s", apartmentId);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }

    public ResponseEntity<Object> getFullApartmentInfoByIdAndDate(String apartmentId, String apartmentDate) {

        final String url = String.format(HOST + "/apartment-info?apartmentId=%s&apartmentDate=%s", apartmentId, apartmentDate);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }
}
