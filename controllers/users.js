const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUserPage = (req, res) => {
  res.send('login page');
}

exports.loginUser = (req, res) => {
  res.send('login');
}

exports.registerUserPage = (req, res) => {
  console.log(req.body);
  res.send('ok');
}

exports.registerUser = (req, res) => {
  console.log(req.body);
  res.send('ok');
}
