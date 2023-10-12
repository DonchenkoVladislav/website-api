$(document).ready(function () {
    getApartmentInfo(
        document.getElementById('apartmentIdValue').innerText,
        document.getElementById('apartmentBookingDateValue').innerText)
})

const APARTMENT_ELEMENT = 'apartmentComboElementValue'
const SMALL_HEADER = 'smallHeader'

function createApartmentPage(response) {

    let goToBackPageButton = document.getElementById('goToBackPageButton')

    goToBackPageButton.append(
        createButton(
            null,
            '❮',
            'goToPreviousPage',
            null,
            () => history.back()
        )
    )

    let gallery = document.getElementById('apartmentHeadImage')
    let apartmentAtributes = document.getElementById('apartmentAtributes')
    let apartmentSummary = document.getElementById('apartmentSummary')
    let apartmentDatesAtributes = document.getElementById('apartmentDatesAtributes')
    let apartmentFullDescription = document.getElementById('apartmentFullDescription')
    let apartmentServicesAtributes = document.getElementById('apartmentServicesAtributes')
    let apartmentBooking = document.getElementById('apartmentBooking')

    createImgToBase64(response.mainImage.data, gallery)
    response.images.forEach(image => createImgToBase64(image.data, gallery))

    apartmentAtributes.append(
        createElement('span', APARTMENT_ELEMENT, response.name, 'name_spacer'),

        createElement('span', SMALL_HEADER, 'Город'),
        createElement('span', APARTMENT_ELEMENT, response.city, 'city_spacer'),

        createElement('span', SMALL_HEADER, 'Характеристики'),
        createComboElement('space.svg', APARTMENT_ELEMENT, response.space + ' м²'),
        createComboElement('bed.svg', APARTMENT_ELEMENT, response.beds),
    )

    apartmentSummary.append(
        createElement('span', 'smallHeaderPlus', 'Стоимость за ' + response.nights),
        createComboElement('coins.svg', APARTMENT_ELEMENT, formatSummary(response.summary))
    )

    response.bookingDates.forEach(date => {

        let countDate = date.date

        let dateElement = createElement('article', 'dateElement', '')
        let dateValue = createElement('p', 'empty', convertDate(countDate), false)
        let dayNameValue = createElement('p', 'empty', getFormattedDayOfWeek(countDate))
        let dateSummValue = createElement('p', 'empty', formatSummary(date.summary))

        dateElement.append(dateValue, dayNameValue, dateSummValue)

        apartmentDatesAtributes.append(dateElement)
    })
    apartmentDatesAtributes.firstElementChild.style = "margin-left: 0 !important;"

    //Добавляем кнопочку "Показать полностью"
    let fullShowDescriptionButton = createElement('span', 'showToFull', 'Показать полностью')

    fullShowDescriptionButton.addEventListener('click', () => {
        fullShowDescriptionButton.remove()
        document.getElementsByClassName('descriptionContainer')[0].style = 'height: fit-content !important'
    })

    apartmentFullDescription.append(
        createDescription(response.description),
        fullShowDescriptionButton
    )

    apartmentServicesAtributes.append(
        createElement('span', SMALL_HEADER, 'Удобства'),
        createServiceInner(splitServisesBySpace(response.services))
    )

    apartmentBooking.append(
        createButton(
            null,
            'Забронировать за ' + formatSummary(response.summary),
            "apartmentRowButton",
            null,
            () => createBookingAlertPopUp(response)
        )
    )
}

function createDescription(description) {
    let descriptionContainer = createElement('span', 'descriptionContainer', '')

    description.split('\n').forEach(elem => {

        let pTag = document.createElement('p')
        pTag.innerHTML = elem
        let brTag = document.createElement('br')

        descriptionContainer.append(pTag, brTag)
    })

    return descriptionContainer;
}

function convertDate(timestamp, isFullMonthName) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let formattedDate;

    // const formattedDate = `${day} ${monthNames[month]} ${year}`;
    if (isFullMonthName) {
        formattedDate = `${day} ${monthNamesFull[month]}`;
    } else {
        formattedDate = `${day} ${monthNames[month]}`;
    }


    return formattedDate;
}

// const dayOfWeekNames = [
//     "воскресенье", "понедельник", "вторник", "среда",
//     "четверг", "пятница", "суббота"
// ];

const dayOfWeekNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function getFormattedDayOfWeek(timestamp) {
    const date = new Date(timestamp);

    const dayOfWeek = date.getDay();

    return dayOfWeekNames[dayOfWeek];
}

//PopUp с условиями бронирования
function createBookingAlertPopUp(response) {

    let alertHeader = createElement('span', 'alertHeaderEyes', '👀')
    let alertMessage = createElement('span', 'alertHeaderMessage', BOOKING_ALERT_MESSAGE_PART_1)
    let alertMessage2 = createElement('span', 'alertHeaderMessage', BOOKING_ALERT_MESSAGE_PART_2)
    let alertMessage3 = createElement('span', 'alertHeaderMessage', BOOKING_ALERT_MESSAGE_PART_3)
    let alertOkButton = createButton(
        null,
        'Понятно',
        "popUpButton",
        null,
        () => {
            closePopUp()
            createBookingPopUp(response)
        }
    )

    let inner = createElement('article', 'allertPopUpInner', '')

    inner.append(
        alertHeader,
        alertMessage,
        alertMessage2,
        alertMessage3,
        alertOkButton
    )

    createPopUp(inner)
}

//PopUp с формой бронирования
function createBookingPopUp(response) {

    let inner = createElement('article', 'bookingPopUpInner', '')

    let lastBookingDate = response.bookingDates.length - 1;

    inner.append(
        createElement('span', APARTMENT_ELEMENT, response.name, 'name_spacerForBookingForm'),

        createElement('span', SMALL_HEADER, 'Стоимость за ' + response.nights),
        createElement('span', APARTMENT_ELEMENT, formatSummary(response.summary), 'summ_spacerForBookingForm'),

        createElement('span', SMALL_HEADER, 'Даты проживания'),
        createElement('span', APARTMENT_ELEMENT,
            'C ' + convertDate(response.bookingDates[0].date, true) + ' по '
            + convertDate(response.bookingDates[lastBookingDate].date, true),
            'date_spacerForBookingForm'),

        createElement('span', SMALL_HEADER, 'Ваше имя'),
        createInput('text', 'Иван', false),

        createElement('span', SMALL_HEADER, 'Номер телефона'),
        createInput('number', '+71234567890', false),

        createElement('span', SMALL_HEADER, 'Как с Вами связаться?'),
        createInput('text', 'Тап!', true,
            () => createCommunicationSelect(
                inner,
                [['Перезвоните мне'], ['Напишите в Telegram'], ['Напишите в Whatsapp']],
                false
            ),
            'communicationsInput'
        ),

        createButton(
            null,
            SEND_APPLICATIOM,
            "popUpButton",
            null,
            () => {
                closePopUp()
            }
        )
    )

    createPopUp(inner)
}

//Показать pop up с выбором способа связи
function createCommunicationSelect(parent, list, isStandart) {

    let currentSelect = document.createElement("article")
    currentSelect.id = CURRENT_SELECT

    if (isStandart !== undefined) {
        if (!isStandart) {
            currentSelect.classList.add('selectIsFullClass')
        }
    }


    list.forEach(item => {
        let button = document.createElement('button')
        button.classList.add('alfaInput')
        button.classList.add('sitySelect')

        button.addEventListener(
            'click',
            (event) => selectAndCloseSelect(item[0])
        );

        let cityName = document.createElement('p')
        cityName.innerHTML = item[0]

        button.append(cityName)
        currentSelect.append(button)
    })

    smoothAppearance(currentSelect, WIDGET_TIME)
    parent.append(currentSelect)
    closeToTapOutsideElement(parent, currentSelect)
}

//Выбрать город
function selectAndCloseSelect(text) {
    let currentSelect = document.getElementById(CURRENT_SELECT)
    document.getElementById('communicationsInput').value = text
    close(currentSelect)
    // document.getElementById('selectDate').focus()
}