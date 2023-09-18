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

function getMainPhotos(mainImageId) {
    // Получение списка картинок из сервера
    fetch('/upload-main-photos?mainImageId=' + mainImageId)
        .then(response => response.json())
        .then(data => {
            // const imagesContainer = document.getElementById(elementId);
            // document.getElementsByClassName('dash')[0].remove();

            // Цикл для создания и добавления каждой картинки
            data.forEach(imageData => {
                const imgElement = document.createElement('img');
                imgElement.className = 'photoElements'
                imgElement.src = `data:image/jpeg;base64, ${imageData}`;
                imgElement.alt = 'Здесь должно быть фото квартиры';
                // imagesContainer.append(imgElement);
            });
        })
        .catch(error => console.log(error));
}