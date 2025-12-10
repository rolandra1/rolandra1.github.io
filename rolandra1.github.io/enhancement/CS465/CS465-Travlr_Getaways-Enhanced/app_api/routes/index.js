const express = require("express");
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken');

// Middleware that validates JSON Web Tokens for protected routes
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Auth Header required but not present');
    return res.sendStatus(401);
  }

  const parts = authHeader.split(' ');

  if (parts.length < 2) {
    console.log('Not enough parts in Auth Header:', parts.length);
    return res.sendStatus(401);
  }

  const token = parts[1];

  if (!token) {
    console.log('Null Bearer token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Token validation error:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach decoded token to the request for downstream use
    req.auth = verified;
    next();
  });
}

// Authentication routes
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

// Trip routes
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
