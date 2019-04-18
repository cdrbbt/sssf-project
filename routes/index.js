const express = require('express');
const passport = require('passport');

const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected', passport.authenticate('local'), (req,res) => {
  res.send('ok')
})
module.exports = router;
