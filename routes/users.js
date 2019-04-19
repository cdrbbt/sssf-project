const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/login', usersController.loginUserPage);

router.post('/login', usersController.loginUser);

router.get('/register', usersController.registerUserPage);

router.post('/register', usersController.registerUser);

module.exports = router;
