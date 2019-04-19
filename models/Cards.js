const createDeck = () => {
  const deck = [];
  for (let i = 2; i < 15; i++) {
    for (let j = 1; j < 5; j++) {
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

const checkRoyalFlush = (hand) => {
  if (hand[0].value !== 14) return { found: false, value: null };

  return true
};

const checkPairs = (hand) => {
  for (let i = 1; i < hand.length; i++) {
    if (hand[i].value === hand[i - 1].value) return { found: true, value: hand[i].value };
  }
  return { found: false, value: null };
};
