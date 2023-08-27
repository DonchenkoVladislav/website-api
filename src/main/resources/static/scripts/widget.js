var WIDGET_TIME = 0.2

//Плавное появление
function smoothAppearance(element, time) {
    element.style = "animation: fastSlideInBottom " + time + "s ease-in-out;";
}

//Плавное исчезновение
function smoothClose(element, time) {
    element.style = "animation: slideOutBottom " + time + "s ease-in-out;";
}

//Плавно удалить элемент кликнув вне его
function closeToTapOutsideElement(container, closebleElement) {
    document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(container);

        if ( ! withinBoundaries ) {
            close(closebleElement)
        }
    })
}

//Плавно удалить элемент
function close(closebleElement) {
    smoothClose(closebleElement, WIDGET_TIME)
    setTimeout(function () {
        closebleElement.remove()
    }, WIDGET_TIME * 1000 - 100); // скрываем элемент т к клик был за его пределами
}