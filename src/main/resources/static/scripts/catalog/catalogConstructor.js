const FULL_ATRIBUTE_CAtALOG_ROW_CLASS = "apartmentAtributeInOpenCard"
const FULL_ATRIBUTE_CAtALOG_CLASS = 'fullCatalogAtribute'

function createApartmentList(response, mainPhotoList) {

    let mainPhotoListCurrent = mainPhotoList
    let catalogPlace = document.getElementById('catalog-body-apartments')

    //Создаем кнопки перемещения каталога вниз (для открытия карты) и определяем ее функцию
    if (window.matchMedia("(max-width: 1000px)").matches) {
        createPopUpCloseButton(
            catalogPlace,
            function () {
                showFullMap()
            },
            true
        )
    }

    //Создаем список обхектов в каталоге
    response.items.forEach(item => {
        //Создаем карточку объекта
        let card = document.createElement('section')
        card.classList.add('apartmentCard')
        card.id = item.id

        //Генерим метсо для фото
        let mainPhotoPlace = document.createElement('article')
        mainPhotoPlace.classList.add('apartmentMainPhotoPlace')
        mainPhotoPlace.id = item.mainImageId

        //Достаем с помощью фильтрации необходимый элемент, сожержащий главное фото объекта
        let mainPhotoObjForCurrentApartment = mainPhotoListCurrent.filter(mainPhoto => mainPhoto.imgId === item.mainImageId)
        let mainPhotoForCurrentApartment = mainPhotoObjForCurrentApartment[0].resource

        //Конвертируем base64 в изображение и помещаем его в элемент для главного фото
        createImgToBase64(mainPhotoForCurrentApartment, mainPhotoPlace)
        // const imgElement = document.createElement('img');
        // imgElement.className = 'photoElements'
        // imgElement.src = `data:image/jpeg;base64, ${mainPhotoForCurrentApartment}`;
        // imgElement.alt = 'Здесь должно быть фото квартиры';
        // mainPhotoPlace.append(imgElement);

        //Удаляем элемент с главныи фото из массива, чтобы не передирать его в новом фильтре
        let index = mainPhotoListCurrent.findIndex(item => item === mainPhotoObjForCurrentApartment[0]);
        mainPhotoListCurrent.splice(index, 1)

        //Генерим название квартиры
        let apartmentName = createElement('span', 'apartmentName', item.name)

        //Генерим стоимость квартиры
        let apartmentPrice = createElement('span', 'apartmentPrice', item.summary + " ₽")

        //Генерим строку внизу карточки квартиры
        let apartmentAtribute = createElement('section', 'apartmentAtribute', "")

        //Площадь
        let apartmentSpace = createComboElement('space.svg', 'apartmentComboElementValue', item.space + " м²")

        //Кровати
        let bedCount = item.beds.split(",").length
        let apartmentBeds = createComboElement('bed.svg', 'apartmentComboElementValue', bedCount)

        //Сдеатся от
        let apartmentFromDay
        //Проверяем, что квартира сдается от 2-х дней и тогда показываем это
        if (item.fromDay > 1) {
            apartmentFromDay = createComboElement('none', 'apartmentComboElementValue', "Сдается от " + item.fromDay + " дней")
        } else {
            apartmentFromDay = null
        }

        //Наполняем строку с атрибутами
        apartmentAtribute.append(
            apartmentSpace,
            apartmentBeds,
            apartmentFromDay
        )

        //Все, ранее созданные элементы, помещаем в карточку объекта
        card.append(
            mainPhotoPlace,
            apartmentName,
            apartmentPrice,
            apartmentAtribute
        )

        // Обработка тапа для мобилки
        if (window.matchMedia("(max-width: 1000px)").matches) {
            tapOnCard(mainPhotoPlace, item)
        }

        catalogPlace.append(card)
    })
}

//Анимации увеличения/уменьшения карточек объектов и их фотографий при тапе на фотограцию карточки объекта
function tapOnCard(el, item) {
    el.addEventListener('click', function (event) {

        closeAndOpenCard(item, el, TIME_TO_FASTEST_ANIMATION)

        let apartmentGalleryId = 'gallery-' + item.id

        if (!document.getElementById(apartmentGalleryId)) {
            geAllPhotoListToOneObject(item.id, apartmentGalleryId)
        }
    })
}

const OPEN_CARD = 'increaseCard'
const OPEN_IMAGE_OF_CARD = 'increaseImg'

function closeAndOpenCard(item, photoPlace, animationTime) {
    removeContextButtons()

    //Определили родителя photoPlace (карточка объекта)
    let cardObject = photoPlace.parentElement;

    //Если карточка закрыта
    if (!photoPlace.classList.contains(OPEN_IMAGE_OF_CARD)) {

        //Вешаем анимации открытия (увеличения размера) карточки и фото
        cardObject.style = "animation: increaseScale " + animationTime + "s ease-in-out;";
        photoPlace.style = "animation: increaseScaleImg " + animationTime + "s ease-in-out;";

        //Добавляем класс с увеличенными размерами
        setTimeout(function () {
            cardObject.classList.add(OPEN_CARD);
            photoPlace.classList.add(OPEN_IMAGE_OF_CARD);
        }, animationTime * 1000)

        //Скрываем атрибуты с закрытой карточки объекта
        getCardChildren(cardObject).forEach(atribute => {
            atribute.style = "animation: " + SLIDE_OUT +  " " + animationTime + "s ease-in-out;";
            //Добавляем класс с display: none
            setTimeout(() => atribute.classList.add(NONE_DISPLAY), animationTime * 1000)
        })

        //Создаем нихжнюю строку открытой карточки с кнопочками
        let atributeRowInOpenCard = createAtributeRowInOpenCard(item)
        atributeRowInOpenCard.classList.add(START_OPACITY)
        cardObject.append(atributeRowInOpenCard)
        setTimeout(
            () => atributeRowInOpenCard.style = "animation: " + APPEARANCE +  " " + animationTime + "s ease-in-out;",
            animationTime * 1000)
        setTimeout(
            () => atributeRowInOpenCard.classList.remove(START_OPACITY),
            animationTime * 1000 * 2)

    }
    else {
        closeCard(photoPlace, animationTime)
        returnCardAtribute(photoPlace, animationTime)
    }

    if (document.getElementsByClassName(OPEN_IMAGE_OF_CARD).length > 0 || photoPlace.classList.contains(OPEN_IMAGE_OF_CARD)) {
        //Находим все элементы, сордержащие фотограции открытых карточек
        let openCardPhotoList = document.getElementsByClassName(OPEN_IMAGE_OF_CARD)
        //Закрываем каждыую открытую карточку
        Array.from(openCardPhotoList).forEach(obj => {
            closeCard(obj, animationTime)
            returnCardAtribute(obj, animationTime)
        })
    }
}

function closeCard(clickSpacer, animationTime) {

    let cardObject = clickSpacer.parentElement;

    //Удаляем класс с увеличенными размерами
    cardObject.classList.remove(OPEN_CARD);
    clickSpacer.classList.remove(OPEN_IMAGE_OF_CARD);

    //Вешаем анимации закрытия (уменьшения размера) карточки и фото
    cardObject.style = "animation: decreaseScale " + animationTime + "s ease-in-out;";
    clickSpacer.style = "animation: decreaseScaleImg " + animationTime + "s ease-in-out;";

    setTimeout(function () {
        cardObject.style.animation = null;
        clickSpacer.style.animation = null;
    }, animationTime * 1000)
}

function returnCardAtribute(clickSpacer, animationTime) {
    getCardChildren(clickSpacer.parentElement).forEach(atribute => {
        showContexButtons(atribute, animationTime)
    })
}

function showContexButtons(atribute, animationTime) {
    atribute.style = "animation: " + SLIDE_IN +  " " + animationTime + "s ease-in-out;";
    //Добавляем класс с display: none
    setTimeout(() => atribute.classList.remove(NONE_DISPLAY), animationTime * 1000)
}

function removeContextButtons() {
    let contextButtonList = document.getElementsByClassName(FULL_ATRIBUTE_CAtALOG_CLASS)
    Array.from(contextButtonList).forEach(button => button.remove())
}

function getCardChildren(el) {
    // Получаем список всех потомков
    var cardChildrenList = el.childNodes;
    // Создаем новый массив для хранения всех потомков, кроме первого
    var cardAtributeList = [];
    // Проходим по списку потомков, начиная со второго элемента (индекс 1)
    for (var i = 1; i < cardChildrenList.length; i++) {
        // Добавляем потомка в массив
        cardAtributeList.push(cardChildrenList[i]);
    }

    return cardAtributeList;
}

//Создаем нижнюю строку с атрибутами для открывающейся карточи объекта
// (та де логика, что и при создании атрибутов на карточке, только у названия и цены разные стили)
function createAtributeRowInOpenCard(item) {
    //Генерим название квартиры
    let apartmentName = createComboElement(
        'none', 'apartmentComboElementValue', item.name)
    //Генерим стоимость квартиры
    let apartmentPrice = createComboElement(
        'none', 'apartmentComboElementValue', item.summary + " ₽")
    apartmentPrice.style = 'border: solid;'
    //Площадь
    let apartmentSpace = createComboElement(
        'space.svg', 'apartmentComboElementValue', item.space + " м²")
    //Кровати
    let apartmentBeds = createComboElement(
        'bed.svg', 'apartmentComboElementValue', item.beds)
    //Генерим строку внизу карточки квартиры
    let apartmentAtribute = createElement(
        'section', FULL_ATRIBUTE_CAtALOG_ROW_CLASS, "")

    //Наполняем строку с атрибутами
    apartmentAtribute.append(
        apartmentName,
        apartmentPrice,
        apartmentSpace,
        apartmentBeds
    )

    //Проверяем, что квартира сдается от 2-х дней и тогда показываем это
    if (item.fromDay > 1) {
        let apartmentFromDay = createComboElement('none', 'apartmentComboElementValue', "Сдается от " + item.fromDay + " дней")

        //Наполняем строку с атрибутами
        apartmentAtribute.append(
            apartmentFromDay
        )
    }

    let fullCatalogAtribute = createElement('section', FULL_ATRIBUTE_CAtALOG_CLASS, "")
    fullCatalogAtribute.classList.add('startOpacity')

    let servicesCatalogRow = createOpenAtributeRow(item)

    fullCatalogAtribute.append(
        apartmentAtribute,
        servicesCatalogRow
    )

    return fullCatalogAtribute;
}

const CATALOG_ROW_BUTTON_CLASS = 'catalogRowButton'


//Создаем список всех сервисов
function createOpenAtributeRow(item) {

    let servicesCatalogRow = createElement('article', 'servicesCatalogRow', '')

    let servicesImgList = []

    serviceList.forEach(service => {
        let imgName = service[0]
        let servicesImg = createIconUrlChecked(imgName);

        if (splitServisesBySpace(item.services).includes(imgName)) {
            servicesImgList.push(servicesImg)
        }
    })

    //Кнопочки меню открытой карточки объекта
    servicesCatalogRow.append(
        createButton(
            //Параметры в slice(x, y),
            // x - с какого элемента начать отсчет,
            // y - по какой элемент вернуть новый массив
            servicesImgList.slice(0, 2),
            'Удобства',
            CATALOG_ROW_BUTTON_CLASS,
            null,
            () => createPopUp(createServiceInner(splitServisesBySpace(item.services)))
        ),
        createButton(
            ['/images/icons/map.svg'],
            'На карте',
            CATALOG_ROW_BUTTON_CLASS,
            null
        ),
        createButton(
            ['/images/icons/heart-off.svg'],
            '', //Сердечко
            CATALOG_ROW_BUTTON_CLASS,
            null
        ),
        createButton(
            null,
            'Подробнее',
            'catalogRowButtonFullWight',
            'articleFullWight',
            () => window.location.href = APARTMENT_PAGE + item.id
                + APARTMENT_DATE_PARAM + document.getElementById('catalog-header-from').innerText +
                ":" + document.getElementById('catalog-header-to').innerText
        )
    )
    return servicesCatalogRow
}
