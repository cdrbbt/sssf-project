const LocalStrategy = require('passport-local');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ name: username }).then((user) => {
        if (!user) {
          console.log('user not found');
          return done(null, false, { msg: 'Invalid username' });
        }
        if (user.hash === password) {
          return done(null, user);
        }
        console.log('wrong pass');
        return done(null, false, { msg: 'Invalid password' });
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, res) => {
      done(err, user);
    });
  });
};
