package bookingvkaliningrade.booking.repo;

import bookingvkaliningrade.booking.common.City;
import bookingvkaliningrade.booking.dto.ApartmentDescription;
import bookingvkaliningrade.booking.dto.Place;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static bookingvkaliningrade.booking.common.City.getLinkByName;

public interface PlaceRepository extends CrudRepository<ApartmentDescription, Long> {

    String PATH_TO_IMAGE = "images/foneImages/";

    default List<Place> getAllPlaseList() {
        List<Place> placeList = new ArrayList<>();

        getAllSityList().forEach(city -> {
            int commomSumm = getAllApartmentList().stream()
                    .filter(apartmentDescription -> apartmentDescription.getCity().equals(city))
                    .map(ApartmentDescription::getSpace)
                    .reduce(0, Integer::sum);
            try{
                placeList.add(new Place(city, PATH_TO_IMAGE + getLinkByName(city), commomSumm));
            } catch (IllegalArgumentException e) {
//                Logger.getLogger("В enum City нет города " + city);
            }
        });

        return  placeList;
    }

    private List<String> getAllSityList() {
        return getAllApartmentList().stream().map(ApartmentDescription::getCity).distinct().toList();
    }

    private List<ApartmentDescription> getAllApartmentList() {
        List<ApartmentDescription> apartmentDescriptionList = new ArrayList<>();
        findAll().forEach(a -> apartmentDescriptionList.add(a));
        return apartmentDescriptionList;
    }
}
