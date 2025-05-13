const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(express.json());

app.use('/payments', paymentRoutes);

const PORT = process.env.PAYMENT_SERVICE_PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Payment service connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Payment service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
