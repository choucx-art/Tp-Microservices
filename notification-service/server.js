const express = require('express');
const dotenv = require('dotenv');
const startConsumer = require('./src/services/rabbitmqConsumer');

dotenv.config();

const app = express();
const PORT = process.env.NOTIFICATION_SERVICE_PORT || 3004;

app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
  startConsumer(); // Start listening to RabbitMQ
});
