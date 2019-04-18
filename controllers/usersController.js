const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');

exports.loginUserPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.loginUser = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/register'
  })(req, res);
};

exports.registerUserPage = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.registerUser = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username);
  User.findOne({ name: username })
    .then((user) => {
      if (user) {
        // username taken
        res.send('name taken');
      } else {
        const newUser = new User({
          name: username,
          hash: password,
        });
        console.log(newUser);
        newUser.save().then((user) => {
          res.send('saved to db');
        });
      }
    });
};
