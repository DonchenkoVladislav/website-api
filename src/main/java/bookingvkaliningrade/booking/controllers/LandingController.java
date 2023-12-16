package bookingvkaliningrade.booking.controllers;

import bookingvkaliningrade.booking.services.CatalogPageServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class LandingController {

    @Autowired
    private CatalogPageServise catalogPageServise;

    @GetMapping("/")
    public String getLanding() {
        return "landing";
    }

    @GetMapping("/catalog")
    public String getCatalogPage(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) List<String> date,
            Model page) {

        return catalogPageServise.getServiseCatalogPage(city, date, page);
    }

    @PostMapping("/catalog")
    public @ResponseBody Object getApartmentList(@RequestParam(required = false) String city,
                                                 @RequestParam(required = false) String date) {
        //Делаем запрос к catalog-api
        return catalogPageServise.getEmployees(city, date).getBody();
    }

    // Отправить главные фото для отображения
    @RequestMapping(value = "/upload-main-photos", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<Object> getMainPhoto(
            @RequestParam("mainImageId") String mainPhotoidList) {

        return catalogPageServise.getEmployeeMainPhotos(mainPhotoidList);
    }

    // Отправить все фото для отображение на раскрытой карточке объекта
    @RequestMapping(value = "/upload-all-photos-to-object", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<Object> getAllPhotoToObject(
            @RequestParam("apartmentId") String apartmentId) {

        return catalogPageServise.getEmployeeAllPhotoToObject(apartmentId);
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

        return catalogPageServise.getFullApartmentInfoByIdAndDate(apartmentId, apartmentDate);
    }
}
