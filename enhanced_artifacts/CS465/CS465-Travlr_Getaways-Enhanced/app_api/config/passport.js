const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

/**
 * LocalStrategy using email as the username field.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username }).exec();

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        console.error('Error in LocalStrategy:', err);
        return done(err);
      }
    }
  )
);
