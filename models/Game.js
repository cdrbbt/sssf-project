const _ = require('lodash');
const cards = require('./Cards');

const initialState = {
  gameState: 'PREPERATION',
  players: [],
  deck: _.shuffle(cards.deck),
  communityCards: [],
  currentPlayer: null,
  pot: 0,
};

const playerJoin = socket => ({
  type: 'PLAYER_JOIN',
  player: { points: 100, hand: [], socket, name: socket.id }
});

const gameStart = () => ({
  type: 'GAME_START'
})

