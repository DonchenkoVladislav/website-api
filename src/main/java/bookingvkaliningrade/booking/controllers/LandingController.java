package bookingvkaliningrade.booking.controllers;

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

        return getEmployeeMainPhotos(mainPhotoidList);
    }

    // Отправить все фото для отображение на раскрытой карточке объекта
    @RequestMapping(value = "/upload-all-photos-to-object", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<Object> getAllPhotoToObject(
            @RequestParam("apartmentId") String apartmentId) {

        return getEmployeeAllPhotoToObject(apartmentId);
    }

    @GetMapping("/apartment")
    public String getApartmentPage(
            @RequestParam("apartmentId") String apartmentId,
            @RequestParam("apartmentDate") String apartmentDate,
            Model page) {

        page.addAttribute("apartmentIdElement", apartmentId);
        page.addAttribute("apartmentDateElement", apartmentDate);

        return "apartment";
    }

    @GetMapping("/apartment-info")
    public @ResponseBody ResponseEntity<Object> getApartmentInfo(
            @RequestParam("apartmentId") String apartmentId,
            @RequestParam("apartmentDate") String apartmentDate) {

        return getFullApartmentInfoByIdAndDate(apartmentId, apartmentDate);
    }

    private static ResponseEntity<Object> getEmployees(String city, String date) {

        final String url = String.format(HOST + "/catalog?city=%s&date=%s", city, date);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.POST, null, Object.class);
    }

    private static ResponseEntity<Object> getEmployeeMainPhotos(String mainPhotoidList) {

        final String url = String.format(HOST + "/upload-main-photos?mainImageId=%s", mainPhotoidList);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }

    private static ResponseEntity<Object> getEmployeeAllPhotoToObject(String apartmentId) {

        final String url = String.format(HOST + "/upload-all-photos-to-object?apartmentId=%s", apartmentId);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }

    private static ResponseEntity<Object> getFullApartmentInfoByIdAndDate(String apartmentId, String apartmentDate) {

        final String url = String.format(HOST + "/apartment-info?apartmentId=%s&apartmentDate=%s", apartmentId, apartmentDate);
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.exchange(url, HttpMethod.GET, null, Object.class);
    }
}
