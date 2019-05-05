const createDeck = () => {
  const deck = [];
  for (let i = 2; i < 15; i++) {
    for (let j = 1; j < 5; j++) {
      deck.push({ suit: j, value: i });
    }
  }
  return deck;
};

const deck = createDeck();

module.exports.deck = deck;

// Sorts a hand to prepare for point finding
const sortHand = (hand) => {
  return hand.sort((a, b) => {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    if (a.suit > b.suit) return 1;
    return -1;
  });
};

const checkStraighFlush = (hand) => {
  for (let i = 1; i < 5; i++) {
    const filtered = hand.filter(val => val.suit === i);
    if (filtered.length > 4) {
      const straight = checkStraight(filtered);
      if (straight.found) return straight;
    }
  }
  return { found: false, value: null };
};

const checkFourOfKind = (hand) => {
  for (let i = 3; i < hand.length; i++) {
    if (hand[i].value === hand[i - 1].value && hand[i].value === hand[i - 2].value
      && hand[i].value === hand[i - 3].value) {
      return { found: true, value: hand[i].value };
    }
  }
  return { found: false, value: null };
};

const checkFullHouse = (hand) => {
  const triple =checkThreeOfKind(hand);
  if (triple.found) {
    const pair = checkPair(hand.filter(val => val.value !== triple.value));
    if (pair.found) return { found: true, value: triple.value };
  }
  return { found: false, value: null };
};

const checkFlush = (hand) => {
  for (let i = 1; i < 5; i++) {
    const filtered = hand.filter(val => val.suit === i);
    if (filtered.length > 5) {
      return { found: true, value: filtered[0].value };
    }
  }
  return { found: false, value: null };
};

const checkStraight = (hand) => {
  let start = hand[0];
  let previous = hand[0];
  let straightCounter = 0;
  for (let i = 1; i< hand.length; i++) {
    if (hand[i].value === previous.value) continue;
    if (hand[i].value === (previous.value - 1)) {
      previous = hand[i];
      straightCounter++;
      if (straightCounter === 4) return { found: true, value: start.value };
    }
    start = hand[i];
    straightCounter = 0;
  }
  return { found: false, value: null }
};

const checkThreeOfKind = (hand) => {
  for (let i = 2; i < hand.length; i++) {
    if (hand[i].value === hand[i - 1].value && hand[i].value === hand[i - 2].value) {
      return { found: true, value: hand[i].value };
    }
  }
  return { found: false, value: null };
};

const checkTwoPair = (hand) => {
  let firstPair = true;
  let pairValue = null;
  for (let i = 1; i < hand.length; i++) {
    if (hand[i].value === hand[i - 1].value) {
      if (firstPair) {
        firstPair = false;
        pairValue = hand[i];
      } else {
        return { found: true, value: pairValue.value };
      }
    }
  }
  return { found: false, value: null };
};

const checkPair = (hand) => {
  for (let i = 1; i < hand.length; i++) {
    if (hand[i].value === hand[i - 1].value) return { found: true, value: hand[i].value };
  }
  return { found: false, value: null };
};

const checkHighCard = hand => ({ found: true, value: hand[0].value });

const checkFunctions = [];
checkFunctions.push(checkStraighFlush, checkFourOfKind, checkFullHouse, checkFlush, checkStraight,
  checkThreeOfKind, checkTwoPair, checkPair, checkHighCard);

const checkHand = (hand) => {
  let handCopy = [...hand];
  let result;
  handCopy = sortHand(handCopy);

  for (let i = 0; i < checkFunctions.length; i++) {
    result = checkFunctions[i](handCopy);
    if (result.found) i = checkFunctions.length;
  }
  return result;
};

module.exports.checkHand = checkHand;
