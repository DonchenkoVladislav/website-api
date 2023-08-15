//Чтобы этот метод работал, нужно повесить на элемент класс "startOpacity"
const landing = 'landing'
const siteName = 'siteName'
const searchBlock = 'searchBlock'

const mainMenu = 'mainMenu'
const banersPlace = 'banersPlace'
const footer = 'footer'
const landingForm = 'landingForm'

const halfSecond = 0.5
const second = 1
const oneAndHalfSecond = 1.5

const startOpacity = 'startOpacity'

window.onload = function() {
    document.getElementById(landing).style = "animation: fastAppearance " + halfSecond + "s ease-in-out;";
    document.getElementById(siteName).style = "animation: slideIn " + oneAndHalfSecond + "s ease-in-out";
    document.getElementById(searchBlock).style = "animation: appearance " + second + "s ease-in-out;";

    removeClassByTime(landing, startOpacity, halfSecond)
    removeClassByTime(siteName, startOpacity, oneAndHalfSecond)
    removeClassByTime(searchBlock, startOpacity, second)

    document.getElementById(mainMenu).style = "animation: slideInTop " + oneAndHalfSecond + "s ease-in-out;";
    document.getElementById(banersPlace).style = "animation: slideInLeft " + oneAndHalfSecond + "s ease-in-out";
    document.getElementById(footer).style = "animation: slideInBottom " + oneAndHalfSecond + "s ease-in-out;";
    document.getElementById(landingForm).style = "animation: fastAppearance " + halfSecond + "s ease-in-out;";

    removeClassByTime(mainMenu, startOpacity, oneAndHalfSecond)
    removeClassByTime(banersPlace, startOpacity, oneAndHalfSecond)
    removeClassByTime(footer, startOpacity, oneAndHalfSecond)
    removeClassByTime(landingForm, startOpacity, halfSecond)
};

function removeClassByTime(elementId, className, time) {
    setTimeout(function() {
        document.getElementById(elementId)
            .classList
            .remove(className)
    }, time * 1000)
}