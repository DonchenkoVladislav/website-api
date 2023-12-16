//Открыть popUp и поместить в него innerElement
function createPopUp(innerElement, isLeft, additionalClass) {

    let popUpInner = createElement('div', 'popUpInner', '')

    if (additionalClass !== undefined) popUpInner.classList.add(additionalClass)


    createPopUpCloseButton(
        popUpInner,
        () => {
            if (isLeft) {
                closePopUp(isLeft)
            } else {
                closePopUp()
            }
        },
        false
    )

    popUpInner.append(innerElement)

    let popUpSpaсer = document.getElementsByTagName('body')[0]

    let popUp = createElement('div', 'popUp', '')
    popUp.classList.add(START_OPACITY)


    let popUpCloserSpace = document.createElement('div')
    popUpCloserSpace.classList.add('popUpCloserSpace')
    // popUpCloserSpace.style = "width: 100%; height: 100%"

    //Закрыть popUp, тапнув вне его
    popUpCloserSpace.addEventListener('click', (event) => {

        if (isLeft) {
            closePopUp(isLeft)
        } else {
            closePopUp()
        }
    })

    popUp.append(popUpCloserSpace, popUpInner)
    popUpSpaсer.append(popUp)

    let sideOfStartAnimation = isLeft ? SLIDE_IN_LEFT : SLIDE_IN_BOTTOM;

    playAppearanceAnimationByElement(popUpInner, sideOfStartAnimation, TIME_TO_FASTEST_ANIMATION)
    playAppearanceAnimationByElement(popUp, APPEARANCE, TIME_TO_FASTEST_ANIMATION)
}

//Закрыть popUp
function closePopUp(isLeft) {
    let popUpList = document.getElementsByClassName('popUp')
    let popUpInnerList = document.getElementsByClassName('popUpInner')

    Array.from(popUpList).forEach(popUp => {
        playDeleteAnimation(popUp, UNAPPEARANCE, TIME_TO_FASTEST_ANIMATION)
        setTimeout(function () {
            popUp.remove()
        }, TIME_TO_FASTEST_ANIMATION * 1000)
    })

    Array.from(popUpInnerList).forEach(popUp => {

        let sideOfStartAnimation = isLeft ? SLIDE_OUT_LEFT : SLIDE_OUT_BOTTOM;

        playDeleteAnimation(popUp, sideOfStartAnimation, TIME_TO_FASTEST_ANIMATION)
        setTimeout(function () {
            popUp.remove()
        }, TIME_TO_FASTEST_ANIMATION * 1000)
    })
}

//Кнопка зыкрыия popUp
function createPopUpCloseButton(placeToDownArrowButton, action, isDeleteArrow) {
    let downArrow = createElement('span', 'empty', '×')
    downArrow.id = 'closePopUp'

    placeToDownArrowButton.prepend(downArrow)

    downArrow.addEventListener('click', function () {
        isDeleteArrow ? downArrow.remove() : null;
        action()
    })
}

//Сдвинуть вниз каталог на странице каталога
function showFullMap() {
    let catalogBody = document.getElementById('catalog-body')
    catalogBody.style = "animation: moveCatalogDown " + TIME_TO_FASTEST_ANIMATION + "s ease-in-out;"

    setTimeout(function () {
        catalogBody.classList.add('catalog_body_top')
    }, TIME_TO_FASTEST_ANIMATION * 1000)
}