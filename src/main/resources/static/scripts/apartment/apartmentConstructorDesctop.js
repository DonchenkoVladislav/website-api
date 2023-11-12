// Устанавливаем начальное значение индекса текущего изображения
let currentIndex = 0;

function createDesctopApartmentBlock(response) {

    //Обнуляем индекс отображаемого фото объекта
    currentIndex = 0;

    //Создаем поля для заполнения инфой об оьъекте для десктопа
    let galleryDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentHeadImage')

    let apartmentAtributesDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentAtributes')
    let apartmentSummaryDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentSummary')
    let apartmentDatesAtributesDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentDatesAtributes')
    let apartmentFullDescriptionDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentFullDescription')
    let apartmentServicesAtributesDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentServicesAtributes')
    let apartmentBookingDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentBooking')

    //Находим элемент, в который поместим все поля выше
    let desctopApartmentPage = document.getElementsByClassName('popUpInner')[0]

    //Создаем элемент, в который поместим всю информацию отдельно от фото
    let apartmentInfoDesctop = createElement('article', 'desctopApartmentBlock', '', 'apartmentInfoDesctop')

    //Наполняем этот элемент информацией об объекте
    apartmentInfoDesctop.append(
        apartmentAtributesDesctop,
        apartmentSummaryDesctop,
        apartmentDatesAtributesDesctop,
        apartmentFullDescriptionDesctop,
        apartmentServicesAtributesDesctop,
        apartmentBookingDesctop
    )

    //Помещаем на страницу объекта фото и отдельно всю информацию
    desctopApartmentPage.append(
        galleryDesctop,
        apartmentInfoDesctop
    )

    //Конпка Копировать ссылку
    getButton(desctopApartmentPage, {
        buttonText: "Копировать ссылку",
        buttonClass: "lightButton",
        containerId: "copyButtonContainer",
        buttonIcons: ['/images/icons/copy.svg']
    })

    //Конпка для листания изображений влево
    getButton(desctopApartmentPage, {
        buttonText: LEFT_ARROW_SIMBOL,
        containerId: 'galleryDesctopArrowButtonLeft',
        buttonClass: "alfaInput",
        containerClass: 'galleryDesctopArrowButton',
        buttonAction: () => tapOnArrowButton(galleryDesctop, LEFT_ARROW_SIMBOL)
    })

    //Конпка для листания изображений вправо
    getButton(desctopApartmentPage, {
        buttonText: RIGHT_ARROW_SIMBOL,
        containerId: 'galleryDesctopArrowButtonRight',
        buttonClass: "alfaInput",
        buttonAction: () => tapOnArrowButton(galleryDesctop, RIGHT_ARROW_SIMBOL)
    })

    //Конпка Забронироваь для десктопа
    getButton(apartmentBookingDesctop, {
        buttonText: "Забронировать за " + response.summary + " " + RUR,
        buttonClass: "button",
        buttonAction: () => createBookingAlertPopUp(response)
    })

    //Заполняем все поля
    createApartmentPage(response, true)
}

function tapOnArrowButton(gallery, side) {


// Устанавливаем обработчик события для кнопки "Вперед"
    if (side === RIGHT_ARROW_SIMBOL) {

        console.log("buttonAction " + RIGHT_ARROW_SIMBOL)
        // Увеличиваем индекс текущего изображения
        currentIndex++;

        // Проверяем, чтобы индекс не выходил за пределы количества изображений
        if (currentIndex >= gallery.children.length) {
            currentIndex = 0;
        }

        // Прокручиваем элемент к текущему изображению
        gallery.children[currentIndex].scrollIntoView({behavior: 'smooth'});
    }

// Устанавливаем обработчик события для кнопки "Назад"
    if (side === LEFT_ARROW_SIMBOL) {

        console.log("buttonAction " + LEFT_ARROW_SIMBOL)
        // Уменьшаем индекс текущего изображения
        currentIndex--;

        // Проверяем, чтобы индекс не выходил за пределы количества изображений
        if (currentIndex < 0) {
            currentIndex = gallery.children.length - 1;
        }

        // Прокручиваем элемент к текущему изображению
        gallery.children[currentIndex].scrollIntoView({behavior: 'smooth'});
    }

    console.log("buttonAction " + currentIndex)
}