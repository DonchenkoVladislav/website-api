let placeToCitySelect;

//Показать pop up с выбором города
function createCitySelect() {

    let searchBlock = document.getElementById('searchBlock')

    placeToCitySelect = document.createElement("article")
    placeToCitySelect.id = "placeToCitySelect"

    cities.forEach(city => {
        let button = document.createElement('button')
        button.classList.add('alfaInput')
        button.classList.add('sitySelect')
        button.addEventListener('click', (event) => selectAndClosePopUp(city[0]));


        let cityName = document.createElement('p')
        cityName.innerHTML = city[0]

        button.append(cityName)
        placeToCitySelect.append(button)
    })

    smoothAppearance(placeToCitySelect, WIDGET_TIME)
    searchBlock.append(placeToCitySelect)
    closeToTapOutsideElement(searchBlock, placeToCitySelect)
}

//Выбрать город
function selectAndClosePopUp(city) {
    document.getElementById('cityInput').innerHTML = '<p>' + city + '</p>'
    close(placeToCitySelect)
    document.getElementById('selectDate').focus()
}

function selectAndFocus(city) {
    document.getElementById('cityInput').focus()
    document.getElementById('cityInput').innerHTML = '<p>' + city + '</p>'
    document.getElementById('selectDate').focus()
}
