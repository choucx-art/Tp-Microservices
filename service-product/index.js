const express = require('express');
const amqp = require('amqplib');
const app = express();
const PORT = 3000;

async function connect() {
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();
  await channel.assertQueue('notifications');

  channel.consume('notifications', msg => {
    const user = JSON.parse(msg.content.toString());
    console.log('🔔 Nouveau message reçu:', user);
    channel.ack(msg);
  });
}

app.listen(PORT, async () => {
  console.log(`Service Product sur le port ${PORT}`);
  await connect();
});

