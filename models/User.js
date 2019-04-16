const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  wins: Number,
  losses: Number,
  email: String,
  hash: String,
  id: Number
})

const User = mongoose.model('User', userSchema);
module.exports = User;