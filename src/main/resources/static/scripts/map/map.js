var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Обработка для мобилки
    if (window.matchMedia("(max-width: 1000px)").matches) {

        let mapElement = document.createElement('section')
        mapElement.id = 'map';

        document.getElementById('catalog-column').prepend(mapElement)



        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            center: [54.710162, 20.510137],
            zoom: 14,
            // Также доступны наборы 'default', 'smallMapDefaultSet' и 'largeMapDefaultSet'
            // Элементы управления в наборах подобраны оптимальным образом
            // для карт маленького, среднего и крупного размеров.
            controls: []
        }, {
            // При сложных перестроениях можно выставить автоматическое
            // обновление карты при изменении размеров контейнера.
            // При простых изменениях размера контейнера рекомендуется обновлять карту программно.
            // autoFitToViewport: 'always'
            searchControlProvider: 'yandex#search',
            responsive: true // Включение адаптивности карты
        });


    $('#map').addClass('mobileMap')
        myMap.container.fitToViewport();








    } else {

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
}

function createClustersOnMap(myMap, coordinatesList) {
    /**
     * Создадим кластеризатор, вызвав функцию-конструктор.
     * Список всех опций доступен в документации.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
     */
    clusterer = new ymaps.Clusterer({
        /**
         * Через кластеризатор можно указать только стили кластеров,
         * стили для меток нужно назначать каждой метке отдельно.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
         */
        preset: 'islands#invertedVioletClusterIcons',
        /**
         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
         */
        groupByCoordinates: false,
        /**
         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
         */
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
    }),
        /**
         * Функция возвращает объект, содержащий данные метки.
         * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
         * Поле balloonContentBody - источник данных для контента балуна.
         * Оба поля поддерживают HTML-разметку.
         * Список полей данных, которые используют стандартные макеты содержимого иконки метки
         * и балуна геообъектов, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
        getPointData = function (index) {
            return {
                balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                clusterCaption: 'метка <strong>' + index + '</strong>'
            };
        },
        /**
         * Функция возвращает объект, содержащий опции метки.
         * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
         */
        getPointOptions = function () {
            return {
                preset: 'islands#violetIcon'
            };
        },
        points = coordinatesList,
        geoObjects = [];

    /**
     * Данные передаются вторым параметром в конструктор метки, опции - третьим.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
    for(var i = 0, len = points.length; i < len; i++) {
        geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
    }

    /**
     * Можно менять опции кластеризатора после создания.
     */
    clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: true
    });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    /**
     * Спозиционируем карту так, чтобы на ней были видны все объекты.
     */

    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
    });
}