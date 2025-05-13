const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/paymentController');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/', authenticate, controller.processPayment);
router.get('/', authenticate, controller.getUserPayments);

module.exports = router;
