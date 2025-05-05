const express = require('express');
const amqp = require('amqplib');
const app = express();
const PORT = 3000;

let channel;

async function connect() {
  const connection = await amqp.connect('amqp://rabbitmq');
  channel = await connection.createChannel();
  await channel.assertQueue('notifications');
}

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(user)));
  res.status(201).send(`Utilisateur ${user.name} créé`);
});

app.listen(PORT, async () => {
  console.log(`Service User sur le port ${PORT}`);
  await connect();
});
