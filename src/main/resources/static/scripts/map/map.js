var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [54.710162, 20.510137], // Калининград
        zoom: 10,
        yandexMapDisablePoiInteractivity: false
    }, {
        //yandex#map — поиск только по топонимам. Позволяет настроить отображение результатов.
        //yandex#search — поиск по топонимам и организациям.
        searchControlProvider: 'yandex#map'
    });
}