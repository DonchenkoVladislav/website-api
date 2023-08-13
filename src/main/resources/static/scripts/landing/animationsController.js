const bookingArticle = 'bookingArticle'
const siteName = 'siteName'
const searchBlock = 'searchBlock'

const halfSecond = 0.5
const second = 1
const oneAndHalfSecond = 1.5

window.onload = function() {
    document.getElementById(bookingArticle).style = "animation: fastAppearance " + halfSecond + "s ease-in-out;";
    document.getElementById(siteName).style = "animation: slideIn " + oneAndHalfSecond + "s ease-in-out";
    document.getElementById(searchBlock).style = "animation: appearance " + second + "s ease-in-out;";

    removeClassByTime(bookingArticle, 'startOpacity', halfSecond)
    removeClassByTime(siteName, 'startOpacity', oneAndHalfSecond)
    removeClassByTime(searchBlock, 'startOpacity', second)
};

function removeClassByTime(elementId, className, time) {
    setTimeout(function() {
        document.getElementById(elementId)
            .classList
            .remove(className)
    }, time * 1000)
}