const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const payment = new Payment({
      orderId,
      amount,
      userId: req.user.username,
      status: "completed"
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.username });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
