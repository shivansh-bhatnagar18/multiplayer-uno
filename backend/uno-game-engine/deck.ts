const colors: CardColor[] = ['red', 'green', 'blue', 'yellow'];

const values: CardValue[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'skip',
    'reverse',
    'draw2',
];

const specialCards: CardValue[] = ['colchange', 'draw4'];
const sameCardCount = [];
/**
* In a standard UNO deck, there are 108 cards. Here's the breakdown:

- colors: These are the four colors of the cards in the deck: red, yellow, green, and blue.

- values: These are the values that can be on the cards. Each color has one '0' card and
two of each of the other number cards ('1' through '9').
Each color also has two 'skip', 'reverse', and 'draw2' cards.

- specialCards: These are the black cards that can be played on any color.
There are four 'wild' cards that allow the player to choose the color that
continues play, and four 'draw4' cards that act like 'wild' cards but also
force the next player to draw four cards.

So, in total, for each color there are 19 number cards, 2 'skip' cards,
2 'reverse' cards, and 2 'draw2' cards, which makes 25 cards per color.
Multiply that by 4 (for the four colors) and add the 8 special cards,
and you get 108 cards.

This function returns a shuffled deck of 108 UNO cards. Each card is an object with a color and a value.
The function makeCard is used to make the card objects.
@returns {Array} deck - An array of 108 UNO cards.
*/
export function getShuffledCardDeck(): Array<UNOCard> {
    const deck: Array<UNOCard> = [];

    for (let col of colors) {
        for (let val of values) {
            if (!isNaN(Number(val))) {
                for (let i = 0; i < 2; i++) {
                    deck.push(makeCard('number', col, val));
                    if (val === '0') break;
                }
            } else {
                for (let i = 0; i < 2; i++) {
                    deck.push(makeCard('special', col, val));
                }
            }
        }
    }

    // generating special cards
    for (let sc of specialCards) {
        for (let i = 0; i < 4; i++) {
            deck.push(makeCard('wild', 'wild', sc));
        }
    }
    // shuffling the deck
    shuffle(deck);
    return deck;
}

/**
 * Helper function to make a card object.
 * @returns {UNOCard} The composed UNO card.
 */
export function makeCard(
    type: CardType,
    color: CardColor,
    value: CardValue
): UNOCard {
    const id = `card-${type}-${color}-${value}`;

    if (!sameCardCount[id]) sameCardCount[id] = 0;
    sameCardCount[id]++; // increment the count of same cards to assign unique id

    const uid = `${id}-${sameCardCount[id]}`;
    return { type, color, value, id: uid };
    const id = `card-${type}-${color}-${value}`;

    if (!sameCardCount[id]) sameCardCount[id] = 0;
    sameCardCount[id]++; // increment the count of same cards to assign unique id

    const uid = `${id}-${sameCardCount[id]}`;
    return { type, color, value, id: uid };
}

/**
 * This function shuffles the elements of the given array *in place* . The function behaves in a type-agnostic way.
 * Time complexity: O(n)
 */
export function shuffle(deck: Array<UNOCard>) {
    // Fisher-Yates shuffle algorithm to shuffle card deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
export function shuffle(deck: Array<UNOCard>) {
    // Fisher-Yates shuffle algorithm to shuffle card deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
