function getCatalogPage() {
    let dateList = []

    Array.from(landingAirDatepicker.selectedDates).forEach(d => {
        let date = new Date(d);

        let day;

        if (date.getDate() < 10) {
            day = '0' + date.getDate()
        } else {
            day = date.getDate()
        }

        let month;

        if (date.getMonth() + 1 < 10) {
            month = '0' + (date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }

        let year = date.getFullYear();

        let formattedDate = day + '.' + month + '.' + year

        dateList.push(formattedDate)
    })

    if (landingAirDatepicker.selectedDates.length === 2) {
        window.location.href =
            '/catalog?city='
            + document.getElementById("cityInput").getElementsByTagName("p")[0].textContent
            + '&date='
            + dateList;
    } else {
        document.getElementById('selectDate').focus()
    }
}