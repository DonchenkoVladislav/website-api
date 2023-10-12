const MOBILE = "(max-width: 1000px)"

//Заглушка
const EMPTY = 'empty'

//id кастомного селектора
const CURRENT_SELECT = 'currentSelect'

const RUR = ' ₽'

const monthNamesFull = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

const monthNames = [
    "янв", "фев", "мар", "апр", "мая", "июн",
    "июл", "авг", "сент", "окт", "нояб", "дек"
];

var linkForFooter = [
    ["O нас", "/"],
    ["Поддержка", "/"],
    ["Разместить жилье", "/"]
]

const APARTMENT_PAGE = '/apartment?apartmentId='
const APARTMENT_DATE_PARAM = '&apartmentDate='

//Текстовки на popUp'е с условиями бронирования
const SEND_APPLICATIOM = 'Отправить заявку'
const BOOKING_ALERT_MESSAGE_PART_1 =
    'После нажатия на кнопку "' + SEND_APPLICATIOM + '" с Вами свяжется наш специалист, который уточнит все детали.'
const BOOKING_ALERT_MESSAGE_PART_2 =
    'Бронирование квартир происходит по предоплате от 10% до 20%, после чего Вы получаете чек. Остальную сумму Вы оплачиваете при заселении.'
const BOOKING_ALERT_MESSAGE_PART_3 =
    'Хозяин квартиры получает средства в день заселения.'
