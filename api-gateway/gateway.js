const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const YAML = require('yamljs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

const routes = YAML.load('./routes.yaml');

// Middleware JWT (facultatif ici pour simplifier)
app.use(express.json());

routes.services.forEach(service => {
  app.use(service.route, createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: (path) => path.replace(service.route, '')
  }));
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
