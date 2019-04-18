const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: String,
  wins: {type: Number, default: 0},
  losses: {type: Number, default: 0},
  hash: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;