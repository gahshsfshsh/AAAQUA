const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const TELEGRAM_BOT_TOKEN = '7935450995:AAF5ka7X3T9Bub0Bq6ysVnB0HrKm3ujUtns';
const ADMIN_CHAT_ID = '1094905671';

app.post('/api/order', (req, res) => {
  const { cart } = req.body;
  const message = `Новый заказ:\n${cart.map(item => `${item.name} - ${item.price} руб.`).join('\n')}\nОбщая сумма: ${cart.reduce((sum, item) => sum + item.price, 0)} руб.`;
  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: ADMIN_CHAT_ID,
    text: message
  }).then(() => res.send({ success: true }))
    .catch(error => res.status(500).send({ success: false, error: error.message }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});