const FULL_ATRIBUTE_CAtALOG_ROW_CLASS = "apartmentAtributeInOpenCard"
const FULL_ATRIBUTE_CAtALOG_CLASS = 'fullCatalogAtribute'

function createApartmentList(response, mainPhotoList) {

    let mainPhotoListCurrent = mainPhotoList

    let catalogPlace = document.getElementById('catalog-body-apartments')

    if (window.matchMedia("(max-width: 1000px)").matches) {
        let catalogBody = document.getElementById('catalog-body')

        let cardIsFullScreen = false;

        let downArrow = createElement('span', 'empty', '▼')
        downArrow.id = 'downArrow'

        downArrow.addEventListener('click', function () {
            // downArrow.style = 'transform: rotate(180deg);'
            // cardIsFullScreen = !cardIsFullScreen;

            downArrow.remove()

            // if(cardIsFullScreen) {
                catalogBody.style = "animation: moveCatalogDown " + TIME_TO_FASTEST_ANIMATION + "s ease-in-out;"
                // catalogBody.classList.add('catalog_body_top')
                setTimeout(function () {
                    catalogBody.classList.add('catalog_body_top')
                }, TIME_TO_FASTEST_ANIMATION * 1000)
            // } else {
                // downArrow.style = 'transform: rotate(0deg);'
                // catalogBody.classList.remove('catalog_body_top')
            // }
        })

        catalogPlace.prepend(downArrow)
    }

    let coordinateList = []

    response.items
        .forEach(item => {

            coordinateList.push(item.coordinates.split(", "))

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

    createClustersOnMap(myMap, coordinateList)
}

function createElement(tag, className, responseField) {
    let element = document.createElement(tag)
    element.classList.add(className)
    element.innerHTML = responseField

    return element;
}

function createComboElement(iconName, valueClassName, responseField, iconPath) {

    let imgElement = createElement('img', 'icon', '')
    let valueElement = createElement('span', valueClassName, responseField)
    let comboElement = createElement('article', 'apartmentComboElement', '')

    if (iconName !== 'none' && iconPath === undefined) {
        imgElement.src = '/images/icons/' + iconName;
        imgElement.alt = iconName;
        comboElement.append(imgElement, valueElement)
    }
    if (iconPath !== undefined) {
        imgElement.src = iconPath + iconName;
        imgElement.alt = iconName;
        comboElement.append(imgElement, valueElement)
    } else {
        comboElement.append(valueElement)
    }

    return comboElement
}

function tapOnCard(el, item) {
    el.addEventListener('click', function (event) {

        console.log('Произошло событие c ' + el.id, event.type)

        playChangeHeightAnimation(
            el.parentElement,
            "increaseScale",
            "decreaseScale",
            TIME_TO_FASTEST_ANIMATION,
            'height',
            'var(--mobile-opened-card)',
            'var(--mobile-closed-card)',
            "increase",
            item
        )

        playChangeHeightAnimation(
            el,
            "increaseScaleImg",
            "decreaseScaleImg",
            TIME_TO_FASTEST_ANIMATION,
            'height',
            'var(--mobile-card-opened-img)',
            'var(--mobile-card-closed-img)',
            'increase_img',
            null
        )
    })
}

//Проиграть анимацию увеличения карточки объекта в каталоге для элемента по id
function playChangeHeightAnimation(el, openAnim, closedAnim, animationTime, cssKey, openCardValue, closeCardValue, mark, respObj) {

    //Находим открытую карточку объекта и закрываем ее
    let openElList = document.getElementsByClassName(mark)
    let compareId = null;
    if (openElList.length > 0) {
        let openEl = openElList[0]
        compareId = openEl.id
        openEl.style = "animation: " + closedAnim + " " + animationTime + "s ease-in-out;";
        openEl.classList.remove(mark)
        changeElementAtributeAfterAnimation(openEl, animationTime, cssKey, closeCardValue)

        //Находим атрибуты карточки объекта (все элементы карточки, кроме картинки)
        var cardAtributeList = getCardChildren(openEl)
        //Отображаем атрибуты карточки объекта
        cardAtributeList.forEach(cardAtribute => {
            playAppearanceAnimationByElement(cardAtribute, "fastSlideInLeft", animationTime)
        })

        //Скрываем нижнюю строку с атрибутами
        if (respObj !== null) {
            let atributeRowInOpenCardList = document.getElementsByClassName(FULL_ATRIBUTE_CAtALOG_CLASS);

            if (atributeRowInOpenCardList.length > 0) {
                Array.from(atributeRowInOpenCardList).forEach(row => {
                    playDeleteAnimation(row, "fastSlideOutLeft", animationTime)
                    setTimeout(function () {
                        row.remove()
                    }, animationTime * 1000)
                })
            }

        }

    }

    //Если карточка объекта еще не открыта, то открываем ее
    if (el.id !== compareId) {
        el.style = "animation: " + openAnim + " " + animationTime + "s ease-in-out;";
        el.classList.add(mark)
        changeElementAtributeAfterAnimation(el, animationTime, cssKey, openCardValue)

        //Находим атрибуты карточки объекта (все элементы карточки, кроме картинки)
        var cardAtributeList = getCardChildren(el)
        //Скрываем атрибуты карточки объекта
        cardAtributeList.forEach(cardAtribute => {
            playDeleteAnimation(cardAtribute, "fastSlideOutLeft", animationTime)
        })

        //Отображаем нижнюю строку с атрибутами
        if (respObj !== null) {
            let atributeRowInOpenCard = createAtributeRowInOpenCard(respObj)
            el.append(atributeRowInOpenCard)
            playAppearanceAnimationByElement(atributeRowInOpenCard, "fastSlideInLeft", animationTime)
        }
    }
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

    let servicesCatalogRow = createOpenAtributeRow(item.services)

    fullCatalogAtribute.append(
        apartmentAtribute,
        servicesCatalogRow
    )

    return fullCatalogAtribute;
}

const CATALOG_ROW_BUTTON_CLASS = 'catalogRowButton'

//Создаем список всех чекбоксов сервисов
function createOpenAtributeRow(servicesStr) {

    let servicesCatalogRow = createElement('article', 'servicesCatalogRow', '')

    let servicesImgList = []

    serviceList.forEach(service => {
        let imgName = service[0]
        let servicesImg = createIconUrlChecked(imgName);

        if (splitServisesBySpace(servicesStr).includes(imgName)) {
            servicesImgList.push(servicesImg)
        }
    })

    servicesCatalogRow.append(
        createButton(
            //Параметры в slice(x, y),
            // x - с какого элемента начать отсчет,
            // y - по какой элемент вернуть новый массив
            servicesImgList.slice(0, 2),
            'Удобства',
            CATALOG_ROW_BUTTON_CLASS,
            null,
            () => {
                createServicesPopUp(
                    splitServisesBySpace(servicesStr)
                )
            }
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
            'articleFullWight'
        )
    )
    return servicesCatalogRow
}

function createButton(images, buttonText, buttonClass, articleClass, action) {
    const article = document.createElement('article');

    articleClass === null
        ? article.className = 'additionstAtribute'
        : article.className = articleClass;


    const button = document.createElement('button');
    button.className = buttonClass;

    if (action !== undefined) {
        article.addEventListener('click', function () {
            action()
        });
    }

    // Создаем элементы изображений и добавляем их внутрь кнопки
    if (images !== null) {
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            button.appendChild(img);
        });
    }

    // Создаем элемент с текстом кнопки и добавляем его внутрь кнопки
    if (buttonText !== '') {
        const span = document.createElement('span');
        span.textContent = buttonText;
        button.appendChild(span);
    }

    // Добавляем кнопку внутрь элемента <article>
    article.appendChild(button);

    return article;
}

function createServicesPopUp(apartmentServicesList) {
    let servicesPopUpInner = createElement('div', 'popUpInner', '')
    let servicesInner = createElement('article', 'servicestable', '')

    console.log("Сервисы из объекта: " + apartmentServicesList)


    serviceList.forEach(service => {

        let serviceName = service[0]
        let srviceDescription = service[1]

        console.log("Сервис из списка: " + serviceName)
        if (apartmentServicesList.includes(serviceName)) {


            console.log("Условие выполнено")

            let s = createComboElement(
                serviceName + SVG,
                'servicesTableValue',
                srviceDescription,
                '/images/serviceIcons/'
            );
            s.classList.add('cerviceAtribureList')

            servicesInner.append(s)
        }
    })

    servicesPopUpInner.append(
        createButton(
            ['images/icons/cancel.svg'],
            '',
            CATALOG_ROW_BUTTON_CLASS,
            'closePopUpButton',
            () => {
                createServicesPopUp(
                    closePopUp()
                )
            }
        ),
        servicesInner
    )

    createPopUp(servicesPopUpInner)
}

function createPopUp(innerElement) {
    let popUpSpaser = document.getElementsByTagName('body')[0]

    let popUp = createElement('div', 'popUp', '')
    popUp.classList.add(START_OPACITY)

    popUp.append(innerElement)
    popUpSpaser.append(popUp)

    playAppearanceAnimationByElement(popUp, SLIDE_IN_BOTTOM, TIME_TO_FASTEST_ANIMATION)
}

function closePopUp() {
    let popUpList = document.getElementsByClassName('popUp')

    Array.from(popUpList).forEach(popUp => {
        playDeleteAnimation(popUp, SLIDE_OUT_BOTTOM, TIME_TO_FASTEST_ANIMATION)
        setTimeout(function () {
            popUp.remove()
        }, TIME_TO_FASTEST_ANIMATION * 1000)
    })
}
