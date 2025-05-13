const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const paymentRoutes = require('./src/routes/paymentRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/payments', paymentRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected for Payment Service");
    app.listen(process.env.PORT, () => {
      console.log(`Payment service running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));

  