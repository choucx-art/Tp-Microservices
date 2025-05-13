const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);

const PORT = process.env.ORDER_SERVICE_PORT || 3002;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Order service connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
