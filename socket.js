/* eslint-disable indent */
const io = require('socket.io')();
const _ = require('lodash');
const cards = require('./models/Cards');

const gameState = {
  gameState: false,
  players: [],
  deck: _.shuffle(cards.deck),
  communityCards: [],
  currentPlayer: null,
  preveousPlayer: null,
  pot: 0,
  check: null,
  raise: null,
};

const sendPlayerList = () => {
  const playerNames = gameState.players.map(player => `${player.name} ${player.points}`);
  io.emit('players', playerNames);
};

const drawCommunityCard = () => {
  gameState.communityCards.push(gameState.deck.pop());
  io.emit('community', gameState.communityCards);
};

const availableActions = (socket, join, start, check, raise, fold) => {
  socket.emit('actions', { join, start, check, raise, fold });
};

const setNextPlayer = () => {
  if (gameState.currentPlayer.status) gameState.preveousPlayer = gameState.currentPlayer;
  let ind = gameState.players.indexOf(gameState.currentPlayer) + 1;
  for (let i = ind ;i < gameState.players.length; i++) {
    if (gameState.players[i].status) {
      gameState.currentPlayer = gameState.players[i];
      return;
    }
  }
  for (let i = 0; i < ind; i++) {
    if (gameState.players[i].status) {
      gameState.currentPlayer = gameState.players[i];
      return;
    }
  }
};

const sendActions = () => {
  availableActions(gameState.preveousPlayer.socket, false, false, false, false, false);
  if (gameState.currentPlayer === gameState.preveousPlayer) {
    console.log('round end');
  } else if (gameState.currentPlayer === gameState.check) {
    console.log('next round');
  } else if (gameState.raise != null && gameState.raise != gameState.currentPlayer) {
    availableActions(gameState.currentPlayer.socket, false, false, false, true, true);
  } else if (gameState.currentPlayer.points > 10) {
    gameState.raise = null;
    availableActions(gameState.currentPlayer.socket, false, false, true, true, true);
  } else {
    availableActions(gameState.currentPlayer.socket, false, false, true, true, false);
  }
};

io.on('connection', (socket) => {
  if (gameState.gameState === false) {
    availableActions(socket, true, false, false, false, false);
  } else {
    availableActions(socket, false, false, false, false, false);
  }
  console.log("user connected");
  socket.on('message', (msg) => {
    console.log(msg + socket.id);
  });
  socket.on('joingame', () => {
    gameState.gameState = true;
    gameState.players.push({ points: 100, socket, name: socket.id, hand: [], status: true });
    sendPlayerList();
    availableActions(socket, false, true, false, false, false);
    console.log(gameState.players);
  });

  socket.on('startgame', () => {
    gameState.players.forEach((player) => {
      player.points -= 10;
      gameState.pot += 10;
      player.hand.push(gameState.deck.pop(), gameState.deck.pop());
      console.log(player.hand);
      player.socket.emit('hand', player.hand);
      player.socket.emit('points', player.points);
      availableActions(player.socket, false, false, false, false, false);
    });
    drawCommunityCard();
    io.emit('pot', gameState.pot);
    gameState.currentPlayer = gameState.players[0];
    io.emit('currentPlayer', gameState.currentPlayer.name);
    availableActions(gameState.currentPlayer.socket, false, false, true, true, true);
    sendPlayerList();
  });

  socket.on('check', () => {
    gameState.check = gameState.currentPlayer;
    setNextPlayer();
    sendActions();
  });

  socket.on('raise', () => {
    gameState.check = null;
    if (gameState.raise == null) gameState.raise = gameState.currentPlayer;
    console.log(gameState.raise);
    gameState.currentPlayer.points -= 10;
    gameState.pot += 10;
    setNextPlayer();
    sendActions();
  });

  socket.on('fold', () => {
    gameState.currentPlayer.status = false;
    setNextPlayer();
    sendActions();
  });
});

module.exports = io;
