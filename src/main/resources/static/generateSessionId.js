// generateSessionId.js
function generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Проверяем, есть ли уже идентификатор сессии в localStorage
let sessionId = localStorage.getItem('sessionId');

if (!sessionId) {
    // Если нет, то создаем новый уникальный идентификатор сессии
    sessionId = generateSessionId();
    // Сохраняем его на стороне клиента в localStorage
    localStorage.setItem('sessionId', sessionId);
}

// Теперь sessionId будет уникальным для каждого пользователя

// Ваши дальнейшие действия с sessionId, например, использование его для идентификации пользователя
console.log('Идентификатор сессии:', sessionId);
