document.addEventListener('DOMContentLoaded', () => {
  const detailElements = document.querySelectorAll('[id^="product-"], [id^="service-"], [id^="fresh-"], [id^="marine-"]');
  detailElements.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const targetId = e.target.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.remove('hidden');
      }
    });
  });

  function closeDetail() {
    detailElements.forEach(el => el.classList.add('hidden'));
  }

  document.querySelectorAll('button[onclick="closeDetail()"]').forEach(btn => {
    btn.addEventListener('click', closeDetail);
  });

  // Динамическая корзина
  let cart = [];
  document.querySelectorAll('.card a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const item = {
        name: link.parentElement.querySelector('h3').textContent,
        price: parseInt(link.parentElement.querySelector('p').textContent.match(/\d+/)[0]),
        id: Date.now()
      };
      cart.push(item);
      alert(`Товар "${item.name}" добавлен в корзину!`);
      sendToTelegram(cart);
    });
  });

  // Загрузка данных из JSON
  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      console.log('Data loaded:', data);
    })
    .catch(error => console.error('Error loading data:', error));
});

function sendToTelegram(cart) {
  const telegramUrl = `https://api.telegram.org/bot7935450995:AAF5ka7X3T9Bub0Bq6ysVnB0HrKm3ujUtns/sendMessage`;
  const message = `Новый заказ:\n${cart.map(item => `${item.name} - ${item.price} руб.`).join('\n')}\nОбщая сумма: ${cart.reduce((sum, item) => sum + item.price, 0)} руб.`;
  fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: 1094905671,
      text: message
    })
  }).catch(error => console.error('Telegram error:', error));
}