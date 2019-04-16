const express = require('express');
const usersController = require('../controllers/users')
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', usersController.loginUserPage);

router.post('/login', usersController.loginUser);

router.get('/register', usersController.registerUserPage)

router.post('/register', usersController.registerUser);

module.exports = router;
