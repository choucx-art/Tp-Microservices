const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routage vers les microservices
app.use('/users', authenticateToken, createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
app.use('/orders', authenticateToken, createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true }));
app.use('/payments', authenticateToken, createProxyMiddleware({ target: process.env.PAYMENT_SERVICE_URL, changeOrigin: true }));
app.use('/notifications', authenticateToken, createProxyMiddleware({ target: process.env.NOTIFICATION_SERVICE_URL, changeOrigin: true }));

// Point public pour tester l'API Gateway
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
