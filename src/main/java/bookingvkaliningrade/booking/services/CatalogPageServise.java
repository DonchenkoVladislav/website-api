package bookingvkaliningrade.booking.services;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class CatalogPageServise {

    public static String getServiseCatalogPage(String city, List<String> date, Model page) {
        page.addAttribute("cityByServise", city);
        page.addAttribute("fromByServise", date.get(0));
        page.addAttribute("toByServise", date.get(1));
        page.addAttribute("durationByServise", city);

        return "catalog";
    }

}
