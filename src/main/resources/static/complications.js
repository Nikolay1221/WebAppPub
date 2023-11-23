document.addEventListener('DOMContentLoaded', function () {
    var saveButton = document.getElementById('complicationSmartphone');
    saveButton.addEventListener('click', function () {
        var description = document.getElementById('smartphoneDescription').value;

        if (description.trim() === '') {
            alert('Пожалуйста, введите описание смартфона.');
            return;
        }

        localStorage.setItem('smartphoneDescription', description);
        alert('Описание смартфона успешно сохранено.');

        const selectedComplications = [];

        // Получаем состояния всех чекбоксов и сохраняем только выбранные
        const withoutcompletesetCheckbox = document.getElementById('withoutcompletesetCheckbox');
        const powerunitCheckbox = document.getElementById('powerunitCheckbox');
        const chargingcableCheckbox = document.getElementById('chargingcableCheckbox');
        const boxCheckbox = document.getElementById('boxCheckbox');
        const caseCheckbox = document.getElementById('caseCheckbox');

        if (withoutcompletesetCheckbox.checked) {
            selectedComplications.push('Без комплектации');
        }
        if (powerunitCheckbox.checked) {
            selectedComplications.push('Блок питания');
        }
        if (chargingcableCheckbox.checked) {
            selectedComplications.push('Кабель для зарядки и передачи данных (USB-кабель).');
        }
        if (caseCheckbox.checked) {
            selectedComplications.push('Чехол');
        }

        // Сохраняем выбранные комплектации в localStorage
        localStorage.setItem('selectedComplications', JSON.stringify(selectedComplications));
        alert('Выбранные комплектации успешно сохранены в localStorage.');

        // Опционально: Показываем следующий контейнер
        const containerDiv = document.querySelector('.numberPhone');
        if (containerDiv) {
            containerDiv.style.display = 'block';
        }
    });
});
