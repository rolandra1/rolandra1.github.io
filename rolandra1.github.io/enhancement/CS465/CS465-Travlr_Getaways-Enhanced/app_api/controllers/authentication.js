const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

  try {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: ''
    });

    user.setPassword(req.body.password);

    const q = await user.save();

    if (!q) {
        return res
        .status(400)
        .json({ message: 'User could not be created' });
    }

    const token = user.generateJWT();

    return res
      .status(200)
      .json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    return res
      .status(500)
      .json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/login
 * Authenticates a user and returns a JWT.
 */
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error in login:', err);
      return res
        .status(500)
        .json({ message: 'Internal server error' });
    }

    if (!user) {
      return res
        .status(401)
        .json(info);
    }

    const token = user.generateJWT();

    return res
      .status(200)
      .json({ token });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
