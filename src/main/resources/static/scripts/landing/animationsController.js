//Чтобы этот метод работал, нужно повесить на элемент класс "startOpacity"
window.onload = function() {
    document.getElementById(SITE_NAME).style = "animation: slideIn " + TIME_TO_SLOW_ANIMATION + "s ease-in-out";

    removeClassByTime(SITE_NAME, START_OPACITY, TIME_TO_SLOW_ANIMATION)

    document.getElementById(MAIN_MENU).style = "animation: slideInTop " + TIME_TO_SLOW_ANIMATION + "s ease-in-out;";
    document.getElementById(BANNERS_PLACE).style = "animation: slideInLeft " + TIME_TO_SLOW_ANIMATION + "s ease-in-out";
    document.getElementById(FOOTER).style = "animation: slideInBottom " + TIME_TO_SLOW_ANIMATION + "s ease-in-out;";
    document.getElementById(LANDING_FORM).style = "animation: fastAppearance " + TIME_TO_FAST_ANIMATION + "s ease-in-out;";

    removeClassByTime(MAIN_MENU, START_OPACITY, TIME_TO_SLOW_ANIMATION)
    removeClassByTime(BANNERS_PLACE, START_OPACITY, TIME_TO_SLOW_ANIMATION)
    removeClassByTime(FOOTER, START_OPACITY, TIME_TO_SLOW_ANIMATION)
    removeClassByTime(LANDING_FORM, START_OPACITY, TIME_TO_FAST_ANIMATION)

    // Обработка для десктопа
    if (window.matchMedia("(min-width: 1000px)").matches) {
        document.getElementById(LANDING).style = "animation: fastAppearance " + TIME_TO_FAST_ANIMATION + "s ease-in-out;";
        document.getElementById(SEARCH_BLOCK).style = "animation: appearance " + MIDDLE_TIME + "s ease-in-out;";
        removeClassByTime(SEARCH_BLOCK, START_OPACITY_DESCTOP, MIDDLE_TIME)
        removeClassByTime(LANDING, START_OPACITY_DESCTOP, TIME_TO_FAST_ANIMATION)
    }
};

function removeClassByTime(elementId, className, time) {
    setTimeout(function() {
        document.getElementById(elementId)
            .classList
            .remove(className)
    }, time * 1000)
}