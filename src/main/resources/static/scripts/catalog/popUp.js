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

    let popUpSpaser = document.getElementsByTagName('body')[0]

    let popUp = createElement('div', 'popUp', '')
    popUp.classList.add(START_OPACITY)

    popUp.append(popUpInner)
    popUpSpaser.append(popUp)

    playAppearanceAnimationByElement(popUp, SLIDE_IN_BOTTOM, TIME_TO_FASTEST_ANIMATION)
}

//Закрыть popUp
function closePopUp() {
    let popUpList = document.getElementsByClassName('popUp')

    Array.from(popUpList).forEach(popUp => {
        playDeleteAnimation(popUp, SLIDE_OUT_BOTTOM, TIME_TO_FASTEST_ANIMATION)
        setTimeout(function () {
            popUp.remove()
        }, TIME_TO_FASTEST_ANIMATION * 1000)
    })
}

function createPopUpCloseButton(placeToDownArrowButton, action, isDeleteArrow) {
        let downArrow = createElement('span', 'empty', '▼')
        downArrow.id = 'downArrow'

        placeToDownArrowButton.prepend(downArrow)

        downArrow.addEventListener('click', function () {
            isDeleteArrow ? downArrow.remove() : null;
            action()
        })

}

function showFullMap() {
    let catalogBody = document.getElementById('catalog-body')
    catalogBody.style = "animation: moveCatalogDown " + TIME_TO_FASTEST_ANIMATION + "s ease-in-out;"

    setTimeout(function () {
        catalogBody.classList.add('catalog_body_top')
    }, TIME_TO_FASTEST_ANIMATION * 1000)
}