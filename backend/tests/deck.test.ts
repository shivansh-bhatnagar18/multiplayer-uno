import {
    getShuffledCardDeck,
    makeCard,
    shuffle,
} from '../uno-game-engine/deck';
describe('testing deck.ts', () => {
    test('makeCard', () => {
        const card = makeCard('number', 'blue', '3');
        expect(card.color).toBe('blue');
    });
    test('getShuffledDeck', () => {
        const deck = getShuffledCardDeck();
        console.log(deck);
    });
});
test('validateDeckComposition', () => {
    const deck = getShuffledCardDeck();

    const colorCount = { red: 0, yellow: 0, green: 0, blue: 0 };
    const wildCount = { wild: 0 };
    let totalCards = 0;

    for (const card of deck) {
        if (card.color in colorCount) {
            colorCount[card.color]++;
        } else if (card.color === 'wild') {
            wildCount.wild++;
        }
        totalCards++;
    }

    // Verify total number of cards
    expect(totalCards).toBe(108);

    // Verify number of cards of each color
    expect(colorCount.red).toBe(25);
    expect(colorCount.yellow).toBe(25);
    expect(colorCount.green).toBe(25);
    expect(colorCount.blue).toBe(25);

    // Verify number of wild cards
    expect(wildCount.wild).toBe(8);
});
describe('shuffle function', () => {
    test('should change order of elements', () => {
        // Create a mock deck
        const deck = [
            makeCard('number', 'red', '1'),
            makeCard('number', 'blue', '2'),
            makeCard('number', 'red', '1'),
            makeCard('number', 'yellow', '1'),
        ];

        // Create a copy of the deck for comparison
        const originalDeck = [...deck];
        shuffle(deck);

        // Check that the order of elements has changed
        const orderChanged = deck.some(
            (card, index) => card !== originalDeck[index]
        );
        expect(orderChanged).toBe(true);
    });
});
