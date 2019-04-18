const createDeck = () => {
  const deck = [];
  for (let i = 2; i < 14; i++) {
    for (let j = 1; j <5; j++) {
      deck.push({ suit: j, value: i });
    }
  }
  return deck;
};

// Sorts a hand to prepare for point finding
const sortHand = (hand) => {
  return hand.sort((a, b) => {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    if (a.suit > b.suit) return 1;
    return -1;
  });
};

const checkPoker = (hand) => {
  
};
