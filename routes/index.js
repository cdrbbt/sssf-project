const express = require('express');
const passport = require('passport');

const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/lobby', (req, res) => {
  res.render('lobby', { title: 'Lobby' });
});

router.get('/game', (req, res) => {
  res.render('game', { title: 'game' });
});

/* router.get('/protected', passport.authenticate('local', { successRedirect: '/test', failureRedirect: '/' }), (req, res) => {
  console.log('attempt to auth');
  res.send(req.user.name);
})
*/
module.exports = router;
