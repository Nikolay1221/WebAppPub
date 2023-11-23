document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", formatPhoneNumber);

    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", function () {
        const phoneNumber = phoneInput.value.trim();

        if (phoneNumber === "") {
            showAlert("Пожалуйста, введите номер телефона.");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            showAlert("Номер телефона введен некорректно. Пожалуйста, проверьте формат.");
            return;
        }

        localStorage.setItem("phoneNumber", phoneNumber);
        const containerDiv = document.querySelector('.container.mt-4.custom-search.rounded.uploadPhoto');
        if (containerDiv) {
            containerDiv.style.display = "block";
        }

        showAlert("Номер телефона успешно сохранен и проверен: " + phoneNumber);
    });

    function formatPhoneNumber(e) {
        let input = e.target.value.replace(/\D/g, '').substring(0,11); // Удаляем все нецифровые символы и ограничиваем длину 11 цифрами
        let formatted = '';

        if (input.length > 0) {
            formatted = '+' + input.substring(0, 1); // Добавляем + в начало
        }
        if (input.length > 1) {
            formatted += ' (' + input.substring(1, 4); // Добавляем скобки после кода страны
        }
        if (input.length >= 5) {
            formatted += ') ' + input.substring(4, 7); // Добавляем первую часть номера
        }
        if (input.length >= 8) {
            formatted += '-' + input.substring(7, 9); // Добавляем вторую часть номера
        }
        if (input.length > 9) {
            formatted += '-' + input.substring(9, 11); // Добавляем третью часть номера
        }
        phoneInput.value = formatted;
    }

    function showAlert(message) {
        alert(message);
    }

    function isValidPhoneNumber(phoneNumber) {
        return /^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneNumber);
    }
});
