const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ name: username }).then((user) => {
        if (!user) {
          console.log('user not found');
          return done(null, false, { msg: 'Invalid username' });
        }
        bcrypt.compare(password, user.hash, (err, same) => {
          if (same) {
            console.log('log in')
            return done(null, user);
          }
          console.log('wrong pass');
          return done(null, false, { msg: 'Invalid password' });
        });
      });
    }
  ));

  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
