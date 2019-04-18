const createDeck = () => {
  const deck = [];
  for (let i = 2; i < 14; i++){
    for (let j= 1; j <5; j++) {
      deck.push({suit: j, value: i});
    }
  }
  return deck;
}

const sortHand = (hand) => {
  [].sort()
}

const checkPoker = (hand) => {
  
}