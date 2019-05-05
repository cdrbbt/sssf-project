$('#start').click(() => {
  socket.emit('startgame');
});

$('#join').click(() => {
  socket.emit('joingame');
});

$('#check').click(() => {
  socket.emit('check');
});

$('#raise').click(() => {
  socket.emit('raise');
});

$('#fold').click(() => {
  socket.emit('fold');
});

socket.on('hand', (hand) => {
  hand.forEach(element => {
    cardDecoder(element)
  });
  const text = hand.map(card => `${card.suit}${card.value}`);
  $('#hand').text(text);
});

socket.on('community', (community) => {
  community.forEach(element => {
    cardDecoder(element)
  });
  const text = community.map(card => `${card.suit}${card.value}`);
  $('#community').text(text);
});

socket.on('players', (playerlist) => {
  $('#players').empty();
  playerlist.forEach((player) => {
    const li = `<li>${player}</li>`;
    $('#players').append(li);
  });
});

socket.on('actions', (actions) => {
  $('#join').prop('disabled', !actions.join);
  $('#start').prop('disabled', !actions.start);
  $('#check').prop('disabled', !actions.check);
  $('#raise').prop('disabled', !actions.raise);
  $('#fold').prop('disabled', !actions.fold);
}) 

const cardDecoder = (card) => {
  if (card.value > 10) {
    switch (card.value) {
      case 11:
        card.value = 'J';
        break;
      case 12:
        card.value = 'Q';
        break;
      case 13:
        card.value = 'K';
        break;
      case 14:
        card.value = 'A';
        break;
      default:
        console.log('card value error');
    }
  }
  switch (card.suit) {
    case 1:
      card.suit = '♠';
      break;
    case 2:
      card.suit = '♥';
      break;
    case 3:
      card.suit = '♦';
      break;
    case 4:
      card.suit = '♣';
      break;
    default:
      console.log('card suit error');
  }
  return card;
};
