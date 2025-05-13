const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const YAML = require('yamljs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

// Load route configuration
const routes = YAML.load('./routes.yaml');

// JWT middleware
app.use((req, res, next) => {
  if (routes.protected.includes(req.path)) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Token required');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send('Invalid token');
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

// Apply proxy for each route
routes.services.forEach(service => {
  app.use(service.route, createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(service.route, '')
  }));
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
