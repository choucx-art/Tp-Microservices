const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./src/routes/orderRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected for Order Service");
    app.listen(process.env.PORT, () => {
      console.log(`Order service running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
