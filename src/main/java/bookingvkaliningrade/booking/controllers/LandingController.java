package bookingvkaliningrade.booking.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static bookingvkaliningrade.booking.services.CatalogPageServise.getServiseCatalogPage;

@Controller
public class LandingController {

    private static final String HOST = "http://localhost:8083";

    @GetMapping("/")
    public String getLanding() {
        return "landing";
    }

    @GetMapping("/catalog")
    public String getCatalogPage(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) List<String> date,
            Model page) {

        return getServiseCatalogPage(city, date, page);
    }

    @PostMapping("/catalog")
    public @ResponseBody Object getApartmentList(@RequestParam(required = false) String city,
                                                 @RequestParam(required = false) String date) {
        //Делаем запрос к catalog-api
        return getEmployees(city, date).getBody();
    }

    // Отправить главные фото для отображения
    @RequestMapping(value = "/upload-main-photos", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<Object> getMainPhoto(
            @RequestParam("mainImageId") String mainPhotoidList) {

        return getEmployeeMainPhotoss(mainPhotoidList);
    }

    private static ResponseEntity<Object> getEmployees(String city, String date) {

        final String url = String.format(HOST + "/catalog?city=%s&date=%s", city, date);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.POST, null, Object.class);
    }

    private static ResponseEntity<Object> getEmployeeMainPhotoss(String mainPhotoidList) {

        final String url = String.format(HOST + "/upload-main-photos?mainImageId=%s", mainPhotoidList);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }
}
