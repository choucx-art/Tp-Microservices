const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.USER_SERVICE_PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('User service connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
