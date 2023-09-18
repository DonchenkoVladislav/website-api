//Чтобы этот метод работал, нужно повесить на элемент класс "startOpacity"
window.onload = function() {

    playAppearanceAnimation(CATLOG_HEADER, APPEARANCE, TIME_TO_SLOW_ANIMATION)
    playAppearanceAnimation(CATLOG_BODY, SLIDE_IN_BOTTOM, TIME_TO_FAST_ANIMATION)
    // playAppearanceAnimation(CATLOG_FILTERS, APPEARANCE, TIME_TO_SLOW_ANIMATION)

    playConstructorAnimation("filterButton", SLIDE_IN, TIME_TO_FAST_ANIMATION)

    playAppearanceAnimation(FOOTER, SLIDE_IN_BOTTOM, TIME_TO_SLOW_ANIMATION)
}

//Проиграть анимацию появления для всех элементов по названию класса
function playConstructorAnimation(className, animationName, animationTime) {
    let timeout = animationTime * 1000
    Array.from(document.getElementsByClassName(className)).reverse().forEach(item => {
        setTimeout(function () {
            item.style = "animation: " + animationName + " " + animationTime + "s ease-in-out;";
            setTimeout(function() {
                item.classList
                    .remove(START_OPACITY)
            }, animationTime * 1000)
        }, timeout)
        timeout = timeout + 200
    })
}

//Проиграть анимацию появления для элемента по id. Нужно, чтобы на элементе висел класс .startOpacity
function playAppearanceAnimation(elementId, animationName, animationTime) {
    document.getElementById(elementId).style = "animation: " + animationName + " " + animationTime + "s ease-in-out;";
    removeClassByTime(elementId, START_OPACITY, animationTime)

}

function removeClassByTime(elementId, className, time) {
    setTimeout(function() {
        document.getElementById(elementId)
            .classList
            .remove(className)
    }, time * 1000)
}