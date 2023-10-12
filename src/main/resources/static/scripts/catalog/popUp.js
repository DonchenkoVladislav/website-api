//Открыть popUp и поместить в него innerElement
function createPopUp(innerElement) {

    // document.getElementById('catalog_main').classList.add('decreaseScale')

    let popUpInner = createElement('div', 'popUpInner', '')


    createPopUpCloseButton(
        popUpInner,
        () => {
            closePopUp()
        },
        false
    )

    popUpInner.append(innerElement)

    let popUpSpaсer = document.getElementsByTagName('body')[0]

    let popUp = createElement('div', 'popUp', '')
    popUp.classList.add(START_OPACITY)


    let popUpCloserSpace = document.createElement('div')
    popUpCloserSpace.style = "width: 100%; height: 100%"

    //Закрыть popUp, тапнув вне его
    popUpCloserSpace.addEventListener('click', (event) => closePopUp())

    popUp.append(popUpCloserSpace, popUpInner)
    popUpSpaсer.append(popUp)

    playAppearanceAnimationByElement(popUpInner, SLIDE_IN_BOTTOM, TIME_TO_FASTEST_ANIMATION)
    playAppearanceAnimationByElement(popUp, APPEARANCE, TIME_TO_FASTEST_ANIMATION)
}

//Закрыть popUp
function closePopUp() {
    let popUpList = document.getElementsByClassName('popUp')
    let popUpInnerList = document.getElementsByClassName('popUpInner')

    Array.from(popUpList).forEach(popUp => {
        playDeleteAnimation(popUp, UNAPPEARANCE, TIME_TO_FASTEST_ANIMATION)
        setTimeout(function () {
            popUp.remove()
        }, TIME_TO_FASTEST_ANIMATION * 1000)
    })

    Array.from(popUpInnerList).forEach(popUp => {
        playDeleteAnimation(popUp, SLIDE_OUT_BOTTOM, TIME_TO_FASTEST_ANIMATION)
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