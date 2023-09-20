const SERVICE_ICON_PATH = 'images/serviceIcons/'
const SVG = '.svg'
let serviceList = [
    ['tv', 'Smart-TV'],
    ['conditioner', 'Кондиционер'],
    ['wifi', 'Wi-Fi'],
    ['ps', 'PlayStation'],
    ['hairdryer', 'Фен'],
    ['washingmachine', 'Стиральная машина'],
    ['fridge', 'Холодильник'],
    ['microvawe', 'СВЧ'],
    ['oven', 'Духовой шкаф'],
    ['flatiron', 'Утюг'],
    ['dishwasher', 'Посудомоечная машина'],

    ['tea', 'Чайные принадлежности'],
    ['coffie', 'Кофеварка'],
    ['towel', 'Набор полотенец'],
    ['dishes', 'Набор посуды'],

    ['hygiene', 'Средства гигиены'],
    ['heatedfloor', 'Тёплый пол'],
    ['boardgames', 'Настольные игры'],
    ['bicycle', 'Велосипед'],
    ['barbecue', 'Зона барбекю']
]

function createIconUrlChecked(iconName) {
    return SERVICE_ICON_PATH + iconName + SVG
}

// Превращаем String активированных чекбоксов в список для обработки на фронте
function splitServisesBySpace(services) {
    return services.trim().split(" ");
}