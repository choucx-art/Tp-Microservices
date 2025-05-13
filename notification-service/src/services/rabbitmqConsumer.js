const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';
const QUEUE_NAME = 'payments'; // ou 'notifications' selon ta config

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`📨 Notification received: ${content}`);

        // Ici tu peux simuler l’envoi d’un email, SMS, etc.
        // sendEmail(JSON.parse(content));

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Failed to start consumer:', error);
  }
}

module.exports = startConsumer;
