package bookingvkaliningrade.booking.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum City {

    KALININGRAD("Калининград", "kaliningrad.png"),
    SVETLOGORST("Светлогорск", ""),
    PIONERSKII("Пионерский", ""),
    YANTARNUI("Янтарный", ""),
    ZELENOGRADSK("Зеленоградск", "zelegradsk.png");

    private String name;
    private String link;
    public static String getLinkByName(String cityName) {
        for (City city : City.values()) {
            if (city.getName().equals(cityName)) {
                return city.getLink();
            }
        }
        return null;
    }

}
