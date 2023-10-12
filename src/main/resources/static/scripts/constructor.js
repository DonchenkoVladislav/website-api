//Упрощенное создание обычных объектов
function createElement(tag, className, responseField, elementId) {
    let element = document.createElement(tag)
    element.classList.add(className)
    element.innerHTML = responseField

    if (elementId !== undefined) {
        element.id = elementId
    }

    return element;
}

function createInput(type, placeholder, readOnly, action, id) {
    let inputElement = document.createElement('input')
    inputElement.classList.add('universalInput')
    inputElement.type = type
    inputElement.readOnly = readOnly
    inputElement.placeholder = placeholder

    if(action !== undefined) {
        inputElement.addEventListener('click', (event) => action())
    }

    if(id !== undefined) {
        inputElement.id = id
    }

    return inputElement;
}

//Упрощенное создание объектов с иконками
function createComboElement(iconName, valueClassName, responseField, iconPath) {

    let imgElement = createElement('img', 'icon', '')
    let valueElement = createElement('span', valueClassName, responseField)
    let comboElement = createElement('article', 'apartmentComboElement', '')

    if (iconName !== 'none' && iconPath === undefined) {
        imgElement.src = '/images/icons/' + iconName;
        imgElement.alt = iconName;
        comboElement.append(imgElement, valueElement)
    }
    if (iconPath !== undefined) {
        imgElement.src = iconPath + iconName;
        imgElement.alt = iconName;
        comboElement.append(imgElement, valueElement)
    } else {
        comboElement.append(valueElement)
    }

    return comboElement
}

function createButton(images, buttonText, buttonClass, articleClass, action) {
    const article = document.createElement('article');

    articleClass === null
        ? article.className = 'additionstAtribute'
        : article.className = articleClass;


    const button = document.createElement('button');
    button.className = buttonClass;

    if (action !== undefined) {
        article.addEventListener('click', function () {
            action()
        });
    }

    // Создаем элементы изображений и добавляем их внутрь кнопки
    if (images !== null) {
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            button.appendChild(img);
        });
    }

    // Создаем элемент с текстом кнопки и добавляем его внутрь кнопки
    if (buttonText !== '') {
        const span = document.createElement('span');
        span.textContent = buttonText;
        button.appendChild(span);
    }

    // Добавляем кнопку внутрь элемента <article>
    article.appendChild(button);

    return article;
}

//Создание наполнения popUp'а со списком сервисов
function createServiceInner(apartmentServicesList) {
    let servicesInner = createElement('article', 'servicestable', '')

    serviceList.forEach(service => {

        let serviceName = service[0]
        let srviceDescription = service[1]

        console.log("Сервис из списка: " + serviceName)
        if (apartmentServicesList.includes(serviceName)) {


            console.log("Условие выполнено")

            let s = createComboElement(
                serviceName + SVG,
                'servicesTableValue',
                srviceDescription,
                '/images/serviceIcons/'
            );
            s.classList.add('cerviceAtribureList')

            servicesInner.append(s)
        }
    })

    return servicesInner;
}

function formatSummary(numberInt) {
    const reversedString = numberInt.toString().split('').reverse().join('');
    const spacedString = reversedString.replace(/(\d{3})/g, '$1 ').trim();
    return spacedString.split('').reverse().join('') + RUR;
}