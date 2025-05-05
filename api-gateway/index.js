const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/data', async (req, res) => {
  try {
    const users = await axios.get('http://user:3000/users');
    const products = await axios.get('http://product:3000/products');

    res.json({
      users: users.data,
      products: products.data
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur dans l’API Gateway' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3 });
