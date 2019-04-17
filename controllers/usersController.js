const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUserPage = (req, res) => {
  res.render('login', {title: 'Login'})
}

exports.loginUser = (req, res) => {
  console.log('login attempt');
  console.log(req.body);
  res.send('login');
}

exports.registerUserPage = (req, res) => {
  res.render('register', {title: 'Register'})
}

exports.registerUser = (req, res) => {
  console.log(req.body);
  res.send('ok');
}
