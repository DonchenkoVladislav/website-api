const FOOTER_COOKIES_TEXT = "При использовании данного сайта, вы подтверждаете свое согласие на использование файлов cookie"

$(document).ready(function () {
    // Обработка для мобилки
    if (window.matchMedia("(max-width: 1000px)").matches) {

        document.getElementById('bookingArticle').style = "animation: blur " + 2.5 + "s ease-in-out";

        // Создаем виджеты с городами и со сылкой в телеге
        let telegramWidget = createMobileWidget(
            '<h1>Гарантия теплой встречи</h1>',
            '<p>С Вами работает команда «посуточный аренды квартир в Калининграде и области»</p>',
            '<a class="telegramButtonMobile" href="">\n' +
            '                <img src="/images/icons/telegram.svg">\n' +
            '                <p>Мы в Telegram</p>\n' +
            '            </a>',
            'firstMobileLandingWidget'
        )
        let mobileCityHeaderWidget = createMobileHeaderWidget('<h1>Рекомендуем посетить</h1>')
        let mobileCityWidget = createCityMobileWidget(cities)
        let footer = createFooter(linkForFooter)


        // Помещаем все виджеты созданые ранее в widgetPlaceOnMobileLanding - место для виджетов
        document.getElementById('widgetPlaceOnMobileLanding')
            .append(
                telegramWidget,
                mobileCityHeaderWidget,
                mobileCityWidget,
                footer
            )
    } else {
        // Обработка для десктопных браузеров

        document.getElementById('widgetPlaceOnMobileLanding').remove()
        document.getElementsByClassName('catalog_footerText')[0].innerHTML = FOOTER_COOKIES_TEXT
        createBannerList()
    }
})

//Создаем список баннеров с городами справа для десктопа
function createBannerList() {
    cities.forEach(city => {
        let banner = document.createElement('div')
        banner.classList.add('cityBanner')
        banner.innerHTML = createBanner(city[0], 'images/foneImages/' + city[1], city[2])
        banner.addEventListener('click', (event) => selectAndFocus(city[0]))
        document.getElementById('banersPlace').append(banner)
    })
}

// Универсальный виджет для мобилки
function createMobileWidget(headerWithTag, textWithTag, button, id) {
    let banner = document.createElement('div')
    banner.classList.add('widget')
    banner.id = id

    let headerPlace = document.createElement('section')
    headerPlace.classList.add('widgetHeader')
    headerPlace.innerHTML = headerWithTag
    let textPlace = document.createElement('section')
    textPlace.classList.add('widgetText')
    textPlace.innerHTML = textWithTag
    let buttonPlace = document.createElement('section')
    buttonPlace.classList.add('widgetButton')
    buttonPlace.innerHTML = button

    banner.append(headerPlace, textPlace, buttonPlace)

    return banner;
}

function createMobileHeaderWidget(headerWithTag) {
    let banner = document.createElement('div')
    banner.classList.add('widgetWithAlfaBackground')

    let headerPlace = document.createElement('section')
    headerPlace.classList.add('widgetHeaderLight')
    headerPlace.innerHTML = headerWithTag

    banner.append(headerPlace)

    return banner;
}

// pop со списком городов для мобилки - для десктопа - метод createBannerList()
function createCityMobileWidget() {
    let mobileCityWidget = document.createElement('section');
    mobileCityWidget.classList.add('mobileCityWidget')
    mobileCityWidget.classList.add('widgetWithAlfaBackground')

    cities.forEach(city => {
        let cityMobileBanner = createCityMobileBanner(city)
        mobileCityWidget.append(cityMobileBanner)
    })

    return mobileCityWidget;
}

function createCityMobileBanner(city) {
    let banner = document.createElement('div')
    banner.classList.add('mobileCityBanner')
    banner.innerHTML = createMobileCityBanner(city[0], 'images/foneImages/' + city[1])
    banner.addEventListener('click', (event) => selectAndFocus(city[0]))

    return banner;
}

//Создаем баннер для каждого города
function createBanner(city, image, description) {
    return "    <div class=\"img-container-banner\">\n" +
        "        <img src='" + image + "' class=\"bannerImage\">\n" +
        "    </div>\n" +
        "    <article class=\"bannerArticle\">\n" +
        "        <h2 class=\"bannerHeader\">" + city + "</h2>\n" +
        "        <p class=\"bannerText\">" + description + "</p>\n" +
        "        <section class=\"bannerButtons startOpacity\">\n" +
        "            <button class=\"button onBanner\">Найти жилье</button>\n" +
        "        </section>\n" +
        "    </article>"
}

//Создаем баннер для каждого города для мобилки
function createMobileCityBanner(city, image) {
    return "<img src='" + image + "' class=\"\">" +
        "<h2 class=\"\">" + city + "</h2>"
}

function createFooter(linkList) {
    let footer = document.createElement('article')
    footer.classList.add('mobileFooter')

    linkList.forEach(link => {
        let objectLink = document.createElement('a')
        objectLink.innerHTML = link[0]
        objectLink.href = link[1]
        objectLink.classList.add('mobileFooterLink')

        footer.append(objectLink)
    })

    let hr = document.createElement('hr')

    let cookiesText = document.createElement('p')
    cookiesText.id = 'footerCookiesText'
    cookiesText.innerHTML = FOOTER_COOKIES_TEXT

    footer.append(hr, cookiesText)

    return footer;
}