document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Останавливаем стандартную отправку формы

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch('/users', { // Укажите адрес вашего бэкенд-маршрута
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Преобразуем данные в JSON
    })
    .then(response => response.json())
    .then(result => {
      document.getElementById('response-message').textContent = 'Данные успешно отправлены: ' + JSON.stringify(result);
    })
    .catch(error => {
      document.getElementById('response-message').textContent = 'Ошибка: ' + error.message;
    });
});
