// Определяем счетчик загруженных файлов
let uploadedFileCount = 0;

// Массив для хранения информации о выбранных изображениях
const uploadedImages = [];

// Функция для загрузки изображения и отправки на сервер
function uploadImage(model, input, previewId, iconId) {
    if (input.files && input.files[0]) {
        const fileName = generateFileName(model);
        const formData = new FormData();
        formData.append('image', input.files[0], fileName);

        // Можно не отправлять изображение на сервер сразу, а сохранить его в массиве
        const imageInfo = {
            formData,
            previewId,
            iconId
        };
        uploadedImages.push(imageInfo);

        // Можно обновить интерфейс пользователя, чтобы показать, что изображение выбрано
        document.getElementById(previewId).src = URL.createObjectURL(input.files[0]);
        document.getElementById(iconId).style.display = 'block';

        // Увеличиваем счетчик загруженных файлов
        uploadedFileCount++;

        // Если все файлы загружены, разблокируем кнопку "Нажми меня"
        if (uploadedFileCount === 3) {
            document.getElementById('upload-button').removeAttribute('disabled');
        }
    } else {
        console.error('Файл не выбран.');
    }
}

// Генерация уникального имени файла
function generateFileName(model) {
    const sessionId = localStorage.getItem('sessionId');
    const phoneNumber = localStorage.getItem('phoneNumber');
    const  smartphoneDescription = localStorage.getItem("smartphoneDescription")
    let complications = localStorage.getItem('selectedComplications');

    // Преобразовать в массив, если не является массивом
    if (complications) {
        try {
            complications = JSON.parse(complications);
            if (!Array.isArray(complications)) {
                complications = [];
            }
        } catch (error) {
            complications = [];
        }
    } else {
        complications = [];
    }

    let fileName = `${model}_${sessionId}?${phoneNumber}?${smartphoneDescription}`;

    if (complications.length > 0) {
        const complicationsString = complications.join('?');
        fileName += `?${complicationsString}`;
    }

    return fileName;
}



// Добавляем обработчик события для каждого input с файлами
const inputImg1 = document.getElementById('upload-img1');
const inputImg2 = document.getElementById('upload-img2');
const inputImg3 = document.getElementById('upload-img3');

inputImg1.addEventListener('change', () => {
    const model = localStorage.getItem('selectedModel');
    uploadImage(model, inputImg1, 'preview-img1', 'upload-icon1');
});

inputImg2.addEventListener('change', () => {
    const model = localStorage.getItem('selectedModel');
    uploadImage(model, inputImg2, 'preview-img2', 'upload-icon2');
});

inputImg3.addEventListener('change', () => {
    const model = localStorage.getItem('selectedModel');
    uploadImage(model, inputImg3, 'preview-img3', 'upload-icon3');
});

// Добавляем обработчик события для кнопки "Нажми меня"
document.getElementById('upload-button').addEventListener('click', () => {
    // Отправляем все выбранные изображения на сервер
    uploadedImages.forEach(imageInfo => {
        fetch('/api/images/upload', {
            method: 'POST',
            body: imageInfo.formData
        })
            .then(response => response.text())
            .then(data => {
                console.log('Загруженное изображение:', data);
                // Можно обновить интерфейс пользователя, чтобы показать, что изображение загружено
                document.getElementById(imageInfo.previewId).setAttribute('src', URL.createObjectURL(imageInfo.formData.get('image')));
                document.getElementById(imageInfo.iconId).style.display = 'block';
            })
            .catch(error => {
                console.error('Ошибка при загрузке изображения:', error);
            });
    });
    // Блокируем кнопку снова после отправки
    document.getElementById('upload-button').setAttribute('disabled', 'true');
});
