$(document).ready(function() {
    new AirDatepicker('#selectDate', {
        range: true,
        multipleDatesSeparator: ' - ',
        minDate: new Date(),
        autoClose: true
        // isMobile: true
    })
});