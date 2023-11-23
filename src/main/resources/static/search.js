const input = document.getElementById('autocomplete-input');
const autocompleteList = document.getElementById('autocomplete-list');

input.addEventListener('input', handleInput);

function handleInput() {
    const value = input.value;
    autocompleteList.innerHTML = '';

    if (!value) {
        return;
    }

    fetchPhoneModels(value)
        .then(models => {
            models.forEach(model => {
                createAndAppendAutocompleteItem(model);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function fetchPhoneModels(searchTerm) {
    const url = `http://localhost:8080/api/phones/search?modelPhone=${encodeURIComponent(searchTerm)}`;
    return fetch(url)
        .then(response => response.json());
}

function createAndAppendAutocompleteItem(model) {
    const item = document.createElement('DIV');
    const matchingPart = model.modelPhone.substr(0, input.value.length);
    const remainingPart = model.modelPhone.substr(input.value.length);

    item.innerHTML = `<strong>${matchingPart}</strong>${remainingPart}`;
    item.addEventListener('click', () => {
        input.value = model.modelPhone;
        autocompleteList.innerHTML = '';

        // Сохраняем выбранную модель в localStorage
        localStorage.setItem('selectedModel', model.modelPhone);
        const containerDiv = document.querySelector('.container.mt-4.custom-background.rounded.complications');
        if (containerDiv) {
            containerDiv.style.display = 'block';
        }

        // Дополнительные действия по выбору элемента можно добавить здесь
    });
    autocompleteList.appendChild(item);
}
