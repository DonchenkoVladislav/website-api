
// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

var myMap;

function init() {

        let mapElement = document.createElement('section')
        mapElement.id = 'map';

        document.getElementById('catalog-column').prepend(mapElement)



        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            center: [54.710162, 20.510137],
            zoom: 12,
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

    // Обработка для мобилки
    if (window.matchMedia("(max-width: 1000px)").matches) {
        $('#map').addClass('mobileMap')
    }
        myMap.container.fitToViewport();
}

let counter = 10

function createClustersOnMap(objectsList) {

    console.log('Начато выполнение метода createClustersOnMap()')

    if (document.getElementById('map')) {
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
            getPointData = function (summary) {
                let summ = summary + ' ₽'
                return {
                    iconCaption: summ
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
            myGeoObjects = [];

        /**
         * Данные передаются вторым параметром в конструктор метки, опции - третьим.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
         */
        // for(let i = 0; i < Array.from(objectsList).length; i++) {
        //     myGeoObjects[i] = new ymaps.Placemark(
        //         //Координаты каждого объекта
        //         objectsList[i].coordinates.split(","),
        //         getPointData(i),
        //         getPointOptions()
        //     );
        // }
        console.log(objectsList)
        objectsList.forEach(item => {
            myGeoObjects.push(
                new ymaps.Placemark(
                    //Координаты каждого объекта
                    item.coordinates.split(", "),
                    getPointData(item.summary),
                    getPointOptions()
                )
            )
        })

        console.log('myGeoObjects')
        console.log(myGeoObjects)

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
        clusterer.add(myGeoObjects);

        console.log('clusterer')
        console.log(clusterer)

        myMap.geoObjects.add(clusterer);

        /**
         * Спозиционируем карту так, чтобы на ней были видны все объекты.
         */

        myMap.setBounds(clusterer.getBounds(), {
            checkZoomRange: true
        });
    } else {
        if (counter > 0) {
            setTimeout(() => createClustersOnMap(objectsList), 500)
            counter = counter - 1
        } else {
            alert("Извините, что-то пошло не так. Мы уже работаем над этим")
        }
    }


}