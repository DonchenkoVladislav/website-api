function getApartmentInfo(apartmentId, dates) {
    $.ajax({
        url: '/apartment-info?apartmentId=' + apartmentId + APARTMENT_DATE_PARAM + dates,
        type: 'GET',
        success: function(response) {
            createApartmentPage(response)
        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error(error);
        }
    });
}