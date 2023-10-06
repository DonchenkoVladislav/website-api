$(document).ready(function () {

    let city = document.getElementById('catalog-header-cityName').textContent

    let dateFormHeader = document.getElementById('catalog-header-from').textContent
    let dateToHeader = document.getElementById('catalog-header-to').textContent

    let dateHeader = dateFormHeader + ' - ' + dateToHeader

    let requesrPath = '/catalog?city=' + city + '&date=' + dateHeader


    $.ajax({
        url: requesrPath,
        type: 'POST',
        success: function(catalog) {
            createClustersOnMap(catalog.items)

            let mainImgIdList = []

            catalog.items
                .forEach(item => {
                    mainImgIdList.push(item.mainImageId)
                })

            getMainPhotoList(mainImgIdList, catalog)

        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error(error);
        }
    });
})

function getMainPhotoList(mainImageId, catalog) {
    $.ajax({
        url: '/upload-main-photos?mainImageId=' + mainImageId,
        type: 'GET',
        success: function(response) {
            createApartmentList(catalog, response)
        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error(error);
        }
    });
}

function geAllPhotoListToOneObject(apartmentId, apartmentGalleryId) {
    $.ajax({
        url: '/upload-all-photos-to-object?apartmentId=' + apartmentId,
        type: 'GET',
        success: function(response) {
            let openCardImagePlace = document.getElementById(apartmentId).firstElementChild
            openCardImagePlace.classList.add('gallery')
            openCardImagePlace.id = apartmentGalleryId

            response.forEach(image => {
                createImgToBase64(image.data, openCardImagePlace)
            })
        },
        error: function(xhr, status, error) {
            // Обработка ошибки
            console.error(error);
        }
    });
}