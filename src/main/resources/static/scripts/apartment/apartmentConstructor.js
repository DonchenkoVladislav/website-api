$(document).ready(function () {
    getApartmentInfo(
        document.getElementById('apartmentIdValue').innerText,
        document.getElementById('apartmentBookingDateValue').innerText)
})

const APARTMENT_ELEMENT = 'apartmentComboElementValue'

function createApartmentPage(response) {
    let gallery = document.getElementById('apartmentHeadImage')
    let apartmentAtributes = document.getElementById('apartmentAtributes')
    let apartmentDatesAtributes = document.getElementById('apartmentDatesAtributes')
    let apartmentFullDescription = document.getElementById('apartmentFullDescription')
    let apartmentServicesAtributes = document.getElementById('apartmentServicesAtributes')

    createImgToBase64(response.mainImage.data, gallery)
    response.images.forEach(image => createImgToBase64(image.data, gallery))

    apartmentAtributes.append(
        createElement('span', APARTMENT_ELEMENT, response.name, 'name_spacer'),
        createElement('span', APARTMENT_ELEMENT, response.city + ' м²', 'city_spacer'),
        createComboElement('space.svg', APARTMENT_ELEMENT, response.space),
        createComboElement('bed.svg', APARTMENT_ELEMENT, response.beds),
    )

    response.bookingDates.forEach(date => {
        let dateElement = createElement('article', 'dateElement', '')
        let dateValue = createElement('p', 'empty', convertDate(date))
        let dayNameValue = createElement('p', 'empty', getFormattedDayOfWeek(date))
        let dateSummValue = createElement('p', 'empty', '00000')

        dateElement.append(dateValue, dayNameValue, dateSummValue)
        apartmentDatesAtributes.append(dateElement)
    })

    apartmentFullDescription.append(
        createDescription(response.description)
        // createElement('pre', APARTMENT_ELEMENT, createDescription(response.description), 'description_spacer')
    )

    apartmentServicesAtributes.append(
        createServiceInner(splitServisesBySpace(response.services))
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

function convertDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // const monthNames = [
    //     "января", "февраля", "марта", "апреля", "мая", "июня",
    //     "июля", "августа", "сентября", "октября", "ноября", "декабря"
    // ];

    const monthNames = [
        "янв", "фев", "мар", "апр", "мая", "июн",
        "июл", "авг", "сент", "окт", "нояб", "дек"
    ];

    // const formattedDate = `${day} ${monthNames[month]} ${year}`;
    const formattedDate = `${day} ${monthNames[month]}`;

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

