const Payment = require('../models/paymentModel');
// const sendToQueue = require('../services/rabbitmqProducer'); // Optionnel

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    // Exemple : envoyer notification via RabbitMQ
    // await sendToQueue('payments', JSON.stringify(payment));

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
