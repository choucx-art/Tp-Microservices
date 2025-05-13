const express = require('express');
const dotenv = require('dotenv');
const { consumeNotifications } = require('./src/consumers/notificationConsumer');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('Notification service is running');
});

app.listen(process.env.PORT, () => {
  console.log(`Notification service running on port ${process.env.PORT}`);
  consumeNotifications(); // start consuming messages
});
