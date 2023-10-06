function createImgToBase64(photo, photoPalce) {
    //Конвертируем base64 в изображение и помещаем его в элемент для главного фото
    const imgElement = document.createElement('img');
    imgElement.className = 'photoElements'
    imgElement.src = `data:image/jpeg;base64, ${photo}`;
    imgElement.alt = 'Здесь должно быть фото квартиры';
    photoPalce.append(imgElement);
}