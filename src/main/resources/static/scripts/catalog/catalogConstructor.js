function createApartmentList(response, mainPhotoList) {

    let mainPhotoListCurrent = mainPhotoList

    let catalogPlace = document.getElementById('catalog-body-apartments')

    console.log("Длина")
    console.log(mainPhotoList.length)

    response.items
        .forEach(item => {
            //Создаем карточку объекта
            let card = document.createElement('section')
            card.classList.add('apartmentCard')

            //Генерим метсо для фото
            let mainPhotoPlace = document.createElement('article')
            mainPhotoPlace.classList.add('apartmentMainPhotoPlace')
            mainPhotoPlace.id = item.mainImageId

            //Достаем с помощью фильтрации необходимый элемент, сожержащий главное фото объекта
            let mainPhotoObjForCurrentApartment = mainPhotoListCurrent.filter(mainPhoto => mainPhoto.imgId === item.mainImageId)
            let mainPhotoForCurrentApartment = mainPhotoObjForCurrentApartment[0].resource

            //Конвертируем base64 в изображение и помещаем его в элемент для главного фото
            const imgElement = document.createElement('img');
            imgElement.className = 'photoElements'
            imgElement.src = `data:image/jpeg;base64, ${mainPhotoForCurrentApartment}`;
            imgElement.alt = 'Здесь должно быть фото квартиры';
            mainPhotoPlace.append(imgElement);

            //Удаляем элемент с главныи фото из массива, чтобы не передирать его в новом фильтре
            let index = mainPhotoListCurrent.findIndex(item => item === mainPhotoObjForCurrentApartment[0]);
            mainPhotoListCurrent.splice(index, 1)

            //Генерим название квартиры
            let apartmentName = createElement('span', 'apartmentName', item.name)

            //Генерим стоимость квартиры
            let apartmentPrice = createElement('span', 'apartmentPrice', item.summary + " ₽")

            //Все, ранее созданные элементы, помещаем в карточку объекта
            card.append(
                mainPhotoPlace,
                apartmentName,
                apartmentPrice
            )

            catalogPlace.append(card)
        })
}

function createElement(tag, className, responseField) {
    let element = document.createElement(tag)
    element.classList.add(className)
    element.innerHTML = responseField

    return element;
}