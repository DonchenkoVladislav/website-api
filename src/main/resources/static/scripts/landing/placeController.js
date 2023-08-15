$(document).ready(function() {
    createBannerList()
})

// function getPlaceList() {
//     console.log("Метод getPlaceList()")
//     $.ajax({
//         type: 'GET',
//         url: '/places',
//         dataType: 'json',
//         processData: false,
//         contentType: 'application/json; charset=utf-8',
//         success: function (places) {
//             console.log("ghbdtn")
//             places.forEach(place => createPlace(place))
//         }
//
//     })
// }
//
// function createPlace(place) {
//     banner = document.createElement('section')
//     banner.classList.add('banner')
//     banner.style.backgroundPosition = "revert";
//     banner.style.backgroundSize = "cover";
//     banner.style.backgroundImage = 'url("../../'+ place.imageLink + '")';
//
//     header = document.createElement('h3')
//     header.classList.add('bannerHeader')
//     header.innerHTML = place.name
//
//     space = document.createElement('h2')
//     space.classList.add('bannerHeader')
//     space.innerHTML = place.description
//
//     banner.append(header, space)
//
//     document.getElementById('banersPlace').append(banner);
// }

//-------------------------------

let cities = [
    ["Калининград", "kaliningrad.png", "Один из символов города – знаменитый музей янтаря в башне из красного кирпича, когда-то она входила в систему оборонительных сооружений города"],
    ["Светлогорск", "svetlogorsk.png", "В Светлогорске много красивых старинных домиков, можно гулять и увидеть множество красоты вокруг"],
    ["Пионерский", "pionerskii.png", "Гулять на побережье удобно по чистому и обустроенному променаду или по пирсу, углубившему в море на 200 метров"],
    ["Янтарный", "yantarnui.png", "Достопримечательность мирового масштаба — здесь находятся самые большие залежи янтаря"],
    ["Зеленоградск", "zelegradsk.png", "Если Вы в первый, а может во второй или в третий раз приехали в Калининградскую область, то обязательно стоит заглянуть в «город котов»"]
]

function createBannerList() {
    cities.forEach(city => {
        let banner = document.createElement('div')
        banner.classList.add('cityBanner')
        banner.innerHTML = createBanner(city[0], 'images/foneImages/' + city[1], city[2])
        document.getElementById('banersPlace').append(banner)
    })
}

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