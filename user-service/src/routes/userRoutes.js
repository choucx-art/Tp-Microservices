const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/Usercontroller');
const router = express.Router();

// Middleware JWT pour la route protégée
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', authenticate, controller.profile);

module.exports = router;
