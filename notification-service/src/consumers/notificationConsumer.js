const amqp = require('amqplib');
const { sendNotification } = require('../services/notificationService');

const QUEUE = process.env.QUEUE_NAME;

exports.consumeNotifications = async () => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`Waiting for messages in queue: ${QUEUE}`);

    channel.consume(QUEUE, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log("Received message:", content);
        await sendNotification(content);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming notifications:", error);
  }
};
