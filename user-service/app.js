const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected for User Service");
    app.listen(process.env.PORT, () => {
      console.log(`User service running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
