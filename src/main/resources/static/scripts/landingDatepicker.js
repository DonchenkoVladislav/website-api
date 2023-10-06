var landingAirDatepicker

$(document).ready(function() {
    if (window.matchMedia(MOBILE).matches) {
        landingAirDatepicker = new AirDatepicker('#selectDate', {
            range: true,
            multipleDatesSeparator: ' - ',
            minDate: new Date(),
            autoClose: true,
            isMobile: true
        })
    } else {
        landingAirDatepicker = new AirDatepicker('#selectDate', {
            range: true,
            multipleDatesSeparator: ' - ',
            minDate: new Date(),
            autoClose: true,
            // isMobile: true
        })
    }

});