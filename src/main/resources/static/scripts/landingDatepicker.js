var landingAirDatepicker

$(document).ready(function() {
    landingAirDatepicker = new AirDatepicker('#selectDate', {
        range: true,
        multipleDatesSeparator: ' - ',
        minDate: new Date(),
        autoClose: true
        // isMobile: true
    })
});